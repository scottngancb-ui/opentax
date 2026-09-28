import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8990",
  subtitle: "Limitation on Business Interest Expense Under Section 163(j)",
  topic: Topic.Business,
  summary:
    "The form that limits how much business interest you can deduct in a year, generally to business interest income plus 30% of adjusted taxable income plus floor plan interest. " +
    "Filled in automatically from Schedule C businesses marked subject to section 163(j) and from Schedule E rental interest carryforwards. " +
    "Businesses with average gross receipts of $31 million or less (and not tax shelters) are exempt. " +
    "Disallowed interest is added back on Schedule 1 and carried forward.",
  fields: {
    business_interest_expense: "Line 1. This year's business interest expense, not counting floor plan financing interest or carryforwards.",
    prior_disallowed_carryforward: "Line 2. Business interest disallowed last year and carried into this year.",
    floor_plan_interest: "Line 4. Interest on loans used to buy vehicles or equipment held for sale or lease (floor plan financing). It is not limited and raises the cap.",
    tentative_taxable_income: "Line 6. Taxable income figured as if all business interest were deductible. Can be negative.",
    nol_deduction: "Line 9. Net operating loss deduction, added back to reach adjusted taxable income.",
    qbi_deduction: "Line 10. Qualified business income deduction, added back to reach adjusted taxable income.",
    depreciation_amortization: "Line 11. Depreciation, amortization and depletion of the business, added back to reach adjusted taxable income.",
    business_interest_income: "Line 23. Business interest income. It is subtracted from adjusted taxable income and added to the deduction cap.",
    avg_gross_receipts: "Your average annual gross receipts for the three prior years. At or below the small business threshold, the limit doesn't apply.",
    is_tax_shelter: "Whether the business is a tax shelter. Tax shelters can't use the small business exemption.",
    disallowed_mortgage_interest_carryforward: "Disallowed business mortgage interest carried forward from rental activities on Schedule E.",
    disallowed_other_interest_carryforward: "Other disallowed business interest carried forward from rental activities on Schedule E.",
  },
};
