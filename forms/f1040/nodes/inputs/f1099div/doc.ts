import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 1099-DIV",
  subtitle: "Dividends and Distributions",
  topic: Topic.InterestDividends,
  summary:
    "The form a corporation, mutual fund or broker sends by January 31 reporting dividends and other distributions paid to you. " +
    "Ordinary dividends go to Form 1040 line 3b (through Schedule B when they total more than $1,500), qualified dividends to line 3a for the lower capital gain rates, " +
    "and capital gain distributions to Schedule D. Withholding, tax-exempt interest dividends, section 199A dividends and foreign tax paid also flow to their own lines. " +
    "Enter one form per payer.",
  fields: {
    payerName: "The name of the company or fund that paid the dividends. Listed on Schedule B.",
    isNominee:
      "Check if some of these dividends belong to someone else and you received them as a nominee. This requires Schedule B.",
    box11: "Box 11. Checked if the payer is reporting this account to satisfy a FATCA foreign account filing requirement. Informational.",
    box1a: "Box 1a. Total ordinary dividends. Taxed as ordinary income on Form 1040 line 3b; also counts as net investment income on Form 8960.",
    box1b:
      "Box 1b. The part of box 1a that is qualified dividends, taxed at capital gain rates. Goes to Form 1040 line 3a.",
    box2a: "Box 2a. Total capital gain distributions. Reported on Schedule D line 13 as long-term gain.",
    box2b: "Box 2b. The part of box 2a that is unrecaptured section 1250 gain from real estate, taxed at up to 25%.",
    box2c: "Box 2c. The part of box 2a that is section 1202 gain from qualified small business stock, which may be partly excluded.",
    box2d: "Box 2d. The part of box 2a that is collectibles (28%) gain. Sent to the 28% Rate Gain Worksheet.",
    box2e: "Box 2e. The part of box 1a that is section 897 ordinary dividends (from U.S. real property interests). Relevant mainly to foreign persons.",
    box2f: "Box 2f. The part of box 2a that is section 897 capital gain. Relevant mainly to foreign persons.",
    box3: "Box 3. Nondividend distributions, a return of your investment. Not taxed now, but it reduces your basis in the shares.",
    box4: "Box 4. Federal income tax withheld (backup withholding). Credited on Form 1040 line 25b.",
    box5:
      "Box 5. Section 199A dividends (typically from REITs), which can qualify for the qualified business income deduction on Form 8995 or 8995-A.",
    box6: "Box 6. Your share of the fund's investment expenses. Not deductible for 2025; not used here.",
    box7:
      "Box 7. Foreign tax paid on these dividends. Claimed directly on Schedule 3 line 1 when the total is $300 or less ($600 married filing jointly); above that, the engine uses Form 1116.",
    box8: "Box 8. The foreign country or U.S. territory to which the box 7 tax was paid.",
    box9: "Box 9. Cash liquidation distributions. A return of basis, with any excess taxed as capital gain; not used by this node.",
    box10: "Box 10. Noncash (property) liquidation distributions, at fair market value. Not used by this node.",
    box12: "Box 12. Exempt-interest dividends from a mutual fund. Reported as tax-exempt interest on Form 1040 line 2a.",
    box13:
      "Box 13. The part of box 12 from specified private activity bonds. An adjustment for the alternative minimum tax on Form 6251.",
    box14: "Box 14. The state for any state tax withheld.",
    box15: "Box 15. The payer's state identification number.",
    box16: "Box 16. State income tax withheld. Used for the state return.",
    holdingPeriodDays:
      "How many days you held the shares around the ex-dividend date. Under 45 days excludes box 5 from the 199A deduction; under 16 days excludes the box 7 foreign tax from the credit.",
  },
};
