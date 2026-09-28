import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 7207",
  subtitle: "Advanced Manufacturing Production Credit",
  topic: Topic.BusinessCredits,
  summary:
    "The form a manufacturer uses to claim the section 45X credit for producing and selling eligible clean energy components in the United States, such as solar modules and cells, wind turbine parts, inverters, battery modules and critical minerals. " +
    "You list each component type with its quantity; the engine multiplies by a per-unit rate built into the node (or one you supply) and adds the total to the general business credit on Schedule 3 line 6z.",
  fields: {
    components: "One line for each type of eligible component you produced and sold during the year.",
    "components.component_type": "The kind of component, which sets the credit rate and the unit the quantity is measured in.",
    "components.quantity":
      "How much you produced: watts of capacity for solar, wind and inverter components, watt-hours for battery modules, or production cost in dollars for critical minerals.",
    "components.credit_rate_override": "A per-unit rate to use instead of the engine's built-in rate, for example when a phased-down rate applies.",
  },
  options: {
    "components.component_type": {
      solar_module: "Solar module (per watt of capacity)",
      solar_cell: "Solar cell (per watt of capacity)",
      thin_film_solar_cell: "Thin-film solar cell (per watt of capacity)",
      wind_blade: "Wind turbine blade (per watt of turbine capacity)",
      wind_nacelle: "Wind turbine nacelle (per watt of turbine capacity)",
      wind_tower: "Wind turbine tower (per watt of turbine capacity)",
      wind_offshore_foundation: "Offshore wind foundation (per watt of turbine capacity)",
      inverter_central_over_1mw: "Central inverter, larger size (per watt)",
      inverter_central_under_1mw: "Central inverter, smaller size (per watt)",
      inverter_string: "String inverter (per watt)",
      inverter_micro_under_65w: "Microinverter, lower-output class (per watt)",
      inverter_micro_over_65w: "Microinverter, higher-output class (per watt)",
      inverter_gamut: "Other inverter category (per watt)",
      battery_module: "Battery module (per watt-hour of capacity)",
      critical_mineral_other: "Applicable critical mineral (a percentage of production costs)",
    },
  },
};
