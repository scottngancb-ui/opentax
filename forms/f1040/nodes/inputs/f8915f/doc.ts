import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8915-F",
  subtitle: "Qualified Disaster Retirement Plan Distributions and Repayments",
  topic: Topic.Retirement,
  summary:
    "The ongoing form for retirement plan distributions taken because of a qualified disaster (including COVID-19 distributions). " +
    "The income can be spread evenly over three years unless you elect to include it all at once, the 10% early withdrawal penalty does not apply, " +
    "and repayments to the plan reduce the taxable amount. The engine reports this year's share less repayments on Schedule 1 line 8z; " +
    "repayments beyond that share appear there as a negative amount.",
  fields: {
    disaster_type: "The disaster the distribution relates to, such as COVID-19 or a named hurricane. For your records only.",
    distribution_year: "The year you took the distribution. For your records only; the engine does not use it to time the spreading.",
    total_distribution: "The total qualified disaster distribution (up to $100,000).",
    amount_reported_prior_year1: "The part of the distribution you included in income in the first year of the three-year spread.",
    amount_reported_prior_year2: "The part of the distribution you included in income in the second year of the spread.",
    repayments_this_year: "Amounts you repaid to an eligible retirement plan this year. They reduce this year's income; any excess becomes a negative amount on Schedule 1.",
    elect_full_inclusion: "Mark if you elect to include all of the remaining distribution in income this year instead of one-third.",
    is_roth_ira: "Mark if the distribution came from a Roth IRA. The engine then treats it as tax-free and reports no income.",
    repayments_prior_years: "Total repayments made in earlier years. They reduce the remaining balance so they are not counted twice.",
  },
};
