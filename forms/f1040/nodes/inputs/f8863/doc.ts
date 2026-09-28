import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8863",
  subtitle: "Education Credits (American Opportunity and Lifetime Learning Credits)",
  topic: Topic.Education,
  summary:
    "The form that figures the two education credits for college tuition and related costs. " +
    "The American opportunity credit gives up to $2,500 per eligible student (40% refundable, on Form 1040 line 29); the lifetime learning credit is 20% of up to $10,000 of expenses per return. " +
    "Both phase out between $80,000 and $90,000 of modified AGI ($160,000 to $180,000 joint), married filing separately can't claim either, and the nonrefundable part goes to Schedule 3 line 3. Enter one entry per student.",
  fields: {
    credit_type: "Which credit you are claiming for this student. You can't claim both for the same student in the same year.",
    student_name: "Line 20. The student's name as shown on the return.",
    student_ssn: "Line 21. The student's Social Security number.",
    institution_a_name: "Line 22a. Name of the first school the student attended.",
    institution_a_address: "Line 22a. Address of the first school.",
    institution_a_1098t_received: "Line 22a(2). Whether the student got a 2025 Form 1098-T from this school.",
    institution_a_1098t_box7_prior:
      "Line 22a(3). Whether the student got a 2024 Form 1098-T from this school with box 7 checked (amounts billed for a term starting early the next year).",
    institution_a_ein: "Line 22a. The first school's employer identification number, from Form 1098-T.",
    institution_b_name: "Line 22b. Name of a second school, if any.",
    institution_b_address: "Line 22b. Address of the second school.",
    institution_b_1098t_received: "Line 22b(2). Whether the student got a 2025 Form 1098-T from the second school.",
    institution_b_1098t_box7_prior: "Line 22b(3). Whether the 2024 Form 1098-T from the second school had box 7 checked.",
    institution_b_ein: "Line 22b. The second school's employer identification number.",
    aoc_claimed_4_prior_years:
      "Line 23. Whether the American opportunity credit (or Hope credit) was claimed for this student in any four earlier years. If yes, it isn't available.",
    enrolled_half_time:
      "Line 24. Whether the student was enrolled at least half-time in a degree or credential program for at least one academic period. Required for the American opportunity credit.",
    completed_4_years_postsec:
      "Line 25. Whether the student finished the first four years of college before 2025. If yes, the American opportunity credit isn't available.",
    felony_drug_conviction:
      "Line 26. Whether the student had a felony drug conviction by the end of 2025. If yes, the American opportunity credit isn't available.",
    aoc_adjusted_expenses:
      "Line 27. Qualified expenses for the American opportunity credit, after subtracting tax-free aid. The credit is 100% of the first $2,000 plus 25% of the next $2,000.",
    llc_adjusted_expenses:
      "Line 31. Qualified expenses for the lifetime learning credit, after subtracting tax-free aid. Totals for all students are capped at $10,000.",
    filer_magi:
      "Lines 3 and 14. Your modified AGI (Form 1040 line 11 plus certain foreign and territory income exclusions). Drives the phase-out.",
    filing_status: "Your filing status. Joint filers get the higher phase-out range; married filing separately gets no credit.",
    taxpayer_under_24_no_refundable_aoc:
      "Line 7 checkbox. Mark if you are under 24 and meet the rules that make the American opportunity credit fully nonrefundable (the same age and support tests as the kiddie tax).",
  },
  options: {
    credit_type: {
      aoc: "American opportunity credit (first four years of college, partly refundable)",
      llc: "Lifetime learning credit (any college or job-skills courses, nonrefundable)",
    },
    filing_status: {
      single: "Single",
      mfs: "Married filing separately (can't claim either credit)",
      mfj: "Married filing jointly",
      hoh: "Head of household",
      qss: "Qualifying surviving spouse",
    },
  },
};
