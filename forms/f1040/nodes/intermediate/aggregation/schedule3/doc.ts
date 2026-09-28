import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule 3",
  subtitle: "Additional Credits and Payments",
  topic: Topic.Return,
  summary:
    "The Form 1040 schedule that lists nonrefundable credits and extra payments. It is filled in automatically from the credit " +
    "forms, such as Form 1116, Form 2441, Form 8863, Form 8880, Form 5695, Form 3800 and Form 8962, and from W-2s, 1099s " +
    "and the extension screen. Part I credits are totaled and go to Form 1040 line 20; Part II payments and refundable " +
    "credits go to line 31.",
  fields: {
    line1_foreign_tax_credit: "Line 1. Foreign tax credit allowed on Form 1116.",
    line1_foreign_tax_1099:
      "Line 1. Foreign tax paid shown on Forms 1099-DIV and 1099-INT, claimed directly without Form 1116 when the total is small " +
      "($300, or $600 on a joint return). Amounts from several forms are added together.",
    line2_childcare_credit: "Line 2. Child and dependent care credit from Form 2441.",
    line3_education_credit:
      "Line 3. Nonrefundable education credits (lifetime learning and the nonrefundable part of the American opportunity credit) from Form 8863.",
    line4_retirement_savings_credit: "Line 4. Retirement savings contributions credit (saver's credit) from Form 8880.",
    line6b_child_tax_credit:
      "Nonrefundable child tax credit and credit for other dependents from Schedule 8812. The engine includes it in the Part I total sent to Form 1040 line 20.",
    line6c_adoption_credit: "Nonrefundable adoption credit from Form 8839.",
    line10_amount_paid_extension:
      "Line 10. Amount you paid with an extension request (Form 4868). Counts as a payment.",
    line11_excess_ss:
      "Line 11. Social Security tax withheld above the annual maximum because you had two or more employers. Refunded as a payment.",
    line5_residential_energy:
      "Line 5. Residential clean energy credit and energy efficient home improvement credit from Form 5695.",
    line6d_clean_vehicle_credit: "Clean vehicle credit for personal use from Form 8936.",
    line6d_elderly_disabled_credit: "Credit for the elderly or the disabled from Schedule R.",
    line6f_mortgage_interest_credit: "Mortgage interest credit from Form 8396 (for holders of a mortgage credit certificate).",
    line9_premium_tax_credit:
      "Line 9. Net premium tax credit from Form 8962. It is refundable, so it is counted in Part II as a payment.",
    line6z_general_business_credit: "General business credit from Form 3800.",
    line6e_prior_year_min_tax_credit: "Credit for prior-year minimum tax from Form 8801.",
    line6b_low_income_housing_credit:
      "Low-income housing credit (Form 8609 and related forms). Tracked separately by the engine and added to the Part I total.",
    line13_1446_withholding:
      "Tax withheld on your share of a partnership's effectively connected income under section 1446 (Form 8805). Counted in Part II as a payment.",
  },
};
