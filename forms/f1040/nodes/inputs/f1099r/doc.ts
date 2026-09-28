import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-R",
  subtitle: "Distributions From Pensions, Annuities, Retirement or Profit-Sharing Plans, IRAs, Insurance Contracts, etc.",
  topic: Topic.Retirement,
  summary:
    "The information return a plan administrator, IRA custodian or insurer sends by January 31 when you received $10 or more from a pension, annuity, IRA or similar plan. " +
    "IRA distributions go to Form 1040 lines 4a and 4b, and pensions and annuities to lines 5a and 5b, after rollovers, charitable distributions and other exclusions. " +
    "The box 7 code can also bring in Form 5329 (early distribution penalty), Form 4972 (lump-sum) or Form 8606 (IRA basis and Roth conversions). Enter one form per payer.",
  fields: {
    payer_name: "The name of the plan, custodian or insurer that paid you.",
    payer_ein: "The payer's federal identification number.",
    account_number: "The account number shown on the form, if any.",
    ts: "Whose form this is on a joint return: the taxpayer (T) or the spouse (S).",
    box1_gross_distribution:
      "Box 1. The total amount distributed before withholding, including rollovers and conversions. Goes to line 4a or 5a unless the distribution is fully rolled over or otherwise excluded.",
    box2a_taxable_amount:
      "Box 2a. The taxable part of the distribution as figured by the payer. If blank, the engine treats the whole box 1 amount as taxable before applying exclusions.",
    box2b_not_determined: "Box 2b. Checked when the payer could not figure the taxable amount, so you must work it out.",
    box2b_total_dist: "Box 2b. Checked when this was a total distribution that closed out your account.",
    box3_capital_gain:
      "Box 3. The part of box 2a that qualifies as capital gain for a lump-sum distribution. Cannot exceed the taxable amount.",
    box4_federal_withheld: "Box 4. Federal income tax withheld. Counts as a payment on Form 1040 line 25b.",
    box5_employee_contributions:
      "Box 5. After-tax contributions, designated Roth contributions or insurance premiums you are recovering tax-free.",
    box6_nua: "Box 6. Net unrealized appreciation in employer securities distributed to you, which is generally not taxed until you sell them.",
    box7_distribution_code:
      "Box 7. The code describing the type of distribution. It decides whether it is taxable, rolled over, or subject to the early distribution penalty.",
    box7_code2: "Box 7. A second distribution code, when the payer entered two.",
    box7_ira_simple_indicator:
      "Box 7. The IRA/SEP/SIMPLE checkbox. When checked the distribution goes on lines 4a and 4b; otherwise on lines 5a and 5b.",
    box8_other: "Box 8. Other amounts, such as the value of an annuity contract distributed to you.",
    box9a_pct_total: "Box 9a. Your percentage of a total distribution that was split among several people.",
    box9b_total_employee_contributions: "Box 9b. Your total after-tax contributions to the plan, used to figure the tax-free part of an annuity.",
    box10_irr_within_5yr:
      "Box 10. The amount allocable to an in-plan Roth rollover made within the last five years, which can be subject to the early distribution penalty.",
    box11_first_year_roth: "Box 11. The first year you made designated Roth contributions to the plan.",
    box12_fatca: "Box 12. Checked if the payer is reporting to meet a FATCA requirement. Informational.",
    box13_date_of_payment: "Box 13. The date of payment, used for certain reportable death benefits.",
    box14_state_tax: "Box 14. State income tax withheld. Informational for the federal return.",
    box15_payer_state: "Box 15. The state and the payer's state ID number.",
    box16_state_distribution: "Box 16. The state distribution amount.",
    box17_local_tax: "Box 17. Local income tax withheld.",
    box18_locality_name: "Box 18. The name of the locality.",
    box19_local_distribution: "Box 19. The local distribution amount.",
    rollover_code: "How you rolled over or converted this distribution. Affects how much of it is taxable.",
    partial_rollover_amount:
      "With a partial rollover, the amount you rolled over. The engine subtracts it from the taxable amount.",
    disability_flag: "Mark if this is a disability pension.",
    disability_as_wages:
      "Mark if the disability pension is received before minimum retirement age and so is reported as wages on Form 1040 line 1a instead of line 5.",
    carry_to_5329:
      "Mark to carry this entry to Form 5329 for the early distribution penalty. Recorded only; the engine sends codes 1 and J to Form 5329 automatically.",
    exclude_4972:
      "Mark if you are reporting this lump-sum distribution on Form 4972. It is then left off the Form 1040 income lines and sent to Form 4972.",
    exclude_8606_roth:
      "Mark if this is a Roth IRA distribution whose taxable part is figured on Form 8606. It is then left off the Form 1040 income lines and sent to Form 8606.",
    qcd_full:
      "Mark if the whole IRA distribution was paid directly to charity as a qualified charitable distribution. Up to the $108,000 annual limit is excluded from taxable income.",
    qcd_partial_amount:
      "The part of an IRA distribution paid directly to charity as a qualified charitable distribution. Excluded from taxable income, up to $108,000.",
    pso_premium:
      "For a retired public safety officer, pension money paid directly for health or long-term care insurance premiums. Up to $3,000 is excluded from taxable income.",
    simplified_method_flag:
      "Mark to figure the tax-free part of annuity payments with the IRS Simplified Method, when you have after-tax cost in the plan.",
    cost_in_contract: "Simplified Method. Your after-tax investment in the plan as of the annuity starting date.",
    annuity_start_date: "Simplified Method. The date your annuity payments began.",
    age_at_annuity_start:
      "Simplified Method. Your age when payments began, which sets the expected number of payments for a single-life annuity.",
    joint_annuity: "Simplified Method. Mark if the annuity is paid over your life and a survivor's life.",
    combined_ages_at_start: "Simplified Method. For a joint annuity, your and the survivor's combined ages when payments began.",
    prior_excludable_recovered: "Simplified Method. Tax-free amounts you already recovered in earlier years, which reduce the remaining cost.",
    prior_ira_basis:
      "Your nondeductible contributions to traditional IRAs carried in from earlier years. When set, Form 8606 figures the taxable part of this IRA distribution.",
    year_end_ira_value: "The value of all your traditional IRAs at the end of the year, used with your basis on Form 8606.",
    altered_or_handwritten: "Mark if the form you received was altered or handwritten.",
    no_distribution_received:
      "Mark to keep this entry on file but leave it out of this year's return, for example when nothing was actually paid.",
  },
  options: {
    box7_distribution_code: {
      "1": "Early distribution before age 59½, no known exception. May owe the 10% additional tax on Form 5329.",
      "2": "Early distribution, but an exception to the 10% additional tax applies.",
      "3": "Disability.",
      "4": "Death: paid to a beneficiary or estate.",
      "5": "Prohibited transaction.",
      "6": "Section 1035 tax-free exchange of insurance or annuity contracts.",
      "7": "Normal distribution, generally at age 59½ or older.",
      "8": "Excess contributions plus earnings, taxable this year.",
      A: "May be eligible for 10-year tax option (Form 4972).",
      B: "Designated Roth account distribution.",
      C: "Reportable death benefits under section 6050Y.",
      D: "Annuity payments from a nonqualified annuity.",
      E: "Distributions under the Employee Plans Compliance Resolution System.",
      F: "Charitable gift annuity.",
      G: "Direct rollover to another qualified plan, 403(b), governmental 457(b) or IRA. Not taxable.",
      H: "Direct rollover of a designated Roth account to a Roth IRA. Not taxable.",
      J: "Early distribution from a Roth IRA. May be subject to the 10% additional tax.",
      K: "Distribution of IRA assets without a readily available market value.",
      L: "Loan treated as a deemed distribution.",
      M: "Qualified plan loan offset.",
      N: "Recharacterized IRA contribution made for and recharacterized in the same year. Not taxable.",
      P: "Excess contributions plus earnings, taxable in the prior year.",
      Q: "Qualified distribution from a Roth IRA. Not taxable.",
      R: "Recharacterized IRA contribution made for the prior year. Not taxable.",
      S: "Early distribution from a SIMPLE IRA in the first two years, no known exception.",
      T: "Roth IRA distribution, exception applies. Treated as not taxable here.",
      U: "Dividend distribution from an ESOP.",
      V: "Transactions involving an employee stock purchase plan (ESPP).",
      W: "Charges or payments for qualified long-term care insurance from an annuity or life insurance contract. Not taxable.",
      Y: "Qualified charitable distribution reported by the payer.",
    },
    box7_code2: {
      "1": "Early distribution, no known exception.",
      "2": "Early distribution, exception applies.",
      "3": "Disability.",
      "4": "Death.",
      "5": "Prohibited transaction.",
      "6": "Section 1035 exchange.",
      "7": "Normal distribution.",
      "8": "Excess contributions, taxable this year.",
      A: "May be eligible for 10-year tax option.",
      B: "Designated Roth account distribution.",
      C: "Reportable death benefits under section 6050Y.",
      D: "Nonqualified annuity payments.",
      E: "EPCRS distribution.",
      F: "Charitable gift annuity.",
      G: "Direct rollover to a qualified plan or IRA.",
      H: "Direct rollover of a designated Roth account to a Roth IRA.",
      J: "Early distribution from a Roth IRA.",
      K: "IRA assets without a readily available market value.",
      L: "Loan treated as a deemed distribution.",
      M: "Qualified plan loan offset.",
      N: "Same-year recharacterized IRA contribution.",
      P: "Excess contributions, taxable in the prior year.",
      Q: "Qualified Roth IRA distribution.",
      R: "Prior-year recharacterized IRA contribution.",
      S: "Early SIMPLE IRA distribution in the first two years.",
      T: "Roth IRA distribution, exception applies.",
      U: "ESOP dividend distribution.",
      V: "Employee stock purchase plan transaction.",
      W: "Qualified long-term care insurance charges.",
      Y: "Qualified charitable distribution.",
    },
    rollover_code: {
      C: "Converted to a Roth IRA. Still taxable; the conversion is also reported on Form 8606.",
      G: "Rolled over in full to another plan or IRA. The engine treats nothing as taxable.",
      S: "Rolled over into the same type of account. The engine treats nothing as taxable.",
      X: "Partial rollover. Only the part not rolled over (see partial rollover amount) is taxable.",
    },
  },
};
