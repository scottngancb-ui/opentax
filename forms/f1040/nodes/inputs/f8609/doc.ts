import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8609",
  subtitle: "Low-Income Housing Credit Allocation and Certification",
  topic: Topic.BusinessCredits,
  summary:
    "The certificate a state or local housing credit agency issues to the owner of a qualified low-income rental building, stating the yearly housing credit allocated to it. " +
    "Owners, including partners and investors, use it to claim the low-income housing credit each year of the credit period. " +
    "The engine adds the annual credit amounts to Schedule 3 as a nonrefundable business credit. Enter one per building.",
  fields: {
    annual_credit_amount:
      "The yearly low-income housing credit for this building, from Form 8609 line 1b or your Form 8609-A. This is the amount the engine sends to Schedule 3.",
    building_id: "The building identification number (BIN) the housing credit agency assigned.",
    credit_percentage: "The applicable credit percentage for the building. For reference only.",
    qualified_basis: "The building's qualified basis, the part of its cost tied to low-income units. For reference only.",
  },
};
