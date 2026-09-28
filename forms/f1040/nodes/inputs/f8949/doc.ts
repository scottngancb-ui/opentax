import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8949",
  subtitle: "Sales and Other Dispositions of Capital Assets",
  topic: Topic.Investments,
  summary:
    "The form that lists each sale or other disposition of a capital asset, such as stock, mutual funds, crypto or investment property, one row per transaction. " +
    "Each row shows proceeds, basis, any adjustment and the resulting gain or loss, grouped by short- or long-term and by how it was reported to you. " +
    "The engine sends each row to Schedule D (which reaches Form 1040 line 7), withholding to line 25b, AMT basis differences to Form 6251, " +
    "and any ordinary-income portion to Schedule 1.",
  fields: {
    part: "The Part I or Part II check box that applies. It sets whether the sale is short-term or long-term and whether basis was reported to the IRS.",
    description: "Column (a). What you sold, such as \"100 sh. XYZ Corp\" or \"0.5 BTC\".",
    date_acquired: "Column (b). The date you acquired the asset, or \"VARIOUS\" or \"INHERITED\".",
    date_sold: "Column (c). The date you sold or disposed of the asset (the trade date for securities).",
    proceeds: "Column (d). The sales price, usually from Form 1099-B box 1d or Form 1099-DA.",
    cost_basis: "Column (e). Your cost or other basis in the asset, including purchase costs.",
    adjustment_codes: "Column (f). The adjustment code letters that apply, such as B, E or W. The engine adds W and L automatically when you fill the wash sale or nondeductible loss fields.",
    adjustment_amount: "Column (g). The net adjustment to gain or loss: positive to increase gain or reduce a loss, negative otherwise. Replaced by the wash sale amount if one is entered.",
    federal_withheld: "Federal income tax withheld on the sale (backup withholding). Goes to Form 1040 line 25b.",
    amt_cost_basis: "Your basis for the alternative minimum tax, if different (for example, ISO stock). The difference goes to Form 6251 as an adjustment.",
    qsbs_code: "The section 1202 exclusion tier for qualified small business stock, based on when the stock was acquired.",
    qsbs_amount: "The amount of gain excluded under section 1202 for qualified small business stock.",
    wash_sale_loss: "The loss disallowed under the wash sale rule. Entered as a positive adjustment with code W.",
    loss_not_allowed: "Mark if the loss is not deductible for a reason other than a wash sale (code L), such as a sale to a related person. The engine zeroes out the loss.",
    state_tax_withheld: "State income tax withheld on the sale. Recorded only; not used on the federal return.",
    accrued_market_discount: "Column (g), code D. Accrued market discount on a bond that is taxed as ordinary income. The engine removes it from the capital gain and reports it on Schedule 1 line 8z.",
    ordinary_income_portion: "The part of the gain taxed as ordinary income because of depreciation recapture (sections 1245 and 1250). Removed from the capital gain and reported on Schedule 1 line 8z.",
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
    qsbs_code: {
      Q1: "50% exclusion (stock acquired before February 18, 2009)",
      Q2: "75% exclusion (stock acquired from February 18, 2009, to September 27, 2010)",
      Q3: "100% exclusion (stock acquired after September 27, 2010)",
    },
  },
};
