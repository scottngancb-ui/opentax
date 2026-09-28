import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Vehicle expenses",
  subtitle: "Business car and truck expenses",
  topic: Topic.Business,
  summary:
    "The costs of using a car or truck in a business, rental or farm activity. You can deduct either the standard mileage rate (70 cents per business mile for 2025) " +
    "or the business-use share of your actual expenses. The engine figures the deduction for each vehicle and adds it to the car and truck expense line of Schedule C (line 9), " +
    "Schedule E or Schedule F, depending on the activity. Enter one entry per vehicle.",
  fields: {
    vehicle_description: "The year, make and model or another description that identifies the vehicle.",
    placed_in_service_date: "The date you first started using the vehicle for business.",
    business_miles:
      "Miles you drove the vehicle for business during the year. Commuting is not business use. Cannot be more than total miles.",
    total_miles:
      "All miles you drove the vehicle during the year. Under the actual method, business miles divided by total miles gives the business-use percentage.",
    method:
      "How to figure the deduction: the standard mileage rate, or actual expenses multiplied by the business-use percentage.",
    actual_expenses: "Your actual vehicle costs for the year. Used only with the actual expense method.",
    "actual_expenses.depreciation": "Depreciation on the vehicle for the year.",
    "actual_expenses.gas_oil": "What you spent on gas and oil.",
    "actual_expenses.repairs": "What you spent on repairs and maintenance, including tires.",
    "actual_expenses.insurance": "Vehicle insurance premiums.",
    "actual_expenses.registration": "Vehicle registration and license fees.",
    "actual_expenses.lease_payments": "Lease payments, if you lease the vehicle.",
    "actual_expenses.other": "Other vehicle operating costs not listed above.",
    purpose: "Which activity the vehicle is used in, which decides the schedule that receives the deduction.",
  },
  options: {
    method: {
      standard: "Standard mileage rate: business miles times 70 cents",
      actual: "Actual expenses: total actual costs times the business-use percentage",
    },
    purpose: {
      SCHEDULE_C: "Sole proprietorship or self-employment (Schedule C line 9)",
      SCHEDULE_E: "Rental real estate or royalty activity (Schedule E)",
      SCHEDULE_F: "Farming (Schedule F)",
    },
  },
};
