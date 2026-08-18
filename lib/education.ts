/**
 * Education records.
 *
 * The University of Toronto degree is in progress. Nothing here may be
 * rewritten to read as completed: the credential is "expected May 2029", the
 * concentrations are being pursued, and the GPA is a dated snapshot rather
 * than a standing figure. No class rank or percentage equivalent is derived
 * from it, because neither is in the source.
 */

import type { EducationRecord } from "./content-types";

export const education: EducationRecord[] = [
  {
    slug: "university-of-toronto-engineering-science",
    institution: "University of Toronto",
    credential: "Bachelor of Applied Science (BASc)",
    field: "Engineering Science",
    displayDates: "Sep 2025 – Expected May 2029",
    dateStart: "2025-09",
    dateEnd: "2029-05",
    current: true,
    location: "Toronto, Ontario",
    summary:
      "Pursuing a BASc in Engineering Science with concentrations in Machine Intelligence and Mathematics, alongside project work in reliable AI, quantitative risk, and systems software.",
    concentrations: ["Machine Intelligence", "Mathematics"],
    gpa: "3.56 / 4.00",
    gpaQualifier: "Current GPA as of the August 2026 source set",
    honour: "Schulich Leader Scholar",
    coursework: [
      "Data Structures & Algorithms",
      "Probability & Statistics",
      "Linear Algebra",
      "Calculus",
      "Python/C computing",
      "MATLAB",
    ],
  },
  {
    slug: "leahurst-college",
    institution: "Leahurst College",
    credential: "Ontario Secondary School Diploma",
    displayDates: "2022 – 2025",
    dateStart: "2022-09",
    dateEnd: "2025-06",
    current: false,
    summary:
      "Completed the Ontario Secondary School Diploma with Maxima Cum Laude standing.",
    distinctions: [
      "Maxima Cum Laude",
      "95%+ academic average",
      "Six-time school champion in University of Waterloo competitions",
      "Governor General's Academic Medal",
    ],
  },
];

export const primaryEducation = education[0];
