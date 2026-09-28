import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Tax computation",
  subtitle: "Engine step (not an IRS form)",
  topic: Topic.TaxComputation,
  summary:
    "Figures your regular income tax on Form 1040 line 16. Filled in automatically from taxable income, filing status and, when present, " +
    "qualified dividends and capital gains from Schedule D, Forms 1099-DIV and K-1s. With no preferential income it applies the tax brackets for your filing status; " +
    "otherwise it follows the Qualified Dividends and Capital Gain Tax Worksheet or Schedule D Tax Worksheet (0%, 15%, 20%, plus 25% and 28% tiers). " +
    "It also passes the tax to Form 6251 (AMT), Form 8812 and Form 1116.",
  fields: {
    taxable_income: "Form 1040 line 15. Taxable income: AGI minus the standard or itemized deduction and the QBI deduction.",
    filing_status: "Your filing status, which picks the tax bracket table and the capital gain rate thresholds.",
    qualified_dividends:
      "Form 1040 line 3a. Qualified dividends, taxed at capital gain rates. May arrive from several sources (1099-DIV, K-1s) and is added together.",
    net_capital_gain:
      "Net capital gain eligible for preferential rates: the smaller of Schedule D line 15 or line 16 when both are gains.",
    form4952_elected_qualified_dividends:
      "Qualified dividends you elected on Form 4952 to treat as investment income. They lose the preferential rate and are taxed as ordinary income.",
    form4952_elected_net_capital_gain:
      "Net capital gain you elected on Form 4952 to treat as investment income. It is taxed at ordinary rates instead of capital gain rates.",
    unrecaptured_1250_gain:
      "Unrecaptured section 1250 gain (from depreciation on real estate). Taxed at a maximum rate of 25% under the Schedule D Tax Worksheet.",
    rate_28_gain: "28% rate gain, mainly from collectibles such as art, coins and precious metals. Taxed at a maximum rate of 28%.",
    foreign_earned_income_exclusion:
      "Income excluded on Form 2555. When present, the engine uses the Foreign Earned Income Tax Worksheet method so your remaining income is taxed at the rates it would face if the excluded income were included.",
  },
  options: {
    filing_status: {
      single: "Single: unmarried and not qualifying for another status.",
      mfs: "Married filing separately. Uses the married-filing-separately brackets.",
      mfj: "Married filing jointly. Uses the joint brackets.",
      hoh: "Head of household: unmarried and paying more than half the cost of a home for a qualifying person.",
      qss: "Qualifying surviving spouse. Uses the joint brackets.",
    },
  },
};
