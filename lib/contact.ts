/**
 * Single source of truth for contact destinations and the availability copy.
 *
 * Every value here already existed in the portfolio (the pre-redesign contact
 * section and `components/resume-cta.tsx` link lists, and the education
 * facts). Nothing about location, response time, timezone or
 * preferred channel is asserted, because none of it is recorded anywhere in
 * the repo — see `unverified` at the bottom.
 */

export const contactEmail = "jacob.allan@mail.utoronto.ca";

export type ContactChannel = {
  key: "email" | "linkedin" | "github" | "resume";
  label: string;
  /** Shown as the human-readable destination. */
  text: string;
  href: string;
  description: string;
  action: string;
  external: boolean;
};

export const contactChannels: ContactChannel[] = [
  {
    key: "email",
    label: "Email / Direct Outreach",
    text: contactEmail,
    href: `mailto:${contactEmail}`,
    description:
      "The most direct way to reach me about roles, research, or a technical problem.",
    action: "Send an email",
    external: false,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    text: "linkedin.com/in/jacob-allan-ml",
    href: "https://www.linkedin.com/in/jacob-allan-ml/",
    description: "Professional background, roles, and updates.",
    action: "View profile",
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    text: "github.com/Jakey794",
    href: "https://github.com/Jakey794",
    description: "Source for the projects and case studies on this site.",
    action: "View profile",
    external: true,
  },
  {
    key: "resume",
    label: "Résumé",
    text: "resume.pdf",
    href: "/resume.pdf",
    description:
      "ML research, full-stack AI tools, quantitative modeling, and engineering experience.",
    action: "Download PDF",
    external: true,
  },
];

export const emailChannel = contactChannels[0];
export const linkChannels = contactChannels.slice(1);

/** Availability line, carried over verbatim from the original contact section. */
export const availabilityStatement =
  "Open to machine learning, software engineering, quantitative development, quantitative research, and ML research assistant opportunities.";

/**
 * The five areas named in the availability statement, plus internships —
 * the recruiting focus recorded in AGENTS.md. No other role targets are
 * claimed.
 */
export const openTo = [
  "Machine learning",
  "Software engineering",
  "Quantitative development",
  "Quantitative research",
  "ML research assistant",
  "Internships",
];

/** Short chips for the masthead. */
export const contactTags = [
  "Machine Learning",
  "Software Engineering",
  "Quantitative Research",
  "Open to Opportunities",
];

/** Verified education facts, reused from the About page. */
export const universityBase = {
  institution: "University of Toronto",
  programme: "Engineering Science",
  campus: "Toronto, ON",
  coordinates: "43.6629° N, 79.3957° W",
};

/**
 * Fields the Contact concept shows that the repo does not support. Listed so
 * the omission is deliberate and easy to revisit:
 *   - city of residence / current base (only the university is recorded)
 *   - time zone
 *   - response window
 *   - preferred communication method
 *   - full-time availability
 *   - speaking, mentoring or advising
 *   - research collaboration and partnership offers
 */
export const unverified = [
  "current base",
  "time zone",
  "response window",
  "preferred channel",
] as const;

/**
 * Rail entries for the standalone page.
 *
 * `channels` used to be a sixth entry pointing at a panel that relisted the
 * same four destinations shown directly above it. The duplicate panel is gone,
 * so the rail no longer advertises it.
 */
export const contactSections = [
  { id: "overview", index: "01", label: "Overview" },
  { id: "reach-out", index: "02", label: "Reach Out" },
  { id: "links", index: "03", label: "Links" },
  { id: "availability", index: "04", label: "Availability" },
  { id: "next", index: "05", label: "Next" },
];
