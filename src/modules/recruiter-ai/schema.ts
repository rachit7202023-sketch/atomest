// src/modules/recruiter-ai/schema.ts
import { z } from 'zod';

export const recruiterInputSchema = z.object({
  jobTitle: z.string().min(2, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  jobDescription: z.string().min(50, 'Please provide a more detailed job description'),
  candidateData: z.string().min(20, 'Please provide candidate information'),
  interviewStyle: z.string().optional().default('Technical'),
});

export type RecruiterInput = z.infer<typeof recruiterInputSchema>;
