import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-PATR",
  subtitle: "Taxable Distributions Received From Cooperatives",
  topic: Topic.OtherIncome,
  summary:
    "The information return a cooperative, such as a farm supply or consumer co-op, sends early in the year to report patronage dividends and other distributions to its members. " +
    "For patrons who are not in a trade or business, the engine adds patronage dividends, nonpatronage distributions, per-unit retains and redeemed nonqualified notices " +
    "to other income on Schedule 1 line 8z. Amounts marked as business income are not routed here and belong on your Schedule C or F. Withholding goes to Form 1040 line 25b.",
  fields: {
    box1_patronage_dividends:
      "Box 1. Patronage dividends paid in cash, qualified written notices of allocation or other property. Taxable income.",
    box2_nonpatronage_distributions: "Box 2. Distributions from the co-op's business not done with or for its patrons. Taxable income.",
    box3_per_unit_retain: "Box 3. Per-unit retain allocations paid in money or qualified checks. Taxable income.",
    box4_federal_withheld: "Box 4. Federal income tax withheld, usually backup withholding. Counts as a payment on Form 1040 line 25b.",
    box5_redeemed_nonqualified:
      "Box 5. Amounts the co-op paid you this year to redeem nonqualified written notices of allocation. Taxable in the year redeemed.",
    box6_dpad:
      "Legacy domestic production activities deduction passed through by the co-op. That deduction expired after 2017, so the engine ignores this amount.",
    box7_qualified_payments:
      "Qualified payments from an agricultural or horticultural co-op, used in the qualified business income deduction. Recorded only; the engine does not use it.",
    box8_qualified_written_notice: "Qualified written notices of allocation at their stated dollar amount. Informational.",
    box9_section199a_deduction:
      "The section 199A(g) deduction the co-op passed through to you, claimed with the qualified business income deduction. Recorded only; the engine does not use it.",
    payer_name: "The cooperative's name.",
    payer_tin: "The cooperative's taxpayer identification number.",
    account_number: "The account number the co-op assigned to you, if any.",
    trade_or_business:
      "Mark if these distributions relate to your trade or business, such as farming. Business amounts are left for your Schedule C or F instead of Schedule 1.",
  },
};
