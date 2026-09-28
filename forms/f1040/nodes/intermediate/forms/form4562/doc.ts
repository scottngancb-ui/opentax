import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4562",
  subtitle: "Depreciation and Amortization",
  topic: Topic.Business,
  summary:
    "The form that figures depreciation on business and rental property, including the section 179 expense election, bonus " +
    "(special) depreciation and regular MACRS. It is filled in automatically from Schedule E and partnership and S corporation " +
    "K-1s. The engine sends total depreciation to Schedule 1 and the AGI calculation, and any AMT depreciation difference to " +
    "Form 6251. It handles one MACRS asset entry at a time, with listed property and luxury auto limits.",
  fields: {
    section_179_deduction: "Section 179 deduction already figured by another form, such as Schedule E or a K-1.",
    section_179_cost: "Line 2. Total cost of section 179 property placed in service. Cost above the phase-out threshold reduces the limit.",
    section_179_elected: "The cost you elect to expense under section 179 for property entered here.",
    section_179_carryover: "Line 10. Section 179 deduction disallowed last year and carried over to this year.",
    business_income_limit:
      "Line 11. Taxable income from your active trades or businesses. The section 179 deduction cannot exceed it.",
    bonus_depreciation_basis:
      "Line 14. Basis of property eligible for special (bonus) depreciation placed in service before January 20, 2025, taken at 40%.",
    bonus_depreciation_basis_post_jan19:
      "Line 14. Basis of property eligible for bonus depreciation placed in service after January 19, 2025, taken at 100% unless you elect 40%.",
    elect_out_bonus: "Check to elect out of bonus depreciation. No bonus depreciation is then taken.",
    elect_40pct_bonus: "Check to elect 40% instead of 100% bonus depreciation for property placed in service after January 19, 2025.",
    macrs_gds_basis: "Part III. Basis for depreciation of the MACRS asset (general depreciation system).",
    macrs_gds_recovery_period:
      "Recovery period in years, such as 5 or 7 for equipment, 27.5 for residential rental property, or 39 for nonresidential real property.",
    macrs_gds_year_of_service: "Which year of the recovery period 2025 is for this asset (1 for the year placed in service).",
    macrs_gds_month_placed_in_service:
      "Month (1 to 12) the asset was placed in service. Used for 27.5- and 39-year real property, which uses the mid-month convention.",
    macrs_prior_depreciation: "Line 17. MACRS depreciation for this year on assets placed in service before 2025.",
    is_listed_property:
      "Part V. Check if the asset is listed property, such as a vehicle. Bonus depreciation requires more than 50% business use.",
    business_use_pct: "Percentage of use that is for business (0 to 100). MACRS depreciation is figured on this share of the basis.",
    is_luxury_auto: "Check if the asset is a passenger automobile subject to the annual depreciation caps.",
    luxury_auto_year: "Which year of ownership this is for the automobile (1, 2, 3 or later). Sets the depreciation cap that applies.",
  },
};
