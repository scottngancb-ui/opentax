import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "IRA Deduction Worksheet",
  subtitle: "IRS worksheet",
  topic: Topic.Retirement,
  summary:
    "The Schedule 1 instructions worksheet that figures how much of your traditional IRA contribution you can deduct. " +
    "Contributions are capped at $7,000 ($8,000 at age 50 or older). If you or your spouse is covered by a workplace retirement plan, the deduction phases out as modified AGI rises. " +
    "The deductible amount goes to Schedule 1 line 20; any nondeductible part goes to Form 8606, and the contribution also counts toward the Saver's Credit (Form 8880).",
  fields: {
    filing_status: "Your filing status, which picks the phase-out range.",
    magi: "Modified AGI for the IRA deduction: AGI figured without the IRA deduction and certain other exclusions.",
    ira_contribution: "Traditional IRA contributions you made for 2025 (not Roth). Contributions above the annual limit are ignored.",
    active_participant:
      "Whether you were covered by an employer retirement plan during the year (W-2 box 13 \"Retirement plan\"). If so, your deduction phases out: $79,000–$89,000 of MAGI for single or head of household, $126,000–$146,000 for joint filers, and $0–$10,000 if married filing separately.",
    covered_by_retirement_plan:
      "Same meaning as active participant, as routed from W-2 box 13. The engine currently uses only the active participant field.",
    age_50_or_older: "Whether you were 50 or older at the end of 2025, which raises the contribution limit by the $1,000 catch-up.",
    spouse_active_participant:
      "For joint filers where you are not covered: whether your spouse was covered by a workplace plan. If so, your deduction phases out between $236,000 and $246,000 of MAGI.",
  },
  options: {
    filing_status: {
      single: "Single.",
      mfs: "Married filing separately. A covered participant's deduction phases out over the first $10,000 of MAGI.",
      mfj: "Married filing jointly.",
      hoh: "Head of household. Uses the single phase-out range.",
      qss: "Qualifying surviving spouse. Uses the single phase-out range in this engine.",
    },
  },
};
