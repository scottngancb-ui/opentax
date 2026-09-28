import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule F",
  subtitle: "Profit or Loss From Farming",
  topic: Topic.Business,
  summary:
    "Reports income and expenses from a farming business, one schedule per farm. Anyone who operates a farm as a sole proprietor, or a farming " +
    "LLC taxed as one, files it. Net farm profit or loss goes to Schedule 1 line 6; a profit of $400 or more also goes to Schedule SE, and profits count " +
    "toward the qualified business income deduction. Losses can be limited by the passive activity (Form 8582), at-risk (Form 6198) or excess business loss (Form 461) rules. " +
    "Some farm payments on Form 1099-G flow in automatically.",
  fields: {
    schedule_fs: "One entry per farm business you operate.",
    "schedule_fs.line_b_agricultural_activity_code": "Line B. The six-digit principal agricultural activity code from the Schedule F instructions that best describes the farm.",
    "schedule_fs.line_c_farm_name": "Line C. The farm's business name, if it has one.",
    "schedule_fs.line_d_ein": "Line D. The farm's employer identification number, if it has one.",
    "schedule_fs.line_e_material_participation":
      "Line E. Whether you materially participated in running the farm this year. If not, the farm is a passive activity and its result goes to Form 8582.",
    "schedule_fs.line_f_made_1099_payments": "Line F. Whether you made payments in 2025 that require you to file Forms 1099.",
    "schedule_fs.accounting_method":
      "Line A. Your accounting method. The engine figures income and expenses from the Part I and Part II cash-method lines either way.",
    "schedule_fs.line1_sales_livestock_resale":
      "Line 1a. Sales of livestock and other items you bought specifically for resale.",
    "schedule_fs.line2_cost_livestock_resale": "Line 1b. Cost or other basis of the livestock and items reported on line 1a; subtracted from it.",
    "schedule_fs.line3a_cooperative_distributions": "Line 3a. Total distributions received from cooperatives (from Forms 1099-PATR). For reference; only the taxable amount is used.",
    "schedule_fs.line3b_cooperative_distributions_taxable": "Line 3b. Taxable part of cooperative distributions. Included in gross farm income.",
    "schedule_fs.line4a_ag_program_payments": "Line 4a. Total agricultural program payments received. For reference; only the taxable amount is used.",
    "schedule_fs.line4b_ag_program_payments_taxable": "Line 4b. Taxable part of agricultural program payments. Included in gross farm income.",
    "schedule_fs.line5a_ccc_loans_election": "Line 5a. Commodity Credit Corporation (CCC) loans you elected to report as income this year.",
    "schedule_fs.line5b_ccc_loans_forfeited": "Line 5b. CCC loans forfeited during the year.",
    "schedule_fs.line5c_ccc_loans_forfeited_basis": "Line 5c. Your basis in the forfeited CCC loans (amounts already reported as income). The engine subtracts it from line 5b to get the taxable part.",
    "schedule_fs.line6a_crop_insurance": "Line 6a. Total crop insurance proceeds and federal crop disaster payments received. For reference; only the amounts on 6b and 6d are used.",
    "schedule_fs.line6b_crop_insurance_taxable": "Line 6b. Taxable part of crop insurance and disaster payments reported this year.",
    "schedule_fs.line6d_crop_insurance_deferred": "Line 6d. Crop insurance proceeds deferred from last year and included this year.",
    "schedule_fs.line7_custom_hire_income": "Line 7. Custom hire (machine work) income you earned.",
    "schedule_fs.line8_other_income": "Line 8. Other farm income, such as bartering, fuel tax credits or refunds. Can be negative.",
    "schedule_fs.line10_car_truck": "Line 10. Car and truck expenses for the farm.",
    "schedule_fs.line11_chemicals": "Line 11. Chemicals.",
    "schedule_fs.line12_conservation":
      "Line 12. Soil and water conservation expenses. The engine limits the deduction to 25% of gross farm income.",
    "schedule_fs.line13_custom_hire": "Line 13. Custom hire (machine work) you paid for.",
    "schedule_fs.line14_depreciation": "Line 14. Depreciation and section 179 expense, usually from Form 4562.",
    "schedule_fs.line15_employee_benefits": "Line 15. Employee benefit programs other than pension plans.",
    "schedule_fs.line16_feed": "Line 16. Feed.",
    "schedule_fs.line17_fertilizers": "Line 17. Fertilizers and lime.",
    "schedule_fs.line18_freight": "Line 18. Freight and trucking.",
    "schedule_fs.line19_gasoline": "Line 19. Gasoline, fuel and oil.",
    "schedule_fs.line20_insurance": "Line 20. Insurance other than health insurance.",
    "schedule_fs.line21a_interest_mortgage": "Line 21a. Mortgage interest paid to banks and others on farm property.",
    "schedule_fs.line21b_interest_other": "Line 21b. Other farm interest.",
    "schedule_fs.line22_labor_hired": "Line 22. Labor hired, less employment credits.",
    "schedule_fs.line23_pension_plans": "Line 23. Pension and profit-sharing plans for employees.",
    "schedule_fs.line24a_rent_vehicles": "Line 24a. Rent or lease of vehicles, machinery and equipment.",
    "schedule_fs.line24b_rent_land": "Line 24b. Rent or lease of other things, such as land and animals.",
    "schedule_fs.line25_repairs": "Line 25. Repairs and maintenance.",
    "schedule_fs.line26_seeds": "Line 26. Seeds and plants.",
    "schedule_fs.line27_storage": "Line 27. Storage and warehousing.",
    "schedule_fs.line28_supplies": "Line 28. Supplies.",
    "schedule_fs.line29_taxes": "Line 29. Taxes, such as farm property taxes and the employer share of payroll taxes.",
    "schedule_fs.line30_utilities": "Line 30. Utilities.",
    "schedule_fs.line31_vet": "Line 31. Veterinary, breeding and medicine.",
    "schedule_fs.line32e_other_expenses": "Line 32. Total of other expenses you list on lines 32a–32f.",
    "schedule_fs.line36_at_risk":
      "Line 36. If the farm has a loss, whether all of your investment in it is at risk. Choosing b sends the loss to Form 6198.",
    filing_status: "Your filing status, used to pick the excess business loss threshold for Form 461.",
    crop_insurance:
      "Crop insurance proceeds reported on Form 1099-MISC box 9. Received from other nodes, but the engine does not currently add it to farm income; enter it on line 6b instead.",
    line8_other_income:
      "Other farm income routed from Form 1099-NEC. Received from other nodes, but the engine does not currently add it to farm income; enter it on the farm's line 8 instead.",
    line10_car_truck:
      "Car and truck expenses routed from the vehicle expense worksheet. Received from other nodes, but the engine does not currently deduct it; enter it on the farm's line 10 instead.",
    line4a_gov_payments:
      "Agricultural program payments from Form 1099-G, routed in automatically. Added to total farm profit.",
    line5_ccc_gain:
      "Commodity Credit Corporation loan market gain from Form 1099-G, routed in automatically. Added to total farm profit.",
  },
  options: {
    "schedule_fs.line36_at_risk": {
      a: "36a. All of your investment in this farm is at risk.",
      b: "36b. Some of your investment is not at risk (for example, nonrecourse financing). A loss goes to Form 6198.",
    },
  },
};
