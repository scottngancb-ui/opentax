import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "QSEHRA",
  subtitle: "Qualified Small Employer Health Reimbursement Arrangement",
  topic: Topic.Health,
  summary:
    "A health reimbursement plan offered by some small employers, usually reported in W-2 box 12 with code FF. " +
    "If you had minimum essential coverage, the reimbursements are tax-free, but the amount offered reduces any Premium Tax Credit on Form 8962. " +
    "If you did not have that coverage, the engine adds the amounts you received to wages on Form 1040 line 1a.",
  fields: {
    qsehra_amount_offered: "The yearly benefit your employer made available under the plan. With minimum essential coverage, sent to Form 8962 to reduce the Premium Tax Credit.",
    qsehra_amount_received: "The reimbursements you actually received during the year. Taxable as wages (Form 1040 line 1a) if you lacked minimum essential coverage.",
    has_minimum_essential_coverage: "Whether you had minimum essential health coverage for the year. Decides if the benefits are tax-free.",
    is_self_only_coverage: "Whether the benefit is for self-only coverage rather than family coverage. The two have different annual limits; the engine records this but does not test the limit.",
  },
};
