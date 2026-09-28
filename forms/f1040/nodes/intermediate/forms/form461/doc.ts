import { type NodeDoc, Topic } from "../../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 461",
  subtitle: "Limitation on Business Losses",
  topic: Topic.Business,
  summary:
    "The form that limits how much net business loss you can deduct in one year (the excess business loss rule). It is filled " +
    "in automatically from Schedule C and Schedule F, which compare losses to the threshold ($313,000, or $626,000 married filing " +
    "jointly). The disallowed excess is added back as other income on Schedule 1 line 8p and becomes a net operating loss " +
    "carryforward for later years.",
  fields: {
    excess_business_loss:
      "The excess business loss figured by each business schedule. All amounts are added and reported on Schedule 1 line 8p.",
    filing_status: "Your filing status. Informational here; the threshold is applied by the forms that feed this one.",
  },
  options: {
    filing_status: {
      single: "Single",
      mfs: "Married filing separately",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
