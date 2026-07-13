import { getGeminiClient, generateStructuredJson } from './gemini';
import { RECRUITER_PROMPTS } from '../prompts/recruiter-ai';
import { buildPrompt } from './promptBuilder';
import { SupabaseClient } from '@supabase/supabase-js';

export type GenerateKitInput = {
  projectId?: string;
  jobTitle: string;
  jobDescription: string;
  experienceLevel: string;
  companySize: string;
  interviewStyles: string[];
  rounds: string;
  notes: string;
  resumes?: Array<{ name: string, text: string }>;
  sectionToRegenerate?: string;
};

// Map of artifact names to their prompt templates
const ARTIFACT_PROMPTS: Record<string, string> = {
  linkedInPost: RECRUITER_PROMPTS.LINKEDIN_POST,
  hiringSummary: RECRUITER_PROMPTS.HIRING_SUMMARY,
  interviewPlan: RECRUITER_PROMPTS.INTERVIEW_PLAN,
  techQuestions: RECRUITER_PROMPTS.TECH_QUESTIONS,
  behavioralQuestions: RECRUITER_PROMPTS.BEHAVIOURAL_QUESTIONS,
  screeningChecklist: RECRUITER_PROMPTS.SCREENING_CHECKLIST,
  scorecard: RECRUITER_PROMPTS.SCORECARD,
  inviteEmail: RECRUITER_PROMPTS.INVITE_EMAIL,
  offerEmail: RECRUITER_PROMPTS.OFFER_EMAIL,
  rejectionEmail: RECRUITER_PROMPTS.REJECTION_EMAIL,
  hiringTimeline: RECRUITER_PROMPTS.HIRING_TIMELINE,
  recruiterChecklist: RECRUITER_PROMPTS.RECRUITER_CHECKLIST,
  candidateRanking: RECRUITER_PROMPTS.CANDIDATE_RANKING,
};

/**
 * Generate intelligent fallback content when AI fails.
 * NEVER return null — every section must have meaningful content.
 */
function generateFallback(artifactName: string, jobTitle: string, experienceLevel: string): any {
  const fallbacks: Record<string, any> = {
    linkedInPost: {
      content: `🚀 We're Hiring: ${jobTitle}\n\nWe're looking for a talented ${experienceLevel} ${jobTitle} to join our growing team.\n\nWhat you'll do:\n• Drive technical initiatives and deliver high-quality solutions\n• Collaborate with cross-functional teams\n• Mentor and grow alongside talented engineers\n\nWhat we're looking for:\n• Strong technical fundamentals\n• Excellent communication skills\n• Passion for building great products\n\nInterested? Apply now or tag someone who'd be a great fit!\n\n#hiring #${jobTitle.replace(/\s+/g, '')} #careers #tech`
    },
    hiringSummary: {
      responsibilities: [
        `Lead ${jobTitle.toLowerCase()} initiatives and deliver high-quality work`,
        "Collaborate with cross-functional teams to define and implement solutions",
        "Participate in code reviews, architecture discussions, and technical planning",
        "Mentor junior team members and contribute to team growth"
      ],
      mustHaveSkills: [
        "Strong technical fundamentals relevant to the role",
        "Proven experience at the required seniority level",
        "Excellent problem-solving and analytical skills",
        "Strong communication and collaboration abilities"
      ],
      niceToHaveSkills: [
        "Experience with modern development practices",
        "Prior experience in a similar industry",
        "Leadership or mentoring experience",
        "Open source contributions or side projects"
      ],
      idealProfile: `The ideal candidate is a ${experienceLevel.toLowerCase()} professional with deep expertise in the domain, a track record of delivering impactful work, and a collaborative mindset. They thrive in fast-paced environments and are passionate about continuous learning.`,
      salaryRange: "Competitive, based on experience",
      reportingTo: "Hiring Manager"
    },
    interviewPlan: {
      rounds: [
        {
          roundName: "Initial Phone Screen",
          duration: "30 mins",
          interviewer: "Recruiter",
          goal: "Assess basic qualifications, communication skills, and cultural alignment",
          evaluationCriteria: ["Communication clarity", "Role understanding", "Motivation"],
          sampleQuestions: ["Walk me through your background", "Why are you interested in this role?"]
        },
        {
          roundName: "Technical Assessment",
          duration: "60 mins",
          interviewer: "Technical Lead",
          goal: "Evaluate technical depth and problem-solving ability",
          evaluationCriteria: ["Technical knowledge", "Problem-solving approach", "Code quality"],
          sampleQuestions: ["Describe a complex technical challenge you solved", "Walk me through your approach to system design"]
        },
        {
          roundName: "Hiring Manager Interview",
          duration: "45 mins",
          interviewer: "Hiring Manager",
          goal: "Assess leadership potential, team fit, and career trajectory",
          evaluationCriteria: ["Leadership skills", "Strategic thinking", "Team collaboration"],
          sampleQuestions: ["How do you handle conflicting priorities?", "Describe your ideal team culture"]
        }
      ]
    },
    techQuestions: {
      questions: [
        { category: "Core Skills", question: `Describe a challenging ${jobTitle.toLowerCase()} project you've worked on. What made it complex?`, expectedAnswer: "Listen for: depth of technical understanding, problem decomposition, and outcome measurement", difficulty: "Medium" },
        { category: "Problem Solving", question: "How would you approach debugging a critical production issue?", expectedAnswer: "Listen for: systematic debugging methodology, communication during incidents, post-mortem culture", difficulty: "Medium" },
        { category: "Architecture", question: "How do you decide between building vs. buying a solution?", expectedAnswer: "Listen for: cost-benefit analysis, scalability thinking, team capability assessment", difficulty: "Hard" },
        { category: "Best Practices", question: "What does code quality mean to you? How do you ensure it?", expectedAnswer: "Listen for: testing strategies, code review practices, documentation habits", difficulty: "Easy" }
      ]
    },
    behavioralQuestions: {
      questions: [
        { category: "Leadership", question: "Tell me about a time you had to influence a decision without direct authority.", expectedAnswer: "Listen for: persuasion skills, stakeholder management, outcome focus", difficulty: "Medium" },
        { category: "Conflict Resolution", question: "Describe a situation where you disagreed with a team member. How did you resolve it?", expectedAnswer: "Listen for: empathy, active listening, compromise-seeking", difficulty: "Medium" },
        { category: "Adaptability", question: "Tell me about a time when priorities changed suddenly. How did you adapt?", expectedAnswer: "Listen for: flexibility, re-prioritization skills, calm under pressure", difficulty: "Easy" },
        { category: "Growth", question: "What's the most important thing you've learned in the last year?", expectedAnswer: "Listen for: self-awareness, growth mindset, intellectual curiosity", difficulty: "Easy" }
      ]
    },
    screeningChecklist: {
      checklist: [
        `Look for ${experienceLevel.toLowerCase()}-level experience directly relevant to ${jobTitle}`,
        "Look for clear career progression and growth trajectory",
        "Look for strong communication skills during the conversation",
        "Look for genuine interest in the company and role",
        "Look for technical depth that matches the job requirements",
        "Look for examples of collaboration and teamwork",
        "Look for alignment with company values and culture",
        "Look for any availability or relocation constraints"
      ]
    },
    scorecard: {
      categories: [
        { name: "Technical Skills", description: "Depth and breadth of relevant technical knowledge", weight: 25 },
        { name: "Problem Solving", description: "Analytical thinking, debugging approach, solution design", weight: 20 },
        { name: "Communication", description: "Clarity of expression, active listening, documentation", weight: 15 },
        { name: "Culture Fit", description: "Values alignment, collaboration style, growth mindset", weight: 15 },
        { name: "Experience Relevance", description: "Direct experience with similar roles, industries, or challenges", weight: 15 },
        { name: "Leadership", description: "Mentoring ability, decision-making, initiative", weight: 10 }
      ],
      overallRecommendation: "Consider the weighted scores across all categories. A candidate scoring 4+ overall is a strong hire. 3-4 warrants further discussion. Below 3 suggests the candidate may not be the right fit.",
      scoringGuide: {
        "1": "Does not meet expectations",
        "2": "Partially meets expectations",
        "3": "Meets expectations",
        "4": "Exceeds expectations",
        "5": "Exceptional"
      }
    },
    inviteEmail: {
      subject: `Interview Invitation: ${jobTitle} at Our Company`,
      body: `Dear [Candidate Name],\n\nThank you for your interest in the ${jobTitle} position at our company. We were impressed by your background and would love to learn more about you.\n\nWe'd like to invite you for an interview:\n\n📅 Date: [Date]\n⏰ Time: [Time]\n📍 Format: [Virtual/In-person]\n🔗 Meeting Link: [Meeting Link]\n\nThe interview will last approximately 45-60 minutes and will include a discussion about your experience and a technical assessment.\n\nPlease confirm your availability at your earliest convenience. If the proposed time doesn't work, we're happy to accommodate your schedule.\n\nLooking forward to speaking with you!\n\nBest regards,\n[Your Name]\n[Your Title]`
    },
    offerEmail: {
      subject: `Offer Letter: ${jobTitle} Position`,
      body: `Dear [Candidate Name],\n\nWe are thrilled to extend an offer for the position of ${jobTitle} at our company!\n\nAfter our conversations, we are confident that you will be a tremendous addition to our team. Here are the details:\n\n💼 Position: ${jobTitle}\n💰 Compensation: [Salary]\n📅 Start Date: [Start Date]\n🏥 Benefits: [Benefits Package]\n\nThis offer is contingent upon successful completion of a background check.\n\nPlease review the attached offer letter and let us know if you have any questions. We'd appreciate your response by [Deadline].\n\nWe're excited about the possibility of you joining our team!\n\nBest regards,\n[Your Name]\n[Your Title]`
    },
    rejectionEmail: {
      subject: `Update on Your Application: ${jobTitle}`,
      body: `Dear [Candidate Name],\n\nThank you for taking the time to interview for the ${jobTitle} position at our company. We truly appreciated the opportunity to learn about your experience and skills.\n\nAfter careful consideration, we've decided to move forward with another candidate whose background more closely aligns with our current needs.\n\nThis was a difficult decision, as we were impressed by many aspects of your background. We'd love to keep your information on file for future opportunities that may be a better fit.\n\nWe wish you the very best in your career journey and thank you again for your interest in our team.\n\nWarm regards,\n[Your Name]\n[Your Title]`
    },
    hiringTimeline: {
      timeline: [
        { phase: "Job Posting & Sourcing", week: "Week 1", duration: "5-7 days", activity: "Publish job listings on LinkedIn, Indeed, and company careers page. Begin active sourcing through networks and referrals.", milestone: "Job live on all platforms" },
        { phase: "Resume Screening", week: "Week 2", duration: "3-5 days", activity: "Review incoming applications, screen resumes against requirements, and create shortlist of qualified candidates.", milestone: "Shortlist finalized" },
        { phase: "Phone Screens", week: "Week 2-3", duration: "5-7 days", activity: "Conduct initial phone screens with shortlisted candidates to assess basic fit and interest.", milestone: "Phone screens completed" },
        { phase: "Technical Interviews", week: "Week 3-4", duration: "5-7 days", activity: "Schedule and conduct technical assessments with qualified candidates.", milestone: "Technical evaluations completed" },
        { phase: "Manager Interviews", week: "Week 4-5", duration: "3-5 days", activity: "Final round interviews with hiring manager and key stakeholders.", milestone: "Interview panel debrief" },
        { phase: "Reference & Background", week: "Week 5-6", duration: "5-7 days", activity: "Conduct reference checks and initiate background verification for top candidate.", milestone: "References verified" },
        { phase: "Offer & Negotiation", week: "Week 6", duration: "3-5 days", activity: "Prepare and extend offer letter. Handle any salary or benefits negotiation.", milestone: "Offer accepted" },
        { phase: "Onboarding Prep", week: "Week 7-8", duration: "5-10 days", activity: "Coordinate IT setup, send welcome package, schedule first-week orientation.", milestone: "New hire onboarded" }
      ]
    },
    recruiterChecklist: {
      checklist: [
        { task: "Publish job on LinkedIn", category: "Sourcing", priority: "High" },
        { task: "Publish job on Indeed", category: "Sourcing", priority: "High" },
        { task: "Publish on Naukri / company careers page", category: "Sourcing", priority: "Medium" },
        { task: "Share posting with internal referral network", category: "Sourcing", priority: "Medium" },
        { task: "Screen incoming applications", category: "Screening", priority: "High" },
        { task: "Shortlist qualified candidates", category: "Screening", priority: "High" },
        { task: "Schedule initial phone screens", category: "Scheduling", priority: "High" },
        { task: "Schedule technical interview rounds", category: "Scheduling", priority: "High" },
        { task: "Coordinate panel interviews with hiring manager", category: "Scheduling", priority: "Medium" },
        { task: "Complete candidate scorecards", category: "Evaluation", priority: "High" },
        { task: "Conduct reference checks", category: "Evaluation", priority: "Medium" },
        { task: "Prepare offer letter", category: "Offer", priority: "High" },
        { task: "Initiate background verification", category: "Offer", priority: "High" },
        { task: "Send joining kit and onboarding materials", category: "Onboarding", priority: "Medium" },
        { task: "Coordinate IT and workspace setup", category: "Onboarding", priority: "Medium" }
      ]
    },
    candidateRanking: {
      summary: `Candidate evaluation for the ${jobTitle} position is pending. Upload candidate resumes to receive AI-powered rankings and recommendations.`,
      totalCandidates: 0,
      averageMatch: 0,
      candidates: []
    }
  };

  return fallbacks[artifactName] || null;
}

export async function generateKitArtifacts(
  input: GenerateKitInput,
  supabase: SupabaseClient | null,
  runId: string | null,
  onArtifactComplete: (artifactName: string, data: any, error?: string) => void
) {
  const client = getGeminiClient();

  const variables = {
    jobTitle: input.jobTitle,
    jobDescription: input.jobDescription,
    experienceLevel: input.experienceLevel,
    companySize: input.companySize,
    interviewStyles: input.interviewStyles,
    rounds: input.rounds,
    notes: input.notes,
    resumesText: input.resumes?.map(r => `--- RESUME: ${r.name} ---\n${r.text}`).join('\n\n') || "No resumes provided.",
  };

  const artifactsToProcess = input.sectionToRegenerate 
    ? { [input.sectionToRegenerate]: ARTIFACT_PROMPTS[input.sectionToRegenerate] }
    : ARTIFACT_PROMPTS;

  const promises = Object.entries(artifactsToProcess).map(async ([artifactName, template]) => {
    try {
      const prompt = buildPrompt(template, variables);
      let data = null;
      try {
        data = await generateStructuredJson(client, prompt);
      } catch (e) {
        console.warn(`Retrying ${artifactName} due to error...`);
        try {
          data = await generateStructuredJson(client, prompt);
        } catch (retryError) {
          console.warn(`Retry failed for ${artifactName}, using fallback content`);
          data = generateFallback(artifactName, input.jobTitle, input.experienceLevel);
        }
      }
      
      // CRITICAL: Never return null data. Use fallback if AI returned nothing.
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        console.warn(`Empty response for ${artifactName}, using fallback`);
        data = generateFallback(artifactName, input.jobTitle, input.experienceLevel);
      }

      if (supabase && input.projectId && runId && data) {
        const { data: userData } = await supabase.auth.getUser();
        
        if (userData?.user?.id) {
          await supabase.from('generation_artifacts').upsert({
            project_id: input.projectId,
            run_id: runId,
            user_id: userData.user.id,
            artifact_type: artifactName,
            content: data
          }, { onConflict: 'project_id, artifact_type' });
          
          await supabase.from('activity_log').insert({
            user_id: userData.user.id,
            project_id: input.projectId,
            event_type: 'artifact_generated',
            metadata: { artifact_type: artifactName, run_id: runId }
          });
        }
      }

      onArtifactComplete(artifactName, data);
    } catch (error: any) {
      console.error(`Failed to generate ${artifactName}:`, error);
      // Even on total failure, provide fallback content instead of error
      const fallbackData = generateFallback(artifactName, input.jobTitle, input.experienceLevel);
      if (fallbackData) {
        onArtifactComplete(artifactName, fallbackData);
      } else {
        onArtifactComplete(artifactName, null, error.message || 'Generation failed');
      }
    }
  });

  await Promise.allSettled(promises);
}
