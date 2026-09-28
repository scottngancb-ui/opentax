import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 2106",
  subtitle: "Employee Business Expenses",
  topic: Topic.Deductions,
  summary:
    "The form employees use to figure unreimbursed job expenses. For 2018 through 2025 most employees cannot deduct these costs; only Armed Forces reservists, qualified performing artists, " +
    "fee-basis state or local officials, and employees with impairment-related work expenses may. " +
    "The engine totals vehicle, travel, meal (at 50%) and other costs, subtracts employer reimbursements, and deducts the net on Schedule 1 line 12, reducing AGI.",
  fields: {
    employee_type: "The qualifying category that lets you deduct these expenses.",
    vehicle_expense_method: "How you figure car expenses: the standard mileage rate or your actual costs.",
    business_miles: "Business miles driven. With the standard mileage method, multiplied by $0.70 per mile for 2025.",
    actual_vehicle_expenses:
      "Your total actual car costs (gas, repairs, insurance, depreciation and so on). With the actual expense method, only the business-use percentage counts.",
    business_use_pct: "The percentage of the car's use that was for business, from 0 to 100.",
    parking_tolls_transportation: "Line 2. Parking fees, tolls and local transportation such as trains, buses or taxis, not counting overnight travel.",
    travel_expenses: "Line 3. Lodging and transportation while traveling away from your tax home overnight. Do not include meals.",
    other_expenses: "Line 4. Other job expenses, such as tools, uniforms, professional dues or subscriptions.",
    meals_expenses: "Line 5. Business meal costs. Only 50% is deductible.",
    employer_reimbursements:
      "Line 7. Reimbursements from your employer for these expenses that were not included in your W-2 box 1 wages. They reduce the deduction.",
  },
  options: {
    employee_type: {
      RESERVIST: "Member of a reserve component of the Armed Forces traveling more than 100 miles from home for service.",
      PERFORMING_ARTIST:
        "Qualified performing artist: worked for two or more employers in the performing arts with modest income. The engine drops the deduction if your AGI is over the limit.",
      FEE_BASIS_OFFICIAL: "State or local government official paid on a fee basis.",
      DISABLED_IMPAIRMENT: "Employee with a physical or mental disability claiming impairment-related work expenses.",
    },
    vehicle_expense_method: {
      STANDARD_MILEAGE: "Standard mileage rate: business miles times the IRS rate.",
      ACTUAL_EXPENSE: "Actual expenses: your car costs times the business-use percentage.",
    },
  },
};
