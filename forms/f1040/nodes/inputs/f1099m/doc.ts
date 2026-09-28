import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-MISC",
  subtitle: "Miscellaneous Information",
  topic: Topic.OtherIncome,
  summary:
    "The form a business sends by January 31 to report rents, royalties, prizes and awards, medical and health care payments, crop insurance, attorney proceeds and other miscellaneous payments made to you. " +
    "Each box is routed to the form where that income belongs: rents and royalties to Schedule E (or Schedule C for a business), fishing and medical payments to Schedule C, " +
    "crop insurance to Schedule F, and prizes and other income to Schedule 1 line 8. Withholding is credited on Form 1040 line 25b. Enter one form per payer.",
  fields: {
    payer_name: "The name of the business or person that paid you.",
    payer_tin: "The payer's federal identification number (9 digits, dashes optional).",
    recipient_tin: "Your SSN or other taxpayer identification number as shown on the form.",
    account_number: "The account number the payer assigned, if any.",
    multi_form_code: "A number to tell apart multiple 1099-MISC forms from the same payer. For your records.",
    box1_rents: "Box 1. Rents paid to you, such as for real estate or equipment.",
    box1_rents_routing:
      "Where box 1 rents go. Defaults to Schedule E; choose Schedule C if you provide substantial services or are in the business of renting.",
    box2_royalties: "Box 2. Royalties of $10 or more, such as from oil, gas or mineral interests, copyrights or patents.",
    box2_royalties_routing:
      "Where box 2 royalties go. Defaults to Schedule E; choose Schedule C if the royalties come from your trade or business, such as a self-employed author.",
    box3_other_income: "Box 3. Other income not reported elsewhere, such as prizes, awards, or punitive damages.",
    box3_other_income_routing:
      "How to treat box 3. Defaults to prizes and awards (Schedule 1 line 8i).",
    box3_niit_applicable:
      "Check if the box 3 income is investment income, such as from a brokerage account. It is then also included in net investment income on Form 8960.",
    box4_federal_withheld: "Box 4. Federal income tax withheld (backup withholding). Credited on Form 1040 line 25b.",
    box5_fishing_boat: "Box 5. Your share of a fishing boat's catch proceeds as a crew member. Added to Schedule C gross receipts.",
    box6_medical_payments: "Box 6. Payments for medical or health care services you provided. Added to Schedule C gross receipts.",
    box7_direct_sales:
      "Box 7. Checked if the payer sold you $5,000 or more of consumer products for resale. Informational only; no amount is reported.",
    box8_substitute_payments:
      "Box 8. Substitute payments in lieu of dividends or interest, received when your broker loaned out your shares. Reported on Schedule 1 line 8z and counted as investment income on Form 8960.",
    box9_crop_insurance: "Box 9. Crop insurance proceeds. Reported on Schedule F unless you elect to defer them.",
    box9_crop_insurance_deferred:
      "Check if you elect to include the crop insurance proceeds in income next year instead. The engine then leaves them off this year's Schedule F.",
    box10_attorney_proceeds:
      "Box 10. Gross proceeds paid to an attorney on your behalf, such as a legal settlement. Reported on Schedule 1 line 8z unless marked not taxable.",
    box10_attorney_taxable:
      "Uncheck if the box 10 proceeds are not taxable, such as damages for a personal physical injury. Treated as taxable if left blank.",
    box11_fish_purchased: "Box 11. Cash paid to you for fish you caught, for resale. Added to Schedule C gross receipts.",
    box12_section_409a_deferrals:
      "Box 12. Amounts deferred under a nonqualified deferred compensation plan subject to section 409A. Informational; not income this year if the plan complies.",
    box13_fatca: "Box 13. Checked if the payer is reporting to satisfy a FATCA foreign account filing requirement. Informational.",
    box15_nqdc:
      "Box 15. Nonqualified deferred compensation income from a plan that fails section 409A. Reported on Schedule 1 line 8z, plus a 20% additional tax on Schedule 2.",
    box16_state_tax_withheld: "Box 16. State income tax withheld. Used for the state return.",
    box17_state_payer_id: "Box 17. The payer's state identification number.",
    box18_state_income: "Box 18. The amount of the payment reported to the state.",
  },
  options: {
    box1_rents_routing: {
      schedule_e: "Rental income on Schedule E (the usual case)",
      schedule_c: "Business income on Schedule C, for a rental business with substantial services",
    },
    box2_royalties_routing: {
      schedule_e: "Royalty income on Schedule E (the usual case)",
      schedule_c: "Business income on Schedule C, when the royalties come from your trade or business",
    },
    box3_other_income_routing: {
      prizes_awards: "Prizes and awards, reported on Schedule 1 line 8i",
      other_income: "Other income, reported on Schedule 1 line 8z",
      excluded: "Not taxable; the engine does not report it",
    },
  },
};
