import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1116",
  subtitle: "Foreign Tax Credit (Individual, Estate, or Trust)",
  topic: Topic.Foreign,
  summary:
    "Figures the credit for income taxes you paid to a foreign country, so the same income is not fully taxed twice. " +
    "Filled in automatically from foreign taxes reported on Forms 1099-DIV and 1099-INT, Schedules K-1 and foreign earned income, " +
    "plus your tax and income totals from the rest of the return. The credit is limited to the share of your U.S. tax that " +
    "matches your foreign-source share of taxable income, figured separately for each income category. The allowed credit goes " +
    "to Schedule 3 line 1, and an AMT version goes to Form 6251.",
  fields: {
    foreign_tax_items:
      "One entry for each source of foreign income and the foreign tax paid on it, such as a fund's foreign dividends or wages earned abroad.",
    "foreign_tax_items.foreign_tax_paid": "Foreign income tax paid or accrued on this income, in U.S. dollars.",
    "foreign_tax_items.income_category":
      "The Form 1116 income category (separate limitation basket). Items in the same category are combined and limited together.",
    "foreign_tax_items.foreign_gross_income": "Line 1a. Gross income from sources outside the United States for this item.",
    "foreign_tax_items.directly_allocable_deductions":
      "Deductions that relate directly to this foreign income, subtracted before the limit is figured.",
    "foreign_tax_items.apportioned_deductions":
      "Other deductions you have already apportioned to this foreign income, such as a share of itemized deductions.",
    "foreign_tax_items.excluded_income":
      "Part of this foreign income that is excluded from U.S. tax (for example, by the foreign earned income exclusion), so it does not count toward the limit.",
    worldwide_taxable_income:
      "Your taxable income from all sources. The denominator of the limitation fraction (foreign taxable income ÷ worldwide taxable income).",
    worldwide_gross_income:
      "Your gross income from all sources. Used to apportion general deductions to foreign income by the ratio of foreign to worldwide gross income.",
    general_deductions:
      "Deductions not tied to any specific income, such as the standard deduction. A share is apportioned to each category based on gross income.",
    us_tax_before_credits:
      "Your regular income tax before credits (Form 1040 line 16). The credit in each category cannot exceed this tax times the limitation fraction.",
    tentative_minimum_tax:
      "Tentative minimum tax from Form 6251. Used the same way to figure the foreign tax credit allowed against AMT.",
  },
  options: {
    "foreign_tax_items.income_category": {
      passive: "Passive category income, such as most dividends, interest, rents and royalties from investments.",
      general: "General category income, such as wages and active business income earned abroad.",
      section_951a: "Section 951A (GILTI) income from controlled foreign corporations.",
      branch: "Foreign branch category income from a business operated through a foreign branch.",
      treaty: "Income re-sourced as foreign under a tax treaty, which must be figured separately.",
      section_901j: "Income from sanctioned countries under section 901(j). The IRS generally allows no credit for taxes on it; the engine does not apply that denial.",
    },
  },
};
