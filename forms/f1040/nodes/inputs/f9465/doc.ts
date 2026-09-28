import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 9465",
  subtitle: "Installment Agreement Request",
  topic: Topic.Payments,
  summary:
    "The form used to ask the IRS for a monthly payment plan when you cannot pay the full balance due with your return. " +
    "You propose a monthly amount and payment date, and can choose automatic withdrawals from a bank account. " +
    "It does not change the tax you owe (interest and penalties still apply); the engine records the request without computing anything.",
  fields: {
    amount_owed: "The balance due you are asking to pay in installments.",
    monthly_payment: "The amount you propose to pay each month.",
    payment_day: "The day of the month (1 to 28) you want each payment due.",
    bank_routing_number: "Your bank's routing number, for automatic monthly withdrawals.",
    bank_account_number: "Your bank account number, for automatic monthly withdrawals.",
    direct_debit: "Mark to pay by automatic withdrawal from your bank account (a direct debit installment agreement) instead of by check.",
    prior_installment_agreement: "Mark if you have had an installment agreement with the IRS before, which can affect the setup fee.",
    low_income: "Mark if you qualify as low income, which can reduce or waive the setup fee.",
  },
};
