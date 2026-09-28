import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Sales tax deduction",
  subtitle: "IRS worksheet (state and local general sales taxes)",
  topic: Topic.Deductions,
  summary:
    "If you itemize, you may deduct state and local general sales taxes instead of state and local income taxes. " +
    "Use your actual receipts, or the amount from the IRS Optional Sales Tax Tables plus tax on major purchases such as a car or boat. " +
    "The amount goes to Schedule A line 5a, where it counts toward the state and local tax (SALT) limit.",
  fields: {
    method: "How you figure the deduction: from actual receipts or from the IRS tables.",
    actual_sales_tax_paid: "Total general sales tax you paid during the year, from your receipts. Used with the actual method.",
    table_amount: "The amount from the IRS Optional State Sales Tax Tables for your state, income and family size. Used with the table method.",
    major_purchase_tax: "Sales tax paid on major purchases such as a vehicle, boat, aircraft or home. Added to the table amount; ignored with the actual method, where it is already in your receipts.",
  },
  options: {
    method: {
      actual: "Deduct the sales tax you actually paid, based on receipts.",
      table: "Use the IRS Optional Sales Tax Tables amount, plus any sales tax on major purchases.",
    },
  },
};
