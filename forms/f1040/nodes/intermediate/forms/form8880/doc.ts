import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8880",
  subtitle: "Credit for Qualified Retirement Savings Contributions",
  topic: Topic.Retirement,
  summary:
    "The form for the saver's credit, a nonrefundable credit for lower-income people who contribute to IRAs or workplace retirement plans. " +
    "Filled in automatically from W-2 box 12 deferrals (codes D, E and G), the IRA deduction worksheet, and AGI and filing status from the AGI calculation. " +
    "The credit is 50%, 20% or 10% of up to $2,000 of contributions per person, depending on AGI, and goes to Schedule 3 line 4.",
  fields: {
    ira_contributions_taxpayer: "Line 1, column (a). Your traditional and Roth IRA contributions for the year.",
    ira_contributions_spouse: "Line 1, column (b). Your spouse's traditional and Roth IRA contributions for the year.",
    elective_deferrals: "Combined 401(k), 403(b) and governmental 457(b) deferrals from W-2 box 12 codes D, E and G. Treated as yours unless the per-person amounts are given.",
    elective_deferrals_taxpayer: "Line 2, column (a). Your own elective deferrals to workplace plans. Overrides the combined amount.",
    elective_deferrals_spouse: "Line 2, column (b). Your spouse's elective deferrals to workplace plans.",
    distributions_taxpayer: "Line 4, column (a). Retirement distributions you received during the testing period, which reduce your eligible contributions.",
    distributions_spouse: "Line 4, column (b). Retirement distributions your spouse received during the testing period.",
    agi: "Your adjusted gross income, which sets the credit rate.",
    filing_status: "Your filing status, which picks the AGI ranges for each credit rate.",
    income_tax_liability: "Your tax that the credit can offset. The credit is limited to this amount.",
  },
  options: {
    filing_status: {
      single: "Single (single AGI ranges)",
      mfs: "Married filing separately (single AGI ranges)",
      mfj: "Married filing jointly (joint AGI ranges)",
      hoh: "Head of household (head of household AGI ranges)",
      qss: "Qualifying surviving spouse (joint AGI ranges)",
    },
  },
};
