import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule H",
  subtitle: "Household Employment Taxes",
  topic: Topic.Wages,
  summary:
    "Reports Social Security, Medicare, federal unemployment (FUTA) and withheld income tax for household employees such as nannies, " +
    "housekeepers or caregivers you pay directly. You need it if you paid any one household employee cash wages of $2,800 or more in 2025, " +
    "withheld federal income tax, or owe FUTA. The engine adds both the employer and employee shares of Social Security and Medicare, " +
    "any income tax withheld and FUTA, and reports the total on Schedule 2 as household employment taxes.",
  fields: {
    total_cash_wages:
      "Total cash wages you paid to household employees in 2025. If you leave the FICA wage fields blank, the engine treats all of it as subject to Social Security and Medicare when it reaches the $2,800 threshold.",
    fica_wages:
      "Cash wages subject to Social Security and Medicare taxes. Overrides the engine's threshold test on total cash wages when entered.",
    ss_wages:
      "Line 1. Wages subject to Social Security tax, up to the annual wage base. The employer and employee shares are each 6.2%.",
    medicare_wages: "Line 3. Wages subject to Medicare tax (no cap). The employer and employee shares are each 1.45%.",
    federal_income_tax_withheld:
      "Line 7. Federal income tax you withheld from household employees' pay, which you only do if the employee asked you to. Included in the Schedule H total.",
    employee_ss_withheld:
      "The employee's 6.2% share of Social Security tax you withheld from their pay. If blank, the engine figures it from the Social Security wages.",
    employee_medicare_withheld:
      "The employee's 1.45% share of Medicare tax you withheld from their pay. If blank, the engine figures it from the Medicare wages.",
    futa_wages:
      "Wages subject to federal unemployment (FUTA) tax, generally the first $7,000 per employee. For reference only; the engine uses the FUTA tax you enter.",
    futa_tax: "Federal unemployment (FUTA) tax you owe, after any credit for state unemployment contributions. Added to the Schedule H total.",
  },
};
