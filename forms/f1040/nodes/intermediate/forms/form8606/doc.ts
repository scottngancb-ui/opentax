import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8606",
  subtitle: "Nondeductible IRAs",
  topic: Topic.Retirement,
  summary:
    "The form that tracks after-tax (nondeductible) money in your IRAs so it isn't taxed twice. " +
    "Filled in automatically from Form 1099-R distributions and conversions and from the IRA deduction worksheet's nondeductible contributions. " +
    "It splits traditional IRA distributions and Roth conversions into taxable and nontaxable parts, figures the taxable part of Roth IRA distributions, " +
    "and sends the taxable total to Form 1040 line 4b. Leftover basis carries forward to next year.",
  fields: {
    nondeductible_contributions: "Line 1. Traditional IRA contributions for this year that you are not deducting.",
    prior_basis: "Line 2. Your total basis in traditional IRAs from last year's Form 8606 line 14.",
    year_end_ira_value: "Line 6. The value of all your traditional, SEP and SIMPLE IRAs on December 31. Used to find the nontaxable share of distributions.",
    traditional_distributions: "Line 7. Traditional IRA distributions this year, not counting rollovers or Roth conversions.",
    roth_conversion: "Line 8. The amount you converted from traditional IRAs to a Roth IRA. The taxable part is figured in Part II.",
    roth_distribution: "Line 19. Nonqualified distributions you took from Roth IRAs this year.",
    roth_basis_contributions: "Line 22. Your total regular Roth IRA contributions over the years, which come out tax-free first.",
    roth_basis_conversions: "Line 24. Your total basis from past Roth conversions and rollovers from employer plans.",
  },
};
