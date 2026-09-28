import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 982",
  subtitle: "Reduction of Tax Attributes Due to Discharge of Indebtedness",
  topic: Topic.OtherIncome,
  summary:
    "The form you file to exclude canceled debt from income, for example because of bankruptcy, insolvency or qualified principal residence debt. " +
    "Filled in automatically from Form 1099-C entries you mark as excluded. " +
    "The engine checks the exclusion against its limit (the amount of insolvency, or $750,000 for principal residence debt) and adds any excess back as taxable canceled debt on Schedule 1 line 8c. " +
    "It does not track the reduction of other tax attributes.",
  fields: {
    line2_excluded_cod: "Line 2. Total canceled debt you are excluding from income, from your Forms 1099-C.",
    exclusion_type: "Lines 1a–1e. The reason the canceled debt can be excluded.",
    insolvency_amount: "How much your liabilities exceeded the fair market value of your assets just before the debt was canceled. The insolvency exclusion can't be more than this.",
    qpri_mfs: "Check if you file married filing separately. It lowers the principal residence exclusion limit to $375,000.",
  },
  options: {
    exclusion_type: {
      bankruptcy: "Line 1a. Debt discharged in a Title 11 bankruptcy case (no dollar limit)",
      insolvency: "Line 1b. Debt discharged while insolvent, limited to the amount of insolvency",
      farm_debt: "Line 1c. Qualified farm indebtedness",
      real_property_business: "Line 1d. Qualified real property business indebtedness",
      qpri: "Line 1e. Qualified principal residence indebtedness, up to $750,000 ($375,000 if married filing separately)",
    },
  },
};
