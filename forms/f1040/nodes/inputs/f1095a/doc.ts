import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1095-A",
  subtitle: "Health Insurance Marketplace Statement",
  topic: Topic.Health,
  summary:
    "The statement the Health Insurance Marketplace sends by January 31 to anyone who enrolled in a Marketplace health plan. " +
    "It shows the monthly premiums, the benchmark second-lowest-cost silver plan (SLCSP) premium, and any advance premium tax credit paid to your insurer. " +
    "You need it to file Form 8962, which reconciles the advance payments with the premium tax credit you actually qualify for. " +
    "The engine adds up all your 1095-A forms and passes the totals to Form 8962. Enter one form per policy.",
  fields: {
    issuer_name: "Part I. The name of the insurance company or Marketplace that issued the policy.",
    policy_number: "Part I. The Marketplace-assigned policy number, for your reference.",
    monthly_premiums:
      "Part III, column A. The monthly enrollment premium for each month, January through December (12 amounts).",
    monthly_slcsps:
      "Part III, column B. The monthly premium for the applicable second-lowest-cost silver plan, January through December (12 amounts).",
    monthly_aptcs:
      "Part III, column C. The advance premium tax credit paid to your insurer each month, January through December (12 amounts).",
    annual_premium: "Part III, line 33, column A. The total enrollment premiums for the year. Use when you are not entering monthly amounts.",
    annual_slcsp: "Part III, line 33, column B. The total SLCSP premium for the year.",
    annual_aptc: "Part III, line 33, column C. The total advance premium tax credit paid for the year.",
  },
};
