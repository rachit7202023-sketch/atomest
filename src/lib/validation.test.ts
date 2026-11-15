import { describe, it, expect } from "vitest";
import { ContactInquirySchema, WaitlistSignupSchema } from "@/lib/validation";

describe("ContactInquirySchema", () => {
  it("accepts a valid contact inquiry", () => {
    const result = ContactInquirySchema.safeParse({
      fullName: "Alex Mercer",
      email: "alex@company.com",
      company: "Acme Studio",
      website: "https://acme.com",
      solution: "lead-automation",
      budget: "$300 - $750",
      description: "I need help automating my lead intake process.",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Alex Mercer");
      expect(result.data.solution).toBe("lead-automation");
    }
  });

  it("rejects missing required fields", () => {
    const result = ContactInquirySchema.safeParse({
      fullName: "",
      email: "",
      description: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = ContactInquirySchema.safeParse({
      fullName: "Alex",
      email: "not-an-email",
      description: "Test description here.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects description too short", () => {
    const result = ContactInquirySchema.safeParse({
      fullName: "Alex",
      email: "alex@company.com",
      description: "Too short",
    });
    expect(result.success).toBe(false);
  });

  it("defaults solution to web-development", () => {
    const result = ContactInquirySchema.safeParse({
      fullName: "Alex",
      email: "alex@company.com",
      description: "Test description here with enough characters.",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.solution).toBe("web-development");
    }
  });
});

describe("WaitlistSignupSchema", () => {
  it("accepts a valid waitlist signup", () => {
    const result = WaitlistSignupSchema.safeParse({
      email: "alex@company.com",
      product: "speed-to-lead-blueprint",
      full_name: "Alex Mercer",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing email", () => {
    const result = WaitlistSignupSchema.safeParse({
      product: "speed-to-lead-blueprint",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = WaitlistSignupSchema.safeParse({
      email: "not-an-email",
      product: "speed-to-lead-blueprint",
    });
    expect(result.success).toBe(false);
  });
});
