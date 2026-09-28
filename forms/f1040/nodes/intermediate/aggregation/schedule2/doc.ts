import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule 2",
  subtitle: "Additional Taxes",
  topic: Topic.Return,
  summary:
    "The Form 1040 schedule that collects taxes beyond regular income tax. It is filled in automatically from the forms " +
    "that figure those taxes, such as Form 6251 (AMT), Form 8962, Schedule SE, Forms 4137, 8919, 5329, 8959, 8960, 8889 " +
    "and Schedule H, plus coded W-2 and 1099 amounts. Part I (AMT and excess premium tax credit repayment) goes to " +
    "Form 1040 line 17; everything else is totaled in Part II and goes to line 23.",
  fields: {
    line1_amt: "Line 1. Alternative minimum tax from Form 6251. Part of the Part I total sent to Form 1040 line 17.",
    line8_form5329_tax:
      "Line 8. Additional taxes from Form 5329, such as the 10% tax on early retirement distributions and the 6% tax on excess IRA or HSA contributions.",
    uncollected_fica:
      "Line 13. Social Security and Medicare tax on tips that your employer could not collect (W-2 box 12 codes A and B).",
    uncollected_fica_gtl:
      "Line 13. Uncollected Social Security and Medicare tax on group-term life insurance over $50,000 (W-2 box 12 codes M and N).",
    section409a_excise:
      "Line 17h. The 20% additional tax on deferred compensation from a plan that fails section 409A, from W-2 box 12 code Z.",
    line17h_nqdc_tax:
      "Line 17h. The 20% section 409A additional tax on nonqualified deferred compensation reported on Form 1099-MISC.",
    golden_parachute_excise:
      "Line 17k. The 20% excise tax on excess golden parachute payments, from W-2 box 12 code K.",
    line17k_golden_parachute_excise:
      "Line 17k. The 20% excise tax on excess golden parachute payments reported on Form 1099-NEC.",
    line17e_archer_msa_tax: "Line 17e. Additional tax on taxable Archer MSA distributions, from Form 8853.",
    line17f_medicare_advantage_msa_tax:
      "Line 17f. Additional tax on taxable Medicare Advantage MSA distributions, from Form 8853.",
    line6_uncollected_8919:
      "Line 6. Social Security and Medicare tax on wages from Form 8919, for workers treated as contractors who should have been employees.",
    line17b_hsa_penalty:
      "The 20% additional tax on HSA distributions not used for qualified medical expenses, from Form 8889.",
    line11_additional_medicare: "Line 11. Additional Medicare Tax from Form 8959.",
    line12_niit: "Line 12. Net investment income tax from Form 8960.",
    line4_se_tax: "Line 4. Self-employment tax from Schedule SE.",
    line5_unreported_tip_tax:
      "Line 5. Social Security and Medicare tax on tips you did not report to your employer, from Form 4137.",
    lump_sum_tax:
      "Tax on a qualifying lump-sum retirement distribution figured on Form 4972. The engine includes it in the Part II total.",
    line2_excess_advance_premium:
      "Line 2. Excess advance premium tax credit you must repay, from Form 8962. Part of the Part I total sent to Form 1040 line 17.",
    line7a_household_employment:
      "Household employment taxes (Social Security, Medicare and FUTA for a household worker) from Schedule H.",
    line17d_kiddie_tax:
      "Tax figured on Form 8615 for a child's unearned income (the kiddie tax). The engine includes it in the Part II total.",
    line17a_investment_credit_recapture: "Recapture of a previously claimed investment credit, from Form 4255.",
    line10_homebuyer_credit_repayment:
      "Line 10. Repayment of the first-time homebuyer credit, from Form 5405.",
    line10_recapture_tax: "Recapture of a federal mortgage subsidy when you sell your home, from Form 8828.",
    line10_lihtc_recapture: "Recapture of the low-income housing credit, from Form 8611.",
    line17z_other_additional_taxes:
      "Other additional taxes, such as a partner's share of tax from a partnership audit adjustment reported on Form 8978.",
    line17_exit_tax:
      "Mark-to-market tax on a covered expatriate's deemed sale of property on giving up U.S. citizenship or residency, from Form 8854.",
    line9_965_net_tax_liability:
      "The net tax liability installment under section 965 (tax on deferred foreign income), from Form 965-A.",
  },
};
