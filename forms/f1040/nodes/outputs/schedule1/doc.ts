import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule 1",
  subtitle: "Additional Income and Adjustments to Income",
  topic: Topic.Return,
  summary:
    "The Form 1040 schedule for income that doesn't fit on the main form and for above-the-line deductions. " +
    "Part I collects business, rental, farm, unemployment and other income (total on line 10, carried to Form 1040 line 8); Part II collects adjustments such as " +
    "the IRA, HSA, student loan interest and self-employment tax deductions (total on line 26, carried to Form 1040 line 10). " +
    "Filled in automatically from Schedules C, E, F and SE, Forms 1099 and many other forms.",
  fields: {
    line1_state_refund: "Line 1. Taxable refunds, credits or offsets of state and local income taxes, taxable only if you deducted those taxes in an earlier year.",
    line2a_alimony_received: "Line 2a. Alimony received under a divorce or separation agreement made before 2019.",
    line3_schedule_c: "Line 3. Business income or loss from Schedule C.",
    line4_other_gains: "Line 4. Other gains or losses from Form 4797, such as sales of business property.",
    line5_schedule_e: "Line 5. Rental real estate, royalties, partnerships, S corporations and trusts, from Schedule E.",
    line17_schedule_e:
      "Passive losses from Schedule E allowed by Form 8582. Added to the line 5 income in the engine's total.",
    line6_schedule_f: "Line 6. Farm income or loss from Schedule F.",
    line7_unemployment: "Line 7. Unemployment compensation, from Form 1099-G box 1.",
    line8a_nol_deduction: "Line 8a. Net operating loss carried in from an earlier year. Entered as a positive number and subtracted from income.",
    line8b_savings_bond_exclusion:
      "Excluded savings bond interest used for education (Form 8815). The engine subtracts it within other income.",
    line8c_cod_income: "Line 8c. Canceled debt that is taxable, from Form 1099-C after any exclusion on Form 982.",
    line8d_foreign_earned_income_exclusion: "Line 8d. Foreign earned income exclusion from Form 2555, subtracted from income.",
    line8d_foreign_housing_deduction:
      "Foreign housing deduction from Form 2555. The engine subtracts it within other income, which has the same effect on AGI.",
    line8e_archer_msa_dist: "Line 8e. Taxable Archer MSA or Medicare Advantage MSA distributions, from Form 8853.",
    line8g_child_interest_dividends:
      "Your child's interest and dividends that you elected to report on your return (Form 8814). Added to other income.",
    line8i_prizes_awards: "Line 8i. Prizes and awards, such as contest winnings reported on Form 1099-MISC.",
    line8p_excess_business_loss: "Line 8p. Excess business loss disallowed by Form 461, added back to income.",
    line8z_rtaa: "Reemployment Trade Adjustment Assistance (RTAA) payments from Form 1099-G. Part of other income.",
    line8z_taxable_grants: "Taxable grants reported on Form 1099-G, such as certain agricultural or energy grants. Part of other income.",
    line8z_substitute_payments: "Substitute payments in lieu of dividends or interest (Form 1099-MISC box 8). Part of other income.",
    line8z_attorney_proceeds: "Taxable gross proceeds paid through an attorney, routed here from Form 1099-MISC. Part of other income.",
    line8z_nqdc: "Taxable income from a nonqualified deferred compensation plan routed here from another form. Part of other income.",
    line8z_golden_parachute: "Excess golden parachute payments routed here from another form. Part of other income.",
    line8z_other_income: "Other taxable income not listed elsewhere, such as Form 1099-MISC box 3 amounts. Part of other income.",
    line8z_other: "Line 8z. Any other income routed here by other forms. Part of other income.",
    line11_educator_expenses: "Line 11. Educator expenses for K–12 teachers and other eligible educators.",
    line12_business_expenses:
      "Line 12. Certain business expenses of reservists, performing artists and fee-basis government officials, from Form 2106.",
    line13_hsa_deduction: "Line 13. Health savings account deduction, from Form 8889.",
    line13_depreciation: "Depreciation from Form 4562 routed here as an adjustment. Not a line on the printed schedule; the engine counts it with the adjustments.",
    line14_moving_expenses: "Line 14. Moving expenses for members of the Armed Forces on active duty, from Form 3903.",
    line15_se_deduction: "Line 15. Deductible half of self-employment tax, from Schedule SE.",
    line16_sep_simple: "Line 16. Contributions to your own SEP, SIMPLE or other qualified self-employed retirement plan.",
    line17_se_health_insurance: "Line 17. Self-employed health insurance deduction, from Form 7206.",
    line18_early_withdrawal: "Line 18. Penalty a bank charged for early withdrawal of savings, from Form 1099-INT box 2.",
    line19_student_loan_interest: "Student loan interest deduction (line 21 of the printed schedule), from Form 1098-E.",
    line20_ira_deduction: "Line 20. Deductible traditional IRA contributions, from the IRA Deduction Worksheet.",
    line23_archer_msa_deduction: "Line 23. Archer MSA deduction, from Form 8853.",
    line24f_501c18d: "Line 24f. Contributions to a pension plan described in section 501(c)(18)(D).",
    line24h_dpad:
      "Domestic production activities deduction. Repealed after 2017 and not on the 2025 form; kept only for older returns.",
    at_risk_disallowed_add_back: "Losses disallowed by the at-risk rules (Form 6198), added back to income.",
    at_risk_recapture: "At-risk recapture from Form 6198: earlier losses taxed as ordinary income when your amount at risk drops below zero.",
    biz_interest_disallowed_add_back: "Business interest expense disallowed by the section 163(j) limit (Form 8990), added back to income.",
    basis_disallowed_add_back: "S corporation losses disallowed because you lack enough stock or loan basis (Form 7203), added back to income.",
  },
};
