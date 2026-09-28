// Plain-language documentation for a node, shown by the forms atlas
// (`opentax node explore`). Each node folder has a doc.ts next to its index.ts.

export enum Topic {
  Household = "Filing status & household",
  Wages = "Wages & employment",
  InterestDividends = "Interest & dividends",
  Retirement = "Retirement & Social Security",
  Business = "Business & self-employment",
  Investments = "Investments & property sales",
  PassThrough = "Rentals, partnerships & passive activity",
  OtherIncome = "Other income",
  Deductions = "Deductions & adjustments",
  Family = "Family & dependent credits",
  Education = "Education",
  Health = "Health coverage & HSAs",
  Energy = "Energy & vehicle credits",
  BusinessCredits = "Business & other credits",
  Foreign = "Foreign income & reporting",
  TaxComputation = "Tax computation",
  Payments = "Payments, withholding & refunds",
  Administrative = "Elections, disclosures & notices",
  Return = "Form 1040 & schedules",
}

export type NodeDoc = {
  // Short name as printed on the IRS form, e.g. "Form W-2", "Schedule C".
  readonly title: string;
  // The form's full name, e.g. "Wage and Tax Statement".
  readonly subtitle: string;
  readonly topic: Topic;
  // Two to four sentences: what it is, who needs it, how it affects the return.
  readonly summary: string;
  // Field path → plain-language meaning. Nested fields use "parent.child".
  readonly fields: Readonly<Record<string, string>>;
  // Meanings of coded choices: field path → option value → meaning.
  readonly options?: Readonly<Record<string, Readonly<Record<string, string>>>>;
};
