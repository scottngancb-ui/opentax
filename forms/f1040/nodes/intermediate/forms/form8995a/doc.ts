import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8995-A",
  subtitle: "Qualified Business Income Deduction",
  topic: Topic.Deductions,
  summary:
    "The full form for the qualified business income deduction, used when taxable income is above $197,300 ($394,600 joint). " +
    "Filled in automatically by Form 8995 when income is over that threshold, with REIT dividends from 1099-DIV and aggregation elections from the QBI aggregation entry. " +
    "It phases in the W-2 wage and property limit and phases out specified service business income over a $50,000 range ($100,000 joint). The deduction goes to Form 1040 line 13.",
  fields: {
    filing_status: "Your filing status, which sets the threshold and phase-in range.",
    taxable_income: "Taxable income before the QBI deduction.",
    net_capital_gain: "Net capital gain plus qualified dividends, subtracted before the 20%-of-income limit.",
    qbi: "Qualified business income from businesses that aren't specified service businesses, after related deductions.",
    w2_wages: "W-2 wages paid by those businesses. The limit is the greater of 50% of wages or 25% of wages plus 2.5% of property basis.",
    unadjusted_basis: "Unadjusted basis immediately after acquisition (UBIA) of those businesses' qualified property.",
    sstb_qbi: "Qualified business income from specified service businesses (such as health, law or consulting). It is reduced as income rises through the range.",
    sstb_w2_wages: "W-2 wages paid by specified service businesses, reduced the same way.",
    sstb_unadjusted_basis: "Qualified property basis of specified service businesses, reduced the same way.",
    line6_sec199a_dividends: "Qualified REIT dividends, from Form 1099-DIV box 5.",
    qbi_loss_carryforward: "Qualified business net loss carried forward from last year, entered as a negative number.",
    reit_loss_carryforward: "REIT dividend and publicly traded partnership net loss carried forward, entered as a negative number.",
    aggregation_groups: "Groups of businesses you elected to treat as one for the wage and property limit (Schedule B of Form 8995-A).",
    "aggregation_groups.group_name": "The name you gave the aggregation group.",
    "aggregation_groups.business_names": "The businesses included in the group.",
    "aggregation_groups.combined_for_limitation": "Whether the group is combined when applying the W-2 wage and property limit.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately (the engine uses the single threshold)",
      mfj: "Married filing jointly (higher threshold and range)",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse (the engine uses the single threshold)",
    },
  },
};
