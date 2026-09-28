import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8896",
  subtitle: "Low Sulfur Diesel Fuel Production Credit",
  topic: Topic.BusinessCredits,
  summary:
    "A business credit for small business refiners that produced ultra-low sulfur diesel fuel to meet EPA rules. " +
    "The credit is 5 cents per gallon, limited to 25% of qualified capital costs minus credits claimed in earlier years. " +
    "It is effectively expired, since the qualifying costs had to be incurred by 2009, so it mostly appears in carryforwards. The engine sends any credit to Schedule 3 line 6z.",
  fields: {
    gallons_ulsd_produced: "Line 1. Gallons of low sulfur diesel fuel produced at the refinery this year. Credited at 5 cents per gallon.",
    qualified_capital_costs: "Line 2. Qualified costs the refinery incurred to comply with the EPA sulfur rules. The credit can't exceed 25% of this, less prior credits.",
    refinery_capacity_barrels_per_day:
      "The refinery's average daily domestic run in barrels. Above 205,000 means you aren't a small business refiner, and the engine rejects the entry.",
    prior_year_credits_claimed: "Line 3. Low sulfur diesel credits claimed for this refinery in earlier years.",
  },
};
