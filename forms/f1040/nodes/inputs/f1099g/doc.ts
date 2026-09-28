import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-G",
  subtitle: "Certain Government Payments",
  topic: Topic.OtherIncome,
  summary:
    "The form a federal, state or local government agency sends by January 31 to report payments such as unemployment compensation, state or local income tax refunds, " +
    "taxable grants and agricultural payments. Unemployment goes to Schedule 1 line 7 and a taxable state refund to Schedule 1 line 1; " +
    "agricultural payments go to Schedule F, and federal tax withheld is credited on Form 1040 line 25b. Enter one form per payer.",
  fields: {
    box_1_unemployment: "Box 1. Unemployment compensation you received. The net amount after repayments goes to Schedule 1 line 7.",
    box_1_repaid: "Unemployment benefits you received this year and repaid this year. Subtracted from box 1.",
    box_1_railroad: "Check if box 1 includes unemployment paid by the Railroad Retirement Board. No effect on the amount.",
    box_2_state_refund:
      "Box 2. A refund, credit or offset of state or local income tax. Taxable only if you deducted that tax as an itemized deduction in the earlier year.",
    box_2_prior_year_itemized:
      "Check if you itemized deductions (and deducted state or local income tax) in the year the refund relates to. When checked, the engine reports the full box 2 amount on Schedule 1 line 1.",
    box_3_tax_year: "Box 3. The tax year the box 2 refund relates to, if it is not the prior year.",
    box_4_federal_withheld: "Box 4. Federal income tax withheld. Credited on Form 1040 line 25b.",
    box_5_rtaa:
      "Box 5. Reemployment Trade Adjustment Assistance (RTAA) payments. Taxable as other income on Schedule 1 line 8z; the engine reports them only when the total is $600 or more.",
    box_6_taxable_grants:
      "Box 6. Taxable grants from a government agency. Reported as other income on Schedule 1 line 8z when the total is $600 or more.",
    box_7_agriculture: "Box 7. USDA agricultural program payments. Reported as government payments on Schedule F line 4a.",
    box_8_trade_or_business:
      "Box 8. Checked if the box 2 refund is of a tax that applies only to business income. Informational; the engine does not change routing for it.",
    box_9_market_gain: "Box 9. Market gain on Commodity Credit Corporation loans repaid. Reported on Schedule F line 5.",
    box_10a_state: "Box 10a. The state, if state tax was withheld.",
    box_10b_state_id: "Box 10b. The payer's state identification number.",
    box_11_state_withheld: "Box 11. State income tax withheld. Used for the state return; not used on the federal return here.",
    payer_name: "The name of the government agency that made the payments.",
    payer_tin: "The payer's federal identification number.",
    account_number: "The account number the payer assigned, if any.",
  },
};
