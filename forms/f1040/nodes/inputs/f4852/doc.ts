import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4852",
  subtitle: "Substitute for Form W-2 or Form 1099-R",
  topic: Topic.Wages,
  summary:
    "A form you complete yourself when an employer or payer never sent your W-2 or 1099-R, or sent one that is wrong and was not corrected. " +
    "You estimate the missing figures from pay stubs or statements. Wages go to Form 1040 line 1a and W-2 withholding to line 25a; " +
    "pension and IRA amounts go to lines 5a/5b or 4a/4b, with their withholding on line 25b. Enter one per employer or payer.",
  fields: {
    form_type: "Which form this substitutes: a W-2 (Part I) or a 1099-R (Part II). Decides which of the fields below are used.",
    payer_name: "Name of the employer or payer who should have issued the form.",
    payer_tin: "The employer's or payer's identification number (EIN), if you know it.",
    wages: "Line 7a (W-2 box 1). Wages, tips and other pay. Added to Form 1040 line 1a.",
    federal_withheld:
      "Line 7b or 8c. Federal income tax withheld. For a W-2 substitute it goes to Form 1040 line 25a; for a 1099-R substitute, to line 25b.",
    social_security_wages: "Line 7c (W-2 box 3). Wages subject to Social Security tax.",
    social_security_withheld:
      "Line 7d (W-2 box 4). Social Security tax withheld. With two or more W-2 substitutes, the total is sent to Schedule 3 for the excess Social Security credit.",
    medicare_wages: "Line 7e (W-2 box 5). Wages and tips subject to Medicare tax. Used by Form 8959 for Additional Medicare Tax.",
    medicare_withheld: "Line 7f (W-2 box 6). Medicare tax withheld. Sent to Form 8959.",
    gross_distribution: "Line 8a (1099-R box 1). Total amount distributed from the plan or IRA. Required for a 1099-R substitute.",
    taxable_amount:
      "Line 8b (1099-R box 2a). The taxable part of the distribution. If left blank, the engine treats the whole gross distribution as taxable.",
    is_ira:
      "Mark if the distribution came from an IRA, SEP or SIMPLE IRA. IRA amounts go to Form 1040 lines 4a/4b; others go to lines 5a/5b as pensions.",
    capital_gain:
      "1099-R box 3. The capital gain portion included in the taxable amount. Recorded, but the engine currently taxes it as ordinary income with the rest.",
    employee_contributions:
      "1099-R box 5. Your own after-tax contributions or insurance premiums. The engine subtracts this from the taxable amount.",
    distribution_code:
      "1099-R box 7 distribution code. Code 1 (early distribution) sends the taxable amount to Form 5329 for the additional tax on early withdrawals.",
  },
  options: {
    form_type: {
      W2: "Substitute for Form W-2 (wages from an employer)",
      R_1099: "Substitute for Form 1099-R (pension, annuity, IRA or other retirement distribution)",
    },
  },
};
