import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8611",
  subtitle: "Recapture of Low-Income Housing Credit",
  topic: Topic.BusinessCredits,
  summary:
    "The form an owner uses to pay back part of a low-income housing credit already claimed, when the building is disposed of, its qualified basis drops, or it stops meeting the rules within the 15-year compliance period. " +
    "The engine recaptures a share that shrinks with each year the building was held, less any recapture already paid, and adds it to Schedule 2 line 10. Enter one per building.",
  fields: {
    original_credit_amount: "Line 1. The low-income housing credit originally claimed for this building.",
    year_credit_first_claimed: "The tax year you first claimed the credit for this building.",
    year_of_recapture_event: "The tax year the recapture event happened. Cannot be earlier than the first credit year.",
    recapture_event_type: "What triggered the recapture.",
    applicable_fraction: "The fraction of the building (0 to 1) that is low-income. If blank, the engine uses 1 (all units).",
    prior_recapture_amounts: "Recapture you already paid for this building in earlier years. Subtracted from this year's amount.",
  },
  options: {
    recapture_event_type: {
      DISPOSITION: "You sold or otherwise disposed of the building or your interest in it",
      REDUCED_QUALIFIED_BASIS: "The building's qualified basis went down from the prior year",
      NONCOMPLIANCE: "The building no longer meets the low-income housing requirements",
    },
  },
};
