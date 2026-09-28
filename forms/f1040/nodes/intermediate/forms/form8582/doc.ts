import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8582",
  subtitle: "Passive Activity Loss Limitations",
  topic: Topic.PassThrough,
  summary:
    "The form that limits losses from passive activities, such as rentals and businesses you don't materially participate in, to your passive income. " +
    "Filled in automatically from Schedule E, passive Schedule C and F activities, filing status from your general information, and modified AGI from the AGI calculation. " +
    "Up to $25,000 of rental real estate loss can be allowed if you actively participated, phased out between $100,000 and $150,000 of modified AGI. " +
    "The allowed loss reaches Schedule 1; the rest is suspended and carried forward.",
  fields: {
    passive_schedule_c: "Net profit or loss from a Schedule C business you don't materially participate in. Kept for reference; the limit uses the income and loss totals.",
    passive_schedule_f: "Net profit or loss from a Schedule F farm you don't materially participate in. Kept for reference; the limit uses the income and loss totals.",
    current_income: "Part I. This year's net income from all passive activities that made money.",
    current_loss: "Part I. This year's net loss from all passive activities that lost money, as a positive number.",
    rental_current_loss: "The part of this year's passive loss that comes from rental real estate. Only this part can use the $25,000 special allowance.",
    prior_unallowed: "Part I. Passive losses disallowed in earlier years and carried into this year.",
    has_active_rental: "Whether you have a rental real estate activity in which you actively participated.",
    has_other_passive: "Whether you have other passive activities besides actively managed rental real estate.",
    modified_agi: "Part II. Modified AGI, which sets how much of the $25,000 rental allowance you get. Passive losses and certain deductions are left out of it.",
    active_participation: "Whether you actively participated in the rental, for example by approving tenants or setting rents. Required for the special allowance.",
    filing_status: "Your filing status. The engine gives no special allowance to married filing separately returns.",
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
