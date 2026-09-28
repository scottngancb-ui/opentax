import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-B",
  subtitle: "Proceeds From Broker and Barter Exchange Transactions",
  topic: Topic.Investments,
  summary:
    "The form a broker or barter exchange sends (usually by mid-February) listing each sale of stocks, bonds, funds or other securities during the year. " +
    "Each sale goes onto Form 8949 in the category that matches its holding period and whether basis was reported to the IRS, and the totals flow to Schedule D and Form 1040 line 7. " +
    "Tax withheld is credited on Form 1040 line 25b. Enter one entry per sale.",
  fields: {
    part:
      "The Form 8949 category for this sale, based on the holding period and whether the broker reported basis to the IRS.",
    description: "Box 1a. A description of the property sold, such as \"100 sh XYZ Corp\".",
    date_acquired: "Box 1b. The date you acquired the property. Held more than one year means long-term.",
    date_sold: "Box 1c. The date of the sale or disposition.",
    proceeds: "Box 1d. The gross proceeds from the sale.",
    cost_basis: "Box 1e. Your cost or other basis, including purchase commissions. For a noncovered security, you supply this yourself.",
    adjustment_codes:
      "Form 8949 column (f). The letter code(s) explaining any adjustment to gain or loss, such as W for a wash sale or B for incorrect basis.",
    adjustment_amount:
      "Form 8949 column (g). The adjustment to gain or loss. Added to proceeds minus basis; use a negative number to reduce gain.",
    federal_withheld: "Box 4. Federal income tax withheld (backup withholding). Credited on Form 1040 line 25b.",
    box1f_accrued_market_discount:
      "Box 1f. Accrued market discount on a bond. It is ordinary interest income; the engine reports it on Schedule B.",
    box1g_wash_sale_loss_disallowed:
      "Box 1g. Loss disallowed because you bought substantially identical securities within 30 days (a wash sale). If you enter no adjustment yourself, the engine adds it back with code W.",
    box3_collectibles:
      "Box 3. Checked if the proceeds are from collectibles, such as art, coins or precious metals. Long-term collectibles gain is taxed at up to 28%.",
    box12_qof_investment:
      "Mark if this gain relates to a Qualified Opportunity Fund investment. The engine sends any gain to Form 8997 as deferred gain.",
    noncovered_security:
      "Box 5. Checked if this is a noncovered security, so the broker did not report basis to the IRS. The engine moves category A to B and D to E.",
  },
  options: {
    part: {
      A: "Short-term, basis reported to the IRS",
      B: "Short-term, basis not reported to the IRS",
      C: "Short-term, not reported on a Form 1099-B",
      D: "Long-term, basis reported to the IRS",
      E: "Long-term, basis not reported to the IRS",
      F: "Long-term, not reported on a Form 1099-B",
    },
  },
};
