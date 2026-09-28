import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4137",
  subtitle: "Social Security and Medicare Tax on Unreported Tip Income",
  topic: Topic.Wages,
  summary:
    "The form that figures Social Security and Medicare tax on tips you did not report to your employer. It is filled in " +
    "automatically from allocated tips in W-2 box 8. Unreported tips are added to wages on Form 1040 line 1c, and the tax " +
    "(6.2% Social Security up to the wage base, plus 1.45% Medicare) goes to Schedule 2 line 5.",
  fields: {
    allocated_tips:
      "Allocated tips from W-2 box 8. Used as the unreported amount when total and reported tips are not given.",
    total_tips_received: "Line 2. Total cash and charge tips you received from all employers.",
    reported_tips: "Line 3. Tips you reported to your employers. Subtracted from total tips to get unreported tips.",
    "sub_$20_tips":
      "Line 5. Tips you did not have to report because they were under $20 in a month. Not subject to Social Security or Medicare tax.",
    ss_wages_from_w2:
      "Line 8. Social Security wages and tips already on your W-2s (boxes 3 and 7). Reduces the room left under the Social Security wage base.",
  },
};
