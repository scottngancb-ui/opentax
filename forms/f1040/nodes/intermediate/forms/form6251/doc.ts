import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 6251",
  subtitle: "Alternative Minimum Tax—Individuals",
  topic: Topic.TaxComputation,
  summary:
    "The form that figures the alternative minimum tax (AMT), a parallel tax that adds back certain deductions and tax " +
    "preferences. It is filled in automatically from the tax calculation, Schedule A, Form 4562, Form 1116, 1099s and K-1s. " +
    "It subtracts an exemption that phases out at higher income, applies 26% and 28% rates (with the lower rates on qualified " +
    "dividends and capital gains), and any excess over your regular tax goes to Schedule 2 line 1.",
  fields: {
    filing_status: "Your filing status. Sets the exemption amount, its phase-out and the 26%/28% bracket threshold.",
    regular_tax_income: "Line 1. Taxable income from Form 1040, the starting point for alternative minimum taxable income.",
    regular_tax: "Line 10. Your regular income tax, compared with the tentative minimum tax.",
    iso_adjustment:
      "Line 2i. For incentive stock options you exercised and kept: the stock's value over the price you paid.",
    depreciation_adjustment: "Line 2l. Difference between regular and AMT depreciation on post-1986 property, from Form 4562.",
    nol_adjustment: "Line 2f. Alternative tax net operating loss deduction. Enter as a negative number.",
    private_activity_bond_interest: "Line 2g. Tax-exempt interest from specified private activity bonds, which is taxable for AMT.",
    line2g_pab_interest:
      "Line 2g. Private activity bond interest sent from Forms 1099-INT and 1099-DIV. The larger of this and the field above is used.",
    qsbs_adjustment: "Line 2h. 7% of the gain excluded under section 1202 on qualified small business stock.",
    line2a_taxes_paid: "Line 2a. Taxes deducted on Schedule A, which are added back for AMT.",
    other_adjustments: "Net total of all other AMT adjustments and preferences. Positive raises AMT income; negative lowers it.",
    amtftc: "Line 8. Alternative minimum tax foreign tax credit, which reduces the tentative minimum tax.",
    qualified_dividends: "Qualified dividends, which keep the 0%, 15% and 20% rates under AMT.",
    net_capital_gain: "Net capital gain, which keeps the 0%, 15% and 20% rates under AMT.",
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
