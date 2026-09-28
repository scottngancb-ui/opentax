import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8854",
  subtitle: "Initial and Annual Expatriation Statement",
  topic: Topic.Foreign,
  summary:
    "The statement U.S. citizens who give up citizenship and long-term residents who end their residency file for the year they expatriate. " +
    "A covered expatriate (high average tax, net worth of $2,000,000 or more, or no certification of five years of tax compliance) is treated as selling everything at fair market value the day before leaving. " +
    "The engine nets the gains, subtracts the 2025 exclusion of $866,000 and sends the rest to Schedule 2 as the exit-tax amount.",
  fields: {
    expatriation_date: "The date you gave up U.S. citizenship or ended long-term residency.",
    expatriate_type: "Whether you were a U.S. citizen or a long-term resident (green card holder).",
    average_annual_tax_prior_5_years:
      "Your average annual net income tax for the five years before expatriation. Above $201,000 for 2025 makes you a covered expatriate.",
    net_worth_at_expatriation: "Your net worth on the expatriation date. $2,000,000 or more makes you a covered expatriate.",
    certified_tax_compliance:
      "Whether you certify you met all federal tax obligations for the five years before expatriation. If not, you are a covered expatriate.",
    assets: "Each asset you held on the day before expatriation, for the mark-to-market calculation.",
    "assets.fmv_at_expatriation": "The asset's fair market value on the day before your expatriation date.",
    "assets.basis": "Your adjusted basis in the asset. Gain or loss is value minus basis; losses offset gains.",
  },
  options: {
    expatriate_type: {
      CITIZEN: "A U.S. citizen who relinquished citizenship",
      LONG_TERM_RESIDENT: "A long-term resident who ended U.S. lawful permanent residency",
    },
  },
};
