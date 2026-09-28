import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8949",
  subtitle: "Sales and Other Dispositions of Capital Assets",
  topic: Topic.Investments,
  summary:
    "The form that lists each sale of stock, crypto or other capital assets, with dates, proceeds, basis and any adjustments. " +
    "This computed node is filled in automatically from Form 1099-B entries; transactions you type in yourself go through the separate f8949 input node. " +
    "Each transaction is passed to Schedule D, sorted into short-term or long-term, and long-term collectibles gains also go to the 28% rate gain worksheet.",
  fields: {
    transaction: "One sale as passed in by an input form. It carries the same fields listed below.",
    part: "The checkbox that says whether the sale is short- or long-term and whether a 1099-B or 1099-DA reported it and its basis.",
    description: "Column (a). Description of the property, such as \"100 sh. XYZ Co.\"",
    date_acquired: "Column (b). The date you acquired the property.",
    date_sold: "Column (c). The date you sold or disposed of the property.",
    proceeds: "Column (d). Proceeds or sales price.",
    cost_basis: "Column (e). Cost or other basis, generally what you paid plus purchase costs.",
    adjustment_codes: "Column (f). Code letters that explain an adjustment, such as W for a wash sale or B for incorrect basis on the 1099-B.",
    adjustment_amount: "Column (g). The amount of the adjustment to gain or loss; negative amounts reduce gain.",
    gain_loss: "Column (h). Gain or loss: proceeds minus basis plus the adjustment.",
    is_long_term: "Whether you held the property more than one year, which sends the result to the long-term part of Schedule D.",
    collectibles: "Whether the property is a collectible, such as art, coins or gold. Long-term collectibles gain can be taxed at up to 28%.",
  },
  options: {
    part: {
      A: "Short-term, reported on Form 1099-B with basis reported to the IRS",
      B: "Short-term, reported on Form 1099-B without basis reported to the IRS",
      C: "Short-term, not reported on Form 1099-B",
      D: "Long-term, reported on Form 1099-B with basis reported to the IRS",
      E: "Long-term, reported on Form 1099-B without basis reported to the IRS",
      F: "Long-term, not reported on Form 1099-B",
      G: "Short-term digital asset, reported on Form 1099-DA with basis reported to the IRS",
      H: "Short-term digital asset, reported on Form 1099-DA without basis reported to the IRS",
      I: "Short-term digital asset, not reported on Form 1099-DA",
      J: "Long-term digital asset, reported on Form 1099-DA with basis reported to the IRS",
      K: "Long-term digital asset, reported on Form 1099-DA without basis reported to the IRS",
      L: "Long-term digital asset, not reported on Form 1099-DA",
    },
  },
};
