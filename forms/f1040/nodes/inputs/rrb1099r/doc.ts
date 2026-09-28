import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form RRB-1099-R",
  subtitle: "Railroad retirement benefits (Forms RRB-1099 and RRB-1099-R)",
  topic: Topic.Retirement,
  summary:
    "The statements the U.S. Railroad Retirement Board sends early each year to people who received railroad retirement benefits. " +
    "The Social Security equivalent part of tier 1 is taxed like Social Security and goes to Form 1040 line 6a; " +
    "tier 2 and other non-SSEB pension amounts are taxed like a pension on lines 5a and 5b. Federal tax withheld goes to line 25b. " +
    "Enter one entry per statement.",
  fields: {
    payer_name: "The payer shown on the statement, normally the Railroad Retirement Board.",
    box3_sseb_gross: "Form RRB-1099 box 3. Gross Social Security equivalent benefit (SSEB) portion of tier 1 paid to you during the year.",
    box4_sseb_repaid: "Form RRB-1099 box 4. SSEB benefits you repaid to the Board during the year.",
    box5_sseb_net: "Form RRB-1099 box 5. Net SSEB (gross minus repaid). If entered, it is used as is; otherwise gross minus repaid is used. Goes to Form 1040 line 6a.",
    box6_medicare_premiums: "Medicare premiums deducted from your benefits. Recorded only; the engine does not use it.",
    box7_sseb_withheld: "Federal income tax withheld from the SSEB (tier 1) payments. Counts as a payment on Form 1040 line 25b.",
    box8_tier2_gross: "Gross tier 2 and other non-SSEB pension or annuity paid. Goes to Form 1040 line 5a.",
    box9_tier2_taxable: "Taxable part of the non-SSEB pension, when you already know it. Used when no taxable amount override is entered and the Simplified Method is not selected.",
    box10_tier2_withheld: "Federal income tax withheld from the non-SSEB pension payments. Counts as a payment on Form 1040 line 25b.",
    box2a_taxable_amount: "Taxable amount of the non-SSEB pension from your own Simplified Method worksheet. When entered it overrides every other way of figuring line 5b.",
    box5b_employee_contributions: "Your after-tax contributions (cost) in the pension. The Simplified Method recovers this cost tax-free over time.",
    simplified_method_flag: "Mark to have the engine figure the tax-free part of the non-SSEB pension using the IRS Simplified Method.",
    age_at_annuity_start: "Your age when the annuity began. Sets the number of expected monthly payments in the Simplified Method table.",
    prior_excludable_recovered: "Cost you already recovered tax-free in earlier years. Reduces the cost left to recover.",
  },
};
