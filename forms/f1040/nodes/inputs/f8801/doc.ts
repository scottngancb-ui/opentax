import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8801",
  subtitle: "Credit for Prior Year Minimum Tax — Individuals, Estates, and Trusts",
  topic: Topic.TaxComputation,
  summary:
    "The form that lets you recover alternative minimum tax paid in an earlier year as a credit against this year's regular tax. " +
    "You need it if you paid AMT before or have an unused credit carried forward. " +
    "The credit is limited to how much your regular tax exceeds this year's tentative minimum tax; the engine sends the allowed amount to Schedule 3 as a nonrefundable credit, and the rest carries forward.",
  fields: {
    prior_year_amt_paid: "The alternative minimum tax you paid in the prior year that can generate the credit.",
    prior_year_carryforward: "Unused minimum tax credit carried forward from last year's Form 8801.",
    current_year_regular_tax: "This year's regular income tax before credits.",
    current_year_tmt: "This year's tentative minimum tax from Form 6251. The credit cannot reduce your tax below this amount.",
  },
};
