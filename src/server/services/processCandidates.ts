import { SupabaseClient } from '@supabase/supabase-js';
import { getGeminiClient, generateStructuredJson } from './gemini';

export type ProcessCandidatesInput = {
  projectId: string;
  jobTitle: string;
  jobDescription: string;
  resumes: Array<{ name: string, text: string }>;
};

// Simple async pool to limit concurrency
async function asyncPool(poolLimit: number, array: any[], iteratorFn: (item: any) => Promise<any>) {
  const ret = [];
  const executing: Promise<any>[] = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (poolLimit <= array.length) {
      const e: Promise<any> = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

const EXTRACT_JD_PROMPT = `
You are an expert technical recruiter. Your task is to extract and normalize the core requirements from the following Job Description.
Return a structured JSON object exactly matching this schema:
{
  "requiredSkills": ["string"],
  "preferredSkills": ["string"],
  "minimumYearsOfExperience": "number (or null)",
  "mustHaves": ["string"],
  "niceToHaves": ["string"],
  "seniority": "string",
  "educationRequirement": "string (or null)"
}

Job Title: {jobTitle}
Job Description:
{jobDescription}
`;

const EXTRACT_CANDIDATE_PROMPT = `
You are an expert technical recruiter and resume parser.
Extract the candidate's details from the provided resume text. Do not hallucinate. Use ONLY the provided resume text.

Return a structured JSON object matching this schema exactly:
{
  "name": "string (or null)",
  "email": "string (or null)",
  "phone": "string (or null)",
  "normalized_skills": ["string"],
  "normalized_experience": [{"company": "string", "title": "string", "startDate": "string", "endDate": "string", "description": "string"}],
  "normalized_education": [{"institution": "string", "degree": "string", "year": "string"}],
  "normalized_projects": [{"name": "string", "description": "string"}],
  "normalized_certifications": ["string"],
  "normalized_timeline": [{"year": "string", "event": "string"}],
  "normalized_summary": "A 2-3 sentence summary of the candidate's background."
}

Resume Text:
{resumeText}
`;

const SCORE_CANDIDATE_PROMPT = `
You are an expert technical recruiter evaluating a candidate against a job requirement.
You must be critical and realistic. Do not give 100% matches easily. Look closely at the exact requirements versus the candidate's extracted experience.

Score the candidate and provide detailed reasoning. The recommendation must be one of:
'Highly Recommended', 'Recommended', 'Worth Interviewing', 'Needs Review', 'Low Match'

Return a structured JSON object matching this schema exactly:
{
  "match_score": 0,
  "recommendation": "string",
  "match_reasoning": {
    "Technical": "reasoning string",
    "Experience": "reasoning string",
    "Projects": "reasoning string",
    "Leadership": "reasoning string",
    "Communication Evidence": "reasoning string",
    "Education": "reasoning string",
    "Domain Knowledge": "reasoning string",
    "Risk": "Low/Medium/High, and reasoning string",
    "Confidence": "High/Medium/Low based on clarity of resume",
    "Overall": "Overall summary reasoning string"
  }
}

Job Requirements:
{jobRequirements}

Candidate Data:
{candidateData}
`;

export async function processCandidatesStream(
  input: ProcessCandidatesInput,
  supabase: SupabaseClient | null,
  onEvent: (data: any) => void
) {
  const gemini = getGeminiClient();
  const projectId = input.projectId;

  try {
    onEvent({ event: 'status', message: 'Extracting Job Requirements...' });

    // 1. Extract JD Requirements
    const jdPrompt = EXTRACT_JD_PROMPT
      .replace('{jobTitle}', input.jobTitle)
      .replace('{jobDescription}', input.jobDescription);

    const structuredJd = await generateStructuredJson(gemini, jdPrompt);

    if (supabase) {
      await supabase.from('projects').update({ structured_jd: structuredJd }).eq('id', projectId);
    }

    onEvent({ event: 'job_requirements_extracted', data: structuredJd });

    // 2. Process Candidates with Concurrency Limit (3)
    let processedCount = 0;
    const total = input.resumes.length;

    await asyncPool(3, input.resumes, async (resume) => {
      try {
        // Extract Candidate Data
        const extractPrompt = EXTRACT_CANDIDATE_PROMPT.replace('{resumeText}', resume.text);
        const parsedData = await generateStructuredJson(gemini, extractPrompt);

        // Score Candidate
        const scorePrompt = SCORE_CANDIDATE_PROMPT
          .replace('{jobRequirements}', JSON.stringify(structuredJd))
          .replace('{candidateData}', JSON.stringify(parsedData));
        
        const scoringData = await generateStructuredJson(gemini, scorePrompt);

        // Prepare Database Row
        const candidateRow = {
          project_id: projectId,
          name: parsedData.name || resume.name.replace('.pdf', ''),
          email: parsedData.email,
          phone: parsedData.phone,
          raw_text: resume.text,
          parsed_data: parsedData,
          normalized_skills: parsedData.normalized_skills || [],
          normalized_experience: parsedData.normalized_experience || [],
          normalized_education: parsedData.normalized_education || [],
          normalized_projects: parsedData.normalized_projects || [],
          normalized_certifications: parsedData.normalized_certifications || [],
          normalized_timeline: parsedData.normalized_timeline || [],
          normalized_summary: parsedData.normalized_summary || '',
          match_score: scoringData.match_score || 0,
          match_reasoning: scoringData.match_reasoning || {},
          recommendation: scoringData.recommendation || 'Needs Review',
          stage: 'Sourced',
          status: 'completed',
          source: resume.name
        };

        let dbId = null;
        if (supabase) {
          const { data, error } = await supabase.from('candidates').insert(candidateRow).select().single();
          if (error) {
            console.error("DB Insert Error for Candidate", error);
            throw error;
          }
          if (data) {
            dbId = data.id;
          }
        }

        processedCount++;
        onEvent({
          event: 'candidate_processed',
          candidate: { ...candidateRow, id: dbId },
          progress: { current: processedCount, total }
        });

      } catch (err: any) {
        console.error(`Failed to process resume ${resume.name}`, err);
        
        const failedRow = {
          project_id: projectId,
          name: resume.name.replace('.pdf', ''),
          raw_text: resume.text,
          status: 'parsing_failed',
          source: resume.name
        };

        let dbId = null;
        if (supabase) {
          const { data } = await supabase.from('candidates').insert(failedRow).select().single();
          if (data) dbId = data.id;
        }

        processedCount++;
        onEvent({
          event: 'candidate_failed',
          candidate: { ...failedRow, id: dbId },
          error: err.message,
          progress: { current: processedCount, total }
        });
      }
    });

    onEvent({ event: 'done' });

  } catch (error: any) {
    onEvent({ event: 'error', error: error.message });
  }
}
