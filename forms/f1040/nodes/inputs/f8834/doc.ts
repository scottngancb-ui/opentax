import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8834",
  subtitle: "Qualified Electric Vehicle Credit",
  topic: Topic.Energy,
  summary:
    "The form for the older qualified electric vehicle credit, which covered certain two- or three-wheeled and low-speed electric vehicles. " +
    "The credit has largely expired, and the form now mostly carries unused amounts from earlier years. It is not the current clean vehicle credit (Form 8936). " +
    "The engine takes 10% of each vehicle's cost, capped at $2,500 per vehicle, and sends the total to Schedule 3 line 6z.",
  fields: {
    vehicle_description: "Line 1. The vehicle's year, make and model.",
    date_placed_in_service: "The date you first put the vehicle into use.",
    cost: "Line 2. What you paid for the vehicle. The engine takes the credit percentage of this amount.",
    credit_percentage: "The credit rate, as a decimal. Leave blank to use the 10% default.",
    vehicle_type: "The kind of vehicle. Both kinds use the same 10% rate and $2,500 cap in the engine.",
    original_use:
      "Whether the vehicle's original use began with you. The credit is only for new vehicles; if you mark no, the engine allows nothing.",
  },
  options: {
    vehicle_type: {
      two_three_wheel: "A two- or three-wheeled electric vehicle",
      low_speed: "A low-speed electric vehicle",
    },
  },
};
