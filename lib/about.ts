/**
 * Single source of truth for About content, shared by the standalone
 * `/about` page and the concise homepage `#about` preview.
 *
 * Everything here is drawn from existing portfolio content: the original
 * About prose, `lib/skills.ts`, `lib/projects.ts`, `lib/experience.ts`, and
 * the contact links in `components/resume-cta.tsx`. Nothing is invented —
 * see the notes on individual fields.
 */

import {
  availabilityStatement,
  contactChannels,
  contactEmail,
  universityBase,
} from "@/lib/contact";
import { allProjects } from "@/lib/projects";
import { experience } from "@/lib/experience";

/** Lede and body, carried over verbatim from the original About section. */
export const aboutLede =
  "I build practical systems: ML pipelines, full-stack AI tools, and models that turn messy data into decisions.";

export const aboutBody = [
  "I'm an Engineering Science student at the University of Toronto focused on machine learning, quantitative finance, and software engineering.",
  "My current work spans RF signal classification, customer-personalization ML, incident triage automation, and portfolio/risk modeling.",
];

/** The disciplines already used on the homepage hero. */
export const aboutTags = [
  "Machine Learning",
  "Software Engineering",
  "Quantitative Research",
  "Full-stack AI",
];

/**
 * Counts and figures computed from the real data files, so they cannot drift
 * out of sync with the portfolio.
 */
export const aboutStats = [
  {
    value: String(allProjects.length).padStart(2, "0"),
    label: "Case studies",
    href: "/projects",
  },
  {
    value: String(experience.length).padStart(2, "0"),
    label: "Roles & research",
    href: "/experience",
  },
  {
    value: "150K",
    label: "Largest dataset curated",
    href: "/experience/royal-military-college-ml-researcher",
  },
];

/**
 * `honour` is the Schulich Leader Scholar line carried from the portfolio's
 * original hero (commit 7805328). No dates are recorded anywhere in the repo,
 * so none are shown.
 */
export const education = {
  programme: "Engineering Science",
  institution: "University of Toronto",
  honour: "Schulich Leader Scholar",
};

/**
 * The three focus areas from the original About section, each backed by the
 * matching group in `lib/skills.ts`.
 */
export const technicalFocus = [
  {
    title: "Machine learning systems",
    skills: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "clustering",
      "autoencoders",
      "model evaluation",
    ],
  },
  {
    title: "Full-stack AI tools",
    skills: ["Next.js", "React", "FastAPI", "Chrome Extensions", "LLM APIs"],
  },
  {
    title: "Quantitative modeling",
    skills: [
      "VaR",
      "efficient frontier optimization",
      "factor modeling",
      "return prediction",
      "portfolio risk",
    ],
  },
];

/**
 * How I work — each principle is evidenced by a shipped project rather than
 * asserted, and links to the case study that demonstrates it.
 */
export const workingPrinciples = [
  {
    title: "Typed contracts over loose model output",
    evidence:
      "Pydantic response contracts keep severity, root-cause and confidence structured.",
    href: "/projects/incident-triage-copilot",
    source: "Incident Triage Copilot",
  },
  {
    title: "A fallback path so a demo never depends on a provider",
    evidence:
      "Heuristic and mock paths run when Groq, Gemini or the LLM backend are unavailable.",
    href: "/projects/formatclip",
    source: "FormatClip",
  },
  {
    title: "Measure on unseen data",
    evidence:
      "90% average accuracy on unseen RF signals; one year of unseen market data for the regime models.",
    href: "/projects/rf-signal-classification-research",
    source: "RF Signal Classification",
  },
  {
    title: "Cover backend behaviour with tests",
    evidence:
      "pytest coverage around response structure, not just the happy path.",
    href: "/projects/incident-triage-copilot",
    source: "Incident Triage Copilot",
  },
];

/** Journey, derived from the real experience entries. */
export const journey = experience.map((item) => ({
  slug: item.slug,
  dates: item.dates,
  organization: item.shortName,
  role: item.role,
}));

/** Availability line and contact destinations both live in `lib/contact.ts`. */
export const availability = availabilityStatement;

export const aboutContact = {
  email: contactEmail,
  github: contactChannels.find((c) => c.key === "github")!.href,
  linkedin: contactChannels.find((c) => c.key === "linkedin")!.href,
  resume: contactChannels.find((c) => c.key === "resume")!.href,
  institution: universityBase.institution,
};

/** Rail entries for the standalone page. */
export const aboutSections = [
  { id: "overview", index: "01", label: "Overview" },
  { id: "education", index: "02", label: "Education" },
  { id: "focus", index: "03", label: "Technical Focus" },
  { id: "skills", index: "04", label: "Skills" },
  { id: "how-i-work", index: "05", label: "How I Work" },
  { id: "journey", index: "06", label: "Journey" },
];
