import { z } from "zod";

/**
 * Shared Zod validation schemas for all Atomest API endpoints.
 * Server-side source of truth — never trust client input.
 */

export const ContactInquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().max(200).optional().nullable(),
  website: z.string().url("Invalid website URL").max(255).optional().nullable(),
  solution: z
    .enum([
      "web-development",
      "business-automation",
      "ai-solutions",
      "ai-voice-receptionist",
      "lead-automation",
      "crm-workflow-automation",
      "ai-customer-support",
      "premium-business-websites",
      "combined",
      "digital-products",
      "other",
    ])
    .default("web-development"),
  budget: z.string().max(100).optional().nullable(),
  description: z.string().min(10, "Please describe your project in at least 10 characters").max(3000),
});

export const WaitlistSignupSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  product: z.string().min(1).max(100),
  full_name: z.string().max(200).optional().nullable(),
  company_name: z.string().max(200).optional().nullable(),
  role: z.string().max(200).optional().nullable(),
});

export type ContactInquiryInput = z.infer<typeof ContactInquirySchema>;
export type WaitlistSignupInput = z.infer<typeof WaitlistSignupSchema>;

/**
 * Validation result helper for API handlers.
 */
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  body: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(body);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return {
      success: false,
      error: firstIssue?.message ?? "Invalid request data",
    };
  }
  return { success: true, data: result.data };
}
