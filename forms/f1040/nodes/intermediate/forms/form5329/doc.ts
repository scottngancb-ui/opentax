import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 5329",
  subtitle: "Additional Taxes on Qualified Plans (Including IRAs) and Other Tax-Favored Accounts",
  topic: Topic.Retirement,
  summary:
    "The form that figures penalty taxes on retirement and other tax-favored accounts: 10% on early distributions (25% for some " +
    "SIMPLE IRA withdrawals), 10% on taxable Coverdell, 529 or ABLE distributions, and 6% on excess contributions. It is " +
    "filled in automatically from Forms 1099-R, 4852 and 8889. The total goes to Schedule 2 line 8.",
  fields: {
    distribution_code: "The 1099-R box 7 distribution code, passed through for reference. Not used in the math.",
    early_distribution: "Part I, line 1. Early distributions (generally before age 59½) included in income.",
    early_distribution_exception: "Part I, line 2. The part of the early distributions that qualifies for an exception to the 10% tax.",
    simple_ira_early_distribution:
      "Early distribution from a SIMPLE IRA within the first two years of participation. Taxed at 25% instead of 10%.",
    esa_able_distribution: "Part II, line 5. Taxable distributions from a Coverdell ESA, qualified tuition program (529) or ABLE account.",
    esa_able_exception: "Part II, line 6. The part of those distributions that is not subject to the 10% additional tax.",
    excess_traditional_ira: "Part III. Excess contributions to traditional IRAs. Taxed at 6%.",
    traditional_ira_value:
      "Value of your traditional IRAs at year end. The 6% tax applies to the smaller of the excess or this value.",
    excess_roth_ira: "Part IV. Excess contributions to Roth IRAs. Taxed at 6%.",
    roth_ira_value: "Value of your Roth IRAs at year end. Caps the base for the 6% tax.",
    excess_coverdell_esa: "Part V. Excess contributions to Coverdell education savings accounts. Taxed at 6%.",
    coverdell_esa_value: "Value of the Coverdell ESAs at year end. Caps the base for the 6% tax.",
    excess_archer_msa: "Part VI. Excess contributions to Archer MSAs. Taxed at 6%.",
    archer_msa_value: "Value of your Archer MSAs at year end. Caps the base for the 6% tax.",
    excess_hsa: "Part VII. Excess contributions to health savings accounts, often from Form 8889. Taxed at 6%.",
    hsa_value: "Value of your HSAs at year end. Caps the base for the 6% tax.",
    excess_able: "Part VIII. Excess contributions to an ABLE account. Taxed at 6%.",
    able_value: "Value of the ABLE account at year end. Caps the base for the 6% tax.",
  },
};
