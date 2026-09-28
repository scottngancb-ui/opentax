import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8814",
  subtitle: "Parents' Election To Report Child's Interest and Dividends",
  topic: Topic.Family,
  summary:
    "The form a parent uses to report a young child's interest and dividends on the parent's own return instead of filing a separate return for the child. " +
    "It applies only when the child's income is solely interest and dividends (including capital gain distributions and Alaska Permanent Fund dividends) below a set limit. " +
    "Once the child's total passes the tax-free base amount, the engine adds the interest to Form 1040 line 2b and the dividends to line 3b. Enter one form per child.",
  fields: {
    child_name: "The child's name.",
    child_ssn: "The child's Social Security number.",
    interest_income:
      "Line 1a. The child's taxable interest. Added to your Form 1040 line 2b when the child's total is over the base amount.",
    dividend_income:
      "Line 2a. The child's ordinary dividends. Added to your Form 1040 line 3b when the child's total is over the base amount.",
    capital_gain_distributions:
      "Line 3. The child's capital gain distributions. Counted in the child's total; the engine does not route them to a separate line.",
    alaska_pfd: "Alaska Permanent Fund dividends the child received. Treated as dividends and counted in the child's total.",
  },
};
