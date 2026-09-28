import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 3468",
  subtitle: "Investment Credit",
  topic: Topic.BusinessCredits,
  summary:
    "The form that figures the investment credit for placing certain business property in service, including rehabilitating certified historic buildings and investing in solar, wind, fuel cell, geothermal and other clean energy property. " +
    "It is for businesses and investors, not home energy improvements (those go on Form 5695). " +
    "The engine applies a flat base rate to each basis you enter and adds the total to the general business credit on Schedule 3, which reduces tax on Form 1040.",
  fields: {
    rehab_certified_historic_qre:
      "Part I. Qualified rehabilitation expenditures for a certified historic structure. The engine allows 20% of this amount.",
    solar_energy_property_basis: "Basis of solar energy property placed in service. The engine allows 30%.",
    fiber_optic_solar_basis: "Basis of fiber-optic solar lighting property. The engine allows 30%.",
    fuel_cell_property_basis: "Basis of qualified fuel cell property. The engine allows 30%, limited by capacity when you enter it.",
    fuel_cell_capacity_kw: "Fuel cell capacity in kilowatts. The credit is limited to $1,500 for each half kilowatt.",
    microturbine_property_basis: "Basis of qualified microturbine property. The engine allows 10%, limited by capacity when you enter it.",
    microturbine_capacity_kw: "Microturbine capacity in kilowatts. The credit is limited to $200 per kilowatt.",
    small_wind_property_basis: "Basis of qualified small wind energy property. The engine allows 30%.",
    geothermal_heat_pump_basis: "Basis of geothermal heat pump property. The engine allows 10%.",
    chp_property_basis: "Basis of combined heat and power system property. The engine allows 10%.",
    waste_energy_recovery_basis: "Basis of waste energy recovery property. The engine allows 20%.",
    offshore_wind_basis: "Basis of qualified offshore wind facility property. The engine allows 30%.",
    advanced_energy_project_basis:
      "Basis of property for a qualifying advanced energy project (section 48C). The engine allows 30%, only with a Department of Energy allocation.",
    advanced_energy_project_has_doe_allocation:
      "Mark if the project received a credit allocation from the Department of Energy and the IRS. Without it, no advanced energy project credit is allowed.",
    clean_electricity_basis: "Basis of a qualified clean electricity investment facility (section 48E). The engine allows 30%.",
  },
};
