import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8903",
  subtitle: "Domestic Production Activities Deduction",
  topic: Topic.Deductions,
  summary:
    "A deduction for income from qualified domestic production activities. It was repealed for tax years after 2017, so it doesn't apply to a 2025 return; the node is kept for older years. " +
    "The engine figures 9% (6% for oil and gas) of the smaller of qualified production activities income or AGI, limited to 50% of related W-2 wages, and reports it as an adjustment on Schedule 1.",
  fields: {
    qualified_production_activities_income: "Qualified production activities income: receipts from domestic production minus the costs allocable to them.",
    form_w2_wages: "W-2 wages paid for domestic production activities. The deduction can't exceed half of this amount.",
    adjusted_gross_income: "Your AGI. When given, the deduction rate applies to the smaller of this and your production income.",
    oil_gas_rate: "Mark if the income is from oil-related production, which uses the reduced 6% rate instead of 9%.",
  },
};
