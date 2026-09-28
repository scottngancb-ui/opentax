import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8828",
  subtitle: "Recapture of Federal Mortgage Subsidy",
  topic: Topic.TaxComputation,
  summary:
    "The form that figures the tax you may owe when you sell a home within nine years of financing it with a federally subsidized mortgage, such as one from tax-exempt bonds or a mortgage credit certificate. " +
    "Recapture applies only if you sell at a gain and your income has risen above the repayment income limit. " +
    "The amount is capped at 50% of the gain and is added to your tax on Schedule 2 line 10.",
  fields: {
    original_loan_amount: "The original amount of the federally subsidized mortgage loan.",
    subsidy_rate:
      "The interest rate benefit from the subsidy, as a decimal (0.06 for 6%). With the loan amount, it sets the federally subsidized amount (loan × rate × 6.25%).",
    holding_period_years:
      "Complete years you owned the home. The recapture percentage rises to 100% in year 5 and falls to zero after year 9.",
    gain_on_sale: "Your gain on the sale of the home. With no gain there is no recapture, and recapture can't exceed half the gain.",
    modified_agi: "Your modified adjusted gross income for the year of sale.",
    repayment_income_limit:
      "The income limit that applies to you, from the lender or bond issuer. Recapture applies only when your modified AGI is above it.",
    family_size: "Your family size. Informational; the repayment income limit you enter should already reflect it.",
  },
};
