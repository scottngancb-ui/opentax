import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1098",
  subtitle: "Mortgage Interest Statement",
  topic: Topic.Deductions,
  summary:
    "The statement a mortgage lender sends by January 31 showing the interest, points and other amounts you paid on a mortgage during the year. " +
    "For a home mortgage, box 1 interest and box 6 points go to Schedule A as an itemized deduction; you can instead route the interest to Schedule C, " +
    "Schedule E or Form 8829 for business, rental or home-office property. A refund of interest overpaid in a prior year is reported as other income on Schedule 1. " +
    "Enter one form per mortgage.",
  fields: {
    box1_mortgage_interest:
      "Box 1. Mortgage interest you paid to the lender during the year, not including points. Sent to the form chosen in the routing field.",
    for_routing:
      "Which form this mortgage's interest belongs on. Defaults to Schedule A (home mortgage) when left blank.",
    lender_name: "The name of the lender that issued the form.",
    box2_outstanding_principal:
      "Box 2. The mortgage balance at the start of the year. Used to check the home mortgage debt limit; this node does not apply that limit itself.",
    box3_origination_date:
      "Box 3. The date the mortgage originated. Loans taken out before December 16, 2017 fall under the older, higher debt limit.",
    box4_refund_overpaid:
      "Box 4. A refund or credit of mortgage interest you overpaid. Unless marked as a prior-year refund, the engine subtracts it from box 1.",
    box4_prior_year_refund:
      "Check if the box 4 refund is for interest you overpaid in an earlier year. The engine then leaves box 1 alone and reports the refund as other income on Schedule 1 line 8z.",
    box5_mip:
      "Box 5. Mortgage insurance premiums you paid. Recorded for reference; the engine does not deduct them for 2025.",
    box6_points_paid:
      "Box 6. Points you paid to buy your main home. For a Schedule A mortgage, the engine adds them to your itemized mortgage interest deduction.",
    box7_property_address_same: "Box 7. Checked if the mortgaged property's address is the same as your mailing address. No tax effect.",
    box8_property_address: "Box 8. The address or description of the property securing the mortgage. No tax effect.",
    box9_number_of_properties: "Box 9. The number of properties securing the mortgage, if more than one. No tax effect.",
    box10_other:
      "Box 10. Other information the lender chose to report, such as real estate taxes or insurance paid from escrow. Not used in any calculation.",
    box11_acquisition_date:
      "Box 11. The date the lender acquired the mortgage during the year, if it was not the original lender. No tax effect.",
    qualified_premiums_checkbox:
      "Marks box 5 as qualified mortgage insurance premiums. Has no tax effect for 2025.",
    dedm_override:
      "Check when the deductible home mortgage interest is figured separately (for example, because the loan balance is over the debt limit). The engine then ignores this form's box 1 and box 6 for Schedule A.",
    binding_contract_exception:
      "Check if the loan originated after December 15, 2017 but under a written binding contract that lets the older, higher debt limit apply. Recorded only; this node does not use it.",
    refinance:
      "Check if this is a refinanced loan. Points on a refinance generally must be deducted over the life of the loan rather than all at once. Recorded only; this node does not change the box 6 amount.",
  },
  options: {
    for_routing: {
      A: "Schedule A: interest on your main or second home, deducted as an itemized deduction",
      C: "Schedule C: interest on property used in your sole proprietorship",
      E: "Schedule E: interest on rental property",
      "8829": "Form 8829: the business-use share of a home used as a home office",
    },
  },
};
