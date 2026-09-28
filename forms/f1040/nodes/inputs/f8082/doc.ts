import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8082",
  subtitle: "Notice of Inconsistent Treatment or Administrative Adjustment Request (AAR)",
  topic: Topic.Administrative,
  summary:
    "A disclosure a partner, S corporation shareholder, or trust or estate beneficiary attaches to the return when reporting a Schedule K-1 item differently from how the entity reported it. " +
    "Filing it tells the IRS about the difference openly, which helps avoid penalties. " +
    "It computes no tax: the amount you actually claim is entered on the regular schedules, and nothing here changes a Form 1040 line. Enter one per item.",
  fields: {
    entity_type: "The kind of entity that issued the Schedule K-1.",
    entity_name: "Legal name of the partnership, S corporation, trust or estate.",
    entity_ein: "The entity's employer identification number (EIN).",
    schedule_k1_item_description: "Part I column (a). Which K-1 item you are treating differently.",
    amount_as_reported: "Part I column (b). The amount the entity reported on your Schedule K-1.",
    amount_as_claimed: "Part I column (c). The amount you are reporting on your own return.",
    reason_for_inconsistency: "Your explanation of why you are reporting the item differently.",
  },
  options: {
    entity_type: {
      PARTNERSHIP: "Partnership (Schedule K-1 from Form 1065)",
      S_CORP: "S corporation (Schedule K-1 from Form 1120-S)",
      TRUST: "Trust (Schedule K-1 from Form 1041)",
      ESTATE: "Estate (Schedule K-1 from Form 1041)",
    },
  },
};
