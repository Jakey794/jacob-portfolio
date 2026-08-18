/**
 * Honours and awards.
 *
 * Each record says exactly what the source says. No currency code, national
 * rank, applicant count, percentile, class rank, graduating-class size or
 * competition division is added — those are the details a reader would most
 * like to have and the ones there is no evidence for.
 */

import type { Award } from "./content-types";

export const awards: Award[] = [
  {
    id: "schulich-leader-scholarship",
    title: "Schulich Leader Scholarship",
    displayDate: "Jul 2025",
    date: "2025-07",
    amount: "$120,000",
    summary:
      "Awarded a $120,000 Schulich Leader Scholarship in support of undergraduate STEM study.",
  },
  {
    id: "governor-general-academic-medal",
    title: "Governor General's Academic Medal",
    displayDate: "Jun 2025",
    date: "2025-06",
    summary:
      "Received the Governor General's Academic Medal upon completing secondary school.",
  },
  {
    id: "perfect-beaver-computing-challenge",
    title: "Perfect Score — Beaver Computing Challenge",
    issuer: "University of Waterloo",
    displayDate: "Jan 2023",
    date: "2023-01",
    summary: "Earned a perfect score in the Beaver Computing Challenge.",
  },
];
