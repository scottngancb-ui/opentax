import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 3903",
  subtitle: "Moving Expenses",
  topic: Topic.Deductions,
  summary:
    "The form used to deduct the costs of moving your household. For 2018 through 2025 only members of the Armed Forces on active duty who move because of a military order for a permanent change of station can use it. " +
    "The engine subtracts employer reimbursements from your moving costs and deducts the net on Schedule 1 line 14, reducing AGI. Moves not marked as active-duty military are ignored.",
  fields: {
    transportation_storage: "Line 1. The cost of moving and storing your household goods and personal effects.",
    travel_expenses: "Line 2. Travel and lodging for you and your household on the way to the new home, not including meals.",
    total_expenses: "Line 3. Your total moving expenses. If blank, the engine adds lines 1 and 2.",
    employer_reimbursements:
      "Line 4. Moving reimbursements or allowances from the government that were not included in your W-2 wages (such as W-2 box 12 code P). They reduce the deduction.",
    active_duty_military:
      "Mark if you are an active-duty Armed Forces member and this move was under a military order for a permanent change of station. Required for any deduction.",
    move_description: "A short description of the move, such as where you moved from and to.",
  },
};
