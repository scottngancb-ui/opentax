import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8839",
  subtitle: "Qualified Adoption Expenses",
  topic: Topic.Family,
  summary:
    "The form for claiming the adoption credit and excluding employer-provided adoption benefits from income. " +
    "Filled in partly from W-2 box 12 code T (employer adoption benefits); you add the per-child details. " +
    "The credit per child is capped at $17,280 and phases out as modified AGI rises from $259,190 to $299,190. " +
    "The engine treats the credit as nonrefundable on Schedule 3 line 6c, and taxable benefits go to Form 1040 line 1f.",
  fields: {
    adoption_benefits: "Part III. Employer-provided adoption benefits, from W-2 box 12 code T. The part that isn't excluded is taxable wages on Form 1040 line 1f.",
    children: "One entry for each eligible child you adopted or are adopting.",
    "children.qualified_expenses": "Qualified adoption expenses you paid for this child, such as adoption fees, court costs and attorney fees, not counting amounts your employer paid.",
    "children.special_needs": "Whether a state determined the child has special needs. Such an adoption gets the full credit even with little or no expenses.",
    "children.prior_year_credit": "Adoption credit already claimed for this child in earlier years, which reduces what's left of the per-child limit.",
    "children.adoption_is_final": "Whether the adoption became final. For a foreign child, no credit is allowed until it is.",
    "children.is_foreign_child": "Whether the child was not a U.S. citizen or resident before the adoption began.",
    magi: "Modified AGI, used to phase out both the credit and the benefit exclusion.",
    income_tax_liability: "Your tax that the credit can offset. The credit is limited to this amount.",
    filing_status: "Your filing status. The engine allows no credit or exclusion on a married filing separately return.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately (no credit or exclusion in the engine)",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
