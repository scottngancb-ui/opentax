import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Unrecaptured Section 1250 Gain Worksheet",
  subtitle: "IRS worksheet",
  topic: Topic.Investments,
  summary:
    "The Schedule D instructions worksheet that figures unrecaptured section 1250 gain: the part of a gain on depreciable real estate that comes from depreciation you took, which is taxed at up to 25%. " +
    "Filled in automatically from REIT and fund distributions (Form 1099-DIV box 2b and K-1s) and from real property sales. " +
    "The total becomes Schedule D line 19 and feeds the tax computation.",
  fields: {
    unrecaptured_1250_gain:
      "Unrecaptured section 1250 gain already figured by the payer, such as Form 1099-DIV box 2b from a REIT or mutual fund, or the matching K-1 amount.",
    property:
      "Sold real property: the straight-line depreciation allowed on it and the gain on the sale. For each property, the unrecaptured gain is the smaller of the two.",
  },
};
