import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8824",
  subtitle: "Like-Kind Exchanges",
  topic: Topic.Investments,
  summary:
    "The form for reporting a section 1031 like-kind exchange, where you trade business or investment real property for similar property and defer the gain. " +
    "No other form feeds it in the engine; you supply the exchange details directly. " +
    "Gain is taxed now only to the extent you received cash, other property or net debt relief (boot). " +
    "Recognized gain goes to Form 4797 for business property or Schedule D for investment property, and the replacement property's basis carries forward.",
  fields: {
    relinquished_fmv: "Fair market value of the property you gave up.",
    relinquished_basis: "Your adjusted basis in the property you gave up.",
    received_fmv: "Line 17. Fair market value of the like-kind property you received.",
    cash_received: "Cash you received in the exchange. It is boot and can make part of the gain taxable.",
    other_property_fmv: "Line 15. Fair market value of any property you received that isn't like-kind. It is also boot.",
    liabilities_assumed_by_buyer: "Line 15. Your debts the other party took over. Debt relief beyond the debt you took on counts as boot.",
    liabilities_taxpayer_assumed: "Debts you took over on the property you received. They offset the debt the other party assumed.",
    gain_type: "Whether the property was used in a business or held for investment, which decides where recognized gain is reported.",
  },
  options: {
    gain_type: {
      section_1231: "Business property: recognized gain goes to Form 4797 as section 1231 gain",
      capital: "Investment property: recognized gain goes to Schedule D as long-term capital gain (the default)",
    },
  },
};
