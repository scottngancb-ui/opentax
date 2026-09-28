import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 2441",
  subtitle: "Child and Dependent Care Expenses",
  topic: Topic.Family,
  summary:
    "The form you complete to claim the credit for paying someone to care for a child under 13 or a disabled dependent or spouse so you (and your spouse) could work or look for work. " +
    "This input node takes your care expenses and earned income; employer dependent care benefits from W-2 box 10 are handled by the separate computed Form 2441 node. " +
    "The credit, 20% to 35% of up to $3,000 of expenses ($6,000 for two or more people), goes to Schedule 3 line 2, and benefits over the exclusion limit become taxable wages on Form 1040 line 1e.",
  fields: {
    qualifying_person_count: "How many qualifying people you paid care for. One person caps expenses at $3,000; two or more at $6,000.",
    qualifying_expenses_paid: "Line 2. The care expenses you paid during the year for your qualifying people.",
    employer_dep_care_benefits:
      "Part III. Dependent care benefits your employer provided. Up to $5,000 ($2,500 if married filing separately) is tax-free, but it reduces the expenses that count for the credit.",
    agi: "Your adjusted gross income, which sets the credit rate. If blank, the engine uses the AGI it calculated.",
    filing_status: "Your filing status. It sets the benefit exclusion limit and, for joint filers, uses the lower-earning spouse's income as the cap.",
    earned_income_taxpayer: "Your earned income (wages and self-employment earnings). Credit-eligible expenses cannot exceed it.",
    earned_income_spouse: "Your spouse's earned income. On a joint return, expenses cannot exceed the lower of the two earned incomes.",
    taxpayer_is_full_time_student:
      "Mark if you were a full-time student for at least five months. If you had no earnings, you are treated as earning $250 a month ($500 with two or more qualifying people).",
    spouse_is_full_time_student:
      "Mark if your spouse was a full-time student for at least five months. If your spouse had no earnings, they are treated as earning $250 a month ($500 with two or more qualifying people).",
    taxpayer_is_disabled:
      "Mark if you were physically or mentally unable to care for yourself. The same deemed earned income rule as for students applies.",
    spouse_is_disabled:
      "Mark if your spouse was physically or mentally unable to care for themselves. The same deemed earned income rule as for students applies.",
  },
  options: {
    filing_status: {
      single: "Single.",
      mfs: "Married filing separately. Normally cannot claim the credit unless living apart; the benefit exclusion is $2,500.",
      mfj: "Married filing jointly.",
      hoh: "Head of household.",
      qss: "Qualifying surviving spouse.",
    },
  },
};
