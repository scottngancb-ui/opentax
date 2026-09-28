import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8844",
  subtitle: "Empowerment Zone Employment Credit",
  topic: Topic.BusinessCredits,
  summary:
    "A business credit for employers whose employees both live and work in a designated empowerment zone. " +
    "The credit is 20% of the first $15,000 of each qualified employee's wages, up to $3,000 per employee. " +
    "The engine adds the per-employee credits and sends the total to Schedule 3 line 6z as part of the general business credit. Enter one entry per employee.",
  fields: {
    employee_name: "The employee's name. Informational only.",
    qualified_zone_wages: "Wages you paid this employee during the year. Only the first $15,000 counts.",
    employee_lives_in_zone: "Whether the employee's main home is inside the empowerment zone. Required, with the work test, for any credit.",
    employee_works_in_zone: "Whether the employee does substantially all of their work for you inside the zone. Required, with the residence test.",
  },
};
