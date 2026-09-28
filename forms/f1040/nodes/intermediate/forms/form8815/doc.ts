import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8815",
  subtitle: "Exclusion of Interest From Series EE and I U.S. Savings Bonds Issued After 1989",
  topic: Topic.Education,
  summary:
    "The form that lets you exclude savings bond interest from income when you cash Series EE or I bonds to pay qualified higher education expenses. " +
    "No other form feeds it in the engine; you supply its values directly. Married filing separately returns can't use it. " +
    "The exclusion is prorated if expenses are less than the bond proceeds, phases out with modified AGI, and is subtracted on Schedule B.",
  fields: {
    ee_bond_interest: "Line 6. Interest included in the Series EE and I bonds you cashed this year.",
    bond_proceeds: "Line 5. Total proceeds (principal plus interest) from the bonds you cashed.",
    qualified_expenses: "Line 9. Tuition and fees for you, your spouse or dependents, minus tax-free help such as scholarships.",
    modified_agi: "Line 11. Modified AGI. The exclusion phases out between $96,800 and $111,800 ($145,200 and $175,200 for joint or surviving spouse returns).",
    filing_status: "Your filing status. It sets the phase-out range; married filing separately is not eligible.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately (not eligible)",
      mfj: "Married filing jointly (higher phase-out range)",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse (higher phase-out range)",
    },
  },
};
