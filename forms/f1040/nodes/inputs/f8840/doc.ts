import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8840",
  subtitle: "Closer Connection Exception Statement for Aliens",
  topic: Topic.Foreign,
  summary:
    "The statement a foreign person files to be treated as a nonresident alien even though they meet the substantial presence test, by showing a closer connection to a foreign country. " +
    "You must have kept a tax home in that country for the whole year and must not have applied for a green card. " +
    "It changes your residency status rather than any amount; the engine records it and rejects it if a green card application is marked.",
  fields: {
    country_of_tax_home: "The foreign country where you kept your tax home during the year.",
    days_in_us_current_year: "Days you were present in the United States this year.",
    days_in_us_prior_year_1: "Days you were present in the United States last year.",
    days_in_us_prior_year_2: "Days you were present in the United States the year before last.",
    has_applied_for_green_card:
      "Whether you have applied for lawful permanent resident status (a green card). If yes, you can't claim the exception.",
    maintained_tax_home_entire_year: "Whether you kept your tax home in the foreign country for the entire year, as the exception requires.",
  },
};
