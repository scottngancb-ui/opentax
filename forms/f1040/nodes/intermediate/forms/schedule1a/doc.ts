import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule 1-A",
  subtitle: "Additional Deductions",
  topic: Topic.Deductions,
  summary:
    "The new schedule for the deductions created in 2025: no tax on tips, no tax on overtime, car loan interest, and the enhanced deduction for seniors 65 and older. " +
    "You enter your qualified overtime pay and new-car loans here; tips, age, SSN status and MAGI come in automatically from the rest of the return. " +
    "Each deduction is capped and phases out as MAGI rises, and married filing separately generally cannot claim them. " +
    "The total goes to Form 1040 line 13b and is available whether or not you itemize.",
  fields: {
    taxpayer_qualified_overtime_compensation:
      "Your qualified overtime compensation: the premium part of overtime pay required by the Fair Labor Standards Act (the \"half\" in time-and-a-half), not your regular rate. Requires a valid SSN.",
    spouse_qualified_overtime_compensation:
      "Your spouse's qualified overtime compensation, counted only on a joint return. The combined overtime deduction is capped at $25,000 for joint filers ($12,500 otherwise) and phases out above $300,000 of MAGI ($150,000 otherwise).",
    vehicle_loans:
      "One entry per loan used to buy a new personal-use car, SUV, van, pickup or motorcycle whose final assembly was in the United States. Deductible interest is capped at $10,000 and phases out above $200,000 of MAGI for joint filers ($100,000 otherwise).",
    "vehicle_loans.vin": "The vehicle's 17-character identification number, which you must report to claim the deduction.",
    "vehicle_loans.qualified_interest_paid": "Interest you paid on this loan during 2025.",
    "vehicle_loans.interest_deducted_on_business_schedules":
      "Part of this interest already deducted as a business expense (for example on Schedule C or F). It is subtracted so it is not deducted twice.",
  },
};
