import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1310",
  subtitle: "Statement of Person Claiming Refund Due a Deceased Taxpayer",
  topic: Topic.Administrative,
  summary:
    "The statement someone files to claim a federal tax refund owed to a person who died. " +
    "A surviving spouse filing a joint return, or a court-appointed representative who attaches the court certificate, generally does not need it; other claimants, such as a family member handling the estate, do. " +
    "It is administrative only and does not change any amount on the return.",
  fields: {
    deceased_name: "The name of the person who died.",
    deceased_ssn: "The deceased person's Social Security number.",
    date_of_death: "The date the person died.",
    claimant_name: "The name of the person claiming the refund.",
    claimant_type: "Your relationship to the deceased, which decides what you must provide.",
    court_certificate_attached: "Mark if you are attaching a copy of the court certificate showing your appointment as representative.",
    proof_of_death_attached: "Mark if you are attaching proof of death, such as a copy of the death certificate.",
  },
  options: {
    claimant_type: {
      spouse_joint: "Surviving spouse filing an original or amended joint return with the deceased.",
      court_appointed: "Court-appointed or certified personal representative, such as an executor.",
      other: "Anyone else claiming the refund for the deceased's estate, such as a relative when no representative was appointed.",
    },
  },
};
