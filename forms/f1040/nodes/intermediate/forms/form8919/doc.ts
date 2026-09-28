import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8919",
  subtitle: "Uncollected Social Security and Medicare Tax on Wages",
  topic: Topic.Wages,
  summary:
    "The form a worker files when a firm treated them as an independent contractor but they were really an employee, so only the employee half of Social Security and Medicare tax is owed. " +
    "Filled in automatically from Form 1099-NEC entries marked for Form 8919. " +
    "The wages go to Form 1040 line 1g, the uncollected tax to Schedule 2 line 6, and the wages also count toward the Social Security wage base on Schedule SE.",
  fields: {
    wages: "Line 6. Total pay from the firm that should have been reported as wages. Social Security tax is 6.2% up to the wage base and Medicare tax is 1.45% on all of it.",
    reason_code: "Part I. The reason code for why you believe you are an employee. The engine records it but does not change the math.",
    prior_ss_wages: "Line 8. Social Security wages and tips already reported on W-2s (boxes 3 and 7). They reduce how much of the wage base is left.",
  },
  options: {
    reason_code: {
      A: "You filed Form SS-8 and got a determination letter saying you are an employee of this firm",
      B: "Reserved on the current IRS form",
      C: "You received other IRS correspondence saying you are an employee",
      D: "Reserved on the current IRS form",
      E: "Reserved on the current IRS form",
      F: "Reserved on the current IRS form",
      G: "You filed Form SS-8 and have not received a reply",
      H: "You got both a W-2 and a Form 1099 from this firm, and the 1099 amount should have been W-2 wages",
    },
  },
};
