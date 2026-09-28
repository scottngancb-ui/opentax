import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form W-2G",
  subtitle: "Certain Gambling Winnings",
  topic: Topic.OtherIncome,
  summary:
    "The statement a casino, racetrack, lottery or other gambling payer gives you (by January 31) when your winnings pass certain reporting thresholds or tax was withheld. " +
    "Enter one per W-2G. The engine adds the winnings to other income on Schedule 1 line 8, which flows to Form 1040 line 8, and counts federal withholding as a payment on line 25b. " +
    "Gambling losses are not entered here; you can deduct them on Schedule A only if you itemize, up to your winnings.",
  fields: {
    box1_winnings: "Box 1. Reportable winnings, reduced by the wager in some cases. Added to other income on Schedule 1.",
    box2_type_of_wager: "The type of wager, such as slot machine, keno, bingo, lottery or horse race (box 3 on the current form). Informational.",
    box3_winnings_identical: "Winnings from identical wagers (box 7 on the current form). Informational; the engine does not add it to income.",
    box4_federal_withheld: "Box 4. Federal income tax withheld from the winnings. Goes to Form 1040 line 25b.",
    box5_transaction: "Box 5. The payer's transaction or ticket identifier. Informational.",
    box6_race: "Box 6. The race identification for pari-mutuel wagers, such as horse or dog races. Informational.",
    box7_winnings_noncash: "Winnings paid in something other than cash, such as a car or trip, at fair market value. The engine adds this to box 1 as income, so don't enter an amount already included in box 1.",
    box8_cashier: "Box 8. The payer's cashier identifier. Informational.",
    box9_winner_tin: "Box 9. The winner's taxpayer identification number (usually your SSN).",
    box10_window: "Box 10. The payer's window identifier. Informational.",
    box11_first_id: "Box 11. The first form of identification you showed the payer. Informational.",
    box12_second_id: "Box 12. The second form of identification you showed the payer. Informational.",
    box13_state: "Box 13. The state of the payer, as a two-letter code.",
    box14_state_id: "The payer's state identification number (shown with the state in box 13).",
    box15_state_withheld: "Box 15. State income tax withheld from the winnings. Not used by the federal engine; include it yourself with state taxes on Schedule A if you itemize.",
    payer_name: "The payer's name.",
    payer_address: "The payer's address.",
    payer_ein: "The payer's federal identification number.",
  },
};
