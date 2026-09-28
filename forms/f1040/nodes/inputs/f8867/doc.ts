import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8867",
  subtitle: "Paid Preparer's Due Diligence Checklist",
  topic: Topic.Administrative,
  summary:
    "The checklist a paid tax preparer completes and files for any return that claims the earned income credit, child tax credit or additional child tax credit, American opportunity credit, or head of household status. " +
    "It records the steps the preparer took to confirm eligibility; a preparer who fails the requirements faces a penalty for each failure. " +
    "It has no effect on your tax, and the engine only records it.",
  fields: {
    credits_claimed: "The credits or filing status on the return that trigger the due diligence rules. Pick all that apply.",
    taxpayer_interview_conducted: "Whether the preparer interviewed the taxpayer and asked enough questions to judge eligibility.",
    documentation_reviewed: "Whether the preparer reviewed documents that support the credits or filing status claimed.",
    knowledge_questions_satisfied: "Whether the preparer resolved any information that seemed incorrect, inconsistent or incomplete.",
    records_retained: "Whether the preparer kept copies of the checklist, worksheets and documents relied on.",
  },
  options: {
    credits_claimed: {
      EITC: "Earned income tax credit",
      CTC: "Child tax credit, additional child tax credit or credit for other dependents",
      AOTC: "American opportunity tax credit",
      HOH: "Head of household filing status",
    },
  },
};
