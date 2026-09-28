import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8958",
  subtitle: "Allocation of Tax Amounts Between Certain Individuals in Community Property States",
  topic: Topic.Household,
  summary:
    "The form married people domiciled in a community property state (such as California or Texas) attach to separate returns to show how income, " +
    "deductions, credits and withholding were split between the spouses under state community property law. " +
    "It is a disclosure only: you enter your share of each item on your own return, and the engine records this allocation without changing any amounts.",
  fields: {
    state: "The community property state where you were domiciled.",
    allocation_items: "One line per income, deduction or withholding item being split between spouses.",
    "allocation_items.description": "What the item is, such as wages from a named employer or interest from a named bank.",
    "allocation_items.total_amount": "The total amount of the item for both spouses.",
    "allocation_items.taxpayer_share": "The part of the item allocated to you.",
    "allocation_items.spouse_share": "The part of the item allocated to your spouse.",
    taxpayer_total_income: "Your total allocated income.",
    spouse_total_income: "Your spouse's total allocated income.",
    taxpayer_withholding: "Federal income tax withholding allocated to you.",
    spouse_withholding: "Federal income tax withholding allocated to your spouse.",
  },
};
