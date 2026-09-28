import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-C",
  subtitle: "Cancellation of Debt",
  topic: Topic.OtherIncome,
  summary:
    "The form a lender files when it cancels or forgives $600 or more of a debt you owed. Canceled debt is generally taxable income, " +
    "reported on Schedule 1 line 8c, unless an exclusion applies (such as bankruptcy, insolvency or qualified principal residence debt), in which case it goes to Form 982. " +
    "When property was foreclosed on or surrendered, its fair market value is also passed on for figuring gain or loss. Enter one form per canceled debt.",
  fields: {
    creditor_name: "The name of the lender or creditor that canceled the debt.",
    box1_date: "Box 1. The date of the identifiable event that triggered the cancellation.",
    box2_cod_amount:
      "Box 2. The amount of debt canceled. Taxable items go to Schedule 1 line 8c; excluded items go to Form 982 line 2.",
    box3_interest: "Box 3. The part of box 2 that is interest. Already included in box 2, so it is not added again.",
    box4_debt_description: "Box 4. The lender's description of the debt, such as a credit card or mortgage.",
    box5_personal_use:
      "Box 5. Checked if you were personally liable for repaying the debt (recourse debt). This affects how gain or loss on any related property is figured.",
    box6_identifiable_event:
      "Box 6. The letter code for the event that caused the cancellation, such as A for bankruptcy or F for a short sale.",
    box7_fmv_property:
      "Box 7. The fair market value of property involved, as in a foreclosure or abandonment. When present, the engine passes it and box 2 to Schedule D for the property disposition.",
    routing:
      "Whether this canceled debt is taxable income or excluded from income. Defaults to taxable.",
  },
  options: {
    routing: {
      taxable: "Taxable canceled debt, reported on Schedule 1 line 8c",
      excluded: "Excluded canceled debt (for example, bankruptcy or insolvency), reported on Form 982 line 2",
    },
  },
};
