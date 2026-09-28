import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Schedule D",
  subtitle: "Capital Gains and Losses",
  topic: Topic.Investments,
  summary:
    "The schedule that nets your short-term and long-term capital gains and losses for the year. Most of it is filled in " +
    "automatically from Form 8949, 1099-DIV capital gain distributions, 1099-C property, K-1s and Forms 2439, 4797, 4684, " +
    "6252 and 6781, and you can also enter summary lines, carryovers and transactions directly. The net result goes to " +
    "Form 1040 line 7, with a net loss limited to $3,000 ($1,500 if married filing separately). Net long-term gains also " +
    "drive the lower capital gain tax rates.",
  fields: {
    transaction:
      "Sales passed in from Form 8949, each with its gain or loss and holding period already figured. Short-term ones feed Part I and long-term ones Part II.",
    line13_cap_gain_distrib:
      "Line 13. Capital gain distributions from Form 1099-DIV box 2a. Always treated as long-term.",
    box2c_qsbs:
      "The section 1202 qualified small business stock part of capital gain distributions (1099-DIV box 2c). Informational; already included in line 13 and not excluded by the engine.",
    cod_property_fmv:
      "Fair market value of property given up in a debt cancellation (Form 1099-C). Paired with the canceled debt to figure a long-term gain.",
    cod_debt_cancelled:
      "Amount of debt canceled for the matching 1099-C property. The gain is the property's value minus this amount.",
    capital_loss_carryover:
      "Capital loss left over to carry to next year. Informational; not used in this year's computation.",
    filing_status:
      "Your filing status. Married filing separately limits the deductible net capital loss to $1,500 instead of $3,000.",
    line_1a_proceeds:
      "Line 1a. Total sales proceeds of short-term sales reported on 1099-B with basis reported to the IRS and no adjustments.",
    line_1a_cost: "Line 1a. Total cost basis of those short-term sales.",
    line_8a_proceeds:
      "Line 8a. Total sales proceeds of long-term sales reported on 1099-B with basis reported to the IRS and no adjustments.",
    line_8a_cost: "Line 8a. Total cost basis of those long-term sales.",
    line_6_carryover:
      "Line 6. Short-term capital loss carried over from last year. Enter as a positive number; it reduces short-term gains.",
    line_14_carryover:
      "Line 14. Long-term capital loss carried over from last year. Enter as a positive number; it reduces long-term gains.",
    line_12_cap_gain_dist:
      "Capital gain distributions entered directly on this screen. Added to line 13 with any 1099-DIV amounts.",
    line_11_form2439:
      "Line 11. Long-term gains or losses from other forms, such as undistributed gains on Form 2439 and section 1231 gain from Form 4797.",
    line_4_other_st:
      "Line 4. Short-term gains or losses from other forms, such as Forms 6252, 4684, 6781 and 8824.",
    line_5_k1_st: "Line 5. Net short-term gain or loss from partnerships, S corporations, estates and trusts (Schedules K-1).",
    line_12_k1_lt: "Line 12. Net long-term gain or loss from partnerships, S corporations, estates and trusts (Schedules K-1).",
    transactions:
      "Individual sales you enter directly. Gain or loss is proceeds minus basis plus any adjustment; the Form 8949 box decides short- or long-term.",
    "transactions.part":
      "The Form 8949 box that fits the sale: whether it is short- or long-term, and whether a 1099-B or 1099-DA reported the basis.",
    "transactions.description": "Column (a). What you sold, such as \"100 sh. XYZ Co.\"",
    "transactions.date_acquired": "Column (b). Date you acquired the property.",
    "transactions.date_sold": "Column (c). Date you sold or disposed of it.",
    "transactions.proceeds": "Column (d). Sales price (proceeds).",
    "transactions.cost_basis": "Column (e). Cost or other basis.",
    "transactions.adjustment_codes":
      "Column (f). Form 8949 adjustment codes. Code C marks a collectibles gain, which the engine routes to the 28% rate gain worksheet.",
    "transactions.adjustment_amount": "Column (g). Adjustment to gain or loss; positive increases the gain, negative reduces it.",
    line19_unrecaptured_1250:
      "Line 19. Unrecaptured section 1250 gain from the worksheet of the same name. Taxed at up to 25%; passed to the tax calculation.",
    collectibles_gain_form2439:
      "Collectibles gain included in undistributed capital gains on Form 2439. Added to the 28% rate gain.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
    "transactions.part": {
      A: "Short-term, reported on 1099-B with basis reported to the IRS",
      B: "Short-term, reported on 1099-B without basis reported to the IRS",
      C: "Short-term, not reported on a 1099-B",
      D: "Long-term, reported on 1099-B with basis reported to the IRS",
      E: "Long-term, reported on 1099-B without basis reported to the IRS",
      F: "Long-term, not reported on a 1099-B",
      G: "Short-term digital asset, reported on 1099-DA with basis reported to the IRS",
      H: "Short-term digital asset, reported on 1099-DA without basis reported to the IRS",
      I: "Short-term digital asset, not reported on a 1099-DA",
      J: "Long-term digital asset, reported on 1099-DA with basis reported to the IRS",
      K: "Long-term digital asset, reported on 1099-DA without basis reported to the IRS",
      L: "Long-term digital asset, not reported on a 1099-DA",
    },
  },
};
