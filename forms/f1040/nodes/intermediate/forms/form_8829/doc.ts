import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8829",
  subtitle: "Expenses for Business Use of Your Home",
  topic: Topic.Business,
  summary:
    "Figures the home office deduction for a self-employed person who uses part of their home regularly and exclusively for business. " +
    "It applies your business-use percentage (office area ÷ home area) to home expenses, adds depreciation on the business part of the home, " +
    "and limits the total to the business's profit before this deduction. The allowed amount goes to Schedule C line 30. " +
    "Mortgage interest can arrive automatically from Form 1098.",
  fields: {
    total_area: "Line 2. Total area of your home, usually in square feet.",
    business_area:
      "Line 1. Area used regularly and exclusively for business. Divided by total area to get the business-use percentage (capped at 100%).",
    mortgage_interest:
      "Mortgage interest on the home that is already allocated to business use. The engine adds it in full, without applying the business percentage again.",
    insurance: "Homeowner's or renter's insurance for the whole home. The business percentage of it is deductible.",
    rent: "Rent you paid for the whole home. The business percentage of it is deductible.",
    repairs_maintenance: "Repairs and maintenance for the whole home. The business percentage of it is deductible.",
    utilities: "Utilities for the whole home, such as electricity, gas and water. The business percentage of it is deductible.",
    other_expenses: "Other expenses for the whole home, such as HOA fees or security. The business percentage of it is deductible.",
    gross_income_limit:
      "Line 8. The business's tentative profit before the home office deduction. Operating expenses and then depreciation are allowed only up to this amount; if it is zero, no deduction is allowed.",
    prior_year_operating_carryover:
      "Operating expenses disallowed by the income limit last year (line 43 of your prior-year Form 8829). Added to this year's operating expenses.",
    home_fmv_or_basis:
      "Part III. The smaller of your home's adjusted basis or its fair market value, excluding land. The business percentage of it is depreciated.",
    first_business_use_month:
      "Month you first used the home for business: 1 (January) to 12 (December) if it began in 2025, or 0 if it began earlier. Sets the 39-year depreciation rate for the year.",
    prior_year_depreciation_carryover:
      "Depreciation disallowed by the income limit last year (line 44 of your prior-year Form 8829). Added to this year's depreciation.",
  },
};
