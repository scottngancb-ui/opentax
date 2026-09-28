import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4952",
  subtitle: "Investment Interest Expense Deduction",
  topic: Topic.Deductions,
  summary:
    "The form that limits your deduction for investment interest, such as margin interest, to your net investment income. It " +
    "is filled in automatically from Schedule A, which applies the allowed amount as an itemized deduction. This node records " +
    "the form's lines for printing and carries any disallowed interest forward to next year.",
  fields: {
    investment_interest_expense: "Line 1. Investment interest you paid or accrued this year.",
    net_investment_income: "Line 6. Net investment income. The deduction cannot exceed this amount.",
    gross_investment_income: "Line 4a. Gross income from property held for investment, such as interest and ordinary dividends.",
    qualified_dividends: "Line 4b. Qualified dividends included in line 4a. Removed unless you elect to treat them as investment income.",
    investment_net_gain: "Line 4d. Net gain from selling investment property.",
    investment_net_capital_gain: "Line 4e. The net capital gain part of line 4d. Removed unless you elect to include it.",
    elected_qualified_dividends:
      "Line 4g. Qualified dividends you elect to include in investment income. They then lose the lower capital gain rates.",
    elected_net_capital_gain:
      "Line 4g. Net capital gain you elect to include in investment income. It then loses the lower capital gain rates.",
    investment_expenses: "Line 5. Investment expenses other than interest that are directly connected to investment income.",
    investment_income: "Line 4h. Total investment income after the adjustments and elections above.",
    prior_year_carryforward: "Line 2. Investment interest disallowed last year and carried forward.",
  },
};
