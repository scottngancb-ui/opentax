import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 5695",
  subtitle: "Residential Energy Credits",
  topic: Topic.Energy,
  summary:
    "The data-entry side of Form 5695: where you enter what you spent on energy property for your home. " +
    "Part I covers clean energy such as solar panels, wind, geothermal and batteries (Residential Clean Energy Credit); Part II covers efficiency upgrades such as windows, doors, insulation and heat pumps (Energy Efficient Home Improvement Credit). " +
    "The costs pass unchanged to the computed form5695 node, which applies the rates and caps and sends the credits to Schedule 3.",
  fields: {
    solar_electric_cost: "Line 1. Cost of solar electric (photovoltaic) property for your home, including installation.",
    solar_water_heater_cost: "Line 2. Cost of solar water heating property.",
    fuel_cell_cost: "Line 8. Cost of fuel cell property installed in your main home.",
    fuel_cell_kw_capacity: "Line 10. The fuel cell's capacity in kilowatts, used to cap the fuel cell credit.",
    small_wind_cost: "Line 3. Cost of small wind energy property.",
    geothermal_cost: "Line 4. Cost of geothermal heat pump property.",
    battery_storage_cost: "Line 5b. Cost of battery storage technology.",
    battery_storage_kwh_capacity: "Line 5a. The battery's capacity in kilowatt-hours. A battery must be at least 3 kWh to qualify.",
    prior_year_carryforward: "Line 12. Unused Residential Clean Energy Credit carried forward from last year's Form 5695.",
    windows_cost: "Lines 20a–20b. Cost of qualifying energy-efficient exterior windows and skylights.",
    exterior_doors_cost: "Line 19. Total cost of qualifying energy-efficient exterior doors.",
    exterior_doors_count: "The number of qualifying exterior doors, used to apply the per-door limit.",
    insulation_cost: "Line 18. Cost of insulation or air sealing material or systems.",
    central_ac_cost: "Line 22. Cost of a qualifying central air conditioner.",
    gas_water_heater_cost: "Line 23. Cost of a qualifying natural gas, propane or oil water heater.",
    furnace_boiler_cost: "Line 24. Cost of a qualifying natural gas, propane or oil furnace or hot water boiler.",
    panelboard_cost: "Line 25. Cost of an electrical panel upgrade (panelboard, subpanel, branch circuits or feeders) that enables other qualifying property.",
    heat_pump_cost: "Line 29. Cost of a qualifying electric or natural gas heat pump. Shares a combined yearly limit with heat pump water heaters and biomass.",
    heat_pump_water_heater_cost: "Line 29. Cost of a qualifying heat pump water heater. Shares the combined heat pump and biomass limit.",
    biomass_cost: "Line 29. Cost of a qualifying biomass stove or boiler. Shares the combined heat pump and biomass limit.",
    energy_audit_cost: "Line 26. Cost of a home energy audit by a qualified home energy auditor.",
  },
};
