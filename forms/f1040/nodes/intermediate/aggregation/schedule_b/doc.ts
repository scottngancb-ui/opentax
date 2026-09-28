import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule B",
  subtitle: "Interest and Ordinary Dividends",
  topic: Topic.InterestDividends,
  summary:
    "The schedule that lists each payer of taxable interest and ordinary dividends. It is filled in automatically from " +
    "Forms 1099-INT, 1099-OID and 1099-DIV, K-1s and Form 8815. Part I total interest goes to Form 1040 line 2b and Part II " +
    "total dividends to line 3b; interest also feeds Form 8960 and the investment interest limit. You generally need it when " +
    "either total is over $1,500. The Part III foreign account questions are left for you to answer.",
  fields: {
    taxable_interest_net:
      "Part I, line 1. Taxable interest from each payer, after nominee and other adjustments made on the 1099-INT. One amount per payer; they are added for line 2.",
    payer_name: "Part I, line 1. Name of each interest payer, printed next to its amount. Not used in the math.",
    box3_us_obligations:
      "Interest on U.S. savings bonds and Treasury obligations from 1099-INT box 3. Carried for reference; the engine does not use it in the Schedule B totals.",
    ee_bond_exclusion:
      "Line 3. Excludable interest on Series EE and I savings bonds used for higher education, from Form 8815. Subtracted from total interest.",
    ordinaryDividends:
      "Part II, line 5. Ordinary dividends from each payer (1099-DIV box 1a), with nominee amounts already removed. Added for line 6.",
    payerName: "Part II, line 5. Name of each dividend payer, printed next to its amount. Not used in the math.",
    isNominee:
      "Whether a dividend entry was received as a nominee for someone else. Informational only; the nominee amount was already subtracted.",
  },
};
