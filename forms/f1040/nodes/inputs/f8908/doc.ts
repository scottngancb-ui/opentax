import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8908",
  subtitle: "Energy Efficient Home Credit",
  topic: Topic.Energy,
  summary:
    "The form an eligible contractor uses to claim the section 45L credit for building or manufacturing new energy-efficient homes " +
    "that are sold or leased to someone for use as a residence. It is for builders, not home buyers. " +
    "Enter one entry per qualifying home; the engine allows $2,500 per ENERGY STAR home or $5,000 per Zero Energy Ready home " +
    "and reports the total on Schedule 3 as part of the general business credit.",
  fields: {
    home_address: "The address or other identifier of the qualifying home. For your records only.",
    construction_type: "What kind of dwelling was built: a single-family home, a manufactured home, or a unit in a multifamily building.",
    energy_certification: "The energy standard the home was certified to meet. It sets the credit: $5,000 for a DOE Zero Energy Ready Home, $2,500 otherwise.",
    credit_amount_override: "The credit for this home, if you figured it yourself (for example, a multifamily unit that meets prevailing wage rules). Replaces the standard amount.",
  },
  options: {
    construction_type: {
      single_family: "A single-family home",
      manufactured_home: "A manufactured home built to the federal HUD code",
      multifamily: "A dwelling unit in a multifamily building",
    },
    energy_certification: {
      energy_star_50pct: "Certified under the ENERGY STAR home program ($2,500 per home in the engine)",
      zero_energy_ready: "Certified as a DOE Zero Energy Ready Home ($5,000 per home in the engine)",
      energy_star_45ach: "Certified under the ENERGY STAR Multifamily program ($2,500 per unit in the engine)",
    },
  },
};
