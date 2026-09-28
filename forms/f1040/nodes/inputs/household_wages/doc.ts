import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Household employee wages",
  subtitle: "Wages from a household employer (Form 1040 line 1b)",
  topic: Topic.Wages,
  summary:
    "Pay you received as a household employee, such as a nanny, housekeeper or caregiver working for a private family. " +
    "Enter one entry per household employer. The wages go to Form 1040 line 1b, federal tax withheld counts as a payment on line 25a, " +
    "and Medicare wages and tax feed Form 8959 (Additional Medicare Tax). " +
    "This is the worker's side; a family that employs household help reports its own taxes on Schedule H.",
  fields: {
    wages_received: "Gross wages you were paid by this household employer (the box 1 amount if you got a W-2). Added to Form 1040 line 1b.",
    federal_income_tax_withheld: "Federal income tax the employer withheld (W-2 box 2). Counts as a payment on Form 1040 line 25a.",
    social_security_wages: "Wages subject to Social Security tax (W-2 box 3). Recorded for reference.",
    medicare_wages: "Wages subject to Medicare tax (W-2 box 5). Sent to Form 8959 to test for Additional Medicare Tax.",
    ss_tax_withheld: "Social Security tax the employer withheld from your pay (W-2 box 4). Recorded for reference.",
    medicare_tax_withheld: "Medicare tax the employer withheld (W-2 box 6). Sent to Form 8959, where any Additional Medicare Tax withheld is credited.",
    employer_name: "Name of the household employer. For your records only.",
    employer_ein: "The employer's identification number, if it has one. For your records only.",
  },
};
