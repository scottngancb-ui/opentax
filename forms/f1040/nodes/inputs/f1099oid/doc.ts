import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-OID",
  subtitle: "Original Issue Discount",
  topic: Topic.InterestDividends,
  summary:
    "The information return a bank, broker or issuer sends early in the year when a bond or other debt was issued below its face value. " +
    "That original issue discount (OID) is taxed as interest a little each year even though you are not paid it until maturity. " +
    "The engine sends net OID and other interest to Schedule B and Form 1040 line 2b, tax-exempt private activity bond OID to Form 6251 for AMT, " +
    "and withholding to line 25b. Enter one form per payer.",
  fields: {
    payer_name: "The name of the payer or issuer. Shown as the payer on Schedule B.",
    payer_tin: "The payer's taxpayer identification number.",
    box1_oid:
      "Box 1. Original issue discount that accrued during the year. After subtracting box 6 and any nominee amount, it is reported as interest on Schedule B.",
    box2_other_interest: "Box 2. Other periodic interest paid on the same obligation. Added to taxable interest on Schedule B.",
    box3_early_withdrawal_penalty:
      "Box 3. Penalty for withdrawing a time deposit early. Normally deductible on Schedule 1, but this engine does not currently carry it there.",
    box4_federal_withheld: "Box 4. Federal income tax withheld, usually backup withholding. Counts as a payment on Form 1040 line 25b.",
    box5_market_discount:
      "Box 5. Market discount that accrued on a bond bought below its adjusted issue price. Informational; the engine does not use it.",
    box6_acquisition_premium:
      "Box 6. The amount you paid above the bond's adjusted issue price. It reduces the box 1 OID you report.",
    box7_description: "Box 7. Description of the obligation, such as its name or CUSIP number.",
    box8_oid_treasury:
      "Box 8. OID on U.S. Treasury obligations. Taxable federally (but not by states). Reduced by box 10 and reported on Schedule B.",
    box9_investment_expenses:
      "Box 9. Investment expenses allocated to the obligation. Not currently deductible, so the engine does not use it.",
    box10_bond_premium:
      "Box 10. Bond premium on Treasury obligations. The engine subtracts it from the box 8 Treasury OID.",
    box11_tax_exempt_oid:
      "Box 11. Tax-exempt OID. The engine treats it as private activity bond interest, an AMT preference item on Form 6251.",
    box12_state_tax: "Box 12. State income tax withheld. Informational for the federal return.",
    box13_fatca: "Box 13. Checked if the payer is reporting this account to meet a FATCA requirement. Informational.",
    nominee_oid:
      "OID included in box 1 that actually belongs to someone else because you received it as a nominee. Subtracted from your taxable OID.",
  },
};
