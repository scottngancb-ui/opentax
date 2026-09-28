import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1040-ES",
  subtitle: "Estimated Tax for Individuals",
  topic: Topic.Payments,
  summary:
    "The record of quarterly estimated tax payments you sent the IRS for the year, typically because you had income without enough withholding, such as self-employment, investment or retirement income. " +
    "The engine adds the four quarterly payments and any prior-year overpayment you applied to this year, and reports the total on Form 1040 line 26 as a payment against your tax.",
  fields: {
    payment_q1: "The estimated tax payment you made for the first quarter (normally due in mid-April).",
    payment_q2: "The estimated tax payment you made for the second quarter (normally due in mid-June).",
    payment_q3: "The estimated tax payment you made for the third quarter (normally due in mid-September).",
    payment_q4: "The estimated tax payment you made for the fourth quarter (normally due in mid-January of the following year).",
    payment_q1_date: "The date you made the first-quarter payment (YYYY-MM-DD). Payment timing matters for the underpayment penalty.",
    payment_q2_date: "The date you made the second-quarter payment (YYYY-MM-DD).",
    payment_q3_date: "The date you made the third-quarter payment (YYYY-MM-DD).",
    payment_q4_date: "The date you made the fourth-quarter payment (YYYY-MM-DD).",
    applied_from_prior_year:
      "Last year's overpayment that you chose to apply to this year's estimated tax instead of receiving as a refund. Included in Form 1040 line 26.",
  },
};
