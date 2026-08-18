/**
 * Global identity.
 *
 * Every header, footer, About paragraph, contact action, metadata block and
 * JSON-LD field on the site reads from this file. Nothing here is restated in
 * a component.
 *
 * Deliberately absent, and not to be added: phone number, birthday, street
 * address, citizenship, and any LinkedIn connection or follower count. Those
 * appear in the source evidence but are not published — see `privacyExcluded`
 * at the bottom, which the content checks read.
 */

export const siteUrl = "https://jacob-portfolio-six.vercel.app";

export const profile = {
  displayName: "Jacob Allan",
  pronouns: "He/Him",
  brandTitle: "Software, Machine Learning & Quantitative Systems",

  headline:
    "I build ML and quantitative finance systems.",
  heroSupport:
    "Engineering Science student at the University of Toronto — Machine Intelligence and Mathematics, Schulich Leader Scholar. I write Python for machine learning, portfolio risk, and market research, and build the systems around it.",

  shortBio:
    "Engineering Science student at the University of Toronto specializing in Machine Intelligence and Mathematics, Schulich Leader Scholar, and Software Engineering Intern at Northstar Downhole Specialists. I work primarily in Python — applied ML pipelines, quantitative research tools, and the backend and cloud systems around them — with PyTorch, FastAPI, PostgreSQL, AWS, Terraform, and Rust.",

  longBio: [
    "Python is where most of my work happens: applied machine learning, quantitative research, and the backend systems that make both usable. I am an Engineering Science student at the University of Toronto, specializing in Machine Intelligence and Mathematics, a Schulich Leader Scholar, and a Software Engineering Intern at Northstar Downhole Specialists.",
    "At Northstar I work in Python across the lifecycle of OdooRedo — application development on Django and PostgreSQL, Documents and IPR workflows, role-based access control and audit trails, rollback-safe data migration, automated verification, CI, and AWS infrastructure provisioned with Terraform.",
    "My applied ML work spans PyTorch CNNs for RF-signal classification at the Royal Military College of Canada and synthetic-data, clustering, and autoencoder prototypes with UTMIST and Flybits. My quantitative work covers portfolio-risk modeling, regime detection, stress testing, and an event-driven Rust trading engine.",
    "Publicly, that comes out as an LLM evaluation platform, a live incident-triage demo, a leakage-aware market-regime and portfolio-risk platform in Python, a deterministic Rust matching engine, and the released FormatClip Chrome extension.",
  ],

  publicLocation: "Toronto, Ontario, Canada",
  /**
   * The coordinate readout in the hero and the closing band is a design mark
   * carried over from the original composition. It is labelled with the
   * campus so it cannot be mistaken for a home address.
   */
  coordinates: ["43.6629° N", "79.3957° W"],
  /* Set as separate lines: as one string it wrapped mid-label and left a
     dangling em dash under the coordinates. */
  coordinateLabel: ["University of Toronto", "Toronto, ON"],

  focusAreas: [
    "Applied machine learning in Python",
    "Quantitative research and portfolio risk",
    "Backend and cloud software engineering",
    "Reliable AI systems",
    "Systems programming",
  ],

  targetRoles: [
    "Software engineering",
    "Backend or platform engineering",
    "Machine learning engineering",
    "Applied AI or ML infrastructure",
    "Quantitative development",
    "Quantitative research",
    "Research engineering",
  ],

  availability:
    "Open to software engineering, machine learning engineering, quantitative development and research, and research-engineering opportunities.",

  heroTags: [
    "Machine Learning Engineering",
    "Quantitative Finance",
    "Backend / Platform Engineering",
    "Applied AI",
    "Systems Programming",
  ],

  footerDescriptor:
    "ML systems, backend engineering, and quantitative software.",

  educationSummary:
    "BASc in Engineering Science, University of Toronto — expected May 2029",
} as const;

export const contactLinks = {
  email: "jacob.allan@mail.utoronto.ca",
  emailHref: "mailto:jacob.allan@mail.utoronto.ca",
  /**
   * The current profile. The GitHub profile README still points at the old
   * numeric slug `/in/jacob-allan-256119328/`; that link is stale and must
   * not be copied back here.
   */
  linkedin: "https://www.linkedin.com/in/jacob-allan-ml/",
  github: "https://github.com/Jakey794",
  portfolio: siteUrl,
  resume: "/resume.pdf",
  resumeLabel: "Master Resume",
  resumeDownloadName: "Jacob_Allan_Master_Resume.pdf",
} as const;

export const navItems = [
  { key: "about", label: "About", href: "/about" },
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "experience", label: "Experience", href: "/experience" },
  { key: "contact", label: "Contact", href: "/contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];

export const siteSeo = {
  name: profile.displayName,
  defaultTitle: `${profile.displayName} | ${profile.brandTitle}`,
  titleTemplate: `%s | ${profile.displayName}`,
  description:
    "Engineering Science student at the University of Toronto building machine learning and quantitative finance systems in Python, plus the backend and cloud platforms around them.",
  locale: "en_CA",
  keywords: [
    "Jacob Allan",
    "software engineer",
    "machine learning engineer",
    "quantitative developer",
    "Engineering Science",
    "University of Toronto",
    "Python",
    "Django",
    "PostgreSQL",
    "PyTorch",
    "Rust",
    "AWS",
    "Terraform",
    "reliable AI",
    "EvalOps",
    "portfolio risk",
  ],
  defaultSocialImage: "/images/og/default.jpg",
} as const;

/** Absolute URL for a root-relative path. Used by metadata and JSON-LD. */
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

/**
 * Fields that exist in the source evidence and must never reach rendered
 * HTML, metadata, structured data, image alt text or client-side state. The
 * single deliberate exception is the Master Resume PDF, which Jacob signed off
 * as supplied and which is served byte-for-byte.
 */
export const privacyExcluded = [
  "phone number",
  "birthday",
  "street address",
  "citizenship",
  "LinkedIn connection counts",
  "private repository URLs",
] as const;
