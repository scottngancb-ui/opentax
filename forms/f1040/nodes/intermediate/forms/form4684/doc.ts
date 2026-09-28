import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4684",
  subtitle: "Casualties and Thefts",
  topic: Topic.Deductions,
  summary:
    "The form that figures losses from casualties (such as fire or storm) and thefts. The loss is the smaller of the drop in " +
    "value or your basis, minus insurance. Personal losses count only in a federally declared disaster and are reduced by $100 " +
    "and 10% of AGI before going to Schedule A. Business losses go to Form 4797 or Schedule D. No other screen feeds this node " +
    "yet, so it only runs when its values are supplied directly.",
  fields: {
    personal_fmv_before: "Section A. Fair market value of the personal-use property just before the casualty or theft.",
    personal_fmv_after: "Section A. Fair market value just after the event (zero for a theft).",
    personal_basis: "Section A. Your cost or other adjusted basis in the property. The loss cannot exceed it.",
    personal_insurance: "Section A. Insurance or other reimbursement you received or expect to receive.",
    is_federal_disaster:
      "Check if the loss happened in a federally declared disaster area. Otherwise no personal casualty loss is allowed.",
    agi: "Your adjusted gross income. Personal losses are reduced by 10% of it.",
    business_fmv_before: "Section B. Fair market value of business or income-producing property before the event.",
    business_fmv_after: "Section B. Fair market value of that property after the event.",
    business_basis: "Section B. Adjusted basis of the business property.",
    business_insurance: "Section B. Insurance or other reimbursement for the business property.",
    business_is_section_1231:
      "Check if the business property was held more than a year (section 1231 property). Then the loss goes to Form 4797; otherwise to Schedule D.",
  },
};
