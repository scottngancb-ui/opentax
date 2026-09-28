import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8881",
  subtitle: "Credit for Small Employer Pension Plan Startup Costs, Auto-Enrollment, and Military Spouse Participation",
  topic: Topic.BusinessCredits,
  summary:
    "A business credit for employers with 100 or fewer employees that start a new retirement plan, available for the plan's first three years. " +
    "The engine allows 100% of eligible startup costs (50% for employers with more than 50 employees), up to $5,000 a year, plus $500 if the plan has automatic enrollment. " +
    "The credit goes to Schedule 3 line 6z as part of the general business credit.",
  fields: {
    plan_type: "The kind of retirement plan you started. Recorded only; it doesn't change the engine's calculation.",
    non_hce_count: "Number of employees who aren't highly compensated. The plan must cover at least one for the startup credit.",
    employee_count: "Number of employees. Over 100 means no startup credit; over 50 halves the rate.",
    startup_costs: "Ordinary and necessary costs to set up and run the plan and to educate employees about it.",
    has_auto_enrollment: "Whether the plan automatically enrolls employees. Adds a $500 credit.",
    credit_year: "Which year of the three-year credit period this is (1, 2 or 3). Informational; the engine doesn't check the window.",
  },
  options: {
    plan_type: {
      "401k": "A 401(k) plan",
      simple: "A SIMPLE IRA plan",
      sep: "A simplified employee pension (SEP)",
      defined_benefit: "A defined benefit pension plan",
      other: "Another type of qualified employer plan",
    },
  },
};
