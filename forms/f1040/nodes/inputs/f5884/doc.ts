import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 5884",
  subtitle: "Work Opportunity Credit",
  topic: Topic.BusinessCredits,
  summary:
    "The form an employer uses to claim the Work Opportunity Tax Credit for hiring people from certain target groups, such as veterans, SNAP recipients, ex-felons or the long-term unemployed. " +
    "The credit is a percentage of the employee's first-year wages up to a cap that depends on the group, and the rate depends on hours worked. " +
    "The engine adds the result to the general business credit on Schedule 3 line 6z. Enter one per employee.",
  fields: {
    target_group: "The target group the employee was certified as belonging to. It sets the wage cap and, for long-term family assistance recipients, the two-year rules.",
    first_year_wages: "Qualified wages you paid the employee during the first year after the hire date.",
    second_year_wages: "Qualified wages paid in the second year of employment. Only used for long-term family assistance recipients (group 9).",
    hours_worked:
      "Hours the employee worked for you. Under 120 hours gives no credit, 120 to 399 hours gives a 25% rate, and 400 or more gives 40%. Not used for group 9.",
    is_disabled_veteran: "Mark if the veteran has a service-connected disability. Raises the wage cap for a veteran entry.",
    is_disabled_veteran_long_term:
      "Mark for a veteran in the long-term categories (a disabled veteran unemployed for a long period, or a veteran unemployed for six months or more). Gives the highest veteran wage cap.",
  },
  options: {
    target_group: {
      "1": "Member of a family receiving TANF (IV-A) assistance",
      "2": "Qualified veteran",
      "3": "Ex-felon hired soon after conviction or release",
      "4": "Designated community resident living in an empowerment zone or rural renewal county",
      "5": "Vocational rehabilitation referral",
      "6": "Summer youth employee living in an empowerment zone",
      "7": "SNAP (food stamp) recipient",
      "8": "SSI (Supplemental Security Income) recipient",
      "9": "Long-term family assistance recipient; credit covers first- and second-year wages",
      "10": "Qualified long-term unemployment recipient",
    },
  },
};
