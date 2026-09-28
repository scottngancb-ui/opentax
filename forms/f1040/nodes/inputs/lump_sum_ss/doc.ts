import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Lump-sum Social Security",
  subtitle: "IRS worksheet (lump-sum election, Pub. 915)",
  topic: Topic.Retirement,
  summary:
    "Handles a Social Security or railroad tier 1 payment received this year that covers earlier years. " +
    "Publication 915 lets you figure the taxable part of the back payment as if it had been received in those earlier years, which can lower your tax. " +
    "The engine does not run that comparison itself: if you mark the election as beneficial, it leaves the lump sum out of this year's benefits; " +
    "otherwise all benefits count now. The result goes to Form 1040 line 6a.",
  fields: {
    total_ss_benefits_this_year: "Total net benefits for the year (box 5 of your SSA-1099 or RRB-1099), including the lump-sum payment.",
    lump_sum_amount: "The part of this year's benefits that was paid for earlier years. Cannot be more than the total.",
    prior_year_benefits: "Optional breakdown of the lump sum by the earlier year it belongs to. Recorded for the election worksheets; the engine does not use it in the calculation.",
    "prior_year_benefits.year": "The earlier tax year this part of the lump sum relates to.",
    "prior_year_benefits.amount": "The part of the lump sum attributable to that year.",
    is_lump_sum_election_beneficial: "Mark if you are making the lump-sum election because it lowers your tax. When set, the lump sum is removed from this year's line 6a amount. Defaults to no.",
  },
};
