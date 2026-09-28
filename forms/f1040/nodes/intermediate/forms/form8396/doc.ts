import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8396",
  subtitle: "Mortgage Interest Credit",
  topic: Topic.BusinessCredits,
  summary:
    "The form for claiming a nonrefundable credit if a state or local government gave you a Mortgage Credit Certificate (MCC) for your home loan. " +
    "The credit is the mortgage interest you paid times the certificate's rate, capped at $2,000 when the rate is above 20%, plus any unused credit carried forward. " +
    "No other form feeds it in the engine; you supply its values directly. The credit goes to Schedule 3 line 6f.",
  fields: {
    mortgage_interest_paid: "Line 1. Mortgage interest you paid this year on the loan covered by the certificate, usually from Form 1098 box 1.",
    mcc_rate: "Line 2. The credit rate on your Mortgage Credit Certificate, as a decimal (0.20 means 20%).",
    prior_year_credit_carryforward: "Line 4. Unused mortgage interest credit carried forward from the previous three years. It is added to this year's credit.",
  },
};
