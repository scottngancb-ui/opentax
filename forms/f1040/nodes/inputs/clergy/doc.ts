import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Clergy income",
  subtitle: "Minister's housing allowance and self-employment tax",
  topic: Topic.Wages,
  summary:
    "Special treatment for ministers who are ordained, licensed or commissioned. A minister is an employee for income tax but is self-employed for Social Security and Medicare on ministerial pay. " +
    "The engine excludes a qualifying housing allowance or parsonage from income (as a negative amount on Schedule 1 line 8z) and sends ministerial wages plus the designated housing allowance to Schedule SE, " +
    "unless you have an approved Form 4361 exemption.",
  fields: {
    ministerial_wages: "Wages the church paid you for ministerial services, as shown in W-2 box 1. Included in your self-employment earnings.",
    housing_allowance_designated:
      "The housing allowance the church officially designated for you in advance. It is included in your self-employment earnings.",
    actual_housing_expenses:
      "What you actually spent to provide a home during the year, such as rent or mortgage payments, utilities and repairs.",
    fair_market_rental_value:
      "The fair rental value of your home, including furnishings and utilities. The excluded allowance is the smallest of the designated allowance, actual expenses and this value.",
    parsonage_value:
      "The fair rental value of a home the church provided to you (a parsonage). The engine excludes it from income.",
    has_4361_exemption:
      "Check if the IRS approved your Form 4361 exemption from self-employment tax on ministerial earnings. Nothing is then sent to Schedule SE.",
    is_ordained_minister:
      "Check if you are an ordained, licensed or commissioned minister. If not checked, the engine applies neither the housing exclusion nor the self-employment treatment.",
  },
};
