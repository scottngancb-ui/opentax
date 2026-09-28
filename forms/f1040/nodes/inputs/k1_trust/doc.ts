import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule K-1 (Form 1041)",
  subtitle: "Beneficiary's Share of Income, Deductions, Credits, etc.",
  topic: Topic.PassThrough,
  summary:
    "The statement an estate or trust gives each beneficiary showing their share of its income, deductions and credits for the year. " +
    "Interest and dividends go to Schedule B and Form 1040, capital gains to Schedule D, business and rental income to Schedule E via Schedule 1 line 5, " +
    "and foreign taxes to Form 1116. Enter one K-1 per estate or trust.",
  fields: {
    estate_trust_name: "The name of the estate or trust that issued the K-1. Used as the payer name on Schedule B.",
    distributable_net_income: "The estate's or trust's distributable net income (DNI), the most a beneficiary can be taxed on. If entered and the positive income items add up to more, the engine scales them down proportionally.",
    box1_interest: "Box 1. Interest income. Listed on Schedule B, Part I.",
    box2a_ordinary_dividends: "Box 2a. Ordinary dividends. Listed on Schedule B, Part II.",
    box2b_qualified_dividends: "Box 2b. Qualified dividends, taxed at capital gain rates. Goes to Form 1040 line 3a.",
    box3_net_st_cap_gain: "Box 3. Net short-term capital gain or loss. Goes to Schedule D line 5.",
    box4a_net_lt_cap_gain: "Box 4a. Net long-term capital gain or loss. Goes to Schedule D line 12.",
    box4b_28pct_rate_gain: "Box 4b. The part of the long-term gain taxed at up to 28% (such as collectibles). Recorded; the engine does not currently route it.",
    box4c_unrecaptured_1250: "Box 4c. Unrecaptured section 1250 gain from real property, taxed at up to 25%. Recorded; the engine does not currently route it.",
    box5_other_portfolio: "Box 5. Other portfolio and nonbusiness income. Goes to Schedule 1 line 8z.",
    box6_ordinary_business: "Box 6. Ordinary business income or loss. Reported on Schedule E and carried to Schedule 1 line 5.",
    box7_rental_real_estate: "Box 7. Net rental real estate income or loss. Reported on Schedule E and carried to Schedule 1 line 5.",
    box8_other_rental: "Box 8. Other rental income or loss. Reported on Schedule E and carried to Schedule 1 line 5.",
    box9_directly_apportioned_deductions: "Box 9. Deductions such as depreciation or depletion allocated directly to you. The engine subtracts the total on Schedule 1 line 8z.",
    box10_estate_tax_deduction: "Box 10. Estate tax deduction for income in respect of a decedent, an itemized deduction. Recorded; the engine does not currently route it.",
    box11_final_year_deductions: "Box 11. Excess deductions and carryovers passed to you in the estate's or trust's final year. Recorded; the engine does not currently route it.",
    box12_amt: "Box 12. Alternative minimum tax adjustments. Recorded; the engine does not currently route it.",
    box13_credits: "Box 13. Your share of credits and credit recapture. Recorded; the engine does not currently route it.",
    box14_foreign_tax: "Box 14. Foreign taxes paid or accrued on your share of income. With foreign income and a category, sent to Form 1116 for the foreign tax credit.",
    box14_foreign_income: "Gross foreign-source income tied to the foreign taxes. Needed for the Form 1116 limit.",
    box14_foreign_income_category: "The foreign tax credit category (basket) the foreign income belongs to on Form 1116.",
    box14_foreign_deductions: "Deductions directly allocable to the foreign income. Reduces foreign income on Form 1116.",
  },
  options: {
    box14_foreign_income_category: {
      passive: "Passive category income, such as most interest, dividends, rents and royalties.",
      general: "General category income, such as wages and active business income.",
      section_951a: "Global intangible low-taxed income (GILTI) under section 951A.",
      branch: "Foreign branch category income.",
      treaty: "Income re-sourced as foreign under a tax treaty.",
      section_901j: "Income from sanctioned countries under section 901(j).",
    },
  },
};
