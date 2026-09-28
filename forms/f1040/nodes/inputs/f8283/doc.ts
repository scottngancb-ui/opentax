import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8283",
  subtitle: "Noncash Charitable Contributions",
  topic: Topic.Deductions,
  summary:
    "The form you attach when you itemize and give property instead of cash to charity, with total noncash gifts over $500. " +
    "Section A lists smaller items (generally $5,000 or less each); Section B lists larger items, which usually need a qualified appraisal. " +
    "The engine adds the fair market values to Schedule A line 12, limiting Section B capital gain property to your cost basis.",
  fields: {
    section_a_items: "Section A. Donated items or groups of similar items worth $5,000 or less each.",
    "section_a_items.property_description": "A description of the donated property.",
    "section_a_items.date_acquired": "When you acquired the property.",
    "section_a_items.date_contributed": "The date you gave the property to the charity.",
    "section_a_items.fmv": "The property's fair market value on the date of the gift. Added to Schedule A line 12.",
    "section_a_items.fmv_method": "How you determined the fair market value.",
    "section_a_items.cost_or_adjusted_basis": "What you paid for the property, adjusted for improvements or depreciation.",
    "section_a_items.is_vehicle": "Mark if the item is a car, boat or airplane. Vehicle gifts have special rules and need Form 1098-C.",
    "section_a_items.vehicle_1098c_received": "Mark if the charity gave you Form 1098-C acknowledging the vehicle donation.",
    "section_a_items.is_clothing_household": "Mark if the item is clothing or a household item, which must be in good used condition or better to deduct.",
    section_b_items: "Section B. Donated items or groups of similar items worth more than $5,000.",
    "section_b_items.property_description": "A description of the donated property.",
    "section_b_items.date_acquired": "When you acquired the property.",
    "section_b_items.date_contributed": "The date you gave the property to the charity.",
    "section_b_items.fmv": "The appraised fair market value. Added to Schedule A line 12, subject to the basis limit below.",
    "section_b_items.cost_or_adjusted_basis": "What you paid for the property, adjusted for improvements or depreciation.",
    "section_b_items.appraiser_name": "Name of the qualified appraiser who valued the property.",
    "section_b_items.appraisal_date": "The date of the appraisal.",
    "section_b_items.is_capital_gain_property":
      "Mark if the item is capital gain property whose deduction is limited to basis. The engine then uses the smaller of value and basis.",
  },
  options: {
    "section_a_items.fmv_method": {
      appraisal: "A written appraisal",
      thrift_shop_value: "The price similar items sell for in thrift shops",
      catalog_value: "A catalog or price guide value",
      comparable_sales: "Sale prices of comparable items",
      formula: "A formula or valuation method",
      other: "Some other method",
    },
  },
};
