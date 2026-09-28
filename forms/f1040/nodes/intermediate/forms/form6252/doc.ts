import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 6252",
  subtitle: "Installment Sale Income",
  topic: Topic.Investments,
  summary:
    "The form for reporting a sale where you receive at least one payment after the year of sale, so the gain is taxed as " +
    "payments come in. Each year's gain is the payments received times the gross profit ratio. Depreciation recapture is taxed " +
    "in full in the year of sale through Form 4797. Gain goes to Schedule D, or to Form 4797 for business property. No other " +
    "screen feeds this node yet, so it only runs when its values are supplied directly.",
  fields: {
    selling_price: "Line 5. Selling price, including any mortgage the buyer assumed. Recorded but not used in the math.",
    gross_profit: "Line 10. Gross profit: selling price minus your adjusted basis and selling expenses.",
    contract_price:
      "Line 15. Contract price: selling price minus any mortgage the buyer assumed. Gross profit divided by this is the gross profit ratio.",
    payments_received: "Payments received this year. Multiplied by the gross profit ratio to get this year's gain.",
    depreciation_recapture:
      "Section 1245 or 1250 depreciation recapture. Taxed as ordinary income in the year of sale; sent to Form 4797.",
    is_capital_asset:
      "Check if the property is a capital asset (defaults to yes). If not, the gain is treated as section 1231 gain on Form 4797.",
    is_long_term: "Check if the capital gain is long-term (defaults to yes). Otherwise it goes to Schedule D as short-term.",
  },
};
