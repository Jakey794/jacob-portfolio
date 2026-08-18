/**
 * About-page and homepage-preview content.
 *
 * Everything numeric here is computed from the collections rather than typed
 * in. The old file hard-coded a "case studies" figure that counted the whole
 * project array including records with no detail page; counting the records
 * themselves means the figure cannot drift when one is added or archived.
 */

import { awards } from "./awards";
import { certifications } from "./certifications";
import { education } from "./education";
import { experience } from "./experience";
import { allProjects } from "./projects";
import { profile } from "./site";
import { volunteering } from "./volunteering";

export const aboutLede =
  "I build secure backend software and applied ML systems for operational and financial workflows.";

export const aboutBody = profile.longBio;

/**
 * Independent activity, deliberately kept separate from the UTEFA records.
 * The return is a point-in-time figure Jacob supplied directly; the qualifier
 * renders with it so it cannot be mistaken for group, client, or audited
 * performance.
 */
export const independentInvestingNote = {
  title: "Independent investing group",
  body:
    "Outside my university roles, I founded and run an informal investing group chat with 20+ members. I share my own trades, price targets, and market analysis, and help peers work through research, risk, and market questions.",
  performance:
    "My personal portfolio was up approximately 25% year to date as of August 18, 2026.",
  qualifier:
    "Self-reported and unaudited personal result; not group performance. Informal peer discussion only—not personalized investment advice or managed client capital.",
} as const;

export const aboutTags = [
  "Software Engineering",
  "Machine Learning",
  "Quantitative Research",
  "Reliable AI",
  "Systems Programming",
];

/** Public demos and releases a visitor can actually open or install today. */
const liveArtifacts = allProjects.filter((project) =>
  project.links.some((link) => link.kind === "live" || link.kind === "release")
);

/**
 * Repositories Jacob owns and has published. Counted rather than typed, so the
 * figure in the homepage highlights cannot drift from the project collection —
 * and the collaborative record is excluded, because it is not his repository.
 */
const ownedPublicRepos = allProjects.filter(
  (project) =>
    project.ownership === "owned" &&
    project.links.some((link) => link.kind === "source")
);

export const aboutStats = [
  {
    value: String(allProjects.length),
    label: "Project and research records",
    href: "/projects",
  },
  {
    value: String(experience.length),
    label: "Work experiences",
    href: "/experience",
  },
  {
    value: String(liveArtifacts.length),
    label: "Public demos and releases",
    href: "/projects",
  },
  {
    value: "150K",
    label: "Largest research dataset, in samples",
    href: "/projects/rf-signal-classification-research",
  },
];

/** The shorter set used on the homepage, where three figures fit the band. */
export const homeStats = [
  aboutStats[0],
  aboutStats[1],
  {
    value: String(awards.length),
    label: "Honors and awards",
    href: "/about#recognition",
  },
  {
    value: "May 2029",
    label: "Expected graduation",
    href: "/about#education",
  },
];

/**
 * The four facts under the hero.
 *
 * This band used to carry test counts — 1,286 / 221 / 247 / 150K. They were
 * accurate but they answered a question nobody asks first: a reader arriving
 * on the homepage wants to know who this is and whether the work is real, not
 * how many assertions a suite runs. Each entry here is a credential, a role,
 * or a body of work, and each links to the page that evidences it.
 *
 * `href` is validated by the content checks against the actual route set, so
 * one of these cannot quietly start pointing at a 404.
 */
export const homeHighlights = [
  {
    value: "Schulich Leader",
    label: "$120,000 STEM scholarship, 2025",
    href: "/about#recognition",
  },
  {
    value: "Northstar",
    label: "Software Engineering Intern — Python, PostgreSQL, AWS",
    href: "/experience/northstar-downhole-software-engineering-intern",
  },
  {
    value: "UTEFA",
    label: "Portfolio Manager — portfolio research and risk modeling",
    href: "/experience/utefa-portfolio-manager",
  },
  {
    value: `${ownedPublicRepos.length} public repos`,
    label: "Live demos, releases, and source",
    href: "/projects",
  },
];

export const technicalFocus = [
  {
    title: "Python for applied ML",
    skills: [
      "Python",
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "NumPy",
      "Pandas",
      "Model evaluation",
      "Time-series validation",
    ],
  },
  {
    title: "Backend and cloud platforms",
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "REST APIs",
      "AWS",
      "Terraform",
      "Docker",
      "Django",
    ],
  },
  {
    title: "Quantitative research and risk",
    skills: [
      "VaR",
      "Stress testing",
      "Efficient-frontier optimization",
      "Market regimes",
      "Transaction costs",
      "Portfolio P&L",
    ],
  },
  {
    title: "Systems programming",
    skills: [
      "Rust",
      "Event-driven design",
      "Deterministic replay",
      "Property tests",
      "Golden tests",
      "Reproducible benchmarks",
    ],
  },
];

/**
 * How I work.
 *
 * Each principle names the record that demonstrates it, and links there. A
 * principle without a link is an opinion; with one it is a claim a reader can
 * check in about fifteen seconds.
 */
export const workingPrinciples = [
  {
    title: "Typed contracts over loose model output.",
    evidence:
      "Incident Triage validates structured responses across Next.js and FastAPI before rendering.",
    source: "Incident Triage Copilot",
    href: "/projects/incident-triage-copilot",
  },
  {
    title: "Evaluation gates before model changes ship.",
    evidence:
      "EvalOps checks pass rate, score, estimated cost, and p95 latency across versioned evaluation runs.",
    source: "LLM EvalOps",
    href: "/projects/llm-evalops-platform",
  },
  {
    title: "Temporal safeguards in quantitative research.",
    evidence:
      "Market Risk uses chronological splits, train-only scaling, shifted signals, and future-mutation tests.",
    source: "Market Regime & Risk",
    href: "/projects/market-regime-risk-platform",
  },
  {
    title: "Determinism before optimization.",
    evidence:
      "The Rust engine uses deterministic JSONL replay, golden scenarios, and property tests before comparing benchmarks.",
    source: "Event-Driven Trading Engine",
    href: "/projects/low-latency-trading-engine",
  },
  {
    title: "Explicit privacy and failure boundaries.",
    evidence:
      "FormatClip stores snippets locally and sends selected text only after an explicit Format action.",
    source: "FormatClip",
    href: "/projects/formatclip",
  },
  {
    title: "Metrics keep their methodology.",
    evidence:
      "RF results retain their unseen-signal and approximation qualifiers, and Northstar latency stays scoped to a synthetic workload.",
    source: "RF Signal Classification",
    href: "/projects/rf-signal-classification-research",
  },
];

/**
 * Selected journey.
 *
 * The five roles that carry the technical and finance story, in the order the
 * specification sets — which is by relevance, not strictly by date, so the
 * two overlapping UTEFA roles read as a promotion rather than as a conflict.
 */
const journeyOrder = [
  "northstar-downhole-software-engineering-intern",
  "utefa-portfolio-manager",
  "utmist-flybits-machine-learning-engineer",
  "royal-military-college-machine-learning-researcher",
  "utefa-sales-trading-analyst",
];

export const journey = journeyOrder
  .map((slug) => experience.find((item) => item.slug === slug))
  .filter((item): item is (typeof experience)[number] => Boolean(item))
  .map((item) => ({
    slug: item.slug,
    dates: item.displayDates,
    organization: item.shortOrganization,
    role: item.role,
  }));

export const availability = profile.availability;

export const aboutContact = {
  institution: "University of Toronto",
};

/**
 * Rail entries. Numbered by `anchorSections`, so the order here is the order
 * the bands render in and the two cannot disagree.
 */
export const aboutSections = [
  { id: "overview", label: "Overview" },
  { id: "education", label: "Education" },
  { id: "recognition", label: "Recognition" },
  { id: "focus", label: "Focus" },
  { id: "skills", label: "Skills" },
  { id: "how-i-work", label: "How I Work" },
  { id: "journey", label: "Journey" },
  { id: "volunteering", label: "Volunteering" },
];

export { awards, certifications, education, volunteering };
