// Plain-language taxpayer situations for the forms atlas checklist. Each one names
// the documents to gather (input nodes) and the forms it normally brings into play.
// The atlas adds the connecting forms between these and Form 1040 from the node graph.
// situations.test.ts checks every node exists and each form is reachable from its documents.

export enum SituationGroup {
  Income = "Income",
  Deductions = "Expenses & deductions",
  Family = "Family, credits & payments",
}

export type Situation = {
  readonly id: string;
  readonly group: SituationGroup;
  readonly label: string;
  // A short example or clarification shown under the label.
  readonly detail: string;
  // Input nodes: documents you receive or forms you fill in.
  readonly documents: readonly string[];
  // Other forms this situation normally brings in (computed or input).
  readonly forms: readonly string[];
};

export const situations: readonly Situation[] = [
  // ── Income ──────────────────────────────────────────────────────────────────
  { id: "wages", group: SituationGroup.Income, label: "Wages or salary", detail: "Pay from an employer", documents: ["w2"], forms: [] },
  { id: "tips", group: SituationGroup.Income, label: "Tips", detail: "Including tips you didn't report to your employer", documents: ["w2"], forms: ["form4137", "schedule1a"] },
  { id: "overtime", group: SituationGroup.Income, label: "Overtime pay", detail: "For the overtime deduction on Schedule 1-A", documents: ["w2"], forms: ["schedule1a"] },
  { id: "interest", group: SituationGroup.Income, label: "Interest", detail: "Bank accounts, CDs, bonds", documents: ["f1099int"], forms: ["schedule_b"] },
  { id: "dividends", group: SituationGroup.Income, label: "Dividends", detail: "Stocks and mutual funds", documents: ["f1099div"], forms: ["schedule_b", "qdcgtw"] },
  { id: "investments", group: SituationGroup.Income, label: "Sold stocks, funds or crypto", detail: "Any sale reported on a 1099-B", documents: ["f1099b", "f8949"], forms: ["form8949", "schedule_d", "qdcgtw", "form8960"] },
  { id: "self_employed", group: SituationGroup.Income, label: "Freelance or self-employment income", detail: "1099-NEC, 1099-K or your own records", documents: ["f1099nec", "f1099k", "schedule_c"], forms: ["schedule_se", "form8995"] },
  { id: "retirement", group: SituationGroup.Income, label: "Pension, 401(k) or IRA withdrawals", detail: "Including rollovers and early withdrawals", documents: ["f1099r"], forms: ["form5329", "form8606"] },
  { id: "social_security", group: SituationGroup.Income, label: "Social Security benefits", detail: "Retirement, disability or survivor benefits", documents: ["ssa1099"], forms: [] },
  { id: "unemployment", group: SituationGroup.Income, label: "Unemployment or a state tax refund", detail: "Reported on Form 1099-G", documents: ["f1099g"], forms: [] },
  { id: "rental", group: SituationGroup.Income, label: "Rental property", detail: "Rent from a house, apartment or room", documents: ["schedule_e"], forms: ["form8582", "form4562"] },
  { id: "pass_through", group: SituationGroup.Income, label: "Partnership, S corporation or trust income", detail: "You received a Schedule K-1", documents: ["k1_partnership", "k1_s_corp", "k1_trust"], forms: ["form8995", "form7203"] },
  { id: "gambling", group: SituationGroup.Income, label: "Gambling winnings", detail: "Casino, lottery or betting winnings", documents: ["w2g"], forms: [] },
  { id: "canceled_debt", group: SituationGroup.Income, label: "Canceled or forgiven debt", detail: "A lender reported forgiven debt", documents: ["f1099c"], forms: ["form982"] },
  { id: "other_1099", group: SituationGroup.Income, label: "Other income on a 1099-MISC", detail: "Prizes, royalties, other payments", documents: ["f1099m"], forms: [] },
  { id: "alimony", group: SituationGroup.Income, label: "Alimony received", detail: "Only for divorces finalized before 2019", documents: ["alimony_received"], forms: [] },

  // ── Expenses & deductions ───────────────────────────────────────────────────
  { id: "mortgage", group: SituationGroup.Deductions, label: "Mortgage interest", detail: "Reported on Form 1098", documents: ["f1098", "schedule_a"], forms: [] },
  { id: "charity", group: SituationGroup.Deductions, label: "Charitable donations", detail: "Cash or property you gave to charity", documents: ["schedule_a", "f8283"], forms: [] },
  { id: "medical", group: SituationGroup.Deductions, label: "Large medical or dental bills", detail: "Only the part above a share of your income counts", documents: ["schedule_a"], forms: [] },
  { id: "state_taxes", group: SituationGroup.Deductions, label: "State and local taxes", detail: "Income or sales tax, and property tax", documents: ["schedule_a", "sales_tax_deduction"], forms: [] },
  { id: "student_loan", group: SituationGroup.Deductions, label: "Student loan interest", detail: "Reported on Form 1098-E", documents: ["f1098e"], forms: [] },
  { id: "educator", group: SituationGroup.Deductions, label: "Classroom expenses", detail: "For K–12 teachers and educators", documents: ["educator_expenses"], forms: [] },
  { id: "hsa", group: SituationGroup.Deductions, label: "Health savings account (HSA)", detail: "Contributions or withdrawals", documents: ["form8889"], forms: [] },
  { id: "ira", group: SituationGroup.Deductions, label: "Traditional IRA contributions", detail: "Money you put into an IRA", documents: ["ira_deduction_worksheet"], forms: ["form8606", "form8880"] },
  { id: "se_health", group: SituationGroup.Deductions, label: "Self-employed health insurance", detail: "Premiums you paid as a self-employed person", documents: ["self_employed_health_insurance"], forms: [] },
  { id: "se_retirement", group: SituationGroup.Deductions, label: "SEP, SIMPLE or solo 401(k) contributions", detail: "Retirement savings from self-employment", documents: ["sep_retirement"], forms: [] },
  { id: "home_office", group: SituationGroup.Deductions, label: "Home office for a business", detail: "Part of your home used only for work", documents: ["schedule_c", "f1098"], forms: ["form_8829"] },
  { id: "vehicle", group: SituationGroup.Deductions, label: "Business use of a vehicle", detail: "Mileage or actual car expenses", documents: ["auto_expense"], forms: [] },

  // ── Family, credits & payments ──────────────────────────────────────────────
  { id: "dependents", group: SituationGroup.Family, label: "Children or other dependents", detail: "For the child tax credit and earned income credit", documents: ["general", "f8812"], forms: ["eitc"] },
  { id: "childcare", group: SituationGroup.Family, label: "Child or dependent care costs", detail: "Daycare, after-school care, a sitter", documents: ["f2441"], forms: [] },
  { id: "college", group: SituationGroup.Family, label: "College tuition", detail: "Reported on Form 1098-T", documents: ["f8863"], forms: [] },
  { id: "marketplace", group: SituationGroup.Family, label: "Marketplace health insurance", detail: "Coverage through HealthCare.gov or a state exchange", documents: ["f1095a"], forms: ["form8962"] },
  { id: "energy", group: SituationGroup.Family, label: "Home energy improvements or solar", detail: "Heat pumps, windows, solar panels", documents: ["f5695"], forms: ["form5695"] },
  { id: "clean_vehicle", group: SituationGroup.Family, label: "Bought an electric vehicle", detail: "New or used clean vehicle", documents: ["f8936"], forms: [] },
  { id: "foreign_tax", group: SituationGroup.Family, label: "Foreign tax on investments", detail: "Shown on a 1099-DIV or 1099-INT", documents: ["f1099div", "f1099int"], forms: ["form_1116"] },
  { id: "estimated", group: SituationGroup.Family, label: "Estimated tax payments", detail: "Quarterly payments you made during the year", documents: ["f1040es"], forms: [] },
  { id: "household_employee", group: SituationGroup.Family, label: "A household employee", detail: "Such as a nanny or housekeeper", documents: ["household_wages"], forms: ["schedule_h"] },
];
