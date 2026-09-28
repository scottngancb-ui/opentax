import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8997",
  subtitle: "Initial and Annual Statement of Qualified Opportunity Fund (QOF) Investments",
  topic: Topic.Investments,
  summary:
    "The yearly statement anyone holding a Qualified Opportunity Fund investment files to track the capital gains they deferred by investing in the fund. " +
    "It lists holdings at the start of the year, new investments, inclusion events and holdings at year end. Most years it is informational only. " +
    "When Part III shows deferred gain now included in income, the engine sends it to Schedule D as a short- or long-term gain with code Q.",
  fields: {
    part_i: "Part I. QOF investments you held on January 1, with the deferred gain still tied to each.",
    "part_i.description": "A description of the QOF investment, such as the number of shares or percentage interest.",
    "part_i.qof_ein": "The fund's employer identification number.",
    "part_i.date_acquired": "The date you made the QOF investment.",
    "part_i.short_term_deferred_gain": "Short-term gain still deferred through this investment.",
    "part_i.long_term_deferred_gain": "Long-term gain still deferred through this investment.",
    part_ii: "Part II. QOF investments you made during the year to defer new gains.",
    "part_ii.description": "A description of the QOF investment.",
    "part_ii.qof_ein": "The fund's employer identification number.",
    "part_ii.date_acquired": "The date you made the investment.",
    "part_ii.short_term_deferred_gain": "Short-term gain you deferred by making this investment.",
    "part_ii.long_term_deferred_gain": "Long-term gain you deferred by making this investment.",
    part_iii: "Part III. QOF investments disposed of, or other inclusion events, during the year. These are the only entries that change your tax.",
    "part_iii.description": "A description of the QOF investment.",
    "part_iii.qof_ein": "The fund's employer identification number.",
    "part_iii.date_acquired": "The date you made the investment.",
    "part_iii.date_of_inclusion": "The date of the sale or other inclusion event. Used as the sale date on Schedule D.",
    "part_iii.short_term_gain_included": "Deferred short-term gain now included in income. Goes to Schedule D as a short-term gain.",
    "part_iii.long_term_gain_included": "Deferred long-term gain now included in income. Goes to Schedule D as a long-term gain.",
    "part_iii.elected_fmv_exclusion": "Mark if you elected, after holding at least 10 years, to step basis up to fair market value. Recorded only; the engine does not apply it.",
    "part_iii.excluded_gain": "The appreciation excluded under the 10-year election. Recorded only; the engine does not use it.",
    part_iv: "Part IV. QOF investments you held on December 31, with the deferred gain remaining.",
    "part_iv.description": "A description of the QOF investment.",
    "part_iv.qof_ein": "The fund's employer identification number.",
    "part_iv.date_acquired": "The date you made the investment.",
    "part_iv.short_term_deferred_gain": "Short-term gain still deferred at year end.",
    "part_iv.long_term_deferred_gain": "Long-term gain still deferred at year end.",
  },
};
