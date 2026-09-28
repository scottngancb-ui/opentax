import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 3115",
  subtitle: "Application for Change in Accounting Method",
  topic: Topic.Business,
  summary:
    "The form a business owner files to ask the IRS for permission to change an accounting method, such as switching from cash to accrual or correcting how assets are depreciated. " +
    "The switch creates a section 481(a) adjustment: the income or deductions that would otherwise be doubled or missed. " +
    "The engine takes this year's share of that adjustment, spread evenly over the period you enter, and reports it on Schedule 1 line 8z (a negative amount reduces income).",
  fields: {
    designated_change_number:
      "The IRS designated change number (DCN) that identifies the specific automatic accounting method change you are making.",
    filing_type: "Whether this change is made under the automatic change procedures or needs the IRS's advance consent.",
    section_481_adjustment:
      "The total section 481(a) adjustment from the change. Positive amounts add income; negative amounts are a deduction.",
    spread_period:
      "The number of years over which the adjustment is spread. The engine reports the total divided by this number; if blank, the whole amount is taken this year.",
    accounting_method_before: "A description of the accounting method you used before the change.",
    accounting_method_proposed: "A description of the new accounting method you are changing to.",
  },
  options: {
    filing_type: {
      automatic:
        "Automatic change: the change is on the IRS list of automatic changes, so you attach the form to your return and send a copy to the IRS, with no user fee.",
      advance_consent:
        "Advance consent: the change is not automatic, so you file the form with the IRS during the year of change and pay a user fee before you can use the new method.",
    },
  },
};
