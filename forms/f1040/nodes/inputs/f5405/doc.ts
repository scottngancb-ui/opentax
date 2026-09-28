import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 5405",
  subtitle: "Repayment of the First-Time Homebuyer Credit",
  topic: Topic.TaxComputation,
  summary:
    "The form for paying back the 2008 first-time homebuyer credit, which worked as an interest-free loan repaid in $500 yearly installments. " +
    "If you still owe part of it, the engine adds the $500 installment (or the smaller remaining balance) to Schedule 2 line 10. " +
    "If you sold the home, stopped using it as your main home, or it was destroyed, the whole remaining balance is due. Only credits claimed for 2008 are accepted.",
  fields: {
    credit_year: "The year you claimed the credit. Must be 2008; later versions of the credit did not have to be repaid this way.",
    original_credit_amount: "The full credit you received for the home.",
    repayments_already_made: "The total you have repaid in all earlier years. The engine subtracts this to find what is left.",
    sold_or_disposed:
      "Mark if you sold or otherwise disposed of the home, or it stopped being your main home, this year. The entire remaining balance becomes due.",
    disposal_year: "The year the home was sold or disposed of. For your records; it does not change the calculation.",
    home_destroyed:
      "Mark if the home was destroyed, condemned or involuntarily converted. The engine then treats the whole remaining balance as due.",
  },
};
