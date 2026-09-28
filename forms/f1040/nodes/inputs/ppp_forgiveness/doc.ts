import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "PPP loan forgiveness",
  subtitle: "Paycheck Protection Program forgiveness (record only)",
  topic: Topic.OtherIncome,
  summary:
    "Records a Paycheck Protection Program loan that the lender forgave. " +
    "Federal law excludes the forgiven amount from gross income, and expenses paid with the loan stay deductible, so it does not change any Form 1040 line. " +
    "The engine stores the amount for your records and for states that treat forgiveness differently; it sends nothing to the federal return.",
  fields: {
    forgiven_amount: "The loan principal the lender forgave. Excluded from federal income.",
    loan_number: "The SBA loan number, for reference only.",
    forgiveness_year: "The tax year the forgiveness was granted or treated as received. Kept for tracking the timing elections allowed by Rev. Proc. 2021-48.",
  },
};
