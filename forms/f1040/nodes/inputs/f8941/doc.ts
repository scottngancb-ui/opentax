import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8941",
  subtitle: "Credit for Small Employer Health Insurance Premiums",
  topic: Topic.BusinessCredits,
  summary:
    "The form small employers use to claim the section 45R credit for health insurance premiums they pay for employees, generally through a SHOP Marketplace plan. " +
    "Employers with fewer than 25 full-time equivalent employees and low average wages qualify. The credit is up to 50% of premiums (35% for tax-exempt employers) " +
    "and shrinks as employee count rises above 10 and as average wages rise. The engine reports it on Schedule 3 as part of the general business credit.",
  fields: {
    fte_count: "Line 1. Your number of full-time equivalent employees for the year. 25 or more means no credit; above 10 reduces it.",
    average_annual_wages: "Line 2. Average annual wages paid per full-time equivalent employee. Higher averages reduce the credit, down to zero at the limit.",
    premiums_paid: "Line 3. Health insurance premiums you paid for employees, limited to the amount allowed for the credit.",
    shop_enrollment: "Mark if the coverage was bought through a SHOP Marketplace. If you say no, the engine allows no credit.",
    is_tax_exempt: "Mark if the employer is a tax-exempt organization, which uses the lower 35% rate.",
  },
};
