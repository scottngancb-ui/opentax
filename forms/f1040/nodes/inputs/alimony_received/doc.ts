import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Alimony received",
  subtitle: "Alimony or separate maintenance received (Schedule 1, line 2a)",
  topic: Topic.OtherIncome,
  summary:
    "Alimony or separate maintenance payments you received from a former or separated spouse. " +
    "Alimony is taxable to the recipient only under a divorce or separation agreement executed before January 1, 2019; " +
    "payments under later agreements are not income. The engine totals the taxable amounts and reports them on " +
    "Schedule 1 line 2a, which flows into adjusted gross income. Enter one entry per payer or agreement.",
  fields: {
    amount: "The total alimony you received from this payer during the year.",
    divorce_agreement_date:
      "The date the divorce or separation agreement was executed. Amounts under an agreement dated January 1, 2019 or later " +
      "are treated as not taxable; if you leave this blank, the engine assumes a pre-2019 agreement and counts the amount.",
    payer_ssn: "The payer's Social Security number. It is reported with the alimony on Schedule 1 line 2a.",
  },
};
