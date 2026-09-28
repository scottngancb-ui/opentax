import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Long-term care premiums",
  subtitle: "IRS worksheet (eligible long-term care premium limits)",
  topic: Topic.Deductions,
  summary:
    "Figures how much of what you paid for qualified long-term care insurance counts as a medical expense. " +
    "The deductible amount for each insured person is the smaller of the premium paid or an age-based limit; for 2025 the limits range from $480 (age 40 or under) to $5,970 (over 70). " +
    "Enter one entry per insured person. The eligible total goes to Schedule A line 1, where medical expenses are deductible only above a percentage of AGI.",
  fields: {
    age: "The insured person's age at the end of 2025. Selects the age bracket that caps the deductible premium.",
    actual_premium_paid: "The premium you paid during the year for this person's long-term care policy.",
    is_qualified_contract: "Whether the policy is a qualified long-term care insurance contract under section 7702B. Premiums on non-qualified policies are not counted.",
  },
};
