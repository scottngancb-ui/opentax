import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8833",
  subtitle: "Treaty-Based Return Position Disclosure Under Section 6114 or 7701(b)",
  topic: Topic.Foreign,
  summary:
    "The disclosure you attach when you take a position that a U.S. tax treaty overrides or modifies the normal U.S. tax rules, such as treaty relief from tax on certain income. " +
    "File one for each treaty position; failing to disclose can bring a penalty. " +
    "It is a disclosure only: the engine records it but does not change any amount on the return.",
  fields: {
    treaty_country: "Line 1a. The treaty partner country.",
    treaty_article: "Line 1b. The specific treaty article (and paragraph) you rely on.",
    description_of_position: "Line 2. A short explanation of the treaty-based position you're taking and why it applies.",
    gross_amount: "Line 3. The gross amount of income or gain the position covers.",
    amount_of_tax_reduction: "Line 4. The estimated reduction in U.S. tax that results from the position.",
  },
};
