import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-K",
  subtitle: "Payment Card and Third Party Network Transactions",
  topic: Topic.Business,
  summary:
    "The form a payment card processor or third-party payment network (such as an online marketplace or payment app) sends by January 31 reporting the gross payments it processed for you. " +
    "For 2025, third-party networks report when payments exceed $20,000 and 200 transactions; card processors report any amount. " +
    "The gross amount is not automatically income: you choose whether it belongs on Schedule C as business receipts or on Schedule 1 as other income, and withholding is credited on Form 1040 line 25b.",
  fields: {
    pse_name: "The name of the payment settlement entity or other filer that issued the form.",
    pse_tin: "The filer's federal identification number.",
    filer_type_pse: "Checked if the filer is a payment settlement entity (PSE).",
    filer_type_epf: "Checked if the filer is an electronic payment facilitator (EPF) or other third party.",
    pse_phone: "The filer's telephone number.",
    transaction_type_payment_card: "Checked if the payments are payment card (credit or debit card) transactions.",
    transaction_type_tpso: "Checked if the payments are third-party network transactions, such as through an online marketplace or payment app.",
    account_number: "The account number the filer assigned to you, if any.",
    second_tin_notice: "Checked if the IRS has notified the filer twice within three years that your TIN was incorrect.",
    box1a_gross_payments:
      "Box 1a. The gross amount of payments processed, before fees, refunds or chargebacks. The engine carries it to the chosen form only when a routing is set and the amount is over $5,000.",
    box1b_card_not_present: "Box 1b. The part of box 1a from card-not-present transactions, such as online or phone sales.",
    box2_merchant_category_code: "Box 2. The four-digit merchant category code describing your type of business.",
    box3_transaction_count: "Box 3. The number of payment transactions (not counting refunds).",
    box4_federal_withheld: "Box 4. Federal income tax withheld (backup withholding). Credited on Form 1040 line 25b.",
    for_routing:
      "Where the box 1a amount belongs on your return. If left blank, the engine does not report any income from this form.",
    box5a_january: "Box 5a. Gross payments in January.",
    box5b_february: "Box 5b. Gross payments in February.",
    box5c_march: "Box 5c. Gross payments in March.",
    box5d_april: "Box 5d. Gross payments in April.",
    box5e_may: "Box 5e. Gross payments in May.",
    box5f_june: "Box 5f. Gross payments in June.",
    box5g_july: "Box 5g. Gross payments in July.",
    box5h_august: "Box 5h. Gross payments in August.",
    box5i_september: "Box 5i. Gross payments in September.",
    box5j_october: "Box 5j. Gross payments in October.",
    box5k_november: "Box 5k. Gross payments in November.",
    box5l_december: "Box 5l. Gross payments in December.",
    box6_state: "Box 6. The state for any state tax withheld.",
    box7_state_id: "Box 7. The filer's state identification number.",
    box8_state_withheld: "Box 8. State income tax withheld. Used for the state return.",
  },
  options: {
    for_routing: {
      schedule_c: "Business income: reported as gross receipts on Schedule C line 1",
      schedule_1_line_8z: "Other income: reported on Schedule 1 line 8z, for example from occasional non-business activity",
    },
  },
};
