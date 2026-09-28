import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 6765",
  subtitle: "Credit for Increasing Research Activities",
  topic: Topic.BusinessCredits,
  summary:
    "The form a business uses to claim the research (R&D) credit for qualified research expenses above a base amount. " +
    "You choose the regular method (20% of expenses over a base amount) or the alternative simplified credit (14% of expenses over half the prior three-year average). " +
    "The engine adds the credit to the general business credit on Schedule 3 line 6z, minus any part a qualified small business elects to apply against payroll tax.",
  fields: {
    method: "Which calculation to use: the regular credit (Section A) or the alternative simplified credit (Section B).",
    regular_wages: "Section A. Wages paid to employees for doing, supervising or directly supporting qualified research.",
    regular_supplies: "Section A. Supplies used up in qualified research.",
    regular_contract_research: "Section A. Amounts paid to outside contractors for qualified research. Only 65% counts.",
    energy_consortium_payments: "Section A. Amounts paid to a qualified energy research consortium. Counts in full.",
    regular_base_amount: "Section A. The base amount you figured from your fixed-base percentage and average gross receipts. The credit applies to expenses above it.",
    gross_receipts: "Section A. Average annual gross receipts used to figure the base amount. For reference; the engine uses the base amount you enter.",
    asc_current_qre: "Section B. Your total qualified research expenses for this year.",
    asc_prior_avg_qre: "Section B. The average of your qualified research expenses for the three prior years.",
    payroll_tax_election: "Mark if you are a qualified small business electing to apply part of the credit against payroll tax.",
    payroll_tax_credit_elected:
      "The amount of credit elected against payroll tax. It is removed from the income tax credit, limited to the credit figured and $500,000.",
  },
  options: {
    method: {
      regular: "Regular credit (Section A): 20% of qualified expenses over the base amount",
      asc: "Alternative simplified credit (Section B): 14% of expenses over 50% of the prior three-year average",
    },
  },
};
