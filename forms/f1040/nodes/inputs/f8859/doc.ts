import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8859",
  subtitle: "Carryforward of the District of Columbia First-Time Homebuyer Credit",
  topic: Topic.BusinessCredits,
  summary:
    "The form for using up a District of Columbia first-time homebuyer credit left over from an earlier year. " +
    "The credit itself ended after 2011, so no new credit can be earned; only an unused carryforward can be claimed, and it can't create a refund. " +
    "The engine adds the carryforward to the other-credits amount on Schedule 3 line 6z, which reduces your tax.",
  fields: {
    carryforward_amount: "The unused D.C. first-time homebuyer credit carried forward from your prior-year Form 8859.",
  },
};
