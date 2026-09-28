import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4970",
  subtitle: "Tax on Accumulation Distribution of Trusts",
  topic: Topic.PassThrough,
  summary:
    "The form a trust beneficiary uses to figure extra tax on an accumulation distribution: income a trust kept in earlier years and pays out now. " +
    "Under the throwback rules the income is taxed as if it had been paid out in the years it was earned. " +
    "The engine does not run the throwback calculation itself; it adds the tax you enter as figured on the form to Form 1040's additional taxes. Enter one per trust.",
  fields: {
    trust_name: "Name of the trust that made the accumulation distribution.",
    trust_ein: "The trust's employer identification number (EIN).",
    distribution_amount: "The total accumulation distribution you received from this trust this year.",
    throwback_years: "The earlier years in which the trust accumulated the income now being paid out.",
    "throwback_years.tax_year": "The year the trust earned and kept this income.",
    "throwback_years.accumulated_income": "The amount of income accumulated in that year that is part of this distribution.",
    "throwback_years.taxes_paid_by_trust": "Tax the trust already paid on that year's accumulated income.",
    tax_deemed_distributed:
      "The additional tax you figured on the form. This is the amount the engine adds to your return; if it is blank or zero, nothing is added.",
  },
};
