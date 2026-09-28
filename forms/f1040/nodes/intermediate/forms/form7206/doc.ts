import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 7206",
  subtitle: "Self-Employed Health Insurance Deduction",
  topic: Topic.Deductions,
  summary:
    "The worksheet form that figures the deduction for health insurance and qualified long-term care premiums paid by self-employed people. " +
    "The engine does not fill it from other forms; you supply its values directly (the simpler self-employed health insurance entry skips it). " +
    "The deduction is reduced by any premium tax credit, capped at your self-employment profit, and goes to Schedule 1 line 17. It also lowers qualified business income on Form 8995.",
  fields: {
    se_net_profit: "Your net profit from self-employment. The deduction can't be more than this.",
    health_insurance_premiums: "Medical, dental and vision premiums you paid for yourself, your spouse and dependents. Don't include months you could join a subsidized employer plan.",
    ltc_premiums: "Premiums you paid for a qualified long-term care insurance policy for yourself. Only an age-based amount counts.",
    taxpayer_age: "Your age at the end of the year. It sets the limit on long-term care premiums that count.",
    ltc_premiums_spouse: "Premiums you paid for a qualified long-term care policy for your spouse, limited by your spouse's age.",
    spouse_age: "Your spouse's age at the end of the year, used for the spouse's long-term care premium limit.",
    premium_tax_credit: "Premium tax credit from Form 8962 for the same coverage. The deduction is reduced by this amount.",
  },
};
