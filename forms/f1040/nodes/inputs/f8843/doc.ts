import { type NodeDoc, Topic } from "../../doc.ts";

export const doc: NodeDoc = {
  title: "Form 8843",
  subtitle: "Statement for Exempt Individuals and Individuals With a Medical Condition",
  topic: Topic.Foreign,
  summary:
    "The statement foreign visitors file to exclude certain days in the United States from the substantial presence test, which decides whether they are taxed as residents. " +
    "It covers students, teachers and trainees, foreign government officials, professional athletes at charity events and people kept here by a medical condition, and is required even with no U.S. income. " +
    "It affects residency status only; the engine records it without changing any amounts.",
  fields: {
    exempt_category: "The reason your days are excluded. Each category has its own rules and limits.",
    visa_type: "Your U.S. visa type, such as F-1, J-1, M-1, Q-1, A or G.",
    country_of_citizenship: "Part I. The country that issued your passport.",
    days_excluded_current_year: "The number of days this year you are excluding from the substantial presence test. Can't exceed 366.",
    supervising_academic_institution: "For students, the school or program you attended.",
  },
  options: {
    exempt_category: {
      STUDENT: "Student on an F, J, M or Q visa, generally limited to five calendar years",
      TEACHER_TRAINEE: "Teacher or trainee on a J or Q visa, generally two years in any six-year period",
      GOVERNMENT_OFFICIAL: "Foreign government-related individual, such as a diplomat on an A or G visa",
      ATHLETE: "Professional athlete temporarily in the U.S. to compete in a charitable sports event",
      MEDICAL: "Unable to leave the U.S. because of a medical condition that arose while here",
    },
  },
};
