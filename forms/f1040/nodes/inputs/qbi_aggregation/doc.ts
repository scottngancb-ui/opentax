import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "QBI aggregation",
  subtitle: "Aggregation of businesses for the QBI deduction (Form 8995-A Schedule B)",
  topic: Topic.Business,
  summary:
    "Records an election to treat several of your qualified businesses as one for the qualified business income deduction. " +
    "Grouping lets the combined W-2 wages and property basis of the group count against the group's combined income when the wage and property limits apply. " +
    "The election is shown on Form 8995-A Schedule B. In this engine the entry is recorded only; it does not yet change the Form 8995-A calculation.",
  fields: {
    aggregation_groups: "The groups of businesses you are aggregating, one row per group.",
    "aggregation_groups.group_name": "A name you choose for the group.",
    "aggregation_groups.business_names": "The names of the businesses in the group. Each must qualify on its own and meet the aggregation rules in Reg. 1.199A-4.",
    "aggregation_groups.combined_for_limitation": "Mark if the group is combined for applying the W-2 wage and property (UBIA) limitation.",
  },
};
