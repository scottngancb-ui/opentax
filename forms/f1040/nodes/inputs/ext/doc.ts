import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4868",
  subtitle: "Application for Automatic Extension of Time to File U.S. Individual Income Tax Return",
  topic: Topic.Payments,
  summary:
    "The request for an automatic six-month extension of time to file your return. It extends only the time to file, not the time to pay: " +
    "tax is still due by the original April deadline. You estimate your total tax and payments and may send a payment with the request. " +
    "When you later file, the amount you paid with the extension is credited on Schedule 3 line 10, which flows to Form 1040 payments.",
  fields: {
    produce_4868:
      "Enter \"X\" to prepare Form 4868. Without it, nothing on this screen has any effect, including the extension payment.",
    line_4_total_tax: "Line 4. Your reasonable estimate of total tax for the year (the amount expected on Form 1040 line 24).",
    line_5_total_payments:
      "Line 5. Your estimate of total payments for the year, such as withholding and estimated tax, not counting the amount you pay with this form.",
    line_7_amount_paying:
      "Line 7. The amount you are paying with the extension request. It goes to Schedule 3 line 10 as a payment on your return.",
    line_8_out_of_country:
      "Line 8. Check if you live and work outside the U.S. and Puerto Rico, or are in military service abroad, on the due date. Informational only.",
    line_9_1040nr_no_wages:
      "Line 9. Check if you file Form 1040-NR and had no wages subject to U.S. income tax withholding. Informational only.",
    extension_previously_filed:
      "Software flag: check once the extension has been filed so the return itself can be e-filed. No tax effect.",
    produce_1040v: "Print a Form 1040-V payment voucher to mail with a check for the extension payment. No tax effect.",
    amount_on_1040v:
      "An amount to print on the 1040-V voucher instead of the line 7 amount. Does not change the extension or the return.",
  },
};
