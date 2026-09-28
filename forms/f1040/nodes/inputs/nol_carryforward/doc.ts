import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "NOL carryforward",
  subtitle: "Net operating loss deduction",
  topic: Topic.Deductions,
  summary:
    "Carries a net operating loss from an earlier year forward to reduce this year's income. " +
    "Losses from years before 2018 can offset up to 100% of taxable income; losses from 2018 on can offset only 80% of the income left after the older losses are used. " +
    "The allowed deduction is reported on Schedule 1 line 8a, reducing total income on Form 1040. Enter one row per loss year.",
  fields: {
    nol_carryforwards: "The unused net operating losses you are carrying into this year, one row per loss year.",
    "nol_carryforwards.year": "The tax year in which the loss arose.",
    "nol_carryforwards.nol_amount": "The amount of that year's loss still available, after what earlier years already used.",
    "nol_carryforwards.nol_type": "Whether the loss arose before 2018 or after 2017, which sets how much of your income it can offset.",
    current_year_taxable_income: "Your taxable income for this year figured before any NOL deduction. The deduction limits are applied to this amount; zero or less means no deduction.",
  },
  options: {
    "nol_carryforwards.nol_type": {
      PRE2018: "Loss from a tax year beginning before 2018. May offset up to 100% of taxable income.",
      POST2017: "Loss from a tax year beginning after 2017. Limited to 80% of taxable income remaining after pre-2018 losses.",
    },
  },
};
