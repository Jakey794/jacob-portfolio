/**
 * Contact-page content and the canonical outbound channels.
 *
 * Destinations come from `lib/site.ts`; this file only decides how they are
 * described and ordered. There is no contact form, and none should be added
 * casually: a form needs spam handling, a privacy position, delivery
 * guarantees, retention rules and failure states, none of which a mailto link
 * requires.
 *
 * Nothing here may carry a telephone number, home address, birthday,
 * citizenship, personal calendar or private social account.
 */

import { contactLinks, profile } from "./site";

export const contactEmail = contactLinks.email;

export type ContactChannel = {
  key: "email" | "linkedin" | "github" | "resume";
  label: string;
  href: string;
  /** What is displayed as the destination. */
  text: string;
  description: string;
  external: boolean;
};

export const contactChannels: ContactChannel[] = [
  {
    key: "email",
    label: "Email",
    href: contactLinks.emailHref,
    text: contactLinks.email,
    description: "Best for internship, research, and project conversations.",
    external: false,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: contactLinks.linkedin,
    text: "linkedin.com/in/jacob-allan-ml",
    description: "Current experience, education, and professional updates.",
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    href: contactLinks.github,
    text: "github.com/Jakey794",
    description:
      "Public source, documentation, tests, releases, and project evidence.",
    external: true,
  },
  {
    key: "resume",
    label: "Resume",
    href: contactLinks.resume,
    text: "resume.pdf",
    description: "Current one-page Master Resume in PDF format.",
    external: false,
  },
];

export const emailChannel = contactChannels[0];
export const linkChannels = contactChannels.slice(1);

/* No terminal full stop: `PageTitle` draws the accent dot that closes it. */
export const contactHeadline = "Let's build reliable systems";

export const contactLede =
  "I am open to software engineering, machine learning, quantitative development, research, and technically rigorous collaboration.";

export const availabilityStatement =
  "I am currently studying Engineering Science at the University of Toronto and working as a Software Engineering Intern at Northstar. For a role, research collaboration, or project conversation, email is the best way to reach me.";

export const openTo = profile.targetRoles;

export const contactTags = [
  "Software Engineering",
  "Machine Learning",
  "Quantitative Systems",
  "Research",
];

export const universityBase = {
  programme: "Engineering Science",
  institution: "University of Toronto",
};

export const contactSections = [
  { id: "overview", label: "Overview" },
  { id: "reach-out", label: "Reach out" },
  { id: "links", label: "Links" },
  { id: "availability", label: "Open to" },
];
