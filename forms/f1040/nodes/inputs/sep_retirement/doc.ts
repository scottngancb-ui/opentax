import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "SEP, SIMPLE and Solo 401(k)",
  subtitle: "Self-employed SEP, SIMPLE and qualified plan deduction (Schedule 1 line 16)",
  topic: Topic.Retirement,
  summary:
    "Where you enter contributions to your own retirement plan as a self-employed person: a SEP-IRA, a SIMPLE IRA, or a one-participant (solo) 401(k). " +
    "It is not a separate IRS form. The engine applies the annual contribution limits, sends the deduction to Schedule 1 line 16 to reduce AGI, " +
    "and passes it to Form 8995 because it reduces qualified business income. Contributions for your employees belong on Schedule C line 19 instead.",
  fields: {
    plan_type: "The kind of plan the contributions went to.",
    net_self_employment_compensation: "For a SEP: your compensation from the business for plan purposes (net earnings from self-employment after the deduction for half of SE tax and the contribution itself). The engine limits the SEP deduction to 25% of this. If blank, only the dollar cap applies.",
    sep_contribution: "The amount you contributed to your SEP-IRA for the year. The engine allows the smaller of this, 25% of compensation, or $70,000.",
    simple_employee_contribution: "Your salary-reduction (elective) contributions to your SIMPLE IRA. The engine limits them to $16,500, or more with the catch-up flags below.",
    simple_employer_contribution: "The matching or nonelective contribution you made as the employer to your own SIMPLE IRA. Added to the deduction as entered.",
    age_50_or_over: "Check if you were 50 or older at the end of the year. Raises the SIMPLE elective contribution limit to $20,000.",
    age_60_to_63: "Check if you were 60, 61, 62 or 63 at the end of the year. Raises the SIMPLE elective contribution limit to $21,750.",
    solo401k_employee_deferral: "Your elective deferrals to a solo 401(k). The engine limits them to $23,500.",
    solo401k_employer_contribution: "The employer profit-sharing contribution you made to your solo 401(k). Employee and employer amounts together are limited to $70,000.",
  },
  options: {
    plan_type: {
      SEP: "Simplified Employee Pension IRA: employer-only contributions, up to 25% of compensation.",
      SIMPLE: "SIMPLE IRA: elective salary-reduction contributions plus an employer match or nonelective contribution.",
      SOLO_401K: "One-participant 401(k) covering only you (and your spouse): elective deferrals plus employer profit-sharing contributions.",
    },
  },
};
