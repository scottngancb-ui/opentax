import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 3800",
  subtitle: "General Business Credit",
  topic: Topic.BusinessCredits,
  summary:
    "The form that combines most business credits, such as the work opportunity, research and small employer health insurance credits, into one general business credit and applies carryovers from other years. " +
    "Anyone claiming one of these credits files it. The engine adds your component credits (or a total you enter) plus carryforwards and carrybacks and reports the sum as the " +
    "general business credit on Schedule 3, reducing tax on Form 1040. The engine does not apply the separate Form 3800 tax limitation here.",
  fields: {
    total_gbc: "A total current-year general business credit you already figured. If entered, it replaces the sum of the component credits below.",
    work_opportunity_credit: "Work opportunity credit from Form 5884, for hiring people from certain targeted groups.",
    research_credit: "Credit for increasing research activities, from Form 6765.",
    disabled_access_credit: "Disabled access credit from Form 8826, for a small business's costs of making it accessible to people with disabilities.",
    employer_pension_startup_credit: "Credit for a small employer's costs of starting a retirement plan, from Form 8881.",
    employer_childcare_credit: "Credit for employer-provided child care facilities and services, from Form 8882.",
    small_employer_health_credit: "Credit for small employer health insurance premiums, from Form 8941.",
    new_markets_credit: "New markets credit from Form 8874, for investing in low-income community development entities.",
    energy_efficient_home_credit: "Energy efficient home credit from Form 8908, for contractors who build qualifying energy-efficient homes.",
    advanced_manufacturing_credit: "Advanced manufacturing production credit from Form 7207, for producing clean energy components.",
    carryforward_credit: "Unused general business credit carried forward from earlier years.",
    carryback_credit: "Unused general business credit carried back from a later year.",
  },
};
