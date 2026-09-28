import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8888",
  subtitle: "Allocation of Refund (Including Savings Bond Purchases)",
  topic: Topic.Payments,
  summary:
    "The form you use to split a refund by direct deposit among up to three bank accounts, or to use part of it to buy U.S. Series I savings bonds. " +
    "It only tells the IRS where to send your refund, so it applies only when you have one and doesn't change your tax. " +
    "The engine records the instructions; the amounts should add up to your refund on Form 1040.",
  fields: {
    account_1: "The first account to receive part of your refund.",
    "account_1.routing_number": "The bank's nine-digit routing number.",
    "account_1.account_number": "Your account number at that bank.",
    "account_1.account_type": "Whether the account is a checking or savings account.",
    "account_1.amount": "The part of your refund to deposit into this account.",
    account_2: "A second account to receive part of your refund.",
    "account_2.routing_number": "The bank's nine-digit routing number.",
    "account_2.account_number": "Your account number at that bank.",
    "account_2.account_type": "Whether the account is a checking or savings account.",
    "account_2.amount": "The part of your refund to deposit into this account.",
    account_3: "A third account to receive part of your refund.",
    "account_3.routing_number": "The bank's nine-digit routing number.",
    "account_3.account_number": "Your account number at that bank.",
    "account_3.account_type": "Whether the account is a checking or savings account.",
    "account_3.amount": "The part of your refund to deposit into this account.",
    savings_bond_amount: "Part II. The part of your refund to use to buy Series I savings bonds, in multiples of $50.",
    bond_owner_name: "The name of the person who will own the savings bonds.",
    bond_coowner_name: "The name of a co-owner or beneficiary for the bonds, if any.",
  },
};
