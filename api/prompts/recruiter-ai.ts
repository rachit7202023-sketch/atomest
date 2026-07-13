export const RECRUITER_PROMPTS = {
  LINKEDIN_POST: `
You are an expert technical recruiter and copywriter.
Create a highly engaging, optimized LinkedIn job post for the following role.
Include a hook, brief company pitch, key responsibilities, and requirements.
End with a clear call to action and relevant hashtags.

Job Title: {{jobTitle}}
Experience Level: {{experienceLevel}}
Company Size: {{companySize}}

Job Description:
{{jobDescription}}

Context Notes:
{{notes}}

Return ONLY a JSON object with this structure:
{
  "content": "<string, the formatted LinkedIn post text>"
}
  `,

  HIRING_SUMMARY: `
You are an expert hiring manager.
Create a comprehensive Hiring Summary based on the provided Job Description.

Job Title: {{jobTitle}}
Experience Level: {{experienceLevel}}
Company Size: {{companySize}}

Job Description:
{{jobDescription}}

Return ONLY a JSON object with this structure:
{
  "responsibilities": ["<string>", ...],
  "mustHaveSkills": ["<string>", ...],
  "niceToHaveSkills": ["<string>", ...],
  "idealProfile": "<string, 2-3 sentences describing the perfect candidate>",
  "salaryRange": "<string, estimated range based on role and level, e.g. '$120,000 - $160,000'>",
  "reportingTo": "<string, likely reporting manager title>"
}
  `,

  INTERVIEW_PLAN: `
Create a detailed round-by-round interview plan for this role.
Each round should include evaluation criteria, focus areas, and sample questions.

Job Title: {{jobTitle}}
Rounds requested: {{rounds}}
Interview styles selected: {{interviewStyles}}
Experience Level: {{experienceLevel}}

Job Description:
{{jobDescription}}

Return ONLY a JSON object with this structure:
{
  "rounds": [
    {
      "roundName": "<string, e.g. Technical Screen>",
      "duration": "<string, e.g. 45 mins>",
      "interviewer": "<string, e.g. Engineering Manager>",
      "goal": "<string>",
      "evaluationCriteria": ["<string>", "<string>"],
      "sampleQuestions": ["<string>", "<string>"]
    }
  ]
}
  `,

  TECH_QUESTIONS: `
Generate 6-8 tailored TECHNICAL interview questions based on the job description.
Customize to the tech stack and experience level. Do NOT give generic questions.
Each question should test a specific competency relevant to the role.

Job Title: {{jobTitle}}
Experience Level: {{experienceLevel}}

Job Description:
{{jobDescription}}

Return ONLY a JSON object with this structure:
{
  "questions": [
    {
      "category": "<string, e.g. System Design, React.js>",
      "question": "<string>",
      "expectedAnswer": "<string, what to listen for>",
      "difficulty": "<string, Easy/Medium/Hard>"
    }
  ]
}
  `,

  BEHAVIOURAL_QUESTIONS: `
Generate 5-7 tailored BEHAVIOURAL interview questions based on the job description.
Use the STAR method. Adapt difficulty based on experience level.

Job Title: {{jobTitle}}
Experience Level: {{experienceLevel}}

Job Description:
{{jobDescription}}

Return ONLY a JSON object with this structure:
{
  "questions": [
    {
      "category": "<string, e.g. Leadership, Conflict Resolution>",
      "question": "<string>",
      "expectedAnswer": "<string, what to listen for>",
      "difficulty": "<string, Easy/Medium/Hard>"
    }
  ]
}
  `,

  SCREENING_CHECKLIST: `
Create a recruiter candidate screening checklist for initial phone screens.
Phrase everything as "Look for...". Include 8-12 items covering technical skills,
communication, culture fit, and red flags.

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}

Return ONLY a JSON object with this structure:
{
  "checklist": ["Look for <string>", ...]
}
  `,

  SCORECARD: `
Create a comprehensive interview evaluation scorecard tailored to this role.
Include weighted categories. The weights should add up to 100.

Job Title: {{jobTitle}}
Experience Level: {{experienceLevel}}
Job Description: {{jobDescription}}

Return ONLY a JSON object with this structure:
{
  "categories": [
    {
      "name": "<string, e.g. Technical Skills>",
      "description": "<string, what to evaluate>",
      "weight": <number, percentage weight e.g. 25>
    }
  ],
  "overallRecommendation": "<string, instructions for final decision>",
  "scoringGuide": {
    "1": "Does not meet expectations",
    "2": "Partially meets expectations",
    "3": "Meets expectations",
    "4": "Exceeds expectations",
    "5": "Exceptional"
  }
}

REQUIRED categories (you may add more):
- Technical Skills
- Problem Solving
- Communication
- Leadership (if Senior/Lead level)
- Culture Fit
- Experience Relevance
- Education & Certifications
  `,

  INVITE_EMAIL: `
Draft a professional interview invitation email template for this role.
Use placeholders like [Candidate Name], [Date], [Time], [Meeting Link].
The tone should be warm, professional, and excited about the candidate.

Job Title: {{jobTitle}}
Company Size: {{companySize}}

Return ONLY a JSON object with this structure:
{
  "subject": "<string>",
  "body": "<string>"
}
  `,

  OFFER_EMAIL: `
Draft a warm, professional offer email template for this role.
Use placeholders like [Candidate Name], [Salary], [Start Date], [Benefits].
The tone should convey excitement about the candidate joining.

Job Title: {{jobTitle}}
Company Size: {{companySize}}

Return ONLY a JSON object with this structure:
{
  "subject": "<string>",
  "body": "<string>"
}
  `,

  REJECTION_EMAIL: `
Draft a warm, professional, empathetic rejection email template.
Use placeholders like [Candidate Name].
Express genuine appreciation and leave the door open for future opportunities.

Job Title: {{jobTitle}}
Company Size: {{companySize}}

Return ONLY a JSON object with this structure:
{
  "subject": "<string>",
  "body": "<string>"
}
  `,

  HIRING_TIMELINE: `
Generate a detailed hiring timeline/roadmap for this role.
Each phase should include a clear description and estimated duration.

Job Title: {{jobTitle}}
Rounds requested: {{rounds}}
Experience Level: {{experienceLevel}}

Return ONLY a JSON object with this structure:
{
  "timeline": [
    {
      "phase": "<string, e.g. Job Posting & Sourcing>",
      "week": "<string, e.g. Week 1-2>",
      "duration": "<string, e.g. 5-7 days>",
      "activity": "<string, detailed description of what happens in this phase>",
      "milestone": "<string, key deliverable for this phase>"
    }
  ]
}

Include these phases in order:
1. Job Posting & Sourcing
2. Resume Screening & Shortlisting
3. Initial Phone Screens
4. Technical Interviews
5. Manager/Panel Interviews
6. HR Discussion & Reference Checks
7. Offer & Negotiation
8. Onboarding Preparation
  `,

  RECRUITER_CHECKLIST: `
Generate a comprehensive recruiter action checklist for this hiring process.
Each item should have a category and priority level.

Job Title: {{jobTitle}}
Experience Level: {{experienceLevel}}

Return ONLY a JSON object with this structure:
{
  "checklist": [
    {
      "task": "<string, e.g. Publish job on LinkedIn>",
      "category": "<string, e.g. Sourcing, Screening, Scheduling, Offer, Onboarding>",
      "priority": "<string, High/Medium/Low>"
    }
  ]
}

Include tasks from these categories:
- Sourcing: Publish on LinkedIn, Indeed, Naukri, company careers page
- Screening: Review applications, shortlist candidates, phone screens
- Scheduling: Schedule technical rounds, manager interviews, HR rounds
- Evaluation: Complete scorecards, debrief with panel, reference checks
- Offer: Prepare offer letter, salary negotiation, background verification
- Onboarding: Send joining kit, IT setup, team introduction
  `,

  CANDIDATE_RANKING: `
You are an expert technical recruiter and hiring decision advisor.
Review the following job requirements and candidate resumes carefully.
Provide a comprehensive, multi-dimensional evaluation of each candidate.

Job Title: {{jobTitle}}
Experience Level: {{experienceLevel}}
Job Description:
{{jobDescription}}

Resumes:
{{resumesText}}

Return ONLY a JSON object with this structure:
{
  "summary": "<string, 2-3 sentence executive overview of the candidate pool quality>",
  "totalCandidates": <number>,
  "averageMatch": <number, 0-100>,
  "candidates": [
    {
      "name": "<string, candidate name from resume>",
      "currentRole": "<string, their current/latest role>",
      "experience": "<string, e.g. '5 years'>",
      "overallMatch": <number, 0-100>,
      "technicalMatch": <number, 0-100>,
      "experienceMatch": <number, 0-100>,
      "communicationScore": <number, 0-100>,
      "cultureFit": <number, 0-100>,
      "confidenceScore": <number, 0-100, how confident the AI is in this assessment>,
      "hiringRecommendation": "<string, exactly one of: Strong Hire, Hire, Interview, On Hold, Reject>",
      "recommendationReasoning": "<string, 2-3 sentence justification for the recommendation>",
      "strengths": ["<string>", "<string>"],
      "weaknesses": ["<string>", "<string>"],
      "greenFlags": ["<string, positive signal>"],
      "riskFlags": ["<string, concern or risk>"],
      "missingSkills": ["<string, skills from JD not found in resume>"],
      "suggestedInterviewFocus": "<string, what to probe in interview>"
    }
  ]
}

Sort candidates by overallMatch descending (best match first).
Be specific and actionable in your assessments.
  `
};
