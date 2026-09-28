import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 5695",
  subtitle: "Residential Energy Credits (computed)",
  topic: Topic.Energy,
  summary:
    "The computed side of Form 5695, filled in automatically from the Form 5695 input screen (f5695) where you enter your costs. " +
    "Part I figures the 30% residential clean energy credit (solar, wind, geothermal, fuel cells, batteries). Part II figures " +
    "the 30% energy efficient home improvement credit with its per-item caps, a $1,200 annual cap and a separate $2,000 cap for " +
    "heat pumps and biomass. The total goes to Schedule 3 line 5.",
  fields: {
    solar_electric_cost: "Part I. Cost of solar electric (solar panel) property for your home.",
    solar_water_heater_cost: "Part I. Cost of solar water heating property.",
    fuel_cell_cost: "Part I. Cost of fuel cell property.",
    fuel_cell_kw_capacity: "Part I. Kilowatt capacity of the fuel cell. The fuel cell credit is capped at $1,000 per kW.",
    small_wind_cost: "Part I. Cost of small wind energy property.",
    geothermal_cost: "Part I. Cost of geothermal heat pump property.",
    battery_storage_cost: "Part I. Cost of battery storage technology.",
    battery_storage_kwh_capacity: "Part I. Battery capacity in kilowatt-hours. Must be at least 3 kWh to qualify.",
    prior_year_carryforward: "Part I. Unused residential clean energy credit carried forward from last year.",
    windows_cost: "Part II. Cost of qualifying exterior windows and skylights (credit capped at $600).",
    exterior_doors_cost: "Part II. Cost of qualifying exterior doors (credit capped at $250 per door, $500 total).",
    exterior_doors_count: "Part II. Number of exterior doors, used for the $250-per-door cap.",
    insulation_cost: "Part II. Cost of insulation and air sealing materials.",
    central_ac_cost: "Part II. Cost of a qualifying central air conditioner (credit capped at $600).",
    gas_water_heater_cost: "Part II. Cost of a qualifying natural gas, propane or oil water heater (credit capped at $600).",
    furnace_boiler_cost: "Part II. Cost of a qualifying natural gas, propane or oil furnace or hot water boiler (credit capped at $600).",
    panelboard_cost: "Part II. Cost of an electrical panelboard or subpanel upgrade that enables other improvements (credit capped at $600).",
    heat_pump_cost: "Part II. Cost of an electric or natural gas heat pump. Shares the $2,000 cap with heat pump water heaters and biomass.",
    heat_pump_water_heater_cost: "Part II. Cost of a heat pump water heater. Shares the $2,000 cap.",
    biomass_cost: "Part II. Cost of a biomass stove or boiler. Shares the $2,000 cap.",
    energy_audit_cost: "Part II. Cost of a home energy audit (credit capped at $150).",
  },
};
