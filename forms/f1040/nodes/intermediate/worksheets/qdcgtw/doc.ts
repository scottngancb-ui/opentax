import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Qualified Dividends and Capital Gain Tax Worksheet",
  subtitle: "IRS worksheet",
  topic: Topic.TaxComputation,
  summary:
    "The IRS worksheet in the Form 1040 instructions that taxes qualified dividends and long-term capital gains at 0%, 15% or 20% instead of ordinary rates. " +
    "In this engine it is a pass-through step, filled in automatically from the 28% rate gain worksheet and unrecaptured section 1250 gain. " +
    "It forwards those amounts to the tax computation step, which does the actual rate calculation for Form 1040 line 16.",
  fields: {
    line18_28pct_gain:
      "Schedule D line 18. 28% rate gain, mostly collectibles gain. Forwarded to the tax computation so it is taxed at up to 28%.",
    line19_unrecaptured_1250:
      "Schedule D line 19. Unrecaptured section 1250 gain from real estate depreciation. Forwarded to the tax computation so it is taxed at up to 25%.",
  },
};
