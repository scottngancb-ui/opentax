import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form SSA-1099",
  subtitle: "Social Security Benefit Statement",
  topic: Topic.Retirement,
  summary:
    "The statement the Social Security Administration sends each January showing the Social Security benefits you received and repaid during the year. " +
    "The Railroad Retirement Board issues a similar Form RRB-1099 for Tier 1 railroad retirement benefits, which you can enter here too. " +
    "Net benefits (box 5) go on Form 1040 line 6a; the AGI calculation then figures how much is taxable for line 6b (up to 85%, depending on your other income). " +
    "Voluntary withholding in box 6 counts as a payment on line 25b.",
  fields: {
    payer_name: "The payer: normally the Social Security Administration, or the Railroad Retirement Board for an RRB-1099.",
    box3_gross_benefits: "Box 3. Total benefits paid to you during the year.",
    box4_repaid: "Box 4. Benefits you repaid to SSA during the year. Subtracted from box 3.",
    box5_net_benefits: "Box 5. Net benefits for the year (box 3 minus box 4). If entered, the engine uses it directly; otherwise it figures box 3 minus box 4. Goes to Form 1040 line 6a.",
    box6_federal_withheld: "Box 6. Federal income tax withheld from your benefits, if you asked for withholding on Form W-4V. Goes to Form 1040 line 25b.",
    is_rrb: "Check if this is a Form RRB-1099 from the Railroad Retirement Board rather than an SSA-1099. Treated the same way for federal tax.",
  },
};
