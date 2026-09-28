import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8621",
  subtitle: "Information Return by a Shareholder of a Passive Foreign Investment Company or Qualified Electing Fund",
  topic: Topic.Foreign,
  summary:
    "The yearly form for U.S. shareholders of a passive foreign investment company (PFIC), such as many foreign mutual funds. " +
    "How the holding is taxed depends on the regime: QEF and mark-to-market income go to Schedule 1 line 8z. " +
    "For the default excess distribution regime the engine uses a simplified tax, the excess distribution times the top 37% rate, added to Schedule 2; the real interest charge is not computed. Enter one per PFIC.",
  fields: {
    company_name: "Legal name of the PFIC or qualified electing fund.",
    company_ein_or_ref: "The company's EIN, if any, or your own reference ID for it.",
    country_of_incorporation: "The country where the company is organized.",
    regime: "The tax treatment that applies to this holding. It decides which of the amounts below are used.",
    shares_owned: "Part I. The number of shares you owned at the end of the year.",
    fmv_at_year_end: "Part I. The fair market value of your shares at the end of the year.",
    total_distributions: "Total distributions you received from the company during the year. For reference.",
    excess_distribution_amount:
      "The part of this year's distributions above 125% of the average of the prior three years. The engine taxes it at 37% on Schedule 2.",
    qef_ordinary_income: "Part III. Your share of the fund's ordinary earnings under a QEF election. Added to Schedule 1 line 8z.",
    qef_capital_gain: "Part III. Your share of the fund's net capital gain under a QEF election. Added to Schedule 1 line 8z.",
    mtm_gain_loss: "Part IV. Your mark-to-market gain or loss for the year. Added to Schedule 1 line 8z.",
  },
  options: {
    regime: {
      EXCESS_DISTRIBUTION: "Default section 1291 treatment: excess distributions and gains are spread over your holding period and taxed at top rates with interest",
      MTM: "Mark-to-market election: yearly gain or loss based on the change in value",
      QEF: "Qualified electing fund election: you include your share of the fund's earnings each year",
    },
  },
};
