import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule J",
  subtitle: "Income Averaging for Farmers and Fishermen",
  topic: Topic.TaxComputation,
  summary:
    "An optional schedule that lets farmers and fishermen figure tax on some of this year's farm or fishing income as if it had been earned " +
    "evenly over the three prior base years (2022, 2023 and 2024), which can lower the tax when those years were taxed at lower rates. " +
    "The engine does not run the Schedule J worksheets itself: you enter the tax you figured on line 23, and it replaces the regular tax on Form 1040 line 16 " +
    "whenever elected farm income is more than zero.",
  fields: {
    elected_farm_income: "Line 2a. The part of this year's taxable income from farming or fishing that you elect to average over the base years. If zero, Schedule J is not used.",
    elected_farm_income_capital_gain: "Line 2b. The part of your elected farm income that is net capital gain from farming or fishing. Recorded; the engine does not compute with it.",
    prior_year_taxable_income_py1: "Line 5. Your taxable income for 2022, the first base year, as figured for Schedule J. Recorded; the engine does not compute with it.",
    prior_year_taxable_income_py2: "Line 9. Your taxable income for 2023, the second base year. Recorded; the engine does not compute with it.",
    prior_year_taxable_income_py3: "Line 13. Your taxable income for 2024, the third base year. Recorded; the engine does not compute with it.",
    schedule_j_tax: "Line 23. Your tax figured with income averaging. The engine puts this amount on Form 1040 line 16 in place of the regular tax.",
  },
};
