import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 965-A",
  subtitle: "Individual Report of Net 965 Tax Liability",
  topic: Topic.Foreign,
  summary:
    "The annual report for the one-time section 965 transition tax on untaxed foreign earnings of certain foreign corporations, owed by their US shareholders " +
    "for 2017 or 2018. Those who elected to pay over eight years report each installment; 2025 is the final installment for a 2017 inclusion. " +
    "Transfer and S corporation deferral details from Forms 965-C, 965-D and 965-E are also recorded. The engine adds this year's installments to Schedule 2 line 9.",
  fields: {
    tax_year_of_inclusion: "Part I, column (a). The tax year of the original section 965 inclusion, usually 2017 or 2018.",
    net_965_tax_liability: "Part I. Your net section 965 tax liability for that year: tax with the inclusion minus tax without it.",
    installment_election: "Mark if you elected under section 965(h) to pay the liability in eight annual installments.",
    current_year_installment: "Part II. The installment due this year. Goes to Schedule 2 line 9.",
    transfer_agreement_type: "Which transfer or consent agreement, if any, was filed for this liability. Recorded only.",
    s_corp_deferred_amount: "Part III. Section 965 liability deferred through an S corporation under section 965(i). Recorded only until a triggering event.",
    remaining_balance: "Part II. The unpaid installment balance left after this year. Recorded only.",
  },
  options: {
    transfer_agreement_type: {
      NONE: "No transfer or consent agreement",
      C: "Form 965-C, a transfer agreement for an installment liability under section 965(h)(3)",
      D: "Form 965-D, a transfer agreement for an S corporation deferred liability under section 965(i)(2)",
      E: "Form 965-E, a consent agreement under section 965(i)(4)(D) after a triggering event",
    },
  },
};
