import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8864",
  subtitle: "Biodiesel, Renewable Diesel, or Sustainable Aviation Fuels Credit",
  topic: Topic.Energy,
  summary:
    "A business credit for producers and blenders of biodiesel, agri-biodiesel, renewable diesel and sustainable aviation fuel (SAF). " +
    "The engine applies a per-gallon rate to each fuel: $1.00 for biodiesel and renewable diesel, $1.10 for agri-biodiesel, and for SAF $1.25 plus one cent for each point of greenhouse gas reduction above 50%. " +
    "The total goes to Schedule 3 line 6z as part of the general business credit.",
  fields: {
    gallons_biodiesel: "Gallons of biodiesel (other than agri-biodiesel) used in a qualified mixture. Credited at $1.00 per gallon.",
    gallons_agri_biodiesel:
      "Gallons of agri-biodiesel, made from virgin vegetable oils or animal fats, used in a qualified mixture. Credited at $1.10 per gallon.",
    gallons_renewable_diesel: "Gallons of renewable diesel used as fuel or in a qualified mixture. Credited at $1.00 per gallon.",
    gallons_saf: "Gallons of sustainable aviation fuel sold or used in a qualified mixture.",
    saf_ghg_reduction_percentage:
      "The fuel's lifecycle greenhouse gas reduction, in percent. SAF earns no credit at 50% or less; each point above 50 adds one cent per gallon.",
  },
};
