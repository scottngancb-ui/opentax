import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8873",
  subtitle: "Extraterritorial Income Exclusion",
  topic: Topic.Foreign,
  summary:
    "The form for excluding qualifying foreign trade income under the extraterritorial income rules. " +
    "The exclusion was repealed in 2004 and survives only under narrow transition rules for certain old binding contracts, so few returns use it. " +
    "The engine takes the exclusion you enter and reports it as a negative amount on Schedule 1 line 8z, which lowers your income.",
  fields: {
    qualifying_foreign_trade_income: "Qualifying foreign trade income, the base the exclusion was figured from. Informational in the engine.",
    extraterritorial_income_excluded:
      "The extraterritorial income you exclude from gross income. Subtracted from income on Schedule 1 line 8z.",
  },
};
