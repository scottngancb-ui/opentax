import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8288-A",
  subtitle: "Statement of Withholding on Dispositions by Foreign Persons of U.S. Real Property Interests",
  topic: Topic.Payments,
  summary:
    "The statement a foreign seller of U.S. real property gets after the buyer withholds tax from the sale price under FIRPTA and reports it on Form 8288. " +
    "The seller claims the withheld amount as a payment against their U.S. tax. " +
    "The engine adds the amount withheld to the other-withholding line (Form 1040 line 25b). Enter one per property sold.",
  fields: {
    property_address: "Line 5. Address of the U.S. real property you sold.",
    gross_sales_price: "Line 6. The amount realized on the sale, which the withholding is based on.",
    withholding_rate: "The withholding rate the buyer applied to the sale price.",
    amount_withheld: "Line 8. The tax the buyer withheld and paid to the IRS. Goes to Form 1040 line 25b as a payment.",
    buyer_name: "Line 2. Name of the buyer (transferee) who withheld the tax.",
    buyer_tin: "Line 3. The buyer's taxpayer identification number.",
    disposition_date: "Line 7. The date the property was transferred.",
  },
  options: {
    withholding_rate: {
      RATE_0: "No withholding, such as a home the buyer will live in with a price of $300,000 or less",
      RATE_10: "10%, such as a home the buyer will live in with a price over $300,000 up to $1,000,000",
      RATE_15: "15%, the standard FIRPTA rate",
    },
  },
};
