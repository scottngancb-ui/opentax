import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 56",
  subtitle: "Notice Concerning Fiduciary Relationship",
  topic: Topic.Administrative,
  summary:
    "The notice a fiduciary, such as an executor, trustee or court-appointed guardian, files to tell the IRS they are now acting for a taxpayer, or that the role has ended. " +
    "It lets the IRS send notices to the fiduciary and treat them as responsible for the taxpayer's tax matters. " +
    "It is purely administrative: nothing on it changes any Form 1040 line.",
  fields: {
    fiduciary_type: "Part I. The kind of fiduciary relationship being established.",
    fiduciary_name: "Name of the person or institution acting as fiduciary.",
    fiduciary_address: "The fiduciary's mailing address, where the IRS will send notices.",
    estate_or_trust_name: "Name of the estate or trust, if the fiduciary acts for one.",
    effective_date: "Line 2a. The date the fiduciary's authority begins.",
    revocation_termination_date: "Part III. The date the fiduciary's authority ends, when you file the form to end the relationship.",
  },
  options: {
    fiduciary_type: {
      executor: "Executor named in a will to settle a decedent's estate",
      administrator: "Court-appointed administrator of an estate with no named executor",
      trustee: "Trustee managing a trust",
      guardian: "Guardian appointed for a minor or incapacitated person",
      conservator: "Conservator appointed to manage someone's financial affairs",
      receiver: "Receiver appointed to take over property, such as in a bankruptcy or receivership",
      assignee: "Assignee for the benefit of creditors",
      other: "Any other fiduciary relationship",
    },
  },
};
