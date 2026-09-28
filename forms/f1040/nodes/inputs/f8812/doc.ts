import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule 8812",
  subtitle: "Credits for Qualifying Children and Other Dependents",
  topic: Topic.Family,
  summary:
    "The schedule that figures the Child Tax Credit, the Credit for Other Dependents and the refundable Additional Child Tax Credit (ACTC). " +
    "For 2025 the engine allows $2,200 per qualifying child and $500 per other dependent, reduced by $50 per $1,000 of modified AGI over $400,000 (joint) or $200,000 (others). " +
    "The part your tax can absorb goes to Schedule 3 line 6b; the ACTC, up to $1,700 per child, goes to Form 1040 line 28. " +
    "If you enter nothing here, the engine fills it from your dependents, W-2s, Schedule C and AGI.",
  fields: {
    qualifying_children_count:
      "Line 4. Number of qualifying children under 17 with a valid SSN. Each one is worth the full child tax credit amount.",
    other_dependents_count:
      "Line 6. Number of dependents who don't qualify for the child tax credit, such as older children or relatives. Each one is worth the other-dependent credit.",
    agi: "Line 1. Your adjusted gross income from Form 1040 line 11. The starting point for the income phase-out.",
    filing_status: "Your filing status. Married filing jointly uses the higher phase-out threshold.",
    earned_income:
      "Line 18a. Your earned income (wages and net self-employment earnings). The ACTC is 15% of earned income above $2,500.",
    income_tax_liability:
      "Your income tax before this credit. The nonrefundable credit can't exceed it after other nonrefundable credits are subtracted.",
    puerto_rico_excluded_income:
      "Line 2a. Income you excluded as a bona fide resident of Puerto Rico. Added back to AGI to get modified AGI.",
    form_2555_amounts:
      "Line 2b. Foreign earned income and housing exclusions from Form 2555. Added back to AGI; also blocks the refundable ACTC.",
    form_4563_amount: "Line 2c. Income excluded for American Samoa residents on Form 4563. Added back to AGI.",
    nontaxable_combat_pay:
      "Line 18b. Nontaxable combat pay (W-2 box 12 code Q). Counted as earned income for the ACTC.",
    ss_taxes_withheld:
      "Social Security tax withheld from your pay. Used in the alternative ACTC method for three or more children or Puerto Rico residents.",
    medicare_taxes_withheld: "Medicare tax withheld from your pay. Used in the same alternative ACTC method.",
    se_tax: "Self-employment tax you owe. Counted with withheld payroll taxes in the alternative ACTC method.",
    eic_amount: "Your earned income credit. Subtracted from payroll taxes in the alternative ACTC method.",
    do_not_claim_actc: "Mark if you choose not to claim the refundable Additional Child Tax Credit.",
    has_form_2555:
      "Mark if you file Form 2555 (foreign earned income exclusion). Filers of Form 2555 can't claim the ACTC.",
    bona_fide_pr_resident:
      "Mark if you were a bona fide resident of Puerto Rico. Lets you use the payroll-tax method for the ACTC with any number of children.",
    odc_only_override:
      "Marks a dependent as eligible only for the Credit for Other Dependents. Recorded only; the engine uses the counts you enter.",
    not_eligible_override:
      "Marks a dependent as eligible for neither credit. Recorded only; the engine uses the counts you enter.",
    form_8332_override:
      "Marks that you have Form 8332 (or a similar statement) releasing the child to you as the noncustodial parent. Recorded only.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
