import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4255",
  subtitle: "Recapture of Investment Credit",
  topic: Topic.BusinessCredits,
  summary:
    "The form that figures how much of an investment credit you must pay back when the property you claimed it on is sold or stops qualifying within five years of being placed in service. " +
    "The recapture starts at 100% of the credit in the first year and drops by 20 points each full year after. " +
    "The engine applies that schedule to each property (or uses an amount you enter) and adds the total to Schedule 2 as additional tax.",
  fields: {
    description: "A description of the property the credit was claimed on.",
    date_placed_in_service: "The date the property was placed in service (YYYY-MM-DD).",
    original_credit_amount: "The investment credit you originally claimed on this property.",
    year_of_recapture:
      "Which year of the five-year recapture period the property stopped qualifying: 1 recaptures 100%, 2 recaptures 80%, 3 60%, 4 40% and 5 20%.",
    recapture_reason: "Why the credit is being recaptured. Recorded only; it does not change the amount.",
    recapture_amount_override: "A recapture amount you already figured. If entered, it replaces the engine's percentage calculation.",
  },
  options: {
    recapture_reason: {
      disposed: "You sold or otherwise disposed of the property.",
      ceased_to_qualify: "The property stopped being qualifying investment credit property.",
      converted: "You converted the property to personal or other nonqualifying use.",
      destroyed: "The property was destroyed, for example by casualty.",
    },
  },
};
