import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8912",
  subtitle: "Credit to Holders of Tax Credit Bonds",
  topic: Topic.BusinessCredits,
  summary:
    "The form bondholders use to claim a credit for holding certain tax credit bonds, such as clean renewable energy, " +
    "energy conservation, zone academy or school construction bonds. New issues of these bonds were repealed after 2017, " +
    "but older bonds still earn the credit. The engine figures face amount times credit rate times the share of the year held, " +
    "sums all bonds, and reports it on Schedule 3. The credit is also taxable interest income, which this node does not add.",
  fields: {
    bond_type: "The program the bond was issued under. Recorded for reference; the credit uses the rate you enter.",
    face_amount: "The face (par) amount of the bond you held.",
    credit_rate: "The credit rate set for the bond when it was issued, as a decimal (for example 0.05 for 5%).",
    holding_period_days: "The number of days during the year you held the bond. The credit is prorated by this.",
    total_days_in_period: "The number of days in the period the rate applies to, normally 365 (366 in a leap year).",
  },
  options: {
    bond_type: {
      CREB: "Clean renewable energy bond",
      NEW_CREB: "New clean renewable energy bond",
      QECB: "Qualified energy conservation bond",
      QZAB: "Qualified zone academy bond",
      QSCB: "Qualified school construction bond",
      BAB_DIRECT: "Build America bond",
    },
  },
};
