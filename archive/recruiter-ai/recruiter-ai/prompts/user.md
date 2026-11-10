You are evaluating candidates for the following role.

## Job Title
{{jobTitle}}

## Company
{{company}}

## Job Description
{{jobDescription}}

## Candidates
{{candidateData}}

## Task
Produce a comprehensive hiring kit as a JSON object with the following structure:

```json
{
  "hiringSummary": {
    "overview": "string — 2-3 paragraph executive summary",
    "totalCandidates": number,
    "recommended": number,
    "topCandidate": "string — name or 'N/A'"
  },
  "candidateRanking": [
    {
      "name": "string",
      "overallScore": number (0-100),
      "recommendation": "Strong Hire | Hire | Interview | On Hold | Reject",
      "matchScore": number (0-100),
      "strengths": ["string"],
      "concerns": ["string"],
      "summary": "string — 1-2 sentences"
    }
  ],
  "interviewPlan": {
    "rounds": [
      { "round": number, "type": "string", "duration": "string", "focus": "string", "interviewers": "string" }
    ]
  },
  "techQuestions": [
    { "question": "string", "difficulty": "Easy | Medium | Hard", "category": "string", "expectedAnswer": "string" }
  ],
  "behavioralQuestions": [
    { "question": "string", "competency": "string", "starHint": "string" }
  ],
  "screeningChecklist": {
    "mustHave": ["string"],
    "niceToHave": ["string"],
    "redFlags": ["string"]
  },
  "scorecard": {
    "criteria": [
      { "name": "string", "weight": number, "description": "string" }
    ]
  },
  "hiringTimeline": {
    "totalWeeks": number,
    "phases": [
      { "phase": "string", "duration": "string", "startWeek": number, "tasks": ["string"] }
    ]
  },
  "inviteEmail": { "subject": "string", "body": "string" },
  "offerEmail": { "subject": "string", "body": "string" },
  "rejectionEmail": { "subject": "string", "body": "string" },
  "linkedInPost": { "content": "string" },
  "recruiterChecklist": { "items": ["string"] }
}
```

Return ONLY the JSON object. No markdown fences. No explanation.
