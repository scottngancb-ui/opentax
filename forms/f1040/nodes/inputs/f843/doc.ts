import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 843",
  subtitle: "Claim for Refund and Request for Abatement",
  topic: Topic.Administrative,
  summary:
    "The form you file separately with the IRS to ask for a refund of certain taxes other than income tax, or to ask the IRS to remove (abate) penalties, interest or additions to tax. " +
    "Income tax refunds are claimed on Form 1040-X instead. " +
    "It is administrative: the engine records the claim but it does not change any Form 1040 line.",
  fields: {
    calendar_year: "Line 1. The calendar year the tax, penalty or interest relates to.",
    period_from: "Line 1. Start date of the period, when the claim is not for a calendar year.",
    period_to: "Line 1. End date of the period, when the claim is not for a calendar year.",
    tax_type: "Line 3. The type of tax the claim relates to.",
    penalty_section: "Line 4. The Internal Revenue Code section of the penalty you want removed, if the claim is about a penalty.",
    reason_for_claim: "Line 5. Why you are asking for the refund or abatement.",
    amount_to_be_refunded: "The amount you want refunded or abated.",
    explanation: "Line 7. Your explanation of why the claim should be allowed, with supporting facts.",
  },
  options: {
    tax_type: {
      employment: "Employment tax, such as Social Security and Medicare tax",
      estate: "Estate tax",
      gift: "Gift tax",
      excise: "Excise tax",
    },
    reason_for_claim: {
      irs_error: "Interest or a penalty caused by IRS errors or delays",
      erroneous_written_advice: "A penalty caused by incorrect written advice from the IRS",
      reasonable_cause: "Reasonable cause or another reason allowed by law for removing a penalty",
      other: "Any other reason",
    },
  },
};
