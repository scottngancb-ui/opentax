import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Deduction and taxable income",
  subtitle: "Engine step (not an IRS form)",
  topic: Topic.Deductions,
  summary:
    "Chooses between the standard deduction and itemized deductions and figures taxable income on Form 1040 line 15. " +
    "Filled in automatically from your filing status and age or blindness, AGI, Schedule A, the QBI deduction, Schedule 1-A and any NOL deduction. " +
    "The 2025 standard deduction is $15,750 single or married filing separately, $31,500 joint or surviving spouse and $23,625 head of household, plus an extra amount for each person 65 or older or blind. " +
    "It uses whichever deduction is larger, reports the standard deduction on line 12, and sends taxable income to the tax computation.",
  fields: {
    filing_status: "Your filing status, which sets the basic standard deduction and the extra amount per age or blindness factor.",
    agi: "Form 1040 line 11. Adjusted gross income, the starting point for taxable income.",
    taxpayer_age_65_or_older:
      "Whether you were 65 or older at the end of 2025. Adds $2,000 (single or head of household) or $1,600 (married or surviving spouse) to the standard deduction.",
    taxpayer_blind: "Whether you were blind at the end of 2025. Adds the same extra amount as being 65 or older.",
    spouse_age_65_or_older: "Whether your spouse was 65 or older. Counts only for married and surviving spouse statuses.",
    spouse_blind: "Whether your spouse was blind. Counts only for married and surviving spouse statuses.",
    mfs_spouse_itemizing:
      "Married filing separately only: whether your spouse itemizes. If so, you must itemize too and cannot take the standard deduction.",
    itemized_deductions: "Total itemized deductions from Schedule A line 17. Used instead of the standard deduction when larger.",
    investment_interest_for_niit:
      "Investment interest expense from Schedule A. When you itemize, it is passed to Form 8960 as a deduction against net investment income.",
    niit_allocable_state_local_tax:
      "State and local tax allocable to investment income. When you itemize, it is passed to Form 8960.",
    qbi_deduction: "Form 1040 line 13a. The qualified business income deduction from Form 8995 or 8995-A. Subtracted to reach taxable income.",
    additional_deductions: "Form 1040 line 13b. Deductions from Schedule 1-A (tips, overtime, car loan interest, seniors). Subtracted to reach taxable income.",
    nol_deduction: "Net operating loss carryforward deduction. Subtracted after the other deductions; taxable income cannot go below zero.",
  },
  options: {
    filing_status: {
      single: "Single.",
      mfs: "Married filing separately.",
      mfj: "Married filing jointly.",
      hoh: "Head of household.",
      qss: "Qualifying surviving spouse. Same standard deduction as married filing jointly.",
    },
  },
};
