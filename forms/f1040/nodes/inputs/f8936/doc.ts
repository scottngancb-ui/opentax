import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8936",
  subtitle: "Clean Vehicle Credits",
  topic: Topic.Energy,
  summary:
    "The form used to claim the credit for buying a qualifying new clean vehicle (up to $7,500) or a previously owned one (30% of the price, up to $4,000). " +
    "Buyers whose modified AGI is over the limit for their filing status, new vehicles over the MSRP cap, and used vehicles over $25,000 get no credit. " +
    "Enter one entry per vehicle. The engine reduces the credit for business use and reports the personal credit on Schedule 3 as a nonrefundable credit.",
  fields: {
    vehicle_description: "The vehicle's year, make and model.",
    vin: "The 17-character vehicle identification number. Recorded only; not used in the math.",
    purchase_date: "The date you bought the vehicle. Recorded only; the engine does not check dates.",
    is_new_vehicle: "Mark for a new vehicle. Leave unchecked (false) for a previously owned vehicle, which uses the used-vehicle rules.",
    credit_amount: "For a new vehicle, the credit amount for that vehicle as certified by the seller or manufacturer. Capped at $7,500.",
    sale_price: "For a used vehicle, the price you paid. The credit is 30% of this, up to $4,000, and none if the price is over $25,000.",
    msrp: "For a new vehicle, the manufacturer's suggested retail price. Over $80,000 for an SUV, van or pickup, or $55,000 for other vehicles, means no credit.",
    vehicle_type: "The vehicle class that sets the MSRP cap for a new vehicle.",
    business_use_pct: "The share of use that is for business, as a decimal from 0 to 1. The credit here is reduced by this share.",
    modified_agi: "Your modified adjusted gross income for the income-limit test. If left blank, the income test is skipped.",
    filing_status: "Your filing status, which sets the income limit.",
  },
  options: {
    vehicle_type: {
      suv_van_truck: "SUV, van or pickup truck ($80,000 MSRP cap)",
      other: "Any other vehicle, such as a car ($55,000 MSRP cap)",
    },
    filing_status: {
      single: "Single ($150,000 income limit in the engine)",
      mfs: "Married filing separately ($150,000 income limit in the engine)",
      mfj: "Married filing jointly ($300,000 income limit)",
      hoh: "Head of household ($225,000 income limit)",
      qss: "Qualifying surviving spouse ($300,000 income limit)",
    },
  },
};
