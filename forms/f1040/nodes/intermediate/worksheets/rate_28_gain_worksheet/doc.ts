import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "28% Rate Gain Worksheet",
  subtitle: "IRS worksheet",
  topic: Topic.Investments,
  summary:
    "The Schedule D instructions worksheet that totals long-term gains taxed at a maximum rate of 28%, mainly gains on collectibles such as art, coins, stamps and precious metals. " +
    "Filled in automatically from collectibles gains reported through Form 8949 and Schedule D and from collectibles gain distributions on Form 1099-DIV and K-1s. " +
    "The total becomes Schedule D line 18 and is passed to the tax computation so it is taxed at up to 28%.",
  fields: {
    collectibles_gain_from_8949:
      "Net long-term gain on collectibles (and the taxable part of section 1202 small business stock gain) from sales reported on Form 8949 and Schedule D.",
    collectibles_gain: "Collectibles (28%) gain distributions, such as Form 1099-DIV box 2d or the matching amount from a Schedule K-1.",
  },
};
