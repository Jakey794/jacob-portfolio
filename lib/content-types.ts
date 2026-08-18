/**
 * Shared shapes for every content record on the site.
 *
 * There is one collection per entity and one record per fact. Projects,
 * experience, education, awards, certifications and volunteering all live in
 * their own module and are the only source the pages read from — routes,
 * filters, counts, metadata, structured data and previous/next navigation are
 * all derived, never restated. A record that cannot be rendered is a type
 * error or a `npm run check:content` failure, not a 404 discovered later.
 *
 * Imports between the content modules are relative rather than aliased so the
 * same files can be compiled and run outside Next by the content checks.
 */

// ---------------------------------------------------------------- evidence

/**
 * A measurement, carried with the context that makes it true.
 *
 * `methodology` is not optional by accident. Every figure on this site came
 * from a specific run on a specific day under specific conditions, and a
 * number shown without those is a claim rather than evidence — "128 ms p95"
 * and "128 ms p95 in a 40-user synthetic load exercise" are different
 * statements. The UI is built so the qualifier cannot be dropped in layout.
 */
export type Metric = {
  value: string;
  label: string;
  /** How the figure was produced, and its scope. */
  methodology: string;
  /** Point in time the figure was observed. */
  date?: string;
  /** Extra warning rendered beside the figure, e.g. "not a production SLA". */
  qualifier?: string;
};

/** An outbound action on a card or detail page. */
export type ResourceLink = {
  kind: "source" | "live" | "release" | "docs";
  label: string;
  href: string;
  /** Rendered under the action, e.g. a cold-start warning. */
  note?: string;
};

/** One stage of a left-to-right pipeline diagram. */
export type FlowNode = {
  label: string;
  title: string;
  body?: string;
  items?: string[];
};

/**
 * A published visual used by a record.
 *
 * `tone` drives grading. The site is near-black, so a light-mode capture has
 * to be pulled down to sit in the page and a dark-mode capture has to be left
 * alone — applying the light-capture grade to a dark dashboard renders it as a
 * black rectangle.
 *
 * `kind` is not decorative. A screenshot is evidence of the product; a diagram
 * is an explanation drawn by this site; conceptual art is neither and must be
 * labelled on the page so it is never read as a result.
 */
export type VisualMedia = {
  /** 16:10 card derivative under a record-specific `public/images/` folder. */
  wide: string;
  /** Zoomed crop for small slots. Falls back to `wide`. */
  detail?: string;
  alt: string;
  tone: "light" | "dark";
  kind: "screenshot" | "diagram" | "conceptual";
};

/**
 * Full record media may appear in a detail-page masthead and therefore carries
 * a caption and social derivative. Card-only artwork intentionally uses the
 * smaller `VisualMedia` shape so it cannot silently replace a case study's
 * architecture or workflow.
 */
export type Media = VisualMedia & {
  /** Exactly 1200x630, under `public/images/og/`. */
  social: string;
  caption: string;
};

export type Seo = {
  title: string;
  description: string;
};

// ---------------------------------------------------------------- projects

export const projectCategories = [
  "ML",
  "Software",
  "Quant",
  "Research",
  "Systems",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/**
 * Who made the thing. Drives the eyebrow on every card, because "owned",
 * "contributed to" and "done inside a research role" are the difference
 * between an honest portfolio and an overstated one.
 */
export type Ownership = "owned" | "collaborative" | "research";

export type Project = {
  slug: string;
  /** Retired paths that must keep resolving. Used to build the redirects. */
  legacySlugs?: string[];
  title: string;
  shortTitle: string;
  eyebrow: string;
  ownership: Ownership;
  /** Credit line shown wherever the record is not solely Jacob's work. */
  attribution?: string;
  displayDate: string;
  /** ISO `YYYY-MM`, for sorting and machine-readable dates. */
  dateStart: string;
  dateEnd?: string;
  statusLabel: string;
  featured: boolean;
  /** Renders under "Collaborative / Archive" rather than in the main set. */
  archive: boolean;
  sortOrder: number;
  categories: ProjectCategory[];
  /** Chips on cards. Every one must also appear in `stack`. */
  displayTags: string[];
  stack: string[];

  oneLine: string;
  summary: string;
  problem: string;
  role: string;
  whatBuilt: string[];
  architecture: FlowNode[];
  technicalDecisions: string[];
  /** Short evidence lines. Rendered on cards and in the evidence panel. */
  proof: string[];
  testingAndValidation: string[];
  metrics: Metric[];
  limitations: string[];
  /** Closing statement of what the work actually produced. */
  outcome: string;
  /** Privacy or data-handling boundary, where the record has one. */
  securityAndPrivacy?: string;

  links: ResourceLink[];
  /** Card/index artwork only; detail routes keep the architecture masthead. */
  thumbnailMedia?: VisualMedia;
  media?: Media;
  relatedExperienceSlugs: string[];
  seo: Seo;
  /** Last time the live destinations and figures were confirmed. */
  lastVerified: string;
};

// -------------------------------------------------------------- experience

export const experienceCategories = [
  "Software & ML",
  "Finance",
  "Research & Engineering",
  "Teaching & Leadership",
  "Industry",
] as const;

export type ExperienceCategory = (typeof experienceCategories)[number];

export type ExperienceItem = {
  slug: string;
  legacySlugs?: string[];
  organization: string;
  /** Shorter label for compact rows where the full name will not fit. */
  shortOrganization: string;
  role: string;
  /** Set where the role is a promotion within one organisation. */
  parentRoleGroup?: string;
  /** ISO `YYYY-MM`. */
  dateStart: string;
  /** Undefined means ongoing as of `lastVerified`. */
  dateEnd?: string;
  displayDates: string;
  current: boolean;
  location?: string;
  workMode?: "On-site" | "Remote" | "Hybrid";
  categories: ExperienceCategory[];
  featured: boolean;
  /** Renders under "Earlier experience" rather than in the main timeline. */
  archive: boolean;
  sortOrder: number;

  oneLine: string;
  summary: string;
  context?: string;
  responsibilities: string[];
  metrics: Metric[];
  /** Up to three short evidence chips for the index card. */
  proofChips: string[];
  tools: string[];
  workflow?: FlowNode[];
  /** What this page deliberately does not disclose, and why. */
  confidentialityNote?: string;
  /** Framing a reader needs so a figure is not over-read. */
  claimCaveats: string[];
  relatedProjectSlugs: string[];
  /** Card/index artwork only; detail routes keep the workflow masthead. */
  thumbnailMedia?: VisualMedia;
  media?: Media;
  /** Optional record-specific backdrop for the detail route. */
  detailAtmosphere?: string;
  seo: Seo;
  lastVerified: string;
};

// ------------------------------------------------- education and recognition

export type EducationRecord = {
  slug: string;
  institution: string;
  credential: string;
  field?: string;
  displayDates: string;
  dateStart: string;
  dateEnd?: string;
  current: boolean;
  location?: string;
  summary: string;
  concentrations?: string[];
  /** Rendered with `gpaQualifier`; never converted to a rank or percentage. */
  gpa?: string;
  gpaQualifier?: string;
  honour?: string;
  coursework?: string[];
  distinctions?: string[];
};

export type Award = {
  id: string;
  title: string;
  issuer?: string;
  displayDate: string;
  date: string;
  /** Shown as supplied, without a currency code or a rank. */
  amount?: string;
  summary: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  displayDate: string;
  date: string;
  description: string;
  skills: string[];
  /** Only ever a stable public page that clearly corresponds to the record. */
  credentialUrl?: string;
};

export type VolunteerRole = {
  id: string;
  organization: string;
  role: string;
  displayDates: string;
  dateStart: string;
  dateEnd?: string;
  location?: string;
  summary: string;
  contributions: string[];
};

export type SkillGroup = {
  category: string;
  skills: string[];
};
