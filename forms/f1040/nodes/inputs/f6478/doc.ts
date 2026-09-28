import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 6478",
  subtitle: "Biofuel Producer Credit",
  topic: Topic.BusinessCredits,
  summary:
    "A general business credit form for producers and blenders of qualified biofuels, figured per gallon. " +
    "You list gallons by fuel type; the engine multiplies each by a per-gallon rate built into the node (or a rate you supply) and adds the total to the general business credit on Schedule 3 line 6z. " +
    "It mainly concerns businesses, not typical individual filers.",
  fields: {
    fuel_entries: "One line for each type of qualified fuel you produced or sold during the year.",
    "fuel_entries.fuel_type": "The kind of fuel, which sets the per-gallon credit rate.",
    "fuel_entries.gallons": "Qualified gallons of this fuel produced or sold during the year.",
    "fuel_entries.credit_rate_override": "A per-gallon rate to use instead of the engine's built-in rate for this fuel type.",
  },
  options: {
    "fuel_entries.fuel_type": {
      alcohol_mixture: "Alcohol (ethanol) blended into a fuel mixture",
      biodiesel_mixture: "Biodiesel blended into diesel fuel",
      cellulosic_biofuel: "Cellulosic biofuel produced from plant material",
      second_generation_biofuel: "Second generation biofuel",
      small_agri_producer: "Agri-biodiesel from a small producer",
    },
  },
};
