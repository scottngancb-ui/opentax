import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8978",
  subtitle: "Partner's Additional Reporting Year Tax",
  topic: Topic.PassThrough,
  summary:
    "The form a partner files after a partnership audit when the partnership pushes the audit adjustments out to its partners on Form 8986 " +
    "instead of paying the tax itself. You refigure the tax for the audited year and any years since, and pay the difference with this year's return. " +
    "The engine uses a simplified estimate (net adjustments times your tax rate, 37% by default) and adds it to Schedule 2 as another additional tax.",
  fields: {
    reviewed_tax_year: "The partnership tax year that was audited (the reviewed year), from Form 8986. Must be 2018 or later.",
    positive_adjustments_share: "Your share of the adjustments that increase income or reduce deductions, from Form 8986.",
    negative_adjustments_share: "Your share of the adjustments that reduce income or increase deductions, from Form 8986. They offset the tax from positive adjustments.",
    partner_tax_rate: "Your marginal tax rate for the reviewed year, as a decimal. The engine uses 37% if you leave it blank.",
    intervening_year_adjustments: "The net change in tax for the years between the reviewed year and now, such as from changed carryforwards. Can be negative.",
  },
};
