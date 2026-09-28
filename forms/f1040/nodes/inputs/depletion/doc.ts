import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Depletion",
  subtitle: "Depletion deduction for mineral, oil and gas properties (IRS worksheet)",
  topic: Topic.Business,
  summary:
    "The deduction for using up a natural resource you own an economic interest in, such as an oil or gas well, coal or a mine. " +
    "Cost depletion recovers your basis as units are sold; percentage depletion is a fixed share of gross income from the property, subject to limits. " +
    "The engine figures both, uses the larger, and sends it to Schedule C line 12 for a business or to Schedule E for a royalty interest. Enter one entry per property.",
  fields: {
    property_type:
      "The kind of resource. It sets the percentage depletion rate: 15% for oil and gas and for metals, 10% for coal, 14% for other minerals.",
    method:
      "The method you expect to use. The engine computes both cost and percentage depletion and always takes the larger, so this choice does not change the result.",
    gross_income: "Gross income you received from the property during the year. Percentage depletion starts from this amount.",
    deductible_expenses:
      "Deductible costs of the property other than depletion. Gross income minus these is the net income that limits percentage depletion (100% of it for oil and gas, 50% for other minerals).",
    adjusted_basis: "Your remaining adjusted basis in the property. Needed for cost depletion.",
    estimated_reserves:
      "The estimated recoverable units (barrels, tons and so on) left at the start of the year. Cost depletion is basis divided by reserves, times units sold.",
    units_produced: "Units produced during the year. For your records; not used in the calculation.",
    units_sold: "Units sold during the year. Multiplied by the per-unit basis to get cost depletion.",
    taxable_income_before_depletion:
      "Your taxable income figured without the depletion deduction. For oil and gas, percentage depletion is limited to 65% of this amount.",
    is_independent_producer:
      "Check if you are an independent producer or royalty owner. For oil and gas, percentage depletion is allowed only when this is checked.",
    purpose: "Where the deduction goes: Schedule C for a mining or drilling business, or Schedule E for royalty income.",
  },
  options: {
    property_type: {
      OIL_GAS: "Oil and natural gas",
      COAL: "Coal and lignite",
      METALS: "Metals such as gold, silver, copper and iron ore",
      OTHER_MINERAL: "Other minerals",
    },
    method: {
      COST: "Cost depletion: recover basis in proportion to units sold",
      PERCENTAGE: "Percentage depletion: a set percentage of gross income from the property",
    },
    purpose: {
      SCHEDULE_C: "Business activity, reported on Schedule C line 12",
      SCHEDULE_E: "Royalty interest, reported on Schedule E",
    },
  },
};
