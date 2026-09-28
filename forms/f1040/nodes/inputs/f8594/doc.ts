import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8594",
  subtitle: "Asset Acquisition Statement Under Section 1060",
  topic: Topic.Business,
  summary:
    "The statement both the buyer and the seller file when a group of assets making up a business is sold. " +
    "It splits the price among seven asset classes using the residual method, which sets the buyer's basis and the character of the seller's gain or loss. " +
    "In the engine it is informational: the gain or loss itself is reported on Form 4797 or Schedule D, and this form changes no Form 1040 line.",
  fields: {
    party_type: "Whether you are the buyer or the seller in this sale.",
    sale_date: "The date the business assets were sold.",
    total_sale_price: "The total price paid for the group of assets.",
    allocation_class_i: "Class I. Cash and general deposit accounts, such as checking and savings.",
    allocation_class_ii: "Class II. Actively traded personal property, certificates of deposit, government securities and foreign currency.",
    allocation_class_iii: "Class III. Assets marked to market at least yearly and debt instruments, such as accounts receivable.",
    allocation_class_iv: "Class IV. Inventory and other property held mainly for sale to customers.",
    allocation_class_v: "Class V. All assets not in another class, such as equipment, buildings and land.",
    allocation_class_vi: "Class VI. Section 197 intangibles other than goodwill and going concern value, such as customer lists or noncompete agreements.",
    allocation_class_vii: "Class VII. Goodwill and going concern value, the amount left after the other classes.",
  },
};
