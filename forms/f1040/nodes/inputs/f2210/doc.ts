import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 2210",
  subtitle: "Underpayment of Estimated Tax by Individuals, Estates, and Trusts",
  topic: Topic.Payments,
  summary:
    "The form that figures the penalty for not paying enough tax during the year through withholding and quarterly estimated payments. " +
    "You generally owe no penalty if you owe less than $1,000 after withholding, or if you paid at least the smaller of 90% of this year's tax or 100% of last year's (110% if last year's AGI was over $150,000). " +
    "The engine uses the regular method at a 7% rate, or an amount you enter, and reports the penalty on Form 1040 line 38.",
  fields: {
    required_annual_payment:
      "The total you were required to pay during the year. If blank, the engine uses the smaller of 90% of this year's tax or 100% (or 110%) of last year's.",
    withholding: "Federal income tax withheld for the year. The engine treats it as paid in equal amounts each quarter.",
    q1_estimated_payment: "Your first-quarter estimated payment, due April 15, 2025.",
    q2_estimated_payment: "Your second-quarter estimated payment, due June 15, 2025.",
    q3_estimated_payment: "Your third-quarter estimated payment, due September 15, 2025.",
    q4_estimated_payment: "Your fourth-quarter estimated payment, due January 15, 2026.",
    current_year_tax: "Your total tax for 2025, used for the 90% test and to figure the penalty.",
    prior_year_tax: "Your total tax for 2024, used for the prior-year safe harbor.",
    prior_year_agi: "Your 2024 AGI. If over $150,000, the prior-year safe harbor rises to 110% of last year's tax.",
    underpayment_penalty: "A penalty amount you already figured. If entered, it goes directly to Form 1040 line 38 in place of the engine's calculation.",
    waiver_requested:
      "Mark if you are asking the IRS to waive the penalty, for example because of a casualty or disaster. The engine then reports no penalty.",
    annualized_method:
      "Mark if you use the annualized income installment method because your income came unevenly. The engine does not compute that method and reports no penalty.",
  },
};
