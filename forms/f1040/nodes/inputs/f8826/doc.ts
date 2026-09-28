import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8826",
  subtitle: "Disabled Access Credit",
  topic: Topic.BusinessCredits,
  summary:
    "A credit for eligible small businesses that spend money to make their business accessible to people with disabilities, such as ramps or sign-language interpreters. " +
    "A business qualifies with gross receipts of $1,000,000 or less or no more than 30 full-time employees. " +
    "The credit is 50% of eligible spending between $250 and $10,250, up to $5,000, and the engine sends it to Schedule 3 line 6z.",
  fields: {
    eligible_expenditures:
      "Line 1. Amounts you paid or incurred to comply with the Americans with Disabilities Act. Spending above $10,250 adds no credit.",
    gross_receipts:
      "Your gross receipts for the eligibility test. A business with $1,000,000 or less qualifies.",
    fte_count:
      "Number of full-time employees for the eligibility test. A business with 30 or fewer qualifies.",
  },
};
