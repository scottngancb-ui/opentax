import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8805",
  subtitle: "Foreign Partner's Information Statement of Section 1446 Withholding Tax",
  topic: Topic.Foreign,
  summary:
    "The statement a partnership gives each foreign partner showing the section 1446 tax it withheld on the partner's share of " +
    "effectively connected income. A foreign partner claims that withholding as a payment on their U.S. return. " +
    "The engine adds up the withholding from every Form 8805 you enter and reports it on Schedule 3 line 13, which flows to the payments section of Form 1040. " +
    "Enter one Form 8805 per partnership.",
  fields: {
    partnership_name: "The name of the partnership that withheld the tax and issued this Form 8805.",
    partnership_ein: "The partnership's employer identification number (EIN).",
    ordinary_eic_allocable:
      "Your share of the partnership's ordinary effectively connected income. Informational here; the income itself is reported through your Schedule K-1.",
    section_1446_tax_withheld:
      "The section 1446 tax the partnership paid on your behalf. This is the amount the engine claims as a payment on Schedule 3 line 13.",
    total_tax_withheld:
      "Total tax withheld shown on the statement. The engine uses it only when the section 1446 amount is blank or zero.",
  },
};
