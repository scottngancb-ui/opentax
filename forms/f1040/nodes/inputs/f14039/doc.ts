import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 14039",
  subtitle: "Identity Theft Affidavit",
  topic: Topic.Administrative,
  summary:
    "The affidavit you send the IRS when you believe someone used your Social Security number or identity for tax purposes, for example when your e-filed return is rejected because a return was already filed under your SSN. " +
    "It asks the IRS to flag your account for identity protection. In this engine it is a record only and does not change any amount on the return.",
  fields: {
    incident_type: "Why you are filing the affidavit.",
    identity_theft_description: "A short explanation of what happened and how you learned of it.",
    police_report_number: "The police or other report number, if you reported the theft.",
    date_of_incident: "When the identity theft happened or when you discovered it.",
  },
  options: {
    incident_type: {
      filing_disruption:
        "Your tax filing was affected, for example your e-filed return was rejected as a duplicate or the IRS sent a notice about income you did not earn.",
      other: "Your identity was stolen or at risk in some other way, such as a lost wallet or data breach, but your tax account has not yet been affected.",
    },
  },
};
