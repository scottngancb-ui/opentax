import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "FinCEN Form 114",
  subtitle: "Report of Foreign Bank and Financial Accounts (FBAR)",
  topic: Topic.Foreign,
  summary:
    "The FBAR is a report U.S. persons file with the Financial Crimes Enforcement Network, not the IRS, when their foreign financial accounts together exceed $10,000 at any time during the year. " +
    "It is filed separately from the tax return, by the April 15 deadline. In this engine it is a record only: it has no inputs from other forms and changes no line on Form 1040.",
  fields: {
    has_foreign_accounts: "Whether you had a financial interest in, or signature authority over, any account outside the United States during the year.",
    max_aggregate_value: "The highest combined value of all your foreign accounts at any point in the year. Filing is required when it exceeds $10,000.",
    account_count: "How many foreign accounts you had.",
    accounts: "One entry per foreign account.",
    "accounts.country": "The country where the account is held.",
    "accounts.institution_name": "The name of the bank or financial institution.",
    "accounts.account_type": "The kind of account.",
    "accounts.max_value": "The highest value of this account during the year.",
  },
  options: {
    "accounts.account_type": {
      bank: "A bank account, such as a checking, savings or time deposit account.",
      securities: "A brokerage or securities account.",
      other: "Another type of financial account, such as a foreign insurance policy with cash value or a mutual fund.",
    },
  },
};
