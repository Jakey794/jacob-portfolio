/**
 * Volunteering.
 *
 * Sits below professional experience and education, and carries no
 * participant photographs, student identities or outcome percentages. The
 * "20–30% improvement" figure that appeared in earlier drafts of the tutoring
 * entry is unverified and is deliberately absent.
 */

import type { VolunteerRole } from "./content-types";

export const volunteering: VolunteerRole[] = [
  {
    id: "leahurst-math-tutor",
    organization: "Leahurst College",
    role: "Math Tutor",
    displayDates: "Sep 2022 – Jun 2025",
    dateStart: "2022-09",
    dateEnd: "2025-06",
    summary:
      "Provided mathematics tutoring and adapted explanations and practice to individual student needs.",
    contributions: [
      "Tutored mathematics and problem solving.",
      "Adapted explanations and practice to each student.",
      "Supported structured review and preparation.",
    ],
  },
  {
    id: "kingston-yacht-club-sailing-instructor",
    organization: "Kingston Yacht Club",
    role: "Sailing Instructor",
    displayDates: "May 2023 – Jul 2023",
    dateStart: "2023-05",
    dateEnd: "2023-07",
    location: "Kingston, Ontario, Canada",
    summary:
      "Helped teach sailing skills and safe on-water practices to approximately 10–20 sailors.",
    contributions: [
      "Taught sailing fundamentals to approximately 10–20 sailors.",
      "Reinforced safe on-water practices.",
    ],
  },
];
