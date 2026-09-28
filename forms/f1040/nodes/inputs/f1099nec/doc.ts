import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-NEC",
  subtitle: "Nonemployee Compensation",
  topic: Topic.Business,
  summary:
    "The information return a business sends by January 31 to a contractor, freelancer or other non-employee it paid for services. " +
    "Box 1 pay usually goes to Schedule C as self-employment income, which also brings in self-employment tax, but you can route it to " +
    "Schedule F, Form 8919 or Schedule 1 instead. Backup withholding in box 4 counts as a payment on Form 1040 line 25b. Enter one form per payer.",
  fields: {
    payer_name: "The name of the business or person who paid you.",
    payer_tin: "The payer's taxpayer identification number (EIN or SSN).",
    box1_nec:
      "Box 1. Fees, commissions and other pay for services you performed as a non-employee. Sent to the destination chosen in the routing field (Schedule C by default).",
    box2_direct_sales:
      "Box 2. Checked if the payer sold you $5,000 or more of consumer products for resale. Informational only; it has no dollar amount.",
    box3_golden_parachute:
      "Box 3. Excess golden parachute payments. Reported as other income on Schedule 1, and a 20% excise tax on the amount is added on Schedule 2.",
    box4_federal_withheld:
      "Box 4. Federal income tax withheld, normally backup withholding. Counts as a payment on Form 1040 line 25b.",
    for_routing:
      "Where box 1 income is reported. If you leave it blank, it goes to Schedule C.",
  },
  options: {
    for_routing: {
      schedule_c: "Schedule C: business or self-employment income, subject to self-employment tax.",
      schedule_f: "Schedule F: farming income.",
      form_8919:
        "Form 8919: you were really an employee misclassified as a contractor, so only the employee share of Social Security and Medicare tax applies.",
      schedule_1_line_8z:
        "Schedule 1 line 8z: other income not from a trade or business, such as an occasional one-time payment. No self-employment tax.",
    },
  },
};
