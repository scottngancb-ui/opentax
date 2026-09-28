import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8853",
  subtitle: "Archer MSAs and Long-Term Care Insurance Contracts",
  topic: Topic.Health,
  summary:
    "The form for Archer medical savings accounts, Medicare Advantage MSAs and long-term care insurance payments. " +
    "Employer Archer MSA contributions are filled in automatically from W-2 box 12 code R; you supply the rest. " +
    "It figures the Archer MSA deduction (Schedule 1 line 23), taxable MSA distributions and taxable per diem long-term care payments (Schedule 1 line 8e), " +
    "and the extra 20% or 50% tax on nonqualified MSA distributions (Schedule 2).",
  fields: {
    employer_archer_msa: "Line 1. Employer contributions to your Archer MSA, from W-2 box 12 code R. If there are any, you can't deduct your own contributions.",
    taxpayer_archer_msa_contributions: "Line 2. Contributions you made to your Archer MSA for the year.",
    line3_limitation_amount: "Line 3. Your contribution limit, a percentage of your high-deductible plan's deductible prorated for the months you were eligible.",
    compensation: "Line 4. Your pay from the employer that maintains the high-deductible health plan (or self-employment earnings). The deduction can't exceed it.",
    archer_msa_distributions: "Line 6a. Total distributions from all your Archer MSAs, from Form 1099-SA.",
    archer_msa_rollover: "Line 6b. Distributions you rolled over and excess contributions you withdrew. They aren't taxed.",
    archer_msa_qualified_expenses: "Line 7. Unreimbursed qualified medical expenses paid with Archer MSA money.",
    archer_msa_exception: "Line 9a. Check if the taxable distribution is exempt from the extra 20% tax, for example because of death, disability or reaching age 65.",
    medicare_advantage_distributions: "Line 10. Total distributions from Medicare Advantage MSAs, from Form 1099-SA.",
    medicare_advantage_qualified_expenses: "Line 11. Qualified medical expenses paid with Medicare Advantage MSA money.",
    medicare_advantage_exception: "Line 13a. Check if the taxable distribution is exempt from the extra 50% tax because of death or disability.",
    ltc_gross_payments: "Line 17. Gross long-term care payments received on a per diem or other periodic basis, from Form 1099-LTC.",
    ltc_qualified_contract_amount: "Line 18. The part of line 17 paid under qualified long-term care insurance contracts.",
    ltc_accelerated_death_benefits: "Line 19. Accelerated death benefits received on a per diem basis while chronically ill.",
    ltc_period_days: "Number of days in the long-term care period. The engine multiplies it by the $420 daily limit for 2025.",
    ltc_actual_costs: "Line 22. Costs you incurred for qualified long-term care services during the period.",
    ltc_reimbursements: "Line 24. Reimbursements you received for those long-term care services.",
  },
};
