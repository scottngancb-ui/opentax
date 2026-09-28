import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8615",
  subtitle: "Tax for Certain Children Who Have Unearned Income",
  topic: Topic.TaxComputation,
  summary:
    "The \"kiddie tax\" form: a child's investment income above a threshold is taxed at the parent's rate instead of the child's. " +
    "It applies to children under 19, or under 24 if a full-time student, with at least one living parent. " +
    "No other form feeds it in the engine; you supply the child's and parent's figures directly. The extra tax goes to Schedule 2.",
  fields: {
    net_unearned_income: "The child's net unearned income (interest, dividends, capital gains and the like). The engine taxes the amount above $2,600 at the parent's rate.",
    parent_taxable_income: "Line 7. The parent's taxable income from the parent's Form 1040.",
    parent_filing_status: "The parent's filing status, which picks the tax bracket table used.",
    parent_tax: "Line 8. The tax on the parent's taxable income alone. The kiddie tax is the tax on parent plus child income minus this amount.",
  },
  options: {
    parent_filing_status: {
      single: "Single (single brackets)",
      mfs: "Married filing separately (separate brackets)",
      mfj: "Married filing jointly (joint brackets)",
      hoh: "Head of household (the engine uses single brackets)",
      qss: "Qualifying surviving spouse (joint brackets)",
    },
  },
};
