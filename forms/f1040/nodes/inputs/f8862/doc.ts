import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8862",
  subtitle: "Information To Claim Certain Credits After Disallowance",
  topic: Topic.Family,
  summary:
    "The form you file to claim the earned income credit, child tax credit (or additional child tax credit or credit for other dependents) or American opportunity credit again after the IRS reduced or disallowed it in an earlier year for a reason other than a math error. " +
    "The engine uses it only as a signal: each credit you mark tells the earned income credit, Schedule 8812 or Form 8863 calculation that Form 8862 was filed. The credits themselves are figured there.",
  fields: {
    claim_eitc: "Mark if you are claiming the earned income credit again after a disallowance.",
    claim_ctc: "Mark if you are claiming the child tax credit, additional child tax credit or credit for other dependents again.",
    claim_aotc: "Mark if you are claiming the American opportunity credit again.",
    eitc_disallowed_year: "The tax year in which your earned income credit was disallowed.",
    ctc_disallowed_year: "The tax year in which your child tax credit was disallowed.",
    aotc_disallowed_year: "The tax year in which your American opportunity credit was disallowed.",
    eitc_qualifying_children_count: "Number of qualifying children for the earned income credit (0 to 3).",
    ctc_qualifying_children_count: "Number of children or dependents for whom you are claiming the child tax credit.",
    aotc_student_count: "Number of students for whom you are claiming the American opportunity credit.",
  },
};
