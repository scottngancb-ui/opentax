import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Self-Employed Health Insurance",
  subtitle: "Self-employed health insurance deduction (Schedule 1 line 17), simplified entry",
  topic: Topic.Health,
  summary:
    "A simple entry for the deduction self-employed people can take for health insurance premiums they pay for themselves, their spouse and dependents. " +
    "It is not a separate IRS form: the engine sends the full amount you enter to Schedule 1 line 17, where it reduces AGI, and to Form 8995, where it reduces " +
    "qualified business income. The real deduction can't exceed your net self-employment profit and has other limits; this entry does not check them, " +
    "so use Form 7206 when those limits matter.",
  fields: {
    premiums_paid: "Health insurance premiums you paid for medical, dental and vision coverage for yourself, your spouse and dependents under a plan established for your business. Don't include months you could join an employer's subsidized plan. The full amount goes to Schedule 1 line 17.",
  },
};
