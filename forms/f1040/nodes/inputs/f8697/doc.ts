import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8697",
  subtitle: "Interest Computation Under the Look-Back Method for Completed Long-Term Contracts",
  topic: Topic.Business,
  summary:
    "The form a taxpayer with long-term contracts files after a contract is finished, to figure interest on tax that was underpaid or overpaid in earlier years because income was estimated. " +
    "It compares the tax actually paid with the tax that would have been due using the contract's actual results. " +
    "The engine takes the net interest you enter and adds it to Schedule 1 line 8z. Enter one per completed contract.",
  fields: {
    contract_type: "Whether you use the regular look-back method or the simplified marginal impact method.",
    prior_tax_years_affected: "The earlier tax years whose income changes when the look-back is applied.",
    "prior_tax_years_affected.tax_year": "The earlier tax year being recomputed.",
    "prior_tax_years_affected.hypothetical_tax": "The tax for that year recomputed using the contract's actual results.",
    "prior_tax_years_affected.actual_tax_paid": "The tax you actually reported for that year.",
    overpayment_of_tax_prior_year: "The net amount by which you overpaid tax in the earlier years.",
    underpayment_of_tax_prior_year: "The net amount by which you underpaid tax in the earlier years.",
    interest_rate: "The interest rate used for the look-back interest.",
    net_interest:
      "The net interest figured on the form: positive if you owe interest, negative if interest is owed to you. This is the only amount the engine uses; it goes to Schedule 1 line 8z.",
  },
  options: {
    contract_type: {
      regular: "Regular look-back method, recomputing the actual tax for each affected year",
      simplified: "Simplified marginal impact method, using assumed top tax rates",
    },
  },
};
