import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8965",
  subtitle: "Health Coverage Exemptions",
  topic: Topic.Health,
  summary:
    "The form once used to claim an exemption from the Affordable Care Act penalty for going without health coverage. " +
    "The federal penalty was reduced to zero starting in 2019, so the form is no longer used on federal returns and has no effect in 2025. " +
    "The engine keeps the entries for reference (a few states have their own coverage mandates) but produces no federal output.",
  fields: {
    coverage_exemption_type: "Part I. The kind of coverage exemption being claimed, if any.",
    exemption_certificate_number: "Part I, column c. The exemption certificate number the Marketplace issued, for Marketplace-granted exemptions.",
    months_without_coverage: "Twelve yes/no entries, January through December, marking each month without qualifying coverage.",
    household_income_below_threshold: "Mark if your household income was below the filing threshold, which was itself an exemption.",
  },
  options: {
    coverage_exemption_type: {
      none: "No exemption claimed",
      marketplace: "An exemption granted by the Health Insurance Marketplace, with a certificate number",
      hardship: "A hardship exemption",
      other: "Another exemption claimed on the return",
    },
  },
};
