import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8379",
  subtitle: "Injured Spouse Allocation",
  topic: Topic.Payments,
  summary:
    "The form a spouse on a joint return files to get back their share of a refund that would otherwise be applied to the other spouse's past-due debts, such as child support, student loans or back taxes. " +
    "It splits the couple's income, payments, deductions and credits so the IRS can figure the injured spouse's portion. " +
    "It does not change the tax on the joint return, so the engine records it without changing any Form 1040 line.",
  fields: {
    injured_spouse_ssn: "Part I. The SSN of the injured spouse, the one who does not owe the debt.",
    injured_spouse_name: "Name of the injured spouse.",
    injured_spouse_wages: "Part III. The injured spouse's share of wages on the joint return.",
    injured_spouse_se_income: "Part III. The injured spouse's self-employment income, or loss.",
    injured_spouse_other_income: "Part III. Other income belonging to the injured spouse.",
    injured_spouse_withholding: "Part III. Federal income tax withheld from the injured spouse's income.",
    injured_spouse_estimated_tax: "Part III. The injured spouse's share of estimated tax payments.",
    injured_spouse_eic: "Part III. The injured spouse's share of the earned income credit.",
    injured_spouse_itemized_deductions: "Part III. The injured spouse's share of itemized deductions, if the couple itemizes.",
    itemizes: "Mark if the joint return itemizes deductions; leave unmarked for the standard deduction.",
    injured_spouse_credits: "Part III. The injured spouse's share of other credits.",
    debt_type: "The kind of past-due debt owed by the other spouse that the refund would be applied to.",
    debt_amount: "The amount of the other spouse's past-due debt.",
  },
  options: {
    debt_type: {
      child_support: "Past-due child support",
      federal_tax: "Past-due federal tax",
      state_tax: "State income tax debt",
      student_loan: "Federal student loan or other federal nontax debt",
      unemployment: "State unemployment compensation debt",
      other: "Another kind of debt",
    },
  },
};
