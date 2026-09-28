import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 6781",
  subtitle: "Gains and Losses From Section 1256 Contracts and Straddles",
  topic: Topic.Investments,
  summary:
    "The form for section 1256 contracts, such as regulated futures, foreign currency contracts and nonequity options. These " +
    "are marked to market at year end, and the net gain or loss is split 60% long-term and 40% short-term no matter how long " +
    "you held them. Both parts go to Schedule D. No other screen feeds this node yet, so it only runs when its values are " +
    "supplied directly.",
  fields: {
    net_section_1256_gain:
      "Net gain or loss from all section 1256 contracts for the year, as marked to market (usually from 1099-B). Can be negative.",
    prior_year_loss_carryover:
      "A net section 1256 loss from another year applied to this year. Enter as a positive number; it reduces the net before the 60/40 split.",
  },
};
