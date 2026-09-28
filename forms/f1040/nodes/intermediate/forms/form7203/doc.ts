import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 7203",
  subtitle: "S Corporation Shareholder Stock and Debt Basis Limitations",
  topic: Topic.PassThrough,
  summary:
    "The form an S corporation shareholder uses to track stock and debt basis, which caps how much of the corporation's losses you can deduct. " +
    "Filled in automatically from your Schedule K-1 (Form 1120-S) entries when you give basis information. " +
    "Any loss above your basis is added back on Schedule 1 and carried forward as a suspended loss, and distributions above stock basis become capital gain on Schedule D.",
  fields: {
    stock_basis_beginning: "Line 1. Your stock basis in the S corporation at the start of the year.",
    additional_contributions: "Line 2. Money or property you contributed to the corporation, or stock you bought, during the year.",
    ordinary_income: "Line 3. Ordinary business income from K-1 box 1. Income increases your stock basis.",
    tax_exempt_income: "Line 3. Tax-exempt income from K-1 box 16, code A. It also increases your stock basis.",
    distributions: "Line 6. Nondividend distributions from K-1 box 16, code D. They reduce stock basis but not below zero; any excess is treated as long-term capital gain on Schedule D.",
    nondeductible_expenses: "Line 8a. Nondeductible, noncapital expenses from K-1 box 16, code C. They reduce stock basis after distributions and before losses.",
    debt_basis_beginning: "Part II. Your basis at the start of the year in loans you made directly to the corporation. Losses use this only after stock basis is used up.",
    new_loans: "Part II. New loans you made to the corporation during the year, which add to debt basis.",
    ordinary_loss: "Part III, column (a). This year's ordinary business loss from K-1 box 1, entered as a positive number.",
    prior_year_unallowed_loss: "Part III, column (b). Losses suspended in earlier years for lack of basis, carried into this year.",
  },
};
