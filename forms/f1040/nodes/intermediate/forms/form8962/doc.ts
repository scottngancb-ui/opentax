import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8962",
  subtitle: "Premium Tax Credit (PTC)",
  topic: Topic.Health,
  summary:
    "The form that figures the premium tax credit for health insurance bought through the Marketplace and reconciles it with advance payments made to your insurer. " +
    "Filled in automatically from Form 1095-A, household income from the AGI calculation, and QSEHRA amounts from W-2 box 12 code FF. " +
    "Extra credit you're owed goes to Schedule 3 line 9; advance payments above your credit are repaid on Schedule 2 line 2, capped for incomes under 400% of the poverty line.",
  fields: {
    household_size: "The number of people in your tax family, used to find the federal poverty line.",
    household_income: "Household income: modified AGI for you and dependents who must file. Compared with the poverty line to set your required contribution.",
    annual_premium: "Form 1095-A, column A total. Premiums for the plans you enrolled in, used when monthly amounts aren't given.",
    annual_slcsp: "Form 1095-A, column B total. Premium of the second lowest cost silver plan (the benchmark), used when monthly amounts aren't given.",
    annual_aptc: "Form 1095-A, column C total. Advance premium tax credit paid to your insurer during the year.",
    monthly_premiums: "Form 1095-A, column A. Twelve monthly enrollment premiums, January through December.",
    monthly_slcsps: "Form 1095-A, column B. Twelve monthly benchmark silver plan premiums.",
    monthly_aptcs: "Form 1095-A, column C. Twelve monthly advance credit payments.",
    qsehra_amount_offered: "The yearly amount of a qualified small employer HRA offered to you (W-2 box 12 code FF). It reduces the credit.",
    filing_status: "Your filing status. Single and married filing separately have lower repayment caps than other statuses.",
  },
  options: {
    filing_status: {
      single: "Single (lower repayment cap)",
      mfs: "Married filing separately (lower repayment cap)",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
