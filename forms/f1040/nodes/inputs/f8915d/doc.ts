import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8915-D",
  subtitle: "Qualified 2019 Disaster Retirement Plan Distributions and Repayments",
  topic: Topic.Retirement,
  summary:
    "The form for retirement plan distributions taken because of a qualified 2019 disaster, which could be spread over 2019, 2020 and 2021 " +
    "without the 10% early withdrawal penalty. By 2025 that spreading is over, so the form mainly matters if part of the distribution was " +
    "never reported or you repaid money to the plan. The engine reports any unreported remainder less repayments on Schedule 1 line 8z, " +
    "and repayments beyond that as a negative amount there.",
  fields: {
    total_2019_distribution: "The total qualified 2019 disaster distribution you took (up to $100,000).",
    amount_previously_reported_2019: "The part of the distribution you included in income on your 2019 return.",
    amount_previously_reported_2020: "The part of the distribution you included in income on your 2020 return.",
    amount_previously_reported_2021: "The part of the distribution you included in income on your 2021 return.",
    repayments_in_2025: "Amounts you repaid to an eligible retirement plan in 2025. They offset any remaining income; any excess reduces income on Schedule 1.",
    is_roth_ira: "Mark if the distribution came from a Roth IRA. The engine then treats it as tax-free and reports no remaining income.",
  },
};
