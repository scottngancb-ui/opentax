import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Foreign employer compensation",
  subtitle: "Wages from a foreign employer with no Form W-2",
  topic: Topic.Foreign,
  summary:
    "An entry for pay from a foreign employer that did not issue a US Form W-2. US citizens and residents are taxed on worldwide income, so you report it yourself, converted to US dollars. " +
    "Enter one entry per employer. The engine adds the dollar amounts to Form 1040 line 1h and AGI, and sends foreign income tax on the pay to Form 1116 as general-category tax. " +
    "Any Form 2555 exclusion is figured separately.",
  fields: {
    foreign_employer_name: "The name of the foreign employer.",
    country_code: "The employer's country, as a two-letter code.",
    compensation_amount: "Your pay in the foreign currency, before conversion. For your records.",
    currency: "The currency code, such as EUR or GBP.",
    compensation_usd: "Your pay converted to US dollars. This is the amount reported on Form 1040 line 1h.",
    description: "A short description of the job.",
    foreign_tax_paid_usd: "Foreign income tax paid or accrued on this pay, in US dollars. Claimed on Form 1116 in the general category.",
    foreign_service_compensation_usd: "The part of the pay earned for work physically done outside the US, in dollars. Needed for the foreign tax to reach Form 1116.",
    foreign_earned_income_exclusion_usd: "The part of the foreign-service pay you exclude on Form 2555. Foreign tax on excluded pay is removed proportionally from the credit.",
  },
};
