import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Paid preparer",
  subtitle: "Paid preparer and electronic return originator information",
  topic: Topic.Administrative,
  summary:
    "Identifies the paid preparer, firm and electronic filer for a professionally prepared return. " +
    "It fills the \"Paid Preparer Use Only\" area at the bottom of Form 1040 and the preparer and originator details in the e-file header. " +
    "It has no effect on the tax figures. Leave it blank, or mark it self-prepared, when you prepare your own return.",
  fields: {
    ptin: "The preparer's Tax Identification Number: the letter P followed by eight digits.",
    firm_name: "Name of the preparer's firm.",
    firm_ein: "The firm's employer identification number, nine digits with no dash.",
    firm_address_line1: "The firm's street address.",
    firm_city: "The firm's city.",
    firm_state: "The firm's state, as a two-letter code.",
    firm_zip: "The firm's ZIP code (five digits or ZIP+4).",
    self_prepared: "Mark if you prepared the return yourself. No PTIN is needed then.",
    efin: "The six-digit Electronic Filing Identification Number the IRS assigned to the firm or filer that transmits the return.",
    originator_type: "The kind of e-file originator submitting the return, reported in the e-file header.",
  },
  options: {
    originator_type: {
      ERO: "Electronic Return Originator: a tax professional or firm that files returns for clients.",
      ISP: "Intermediate Service Provider: a firm that processes returns between the originator and the transmitter.",
      OnlineFiler: "An individual filing their own return through online software.",
    },
  },
};
