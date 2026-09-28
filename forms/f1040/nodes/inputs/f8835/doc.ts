import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8835",
  subtitle: "Renewable Electricity, Refined Coal, and Indian Coal Production Credit",
  topic: Topic.Energy,
  summary:
    "The production tax credit for electricity generated from renewable sources such as wind, solar or geothermal and sold to an unrelated person. " +
    "The credit is a per-kilowatt-hour rate for electricity sold during a facility's first ten years; the full rate requires meeting both prevailing wage and apprenticeship rules, otherwise it is one-fifth as much. " +
    "The engine sends the credit to Schedule 3 line 6z as part of the general business credit.",
  fields: {
    energy_type:
      "The facility's energy source. Wind, solar, geothermal and closed-loop biomass use the higher rate; the rest use half that rate.",
    kwh_produced: "Kilowatt-hours of electricity the facility produced this year. Can't be less than the amount sold.",
    kwh_sold:
      "Kilowatt-hours sold to an unrelated person this year. The credit is figured on this amount, not on production.",
    facility_placed_in_service_date:
      "The date the facility was first placed in service. The credit runs for ten years from this date; the engine doesn't check the window.",
    meets_prevailing_wage: "Whether the facility meets the prevailing wage requirements. Needed, with apprenticeship, for the full rate.",
    meets_apprenticeship: "Whether the facility meets the apprenticeship requirements. Needed, with prevailing wage, for the full rate.",
  },
  options: {
    energy_type: {
      WIND: "Wind",
      SOLAR: "Solar",
      GEOTHERMAL: "Geothermal",
      BIOMASS_CLOSED: "Closed-loop biomass (plants grown only to produce electricity)",
      BIOMASS_OPEN: "Open-loop biomass (such as agricultural or wood waste)",
      HYDRO: "Qualified hydropower",
      LANDFILL: "Landfill gas",
      MARINE: "Marine and hydrokinetic energy (waves, tides, currents)",
    },
  },
};
