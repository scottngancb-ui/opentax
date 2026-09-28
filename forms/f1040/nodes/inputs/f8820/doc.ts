import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8820",
  subtitle: "Orphan Drug Credit",
  topic: Topic.BusinessCredits,
  summary:
    "A business credit for clinical testing costs of drugs the FDA has designated to treat rare diseases or conditions. " +
    "The credit is 25% of qualified clinical testing expenses and is part of the general business credit. " +
    "The engine sends it to Schedule 3 line 6z, which reduces your tax on Form 1040. Carrybacks, carryforwards and the required reduction of the expense deduction are not handled here.",
  fields: {
    qualified_clinical_testing_expenses:
      "Line 1. Clinical testing expenses for FDA-designated orphan drugs. The engine multiplies the total by 25%.",
    is_small_biotech:
      "Mark if you are a qualified small biotech company. Recorded only; it doesn't change the 25% rate in the engine.",
  },
};
