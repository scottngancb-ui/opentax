import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 911",
  subtitle: "Request for Taxpayer Advocate Service Assistance",
  topic: Topic.Administrative,
  summary:
    "The form you send to the Taxpayer Advocate Service, an independent office within the IRS, to ask for help when an IRS problem is causing you " +
    "financial hardship or normal IRS channels have not resolved it. It is a request for help, not part of the tax computation. " +
    "The engine records the request but it does not change any line of Form 1040.",
  fields: {
    hardship_type: "The kind of problem you are asking the Advocate to help with.",
    taxpayer_description: "Your description of the tax problem and the hardship it is causing.",
    requested_relief: "What you want the Taxpayer Advocate Service to do for you.",
    contact_info: "The best phone number or address, and times, for the Advocate to reach you.",
  },
  options: {
    hardship_type: {
      economic_hardship: "An IRS action or delay is causing, or will cause, financial difficulty",
      systemic_problem: "An IRS system or procedure has failed to resolve your issue",
      fair_treatment: "You believe you were not treated fairly or your taxpayer rights were not protected",
      other: "Another reason",
    },
  },
};
