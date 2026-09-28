import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Educator expenses",
  subtitle: "Educator expenses deduction (Schedule 1, line 11)",
  topic: Topic.Deductions,
  summary:
    "The deduction for unreimbursed classroom costs paid by an eligible K-12 teacher, instructor, counselor, principal or aide who worked at least 900 hours in a school during the school year. " +
    "Each eligible educator can deduct up to $300, including professional development courses; on a joint return where both spouses are educators, up to $300 each. " +
    "The engine sends the allowed amount to Schedule 1 line 11, which reduces adjusted gross income.",
  fields: {
    educator1_expenses:
      "Unreimbursed amounts the first educator (you) paid for books, supplies, computer equipment and other classroom materials.",
    educator2_expenses:
      "Unreimbursed classroom expenses of the second educator (your spouse). Counted only on a married filing jointly return.",
    filing_status:
      "Your filing status. Filled in automatically from the return; only married filing jointly allows a second educator's $300.",
    educator1_hours_worked:
      "Hours the first educator worked as a K-12 educator during the school year. If entered and under 900, no deduction is allowed; if blank, the engine assumes you qualify.",
    educator2_hours_worked:
      "Hours the second educator worked as a K-12 educator during the school year. Under 900 means that spouse's deduction is zero.",
    educator1_professional_development:
      "Qualified professional development course costs for the first educator. Added to classroom expenses under the same $300 cap.",
    educator2_professional_development:
      "Qualified professional development course costs for the second educator. Added to that spouse's expenses under the same $300 cap.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
