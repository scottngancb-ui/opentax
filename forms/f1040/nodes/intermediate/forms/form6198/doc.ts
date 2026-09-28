import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 6198",
  subtitle: "At-Risk Limitations",
  topic: Topic.Business,
  summary:
    "The form that limits a loss from a business or investment activity to the amount you have at risk in it (cash and " +
    "property you put in plus debt you are personally liable for). It is filled in automatically from Schedule C, Schedule E, " +
    "Schedule F and Form 4835. Any loss over the at-risk amount is added back through Schedule 1 and carried to next year; " +
    "recaptured losses are reported as income.",
  fields: {
    schedule_c_loss: "Current-year loss from a Schedule C activity where not all investment is at risk (a negative number).",
    schedule_f_loss: "Current-year loss from a farming activity on Schedule F or Form 4835 (a negative number).",
    prior_unallowed: "At-risk losses disallowed in earlier years and carried forward to this year.",
    current_year_income: "Part I. Income and gains from the activity this year. They offset the loss before the limit is applied.",
    amount_at_risk: "Part II or III. Your amount at risk at year end. The deductible loss cannot exceed it.",
    at_risk_recapture:
      "Amount you must recapture as income because your amount at risk fell below zero. Reported as income on Schedule 1.",
  },
};
