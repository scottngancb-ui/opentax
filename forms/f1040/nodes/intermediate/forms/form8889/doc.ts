import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8889",
  subtitle: "Health Savings Accounts (HSAs)",
  topic: Topic.Health,
  summary:
    "The form you file if you or your employer put money into a health savings account, or you took money out. " +
    "Employer contributions arrive automatically from W-2 box 12 code W; you enter your own contributions, coverage and distributions. " +
    "It figures your HSA deduction (Schedule 1 line 13), taxable distributions not used for medical care (Schedule 1 line 8z), " +
    "the extra 20% tax on them (Schedule 2), and excess contributions (Form 5329).",
  fields: {
    coverage_type: "Line 1. Whether your high-deductible health plan covered only you or your family. It sets the contribution limit; self-only is assumed if blank.",
    taxpayer_hsa_contributions: "Line 2. HSA contributions you made yourself, outside payroll. Only these can be deducted.",
    employer_hsa_contributions: "Line 9. Employer contributions, including pre-tax payroll contributions, from W-2 box 12 code W. They use up part of your limit.",
    age_55_or_older: "Whether you were 55 or older at year end. Adds a $1,000 catch-up to your limit.",
    months_of_hdhp_coverage: "Number of months (1 to 12) you were covered by a high-deductible plan. The limit is prorated; a full year is assumed if blank.",
    archer_msa_distributions: "Line 4. Employer and your own Archer MSA contributions for the year, which reduce the HSA limit. The engine subtracts this amount from your limit.",
    hsa_distributions: "Line 14a. Total distributions from your HSAs, from Form 1099-SA box 1.",
    qualified_medical_expenses: "Line 15. Unreimbursed qualified medical expenses you paid with HSA distributions. The rest of the distribution is taxable.",
    distribution_exception: "Check if an exception to the extra 20% tax applies, such as disability, death or reaching Medicare age.",
  },
  options: {
    coverage_type: {
      self_only: "Self-only coverage ($4,300 limit for 2025)",
      family: "Family coverage ($8,550 limit for 2025)",
    },
  },
};
