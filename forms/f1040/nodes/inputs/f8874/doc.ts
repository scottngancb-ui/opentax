import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8874",
  subtitle: "New Markets Credit",
  topic: Topic.BusinessCredits,
  summary:
    "A business credit for investors who make qualified equity investments in community development entities that fund businesses in low-income communities. " +
    "The credit runs for seven years: 5% of the investment in each of the first three years and 6% in each of the next four. " +
    "The engine adds this year's credit and any carryforward and sends the total to Schedule 3 line 6z. Enter either figured credits or investment amounts for each period, not both.",
  fields: {
    credit_years_1_to_3: "Credit you already figured for investments in years 1 to 3 of their credit period (5% of the investment).",
    credit_years_4_to_7: "Credit you already figured for investments in years 4 to 7 of their credit period (6% of the investment).",
    investment_amount_early: "Qualified equity investments that are in years 1 to 3 of their credit period. The engine applies 5%.",
    investment_amount_later: "Qualified equity investments that are in years 4 to 7 of their credit period. The engine applies 6%.",
    prior_year_carryforward: "Unused new markets credit carried forward from earlier years. Added to this year's credit.",
  },
};
