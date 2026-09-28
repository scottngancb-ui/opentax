import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1098-E",
  subtitle: "Student Loan Interest Statement",
  topic: Topic.Education,
  summary:
    "The statement a student loan lender or servicer sends by January 31 showing the student loan interest you paid during the year. " +
    "The interest can be deducted as an adjustment to income on the student loan interest line of Schedule 1 Part II, capped at $2,500 per return, " +
    "which lowers adjusted gross income. The engine totals box 1 across all your 1098-E forms and applies the cap; it does not apply the income-based phase-out. " +
    "Enter one form per lender.",
  fields: {
    box1_student_loan_interest:
      "Box 1. Student loan interest the lender received from you during the year. The engine adds these amounts and deducts up to $2,500.",
    box2_origination_fees_excluded:
      "Box 2. Checked if box 1 does not include loan origination fees or capitalized interest for loans made before September 1, 2004. " +
      "You may have additional deductible interest not shown; the engine records this box but does not add anything for it.",
    lender_name: "The name of the lender or loan servicer, for your reference.",
  },
};
