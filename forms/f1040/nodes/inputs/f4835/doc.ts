import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4835",
  subtitle: "Farm Rental Income and Expenses",
  topic: Topic.PassThrough,
  summary:
    "The form a landowner uses to report farm rental income based on crops or livestock produced by a tenant when the landowner does not materially participate in running the farm. " +
    "Active farmers use Schedule F instead. This income is not subject to self-employment tax. The engine subtracts expenses from income for each farm and reports the net as " +
    "Schedule E income on Schedule 1 line 5; property with amounts not at risk also goes to Form 6198. Enter one form per farm rental activity.",
  fields: {
    activity_name: "A name for this farm rental activity, such as the farm's name or location.",
    gross_farm_rental_income: "Line 1. Income from the sale of livestock, produce, grains and other crops based on production, plus cash rents tied to production.",
    ccc_loans_forfeited: "Commodity Credit Corporation (CCC) loans you forfeited or repaid with certificates, included in income.",
    agricultural_program_payments: "Agricultural program payments from the government, such as from USDA programs.",
    expense_car_truck: "Car and truck expenses for the farm rental.",
    expense_chemicals: "Chemicals, such as pesticides and herbicides.",
    expense_conservation: "Conservation expenses, such as soil or water conservation work.",
    expense_custom_hire: "Custom hire (machine work) you paid for.",
    expense_depreciation: "Depreciation and section 179 expense on farm property.",
    expense_employee_benefits: "Employee benefit programs other than pension and profit-sharing plans.",
    expense_feed: "Feed purchased for livestock.",
    expense_fertilizer: "Fertilizers and lime.",
    expense_freight_trucking: "Freight and trucking costs.",
    expense_gasoline: "Gasoline, fuel and oil.",
    expense_insurance: "Insurance, other than health insurance.",
    expense_mortgage_interest: "Mortgage interest paid to banks and others on the farm property.",
    expense_other_interest: "Other interest related to the farm rental.",
    expense_labor_hired: "Labor hired, less any employment credits.",
    expense_pension: "Pension and profit-sharing plan contributions for employees.",
    expense_rent_lease_vehicles: "Rent or lease of vehicles, machinery and equipment.",
    expense_rent_lease_land: "Rent or lease of other land, animals and property.",
    expense_repairs_maintenance: "Repairs and maintenance of farm property.",
    expense_seeds_plants: "Seeds and plants purchased.",
    expense_storage_warehousing: "Storage and warehousing costs.",
    expense_supplies: "Supplies used in the farm operation.",
    expense_taxes: "Taxes, such as real estate taxes on the farm.",
    expense_utilities: "Utilities for the farm property.",
    expense_vet_breeding: "Veterinary, breeding and medicine costs.",
    expense_other: "Other farm rental expenses not listed above.",
    net_farm_rental_income: "Your net farm rental income or loss, if already figured. If entered, it replaces the engine's income-minus-expenses calculation.",
    federal_withheld: "Federal income tax withheld on this income. Counts as a payment on Form 1040 line 25b.",
    some_investment_not_at_risk:
      "Mark if some of your investment in this activity is not at risk, such as nonrecourse financing. The activity is then sent to Form 6198 for the at-risk limit.",
    prior_unallowed_passive: "Passive losses from this activity that were not allowed in earlier years. Recorded only; the engine does not use it here.",
    crop_insurance_proceeds: "Crop insurance proceeds received this year for crop damage or loss. Included in income unless deferred.",
    disaster_payment: "Federal disaster payments received this year for crop damage. Included in income unless deferred.",
    defer_to_next_year:
      "Mark if you elect to postpone reporting crop insurance or disaster payments until next year, as allowed when you would normally have sold the crop then.",
    deferred_amount: "The amount of crop insurance and disaster payments you are postponing to next year. Cannot exceed the payments received.",
  },
};
