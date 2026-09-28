import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8917",
  subtitle: "Tuition and Fees Deduction",
  topic: Topic.Education,
  summary:
    "The form that once let you deduct qualified college tuition and fees as an adjustment to income. The deduction was repealed for tax years " +
    "after 2020, so it has no effect on a 2025 federal return. The engine keeps the entries for reference (some states still allow a similar deduction) " +
    "but sends nothing to Form 1040. For 2025, education costs are claimed through the American opportunity or lifetime learning credits on Form 8863.",
  fields: {
    tuition_and_fees_paid: "The qualified tuition and fees you paid to an eligible school. Not deductible federally for 2025.",
    student_name: "Column (a). The student's name: you, your spouse or a dependent.",
    student_ssn: "Column (b). The student's Social Security number.",
    institution_ein: "The school's employer identification number, which identifies it as an eligible educational institution.",
    academic_period: "The academic term the payment covered, such as Fall 2025.",
  },
};
