import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 2555",
  subtitle: "Foreign Earned Income",
  topic: Topic.Foreign,
  summary:
    "The form U.S. citizens and residents working abroad use to exclude foreign earned income (up to $130,000 for 2025) and " +
    "certain housing costs. You qualify under the bona fide residence test or the physical presence test (330 full days abroad). " +
    "The engine treats it as a computed node, but no other screen currently feeds it, so it only runs when its values are " +
    "supplied directly. Exclusions go to Schedule 1 line 8d, and foreign self-employment income still goes to Schedule SE.",
  fields: {
    foreign_wages: "Wages and salary you earned for work done in a foreign country.",
    foreign_self_employment_income:
      "Self-employment income earned abroad. Can be excluded from income tax, but the engine still sends it to Schedule SE for self-employment tax.",
    days_in_foreign_country:
      "Full days you were present in a foreign country during the 12-month period. At least 330 meets the physical presence test.",
    bona_fide_resident: "Check if you were a bona fide resident of a foreign country for the whole tax year.",
    qualifying_days:
      "Days in 2025 that fall within your qualifying period. The exclusion limit is prorated by this number over 365; defaults to 365.",
    foreign_housing_expenses:
      "Housing expenses you paid abroad. The engine excludes only the part above the base amount ($20,800 for 2025).",
    employer_housing_exclusion: "Housing amount paid for by your employer that you are excluding.",
  },
};
