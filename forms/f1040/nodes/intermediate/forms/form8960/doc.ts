import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8960",
  subtitle: "Net Investment Income Tax—Individuals, Estates, and Trusts",
  topic: Topic.TaxComputation,
  summary:
    "The form that figures the 3.8% net investment income tax on interest, dividends, capital gains, rents and passive income. " +
    "It applies only when modified AGI is above $250,000 (joint), $125,000 (married filing separately) or $200,000 (others), and taxes the smaller of net investment income or the excess. " +
    "Filled in automatically from 1099-DIV, 1099 entries, K-1s, Schedules B, D and E, AGI and your filing status. The tax goes to Schedule 2 line 12.",
  fields: {
    filing_status: "Line 14. Your filing status, which sets the MAGI threshold.",
    magi: "Line 13. Modified AGI, which for most people is simply AGI.",
    line1_taxable_interest: "Line 1. Taxable interest.",
    line2_ordinary_dividends: "Line 2. Ordinary dividends, from 1099-DIVs and partnership K-1s. Several amounts are added together.",
    line3_annuities: "Line 3. Annuity income that isn't from a qualified retirement plan.",
    line4a_passive_income: "Line 4a. Net income or loss from rentals, royalties, partnerships, S corporations and trusts, and passive businesses.",
    line4b_rental_net: "Line 4b. Adjustment for amounts on line 4a that aren't investment income, such as income from a business you actively run.",
    line5a_net_gain: "Line 5a. Net gain or loss from selling property, from Schedule D and Form 4797.",
    line5b_net_gain_adjustment: "Line 5b. Adjustment for gains or losses that aren't investment income, such as from selling business property you actively used.",
    line7_other_modifications: "Line 7. Other changes to investment income. Can be negative.",
    line9a_investment_interest_expense: "Line 9a. Investment interest expense allocable to investment income.",
    line9b_state_local_tax: "Line 9b. State, local and foreign income tax allocable to investment income.",
    line10_additional_modifications: "Line 10. Other deductions properly allocable to investment income.",
  },
  options: {
    filing_status: {
      single: "Single ($200,000 threshold)",
      mfs: "Married filing separately ($125,000 threshold)",
      mfj: "Married filing jointly ($250,000 threshold)",
      hoh: "Head of household ($200,000 threshold)",
      qss: "Qualifying surviving spouse ($250,000 threshold)",
    },
  },
};
