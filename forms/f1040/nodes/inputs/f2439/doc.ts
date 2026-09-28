import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 2439",
  subtitle: "Notice to Shareholder of Undistributed Long-Term Capital Gains",
  topic: Topic.Investments,
  summary:
    "The notice a mutual fund (regulated investment company) or REIT sends when it kept long-term capital gains instead of paying them out and paid tax on them for you. " +
    "You report the undistributed gain on Schedule D line 11 as if you had received it, and claim the tax the fund paid as a refundable credit that reaches Form 1040 line 31. " +
    "Enter one form per fund.",
  fields: {
    box1a: "Box 1a. Total undistributed long-term capital gains. Reported on Schedule D line 11.",
    box1b: "Box 1b. The part of box 1a that is unrecaptured section 1250 gain from real estate, taxed at up to 25%. Used in the Schedule D tax calculation.",
    box1c: "Box 1c. The part of box 1a that is section 1202 gain from qualified small business stock. Recorded only; the engine does not apply the exclusion.",
    box1d: "Box 1d. The part of box 1a that is collectibles (28%) gain. Used in the Schedule D tax calculation.",
    box2: "Box 2. Tax the fund paid on the undistributed gains. You claim it as a refundable credit, counted on Form 1040 line 31.",
  },
};
