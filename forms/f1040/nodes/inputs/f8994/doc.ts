import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8994",
  subtitle: "Employer Credit for Paid Family and Medical Leave",
  topic: Topic.BusinessCredits,
  summary:
    "The form employers use to claim the section 45S credit for wages paid to employees on family and medical leave. " +
    "The pay must replace at least 50% of the employee's normal wages. The credit is 12.5% of leave wages at 50% replacement, " +
    "rising 0.25% for each point above 50% to a maximum of 25%. The engine figures it per employee and reports the total on Schedule 3 as part of the general business credit.",
  fields: {
    employees: "One entry per employee who received paid family or medical leave.",
    "employees.fmla_wages": "The wages you paid this employee during qualifying family or medical leave.",
    "employees.wage_replacement_pct": "The leave pay as a share of the employee's normal wages, as a decimal (0.5 for 50%). Below 0.5 earns no credit.",
    "employees.weeks_leave": "The number of weeks of leave taken. Recorded only; the engine does not apply the weekly limit.",
  },
};
