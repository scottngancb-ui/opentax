import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8866",
  subtitle: "Interest Computation Under the Look-Back Method for Property Depreciated Under the Income Forecast Method",
  topic: Topic.Business,
  summary:
    "The form for owners of property depreciated under the income forecast method, such as films or recordings. " +
    "In the 3rd and 10th years after the property is placed in service, depreciation is refigured using actual income instead of the forecast, and interest is charged or paid on the difference. " +
    "The engine takes the net interest you enter and reports it on Schedule 1 line 8z: a positive amount as other income, a negative amount as a reduction.",
  fields: {
    property_description: "A description of the property, such as a film title.",
    date_placed_in_service: "The date the property was placed in service.",
    lookback_year: "Which look-back recomputation this form is for.",
    total_income_forecast: "The total income you originally forecast for the property, used for the original depreciation.",
    actual_income: "The income the property actually earned through the recomputation year.",
    recomputed_depreciation: "Depreciation for the prior years refigured using actual income.",
    prior_year_depreciation_claimed: "Depreciation you actually claimed for those years.",
    interest_owed_or_due:
      "The net look-back interest. Positive means you owe interest; negative means interest is owed to you. This is the only amount the engine uses.",
  },
  options: {
    lookback_year: {
      "3rd": "The recomputation for the 3rd tax year after the property was placed in service",
      "10th": "The recomputation for the 10th tax year after the property was placed in service",
    },
  },
};
