import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8582-CR",
  subtitle: "Passive Activity Credit Limitations",
  topic: Topic.PassThrough,
  summary:
    "The credit version of Form 8582: it limits credits from passive activities to the tax those activities' income causes, plus a special allowance for rental real estate you actively participate in. " +
    "No other form feeds it in the engine; you supply its values directly. " +
    "The allowed credit goes to Schedule 3 with other business credits, and any unused credit is carried forward.",
  fields: {
    total_passive_credits: "Part I. All passive activity credits for this year, from every passive activity.",
    regular_tax_all_income: "Your regular tax figured on all your income, including net passive income.",
    regular_tax_without_passive: "Your regular tax figured without net passive income. The difference from the full tax is the tax passive income causes, which caps the credit.",
    modified_agi: "Part II. Modified AGI for the rental real estate special allowance, which phases out between $100,000 and $150,000.",
    is_real_estate_professional: "Whether you qualify as a real estate professional. If so, the engine treats your rentals as nonpassive and allows all the credits.",
    has_active_rental_participation: "Whether you actively participated in a rental real estate activity. Required for the special allowance.",
    rental_real_estate_credits: "Part II. Credits that come from rental real estate you actively participated in.",
    filing_status: "Your filing status. The engine gives no special allowance to married filing separately returns.",
    prior_unallowed_credits: "Passive credits disallowed in earlier years and carried into this year.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately (no special rental allowance in the engine)",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
