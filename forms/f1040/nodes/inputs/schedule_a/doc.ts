import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule A",
  subtitle: "Itemized Deductions",
  topic: Topic.Deductions,
  summary:
    "The schedule you use to itemize deductions instead of taking the standard deduction: medical expenses above 7.5% of AGI, state and local taxes " +
    "up to the SALT cap, home mortgage and investment interest, charitable gifts, casualty losses and a few others. " +
    "Many amounts arrive automatically from Forms 1098, W-2, 1099-DIV, K-1s and Schedule E. The engine totals line 17 and the standard deduction step " +
    "uses whichever is larger on Form 1040 line 12; the taxes total also goes to Form 6251 for AMT.",
  fields: {
    filing_status: "Your filing status. Married filing separately halves the SALT cap and uses lower phase-out and floor amounts.",
    force_itemized: "Check to itemize even if the standard deduction is larger (for example, to match a state return). The engine records this flag but does not act on it; it takes the larger deduction.",
    force_standard: "Check to take the standard deduction even if itemizing is larger. The engine records this flag but does not act on it; it takes the larger deduction.",
    line_1_medical: "Line 1. Medical and dental expenses you paid that insurance didn't cover. Only the part above 7.5% of AGI is deductible. Qualified long-term care premiums are added here automatically.",
    agi: "Your adjusted gross income, filled in automatically from the AGI calculation. Sets the 7.5% medical floor, the charitable limits and the SALT cap phase-out.",
    line_5a_state_income_tax: "Line 5a. State and local income taxes paid, such as W-2 box 17 and 19 withholding and estimated payments. Use this or the sales tax field, not both.",
    line_5a_sales_tax: "Line 5a. General sales taxes, if you elect to deduct them instead of state and local income taxes. You can't claim both.",
    line_5b_real_estate_tax: "Line 5b. State and local real estate taxes on property you own for personal use.",
    line_5c_personal_property_tax: "Line 5c. Personal property taxes based on value, such as part of a car registration fee.",
    line_6_other_taxes: "Line 6. Other deductible taxes, such as foreign income taxes you choose to deduct rather than credit. Not subject to the SALT cap.",
    line_8a_mortgage_interest_1098: "Line 8a. Home mortgage interest and points reported to you on Form 1098.",
    line_8b_mortgage_interest_no_1098: "Line 8b. Home mortgage interest not reported on Form 1098, such as on a loan from a private individual.",
    line_8c_points_no_1098: "Line 8c. Points not reported on Form 1098, such as points on a refinance deducted over the loan's life.",
    line_9_investment_interest: "Line 9. Interest on money borrowed to buy taxable investments. The deductible amount is limited to net investment income on Form 4952.",
    prior_year_investment_interest_carryforward: "Investment interest from earlier years that exceeded your net investment income and was carried forward (Form 4952 line 2).",
    investment_interest_taxable_interest: "Taxable interest counted as investment income for Form 4952. Filled in automatically from Schedule B; can be one amount or several.",
    investment_interest_ordinary_dividends: "Ordinary dividends counted as investment income for Form 4952. Filled in automatically from Forms 1099-DIV; can be one amount or several.",
    investment_interest_qualified_dividends: "The qualified dividends included in ordinary dividends. They are left out of investment income unless you elect to include them.",
    investment_net_gain: "Form 4952 line 4d. Net gain from selling property held for investment.",
    investment_net_capital_gain: "Form 4952 line 4e. The net capital gain part of line 4d, which is left out of investment income unless you elect to include it.",
    reported_net_capital_gain: "Your net capital gain from Schedule D, filled in automatically. Used to check that the Form 4952 figures don't exceed it.",
    elected_qualified_dividends: "Form 4952 line 4g. Qualified dividends you elect to treat as investment income. That lets you deduct more interest, but those dividends lose the lower capital gains tax rate.",
    elected_net_capital_gain: "Form 4952 line 4g. Net capital gain you elect to treat as investment income. That lets you deduct more interest, but that gain loses the lower capital gains tax rate.",
    investment_expenses: "Form 4952 line 5. Investment expenses (other than interest) directly connected with producing investment income. Reduces net investment income.",
    niit_allocable_state_local_tax: "The part of your deductible state and local income tax you reasonably allocate to investment income, for Form 8960 line 9b (net investment income tax). Can't exceed the deductible amount.",
    line_11_cash_contributions: "Line 11. Gifts to charity by cash or check. The engine limits them to 60% of AGI.",
    line_12_noncash_contributions: "Line 12. Gifts to charity other than cash, such as clothing, goods or stock. Items over $500 need Form 8283. The engine limits them to 30% of AGI.",
    line_13_contribution_carryover: "Line 13. Charitable contributions from earlier years that exceeded the AGI limits and were carried forward.",
    line_15_casualty_theft_loss: "Line 15. Casualty and theft losses from a federally declared disaster, figured on Form 4684.",
    line_16_other_deductions: "Line 16. Other itemized deductions allowed by the instructions, such as gambling losses up to gambling winnings.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
