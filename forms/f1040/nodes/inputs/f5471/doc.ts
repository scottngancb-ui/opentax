import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 5471",
  subtitle: "Information Return of U.S. Persons With Respect to Certain Foreign Corporations",
  topic: Topic.Foreign,
  summary:
    "An information return U.S. officers, directors and shareholders of certain foreign corporations must file, with one of five filer categories deciding which schedules apply. " +
    "For a shareholder of a controlled foreign corporation it also reports income you must include even without a distribution. " +
    "The engine adds Subpart F income and the GILTI inclusion to Schedule 1 line 8z; foreign taxes and earnings-and-profits figures are recorded only. Enter one per corporation.",
  fields: {
    foreign_corp_name: "Legal name of the foreign corporation.",
    foreign_corp_ein_or_reference_id: "The corporation's U.S. EIN, if it has one, or the reference ID you use for it.",
    country_of_incorporation: "The country under whose laws the corporation was organized.",
    functional_currency: "The currency the corporation keeps its books in, such as EUR or GBP.",
    filing_category: "Your filer category (1 to 5), which sets which schedules of the form you must complete.",
    subpart_f_income:
      "Schedule I line 1. Your share of the corporation's Subpart F income, mostly passive and related-party income. Added to Schedule 1 line 8z.",
    previously_excluded_subpart_f_income:
      "Schedule I line 5. Previously excluded Subpart F income withdrawn from investment this year. Added to Schedule 1 line 8z.",
    factoring_income:
      "Schedule I line 6. Amounts included under section 951(a)(1)(B), such as the corporation's investment of earnings in U.S. property. Added to Schedule 1 line 8z.",
    gilti_inclusion:
      "Schedule I-1. Your global intangible low-taxed income (GILTI) inclusion from this corporation. Added to Schedule 1 line 8z.",
    foreign_taxes_paid_subpart_f:
      "Schedule E. Foreign income taxes the corporation paid on Subpart F income. Recorded only; the engine does not pass it to the foreign tax credit.",
    foreign_taxes_paid_gilti:
      "Schedule E. Foreign income taxes attributable to GILTI. Recorded only; the engine does not pass it to the foreign tax credit.",
    current_ep: "Schedule H. The corporation's current-year earnings and profits. For reference only.",
    accumulated_ep_beginning: "Schedule J. Accumulated earnings and profits at the start of the year. For reference only.",
    accumulated_ep_ending: "Schedule J. Accumulated earnings and profits at the end of the year. For reference only.",
  },
  options: {
    filing_category: {
      "1": "Category 1: officer or director of a foreign corporation in which a U.S. person acquired a 10% or larger stake",
      "2": "Category 2: U.S. officer or director when a U.S. person acquired 10% or more of the stock during the year",
      "3": "Category 3: you acquired 10% or more (or an additional 10%) of the stock, or disposed of enough to fall below 10%",
      "4": "Category 4: you controlled the corporation (more than 50% of vote or value) during the year",
      "5": "Category 5: you are a U.S. shareholder of a controlled foreign corporation (CFC); Subpart F and GILTI apply",
    },
  },
};
