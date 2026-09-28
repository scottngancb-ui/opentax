import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule SE",
  subtitle: "Self-Employment Tax",
  topic: Topic.Business,
  summary:
    "Figures Social Security and Medicare tax on self-employment earnings, the self-employed person's version of payroll tax. " +
    "Filled in automatically from Schedule C, Schedule F and partnership self-employment income; it applies when net earnings are $400 or more. " +
    "It takes 92.35% of net profit, applies 12.4% Social Security tax (up to the wage base, reduced by W-2 wages) and 2.9% Medicare tax. " +
    "The tax goes to Schedule 2 line 4 and half of it is deducted on Schedule 1 line 15.",
  fields: {
    net_profit_schedule_c:
      "Line 2. Net profit or loss from self-employment other than farming, mainly Schedule C line 31, plus partnership self-employment earnings.",
    net_profit_schedule_f: "Line 1a. Net farm profit or loss from Schedule F line 34.",
    unreported_tips_4137:
      "Line 8b. Tips from Form 4137 that are subject to Social Security tax. They use up part of the Social Security wage base.",
    wages_8919:
      "Line 8c. Wages from Form 8919 (uncollected tax for workers treated as contractors). They use up part of the Social Security wage base.",
    w2_ss_wages:
      "Line 8a. Social Security wages and tips from your W-2s (boxes 3 and 7). They reduce the wage base left for Social Security tax on self-employment earnings.",
  },
};
