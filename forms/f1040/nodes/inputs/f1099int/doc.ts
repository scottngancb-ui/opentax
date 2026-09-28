import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-INT",
  subtitle: "Interest Income",
  topic: Topic.InterestDividends,
  summary:
    "The form a bank, broker or other payer sends by January 31 reporting interest paid to you during the year. " +
    "Taxable interest goes to Schedule B and Form 1040 line 2b, tax-exempt interest to line 2a, and withholding to line 25b. " +
    "An early withdrawal penalty is deducted on Schedule 1, private activity bond interest feeds the AMT on Form 6251, and foreign tax paid becomes a foreign tax credit. " +
    "Enter one form per payer.",
  fields: {
    payer_name: "The name of the bank or other payer. Listed on Schedule B.",
    payer_tin: "The payer's federal identification number.",
    seller_financed:
      "Check if this is interest you received on a seller-financed mortgage from the buyer of your property. The buyer's SSN and address are then required.",
    payer_ssn: "For a seller-financed mortgage, the SSN of the buyer who paid you the interest (9 digits).",
    payer_address: "For a seller-financed mortgage, the payer's street address.",
    payer_city_state_zip: "For a seller-financed mortgage, the payer's city, state and ZIP code.",
    box1: "Box 1. Taxable interest not included in box 3. Goes to Schedule B and Form 1040 line 2b.",
    box2:
      "Box 2. Penalty you paid for withdrawing a time deposit (such as a CD) early. Deductible as an adjustment on Schedule 1 line 18.",
    box3: "Box 3. Interest on U.S. savings bonds and Treasury obligations. Taxable federally, so it is added to your Schedule B interest.",
    box4: "Box 4. Federal income tax withheld (backup withholding). Credited on Form 1040 line 25b.",
    box5: "Box 5. Investment expenses passed through from a REMIC or similar entity. Not used here.",
    box6:
      "Box 6. Foreign tax paid on this interest. Claimed directly on Schedule 3 line 1 when the total is $300 or less ($600 married filing jointly); above that, the engine uses Form 1116.",
    box7: "Box 7. The foreign country or U.S. territory to which the box 6 tax was paid.",
    box8: "Box 8. Tax-exempt interest, such as from municipal bonds. Reported on Form 1040 line 2a after subtracting box 13.",
    box9:
      "Box 9. The part of box 8 that is interest on specified private activity bonds. An adjustment for the alternative minimum tax on Form 6251.",
    box10: "Box 10. Market discount on a taxable bond that you elected to include each year. Added to taxable interest.",
    box11:
      "Box 11. Bond premium on a taxable bond. Reduces your taxable interest only if you elected to amortize bond premium (see below).",
    elect_bond_premium_amortization:
      "Check if you elected to amortize premium on taxable bonds. Only then does the engine subtract box 11 from your interest.",
    box12: "Box 12. Bond premium on Treasury obligations. Subtracted from your taxable interest.",
    box13: "Box 13. Bond premium on tax-exempt bonds. Subtracted from box 8 tax-exempt interest.",
    box14: "Box 14. The CUSIP number of a tax-exempt bond, if one bond is reported.",
    box15: "Box 15. The state for any state tax withheld.",
    box16: "Box 16. The payer's state identification number.",
    box17: "Box 17. State income tax withheld. Used for the state return.",
    nominee_interest:
      "Interest shown on this form that actually belongs to someone else, because you received it as a nominee. Subtracted on Schedule B.",
    accrued_interest_paid:
      "Accrued interest you paid to the seller when you bought a bond between interest dates. Subtracted from taxable interest on Schedule B.",
    non_taxable_oid_adjustment:
      "An adjustment reducing interest for original issue discount (OID) that is less than the amount reported. Subtracted on Schedule B.",
  },
};
