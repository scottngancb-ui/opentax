import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 4797",
  subtitle: "Sales of Business Property",
  topic: Topic.Investments,
  summary:
    "The form that reports sales of business and rental property and depreciation recapture. It is filled in automatically " +
    "from Schedule E, K-1s and Forms 4684, 6252 and 8824. A net section 1231 gain (after recapturing prior 1231 losses) goes to " +
    "Schedule D as long-term gain; a net 1231 loss and ordinary gains go to Schedule 1 line 4. Unrecaptured section 1250 gain " +
    "is passed to Schedule D for the 25% rate.",
  fields: {
    disposed_properties: "Number of rental properties marked as sold or disposed of on Schedule E. Informational only.",
    section_1231_gain:
      "Part I. Net gain or loss from business property held more than a year. A gain goes to Schedule D; a loss is ordinary.",
    nonrecaptured_1231_loss:
      "Part I, line 8. Net section 1231 losses from the past five years not yet recaptured. That much of this year's 1231 gain is taxed as ordinary income.",
    ordinary_gain:
      "Part II. Ordinary gain or loss, including depreciation recapture and sales of property held a year or less. Goes to Schedule 1 line 4.",
    recapture_1245: "Part III. Section 1245 depreciation recapture. Already included in the ordinary gain; kept for reference.",
    recapture_1250: "Part III. Section 1250 additional depreciation recapture. Already included in the ordinary gain; kept for reference.",
    unrecaptured_section_1250_gain:
      "Unrecaptured section 1250 gain from real property depreciation. Sent to Schedule D line 19 and taxed at up to 25%.",
  },
};
