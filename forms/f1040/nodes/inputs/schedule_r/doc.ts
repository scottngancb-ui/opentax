import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule R",
  subtitle: "Credit for the Elderly or the Disabled",
  topic: Topic.BusinessCredits,
  summary:
    "The schedule for claiming a nonrefundable credit if you were 65 or older at the end of the year, or under 65, retired on permanent and total disability, " +
    "and received taxable disability income. The credit is 15% of a base amount set by filing status, reduced by nontaxable Social Security, pensions and " +
    "VA benefits and by half of AGI above a threshold, so few people with moderate income qualify. The result goes to Schedule 3 line 6d.",
  fields: {
    filing_status: "Your filing status. It sets the base amount and the AGI threshold for the phase-out.",
    taxpayer_age_65_or_older: "Check if you were 65 or older at the end of the year.",
    spouse_age_65_or_older: "Check if your spouse was 65 or older at the end of the year. Used on joint returns.",
    taxpayer_disabled: "Check if you are under 65, retired on permanent and total disability, and received taxable disability income.",
    spouse_disabled: "Check if your spouse is under 65, retired on permanent and total disability, and received taxable disability income. Used on joint returns.",
    taxpayer_disability_income: "Your taxable disability income for the year. If you qualify only because of disability, the base amount can't be more than this.",
    spouse_disability_income: "Your spouse's taxable disability income for the year. If your spouse qualifies only because of disability, it limits the base amount the same way.",
    agi: "Your adjusted gross income (Form 1040 line 11). Half of the amount above the threshold for your filing status reduces the base amount.",
    nontaxable_ssa: "Line 13a. Nontaxable Social Security and Railroad Retirement benefits. They reduce the base amount dollar for dollar.",
    nontaxable_pension: "Line 13b. Nontaxable pensions, annuities or disability benefits excluded from income under other laws. They reduce the base amount.",
    nontaxable_va: "Line 13b. Nontaxable veterans' pensions and other VA benefits. They reduce the base amount.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately (generally only allowed if you lived apart from your spouse all year)",
      mfj: "Married filing jointly. The base amount is higher when both spouses qualify.",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
