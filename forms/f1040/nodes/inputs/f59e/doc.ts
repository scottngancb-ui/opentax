import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Section 59(e) expenditures",
  subtitle: "Engine input (not an IRS form)",
  topic: Topic.TaxComputation,
  summary:
    "A worksheet-style input, not an IRS form, for expenditures you elected under section 59(e) to write off over several years instead of deducting at once, such as research, mining development, circulation or intangible drilling costs. " +
    "It matters for the alternative minimum tax. The engine adds the remaining unamortized balances to Form 6251 as an other adjustment. Enter one per election.",
  fields: {
    expenditure_type: "The kind of expenditure covered by the election.",
    amortization_period_start: "The date the amortization period for this election began.",
    original_amount: "The total amount of expenditures you elected to amortize.",
    remaining_unamortized:
      "The balance not yet written off, carried over from prior years. The engine adds this to Form 6251's other adjustments.",
  },
  options: {
    expenditure_type: {
      research_experimental: "Research and experimental expenditures (section 174)",
      mining: "Mine exploration expenditures",
      development: "Mine or other natural deposit development expenditures (section 616)",
      circulation: "Circulation expenditures for newspapers and magazines (section 173)",
      intangible_drilling: "Intangible drilling and development costs for oil, gas or geothermal wells",
    },
  },
};
