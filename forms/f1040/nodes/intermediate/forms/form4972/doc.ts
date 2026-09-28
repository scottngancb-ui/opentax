import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4972",
  subtitle: "Tax on Lump-Sum Distributions",
  topic: Topic.Retirement,
  summary:
    "The form that figures a special tax on a qualifying lump-sum distribution from a retirement plan. It is available only if " +
    "the plan participant was born before January 2, 1936. It is filled in automatically from Form 1099-R. You can elect 20% " +
    "capital gain treatment for the pre-1974 part, 10-year averaging for the rest, or both. The resulting tax goes to Schedule 2.",
  fields: {
    lump_sum_amount: "Total lump-sum distribution, from 1099-R box 1.",
    capital_gain_amount: "Capital gain part of the distribution (for pre-1974 participation), from 1099-R box 3.",
    born_before_1936:
      "Check if the plan participant was born before January 2, 1936. Without it, the form does not apply.",
    elect_capital_gain: "Part II. Elect to tax the capital gain part at a flat 20%.",
    elect_10yr_averaging:
      "Part III. Elect 10-year averaging for the ordinary income part, using the 1986 tax rates and the minimum distribution allowance.",
    death_benefit_exclusion:
      "Part III. Death benefit exclusion for a beneficiary (up to $5,000). Reduces the amount subject to 10-year averaging.",
  },
};
