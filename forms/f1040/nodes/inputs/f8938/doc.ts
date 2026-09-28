import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8938",
  subtitle: "Statement of Specified Foreign Financial Assets",
  topic: Topic.Foreign,
  summary:
    "The FATCA disclosure form listing foreign financial assets, such as foreign bank and brokerage accounts, foreign stock and interests in foreign entities. " +
    "You must file it when the total value is over a threshold that depends on filing status and whether you live abroad (for example, more than $50,000 " +
    "at year end or $75,000 at any time for a single filer in the US). It is separate from the FBAR. It reports information only; the engine computes no tax from it.",
  fields: {
    lives_abroad: "Mark if you meet the test for living abroad, which raises the filing thresholds.",
    filing_status: "Your filing status (for example single, mfj or mfs), which sets the filing threshold.",
    max_value_all_assets: "The highest total value of all your specified foreign financial assets at any time during the year.",
    year_end_value_all_assets: "The total value of all your specified foreign financial assets on the last day of the year.",
    assets: "One entry per foreign account or asset you report.",
    "assets.asset_type": "The kind of asset. Accounts go in Part V of the form; other assets such as stock or entity interests go in Part VI.",
    "assets.description": "A description of the account or asset, such as the institution or issuer name.",
    "assets.country": "The country where the account or asset is located, as a two-letter code.",
    "assets.max_value_during_year": "The highest value of this asset during the year.",
    "assets.year_end_value": "The value of this asset on the last day of the year.",
    "assets.income_reported": "Mark if income from this asset (interest, dividends, gains) is reported on your return.",
    "assets.income_reported_on": "Where that income is reported, such as Schedule B or Schedule D.",
    has_pfic: "Mark if any of the assets are passive foreign investment companies, which may also require Form 8621.",
    foreign_tax_credit_claimed: "Mark if you claimed a foreign tax credit for income from these assets.",
  },
  options: {
    "assets.asset_type": {
      bank_account: "A deposit account at a foreign bank",
      brokerage_account: "A custodial or brokerage account at a foreign financial institution",
      foreign_stock: "Stock issued by a foreign company, held directly",
      foreign_bond: "A bond or other debt issued by a foreign person, held directly",
      foreign_partnership_interest: "An interest in a foreign partnership",
      foreign_trust_interest: "An interest in a foreign trust or estate",
      foreign_pension_plan: "An interest in a foreign pension or deferred compensation plan",
      other: "Any other specified foreign financial asset",
    },
  },
};
