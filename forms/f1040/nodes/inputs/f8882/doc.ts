import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8882",
  subtitle: "Credit for Employer-Provided Childcare Facilities and Services",
  topic: Topic.BusinessCredits,
  summary:
    "A business credit for employers that provide child care for their employees, either by running or contracting with a child care facility or by paying for resource and referral services. " +
    "The engine allows 25% of qualified child care facility costs plus 10% of resource and referral costs, up to $150,000 a year. " +
    "The credit goes to Schedule 3 line 6z as part of the general business credit.",
  fields: {
    qualified_childcare_expenses:
      "Lines 1 to 3. Costs to acquire, build or run a child care facility for employees, or to contract with a licensed provider. Credited at 25%.",
    resource_referral_expenses:
      "Line 4. Amounts paid for child care resource and referral services for employees. Credited at 10%.",
  },
};
