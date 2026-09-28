import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8959",
  subtitle: "Additional Medicare Tax",
  topic: Topic.TaxComputation,
  summary:
    "The form that figures the extra 0.9% Medicare tax on wages, self-employment income and railroad (RRTA) pay above a threshold: $250,000 for joint returns, $125,000 married filing separately, $200,000 for everyone else. " +
    "Filled in automatically from W-2s, Form 4852, household employee wages, Schedule SE and your filing status. " +
    "The tax goes to Schedule 2 line 11, and Additional Medicare Tax your employer withheld goes to Form 1040 line 25c.",
  fields: {
    filing_status: "Your filing status, which sets the threshold.",
    medicare_wages: "Line 1. Medicare wages and tips from all your W-2s (box 5).",
    unreported_tips: "Line 2. Tips you didn't report to your employer, from Form 4137.",
    wages_8919: "Line 3. Wages from Form 8919, for work where the firm treated you as a contractor.",
    se_income: "Line 8. Self-employment income from Schedule SE. A loss counts as zero. The threshold for it is reduced by your wages.",
    rrta_wages: "Line 14. Railroad retirement (RRTA) compensation and tips. These have their own threshold, not reduced by wages.",
    medicare_withheld: "Line 19. Total Medicare tax withheld (W-2 box 6). The regular 1.45% is subtracted to find the extra tax withheld.",
    medicare_wages_box5: "W-2 box 5 Medicare wages when they differ from the other wage amount; used for the wage total and the regular Medicare subtraction.",
    rrta_medicare_withheld: "Line 22. Additional Medicare Tax withheld on railroad retirement compensation.",
  },
  options: {
    filing_status: {
      single: "Single ($200,000 threshold)",
      mfs: "Married filing separately ($125,000 threshold)",
      mfj: "Married filing jointly ($250,000 threshold)",
      hoh: "Head of household ($200,000 threshold)",
      qss: "Qualifying surviving spouse (the engine uses the $250,000 joint threshold)",
    },
  },
};
