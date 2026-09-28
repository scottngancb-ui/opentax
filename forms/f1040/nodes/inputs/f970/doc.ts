import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 970",
  subtitle: "Application To Use LIFO Inventory Method",
  topic: Topic.Business,
  summary:
    "The election a business files to start valuing inventory under the last-in, first-out (LIFO) method. It is filed with the return for the first year LIFO is used, " +
    "and the method must then be used consistently. The choice changes cost of goods sold on Schedule C or Schedule F, but the form itself computes no tax; " +
    "the engine records the election and sends nothing downstream.",
  fields: {
    business_name: "The name of the business adopting LIFO.",
    employer_id: "The business's employer identification number.",
    first_year_lifo_elected: "The first tax year the business uses LIFO.",
    inventory_method_before: "The inventory valuation method the business used before switching to LIFO.",
    goods_to_which_lifo_applies: "A description of the goods, or classes of goods, the LIFO method will cover.",
    book_value_first_year: "The value of the inventory at the start of the first LIFO year.",
  },
  options: {
    inventory_method_before: {
      cost: "Inventory valued at cost",
      lower_cost_market: "Inventory valued at the lower of cost or market",
      retail: "The retail method",
      other: "Another method",
    },
  },
};
