import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "EIC",
  subtitle: "Earned Income Credit worksheet",
  topic: Topic.Family,
  summary:
    "The refundable earned income credit for low- and moderate-income workers, figured automatically from your W-2 wages, " +
    "Schedule C profit, AGI, filing status and qualifying children (from the general info screen and Form 8862). The credit " +
    "phases in with earned income, levels off, then phases out as the higher of earned income or AGI rises. No credit is " +
    "allowed if investment income is over $11,950 or you file separately. The result goes to Form 1040 line 27.",
  fields: {
    earned_income: "Wages from your W-2s (box 1) that count as earned income for the credit.",
    se_net_profit: "Net profit from self-employment on Schedule C. Added to wages to get total earned income.",
    agi:
      "Your adjusted gross income. The phase-out uses whichever is higher, AGI or earned income.",
    qualifying_children:
      "Number of qualifying children (0 to 3). Three or more are treated the same. More children raise the maximum credit and income limits.",
    filing_status:
      "Your filing status. Married filing jointly (and, in this engine, qualifying surviving spouse) uses the higher joint phase-out thresholds; married filing separately gets no credit.",
    investment_income:
      "Interest, dividends, capital gains, rents and similar income. If it is over $11,950, you cannot take the credit.",
    form8862_filed:
      "Set when Form 8862 is filed to claim the credit again after a prior-year disallowance. Recorded but not used in the calculation.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately (no credit in this engine)",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
