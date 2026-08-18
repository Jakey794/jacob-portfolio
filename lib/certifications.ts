/**
 * Certifications.
 *
 * Presented as a certificate/course. It is not a degree, a designation, a
 * professional licence, or a securities credential, and no score, duration,
 * credential ID, expiry or accreditation is invented. `credentialUrl` stays
 * unset until a stable public page that clearly corresponds to this record
 * can be verified.
 */

import type { Certification } from "./content-types";

export const certifications: Certification[] = [
  {
    id: "economic-fundamentals-for-leadership",
    name: "Economic Fundamentals for Leadership",
    issuer: "Fraser Institute",
    displayDate: "May 2026",
    date: "2026-05",
    description:
      "Completed the Economic Fundamentals for Leadership certificate course issued by the Fraser Institute.",
    skills: [
      "Economic fundamentals",
      "Economic reasoning",
      "Leadership context",
    ],
  },
];
