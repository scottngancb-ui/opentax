import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 2441",
  subtitle: "Child and Dependent Care Expenses (computed)",
  topic: Topic.Family,
  summary:
    "The computed side of Form 2441, filled in automatically from dependent care benefits in W-2 box 10. It applies the " +
    "employer benefit exclusion ($5,000, or $2,500 married filing separately) and sends any excess to Form 1040 line 1e as " +
    "wages. When expense details are present it also figures the credit and sends it to Schedule 3 line 2. The full credit " +
    "worksheet you fill in is the separate Form 2441 input screen (f2441).",
  fields: {
    dep_care_benefits:
      "Total dependent care benefits your employers provided, from W-2 box 10. Amounts over the exclusion limit are taxable on Form 1040 line 1e.",
    filing_status:
      "Your filing status. Married filing separately halves the employer benefit exclusion; on a joint return the credit is capped by the lower-earning spouse's income.",
    qualifying_persons:
      "Number of qualifying persons (children under 13 or dependents unable to care for themselves). Expense limit is $3,000 for one, $6,000 for two or more.",
    qualifying_expenses: "Care expenses you paid so you (and your spouse) could work or look for work.",
    taxpayer_earned_income: "Your earned income. Allowed expenses cannot exceed it.",
    spouse_earned_income: "Your spouse's earned income on a joint return. Allowed expenses cannot exceed the lower of the two.",
    agi:
      "Your adjusted gross income. It sets the credit rate: 35% at $15,000 or less, falling 1 point per $2,000 above that, down to 20%.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
