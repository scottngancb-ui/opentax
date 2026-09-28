import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8995",
  subtitle: "Qualified Business Income Deduction Simplified Computation",
  topic: Topic.Deductions,
  summary:
    "The simplified form for the qualified business income (QBI) deduction: up to 20% of net income from sole proprietorships, farms, rentals and pass-through businesses, plus 20% of REIT dividends, limited to 20% of taxable income minus net capital gain. " +
    "Filled in automatically from Schedules C, E and F, K-1s, 1099-DIV box 5, Schedule SE, retirement and health insurance deductions, and AGI. " +
    "The deduction goes to Form 1040 line 13. If taxable income is over $197,300 ($394,600 joint), the engine sends the figures to Form 8995-A instead.",
  fields: {
    qbi_from_schedule_c: "Net qualified business income or loss from your Schedule C businesses.",
    qbi_from_schedule_f: "Net qualified business income or loss from Schedule F farming.",
    qbi: "Qualified business income or loss from rentals, partnerships and S corporations (Schedule E and K-1s).",
    w2_wages: "W-2 wages paid by the businesses. Not used on this form; passed to Form 8995-A when income is above the threshold.",
    unadjusted_basis: "Unadjusted basis of the businesses' qualified property (UBIA). Passed to Form 8995-A when income is above the threshold.",
    sstb_qbi: "Qualified business income from specified service businesses, such as health, law, consulting or financial services.",
    sstb_w2_wages: "W-2 wages paid by specified service businesses, passed to Form 8995-A when needed.",
    sstb_unadjusted_basis: "Qualified property basis of specified service businesses, passed to Form 8995-A when needed.",
    line6_sec199a_dividends: "Line 6. Qualified REIT dividends, from Form 1099-DIV box 5.",
    taxable_income: "Line 11. Taxable income before the QBI deduction. When given, it is used for the income limit.",
    net_capital_gain: "Line 12. Net capital gain plus qualified dividends, which is subtracted before applying the income limit.",
    se_tax_deduction: "The deductible part of self-employment tax tied to the businesses. It reduces QBI.",
    se_health_insurance_deduction: "Self-employed health insurance deduction tied to the businesses. It reduces QBI.",
    retirement_plan_deduction: "Deduction for SEP, SIMPLE or other self-employed retirement contributions. It reduces QBI.",
    qbi_loss_carryforward: "Line 3. Qualified business net loss carried forward from last year, entered as a negative number.",
    reit_loss_carryforward: "Line 7. REIT dividend and publicly traded partnership net loss carried forward, entered as a negative number.",
    agi: "Your AGI. If taxable income isn't given, the engine subtracts your standard deduction from it to estimate taxable income.",
    filing_status: "Your filing status, used for the standard deduction estimate and the threshold for Form 8995-A.",
    taxpayer_age_65_or_older: "Whether you are 65 or older, which raises the standard deduction used in the estimate.",
    taxpayer_blind: "Whether you are blind, which raises the standard deduction used in the estimate.",
    spouse_age_65_or_older: "Whether your spouse is 65 or older, for the standard deduction estimate.",
    spouse_blind: "Whether your spouse is blind, for the standard deduction estimate.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately (the engine uses the single threshold)",
      mfj: "Married filing jointly (higher threshold)",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse (the engine uses the single threshold)",
    },
  },
};
