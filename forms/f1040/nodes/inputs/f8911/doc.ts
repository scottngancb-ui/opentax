import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8911",
  subtitle: "Alternative Fuel Vehicle Refueling Property Credit",
  topic: Topic.Energy,
  summary:
    "The form used to claim the section 30C credit for installing refueling property such as an electric vehicle charger or a " +
    "hydrogen, natural gas or propane fueling station. The credit is 30% of the cost. The engine splits the cost by business use: " +
    "the business part is capped at $100,000 per location and joins the general business credit, and the personal part is capped at $1,000. " +
    "Both flow to Schedule 3 as nonrefundable credits.",
  fields: {
    cost: "Line 1. The total cost of the qualifying refueling property you placed in service this year.",
    business_use_pct: "The share of use that is for business, as a decimal from 0 to 1. The rest is treated as personal use. Leave blank for 100% personal.",
    fuel_type: "The kind of fuel the property dispenses or the charging it provides. Recorded only; it does not change the credit.",
    num_locations: "How many separate locations the property is at. The business credit cap of $100,000 applies per location. Defaults to 1.",
  },
  options: {
    fuel_type: {
      electric_charging: "Electric vehicle charging equipment",
      hydrogen: "Hydrogen fueling property",
      natural_gas: "Natural gas (CNG or LNG) fueling property",
      propane: "Propane (LPG) fueling property",
    },
  },
};
