/**
 * Content integrity checks.
 *
 * These are pure functions over the content collections. `npm run
 * check:content` runs them and fails the build when one trips, which is the
 * point: the failures listed here are the ones that are invisible in review
 * and expensive in public — a card that links to a 404, a filter with no
 * members, a metric with no method beside it, a live-demo button pointing at
 * nothing, or a claim the sources were audited and found not to support.
 *
 * Nothing here reaches for the filesystem or the network, so the same module
 * can run under Node and be imported by a page if that is ever useful. The
 * media-file existence check takes the manifest the media build writes.
 */

import { homeHighlights, independentInvestingNote } from "./about";
import { awards } from "./awards";
import { certifications } from "./certifications";
import type { Metric, Project } from "./content-types";
import { education } from "./education";
import { experience, experienceFilters } from "./experience";
import { allProjects, projectFilters } from "./projects";
import { allSkills } from "./skills";
import { contactLinks, privacyExcluded, profile } from "./site";
import { volunteering } from "./volunteering";

export type Issue = { check: string; detail: string };

/**
 * Claims the source audit found unsupported, plus identifiers that must not
 * be published. Matched case-insensitively against the rendered content.
 *
 * `XGBoost` on its own is legitimate — it is a real part of the UTEFA work
 * and of the skills inventory. Only the specific stale combinations are
 * banned, which is why these are phrases rather than words.
 */
const FORBIDDEN = [
  { pattern: /16\s+xgboost/i, why: "unsupported legacy model count" },
  { pattern: /70%\s*directional/i, why: "unsupported legacy accuracy claim" },
  { pattern: /60%\s*return/i, why: "unsupported legacy return claim" },
  { pattern: /one year of unseen data/i, why: "unsupported legacy claim" },
  {
    pattern: /regime specialist stock predictor/i,
    why: "retired project title",
  },
  { pattern: /jacob-allan-256119328/i, why: "stale LinkedIn slug" },
  { pattern: /bayview glen/i, why: "superseded organisation name" },
  {
    pattern: /production multi-tenant saas/i,
    why: "unsupported EvalOps claim",
  },
  {
    pattern: /chrome web store/i,
    why: "no verified FormatClip store listing",
  },
  { pattern: /exchange-grade/i, why: "unsupported trading-engine claim" },
  { pattern: /\bcoming soon\b/i, why: "placeholder copy" },
  { pattern: /\bpending\b/i, why: "placeholder copy" },
  { pattern: /\bTODO\b/, why: "placeholder copy" },
  { pattern: /lorem ipsum/i, why: "placeholder copy" },
  { pattern: /613[-\s.]?532[-\s.]?2831/, why: "phone number" },
  {
    pattern: /US\/Canadian Citizen/i,
    why: "citizenship, which is resume-only",
  },
];

/**
 * Every affirmative string a project record renders.
 *
 * `limitations` is deliberately excluded. That field exists to state what the
 * project is not — "no verified Chrome Web Store listing", "not an
 * exchange-grade claim" — and scanning it for banned phrases flags the
 * disclaimer instead of the claim it disclaims.
 */
function projectText(project: Project): string {
  return [
    project.title,
    project.shortTitle,
    project.eyebrow,
    project.attribution ?? "",
    project.statusLabel,
    project.oneLine,
    project.summary,
    project.problem,
    project.role,
    project.outcome,
    project.securityAndPrivacy ?? "",
    ...project.whatBuilt,
    ...project.technicalDecisions,
    ...project.proof,
    ...project.testingAndValidation,
    ...project.displayTags,
    ...project.stack,
    ...project.architecture.flatMap((node) => [
      node.label,
      node.title,
      node.body ?? "",
    ]),
    ...project.metrics.flatMap((m) => [
      m.value,
      m.label,
      m.methodology,
      m.qualifier ?? "",
    ]),
    ...project.links.flatMap((l) => [l.label, l.href, l.note ?? ""]),
    project.thumbnailMedia?.alt ?? "",
    project.media?.alt ?? "",
    project.media?.caption ?? "",
    project.seo.title,
    project.seo.description,
  ].join("\n");
}

/** As `projectText`: `claimCaveats` is excluded for the same reason. */
function experienceText(item: (typeof experience)[number]): string {
  return [
    item.organization,
    item.shortOrganization,
    item.role,
    item.displayDates,
    item.oneLine,
    item.summary,
    item.context ?? "",
    ...item.responsibilities,
    ...item.proofChips,
    ...item.tools,
    ...(item.workflow ?? []).flatMap((n) => [n.label, n.title, n.body ?? ""]),
    ...item.metrics.flatMap((m) => [
      m.value,
      m.label,
      m.methodology,
      m.qualifier ?? "",
    ]),
    item.thumbnailMedia?.alt ?? "",
    item.media?.alt ?? "",
    item.media?.caption ?? "",
    item.seo.title,
    item.seo.description,
  ].join("\n");
}

function metricIssues(scope: string, metrics: Metric[]): Issue[] {
  return metrics.flatMap((metric) =>
    metric.methodology.trim().length < 12
      ? [
          {
            check: "metric-methodology",
            detail: `${scope}: metric "${metric.label}" has no usable methodology. A figure without its method is a claim.`,
          },
        ]
      : []
  );
}

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated];
}

/**
 * @param mediaManifest Paths written by `scripts/build-media.mjs`. When
 *   supplied, every `media` reference is checked against it so a record
 *   cannot point at a derivative that was never generated.
 */
export function checkContent(mediaManifest?: string[]): Issue[] {
  const issues: Issue[] = [];
  const add = (check: string, detail: string) => issues.push({ check, detail });

  // ------------------------------------------------------------ identity
  if (contactLinks.linkedin !== "https://www.linkedin.com/in/jacob-allan-ml/") {
    add("canonical-linkedin", "LinkedIn URL is not the current profile.");
  }
  if (contactLinks.email !== "jacob.allan@mail.utoronto.ca") {
    add("canonical-email", "Portfolio email is not the canonical UofT address.");
  }
  if ((privacyExcluded as readonly string[]).length === 0) {
    add("privacy-list", "The privacy exclusion list must not be emptied.");
  }

  // ------------------------------------------------------------ projects
  const projectSlugs = allProjects.map((p) => p.slug);
  for (const slug of duplicates(projectSlugs)) {
    add("duplicate-slug", `Project slug "${slug}" is used more than once.`);
  }
  for (const slug of duplicates(allProjects.flatMap((p) => p.legacySlugs ?? []))) {
    add("duplicate-legacy-slug", `Legacy project slug "${slug}" is reused.`);
  }
  for (const legacy of allProjects.flatMap((p) => p.legacySlugs ?? [])) {
    if (projectSlugs.includes(legacy)) {
      add(
        "legacy-slug-collision",
        `"${legacy}" is both a live slug and a legacy redirect source.`
      );
    }
  }

  for (const project of allProjects) {
    const scope = `project ${project.slug}`;

    if (project.displayTags.length < 3 || project.displayTags.length > 5) {
      add("display-tags", `${scope}: expected 3–5 display tags.`);
    }
    for (const tag of project.displayTags) {
      if (!project.stack.includes(tag)) {
        add(
          "tag-not-in-stack",
          `${scope}: display tag "${tag}" is not in the declared stack.`
        );
      }
    }
    if (project.categories.length === 0) {
      add("no-category", `${scope}: has no filter category.`);
    }
    if (project.proof.length === 0) {
      add("no-proof", `${scope}: has no proof line for its card.`);
    }
    if (project.limitations.length === 0) {
      add("no-limitations", `${scope}: publishes no limitations.`);
    }
    issues.push(...metricIssues(scope, project.metrics));

    for (const link of project.links) {
      if (!/^https:\/\//.test(link.href)) {
        add("insecure-link", `${scope}: "${link.href}" is not HTTPS.`);
      }
      if (/\/odooredo|northstar.*\/(repo|git)/i.test(link.href)) {
        add("private-repo-link", `${scope}: links a private repository.`);
      }
    }
    /* A "live demo" action is a promise that something opens. */
    const live = project.links.filter((l) => l.kind === "live");
    if (live.length > 1) {
      add("multiple-live", `${scope}: more than one live-demo action.`);
    }

    if (project.ownership === "collaborative") {
      if (!project.attribution) {
        add(
          "unattributed-collaboration",
          `${scope}: collaborative work must carry an attribution line.`
        );
      } else if (!/contribut/i.test(project.attribution)) {
        add(
          "unattributed-collaboration",
          `${scope}: attribution must state the contribution, not just name the repository.`
        );
      }
    }
    if (
      project.ownership !== "owned" &&
      /\b(founded|owner of|sole developer of|created and owns)\b/i.test(
        `${project.role} ${project.summary}`
      )
    ) {
      add(
        "overstated-ownership",
        `${scope}: non-owned work claims ownership.`
      );
    }

    if (project.media) {
      if (!project.media.alt.trim()) {
        add("empty-alt", `${scope}: informative media has empty alt text.`);
      }
      if (!project.media.caption.trim()) {
        add("no-caption", `${scope}: media has no caption.`);
      }
      if (mediaManifest) {
        for (const file of [
          project.media.wide,
          project.media.detail,
          project.media.social,
        ]) {
          if (file && !mediaManifest.includes(file)) {
            add("missing-media", `${scope}: "${file}" was never generated.`);
          }
        }
      }
    }
    if (project.thumbnailMedia) {
      if (!project.thumbnailMedia.alt.trim()) {
        add("empty-alt", `${scope}: thumbnail media has empty alt text.`);
      }
      if (mediaManifest) {
        for (const file of [
          project.thumbnailMedia.wide,
          project.thumbnailMedia.detail,
        ]) {
          if (file && !mediaManifest.includes(file)) {
            add("missing-media", `${scope}: "${file}" was never generated.`);
          }
        }
      }
    }

    for (const related of project.relatedExperienceSlugs) {
      if (!experience.some((item) => item.slug === related)) {
        add(
          "dangling-relation",
          `${scope}: related experience "${related}" does not exist.`
        );
      }
    }

    if (!project.seo.title || !project.seo.description) {
      add("missing-seo", `${scope}: incomplete SEO record.`);
    }
    /*
      The social card the detail route actually points at — the record's own
      when it has media, otherwise the generated fallback named for the slug.
      Checked because a missing OG image fails silently: the page still
      renders, and only the link preview is broken.
    */
    if (mediaManifest) {
      const social =
        project.media?.social ?? `/images/og/${project.slug}.jpg`;
      if (!mediaManifest.includes(social)) {
        add(
          "missing-social-card",
          `${scope}: Open Graph image "${social}" does not exist. Run \`npm run media\`.`
        );
      }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(project.lastVerified)) {
      add("no-verification-date", `${scope}: lastVerified is not a date.`);
    }
  }

  // ---------------------------------------------------------- experience
  const experienceSlugList = experience.map((item) => item.slug);
  for (const slug of duplicates(experienceSlugList)) {
    add("duplicate-slug", `Experience slug "${slug}" is used more than once.`);
  }
  for (const legacy of experience.flatMap((e) => e.legacySlugs ?? [])) {
    if (experienceSlugList.includes(legacy)) {
      add(
        "legacy-slug-collision",
        `"${legacy}" is both a live slug and a legacy redirect source.`
      );
    }
  }

  for (const item of experience) {
    const scope = `experience ${item.slug}`;

    if (item.categories.length === 0) {
      add("no-category", `${scope}: has no filter category.`);
    }
    if (item.responsibilities.length === 0) {
      add("no-responsibilities", `${scope}: has no contribution bullets.`);
    }
    if (item.tools.length === 0) {
      add("no-tools", `${scope}: lists no tools.`);
    }
    if (item.proofChips.length > 3) {
      add("too-many-chips", `${scope}: more than three evidence chips.`);
    }
    issues.push(...metricIssues(scope, item.metrics));

    /* A "Present" label with no verification date silently ages into a lie. */
    if (item.current && !/^\d{4}-\d{2}-\d{2}$/.test(item.lastVerified)) {
      add(
        "unverified-present",
        `${scope}: marked current but carries no lastVerified date.`
      );
    }
    if (item.current && item.dateEnd) {
      add("current-with-end", `${scope}: marked current but has an end date.`);
    }
    if (!item.current && !item.dateEnd) {
      add("missing-end", `${scope}: not current but has no end date.`);
    }

    for (const related of item.relatedProjectSlugs) {
      if (!allProjects.some((p) => p.slug === related)) {
        add(
          "dangling-relation",
          `${scope}: related project "${related}" does not exist.`
        );
      }
    }
    if (!item.seo.title || !item.seo.description) {
      add("missing-seo", `${scope}: incomplete SEO record.`);
    }
    if (item.media) {
      if (!item.media.alt.trim()) {
        add("empty-alt", `${scope}: informative media has empty alt text.`);
      }
      if (!item.media.caption.trim()) {
        add("no-caption", `${scope}: media has no caption.`);
      }
      if (mediaManifest) {
        for (const file of [
          item.media.wide,
          item.media.detail,
          item.media.social,
        ]) {
          if (file && !mediaManifest.includes(file)) {
            add("missing-media", `${scope}: "${file}" was never generated.`);
          }
        }
      }
    }
    if (item.thumbnailMedia) {
      if (!item.thumbnailMedia.alt.trim()) {
        add("empty-alt", `${scope}: thumbnail media has empty alt text.`);
      }
      if (mediaManifest) {
        for (const file of [
          item.thumbnailMedia.wide,
          item.thumbnailMedia.detail,
        ]) {
          if (file && !mediaManifest.includes(file)) {
            add("missing-media", `${scope}: "${file}" was never generated.`);
          }
        }
      }
    }
    if (
      item.detailAtmosphere &&
      mediaManifest &&
      !mediaManifest.includes(item.detailAtmosphere)
    ) {
      add(
        "missing-media",
        `${scope}: atmosphere "${item.detailAtmosphere}" was never generated.`
      );
    }
  }

  /* Keep the university role useful while preserving its explicit student
     research boundary. Copy from independent activities must never drift into
     this organisation's record. */
  const utefaManager = experience.find(
    (item) => item.slug === "utefa-portfolio-manager"
  );
  const leadershipSentence =
    "Lead portfolio research and review across quantitative and fundamental workstreams.";
  if (!utefaManager?.responsibilities.includes(leadershipSentence)) {
    add(
      "utefa-research-leadership",
      "UTEFA Portfolio Manager is missing the verified quantitative and fundamental research-leadership responsibility."
    );
  }
  const utefaBoundary = [
    utefaManager?.context ?? "",
    ...(utefaManager?.claimCaveats ?? []),
  ].join(" ");
  if (
    !/student finance organization/i.test(utefaBoundary) ||
    !/not investment advice/i.test(utefaBoundary)
  ) {
    add(
      "utefa-research-boundary",
      "UTEFA Portfolio Manager must retain its student-organization and not-investment-advice boundaries."
    );
  }
  const utefaResponsibilities =
    utefaManager?.responsibilities.join(" ") ?? "";
  const utefaRenderedText = [
    utefaManager?.oneLine ?? "",
    utefaManager?.summary ?? "",
    utefaManager?.context ?? "",
    utefaResponsibilities,
    ...(utefaManager?.proofChips ?? []),
    ...(utefaManager?.claimCaveats ?? []),
    ...(utefaManager?.metrics.flatMap((metric) => [
      metric.value,
      metric.label,
      metric.methodology,
      metric.qualifier ?? "",
    ]) ?? []),
    utefaManager?.seo.title ?? "",
    utefaManager?.seo.description ?? "",
    ...homeHighlights
      .filter((item) => item.href === "/experience/utefa-portfolio-manager")
      .flatMap((item) => [item.value, item.label]),
  ].join(" ");
  if (
    /20\+|20[- ]plus|investing group|member student group|group chat/i.test(
      utefaRenderedText
    )
  ) {
    add(
      "utefa-independent-group-misattribution",
      "The university portfolio role contains copy reserved for an independent activity."
    );
  }
  if (
    /\btrade alerts?\b/i.test(utefaResponsibilities) ||
    /\b(?:give|gives|giving|provide|provides|providing)\s+investment advice\b/i.test(
      utefaResponsibilities
    )
  ) {
    add(
      "utefa-advisory-claim",
      "UTEFA responsibilities must not claim professional investment advice or trade alerts."
    );
  }

  const independentInvestingText = [
    independentInvestingNote.title,
    independentInvestingNote.body,
    independentInvestingNote.performance,
    independentInvestingNote.qualifier,
  ].join(" ");
  if (
    /UTEFA/i.test(independentInvestingText) ||
    !/outside my university roles/i.test(independentInvestingText) ||
    !/20\+ members/i.test(independentInvestingText) ||
    !/personal portfolio was up approximately 25% year to date as of August 18, 2026/i.test(
      independentInvestingText
    ) ||
    !/self-reported and unaudited personal result/i.test(
      independentInvestingText
    ) ||
    !/not group performance/i.test(independentInvestingText) ||
    !/not personalized investment advice/i.test(independentInvestingText) ||
    !/not .*managed client capital/i.test(independentInvestingText)
  ) {
    add(
      "independent-investing-boundaries",
      "The independent investing note must remain separate from UTEFA and retain its personal-performance, non-advisory, and no-client-capital qualifiers."
    );
  }

  // ---------------------------------------------------- homepage highlights
  /*
    The four links under the hero. Checked against the real route set, because
    these are the first things a reader clicks and a stale slug here is a 404
    on the most-trafficked path through the site.
  */
  const staticRoutes = new Set(["/", "/about", "/projects", "/experience", "/contact"]);
  for (const item of homeHighlights) {
    const [path] = item.href.split("#");
    const known =
      staticRoutes.has(path) ||
      allProjects.some((p) => `/projects/${p.slug}` === path) ||
      experience.some((e) => `/experience/${e.slug}` === path);
    if (!known) {
      add(
        "broken-highlight",
        `Homepage highlight "${item.value}" points at "${item.href}", which is not a route.`
      );
    }
  }
  if (homeHighlights.length !== 4) {
    add(
      "highlight-count",
      `The homepage highlight band is a four-column grid; found ${homeHighlights.length} entries.`
    );
  }

  // ------------------------------------------------------------- filters
  /*
    The exact membership each filter must return. Pinned rather than merely
    non-empty: a filter that quietly gains or loses a record still "works",
    and the drift is only visible to someone who counts the cards.
  */
  const EXPECTED_PROJECT_FILTERS: Record<string, number> = {
    All: 7,
    ML: 5,
    Software: 4,
    Quant: 3,
    Research: 3,
    Systems: 1,
  };
  const EXPECTED_EXPERIENCE_FILTERS: Record<string, number> = {
    All: 10,
    "Software & ML": 4,
    Finance: 2,
    "Research & Engineering": 3,
    "Teaching & Leadership": 3,
    Industry: 2,
  };

  for (const filter of projectFilters) {
    const want = EXPECTED_PROJECT_FILTERS[filter.key];
    if (want !== undefined && filter.count !== want) {
      add(
        "filter-membership",
        `Project filter "${filter.key}" returns ${filter.count} records; the specification fixes it at ${want}.`
      );
    }
  }
  for (const filter of experienceFilters) {
    const want = EXPECTED_EXPERIENCE_FILTERS[filter.key];
    if (want !== undefined && filter.count !== want) {
      add(
        "filter-membership",
        `Experience filter "${filter.key}" returns ${filter.count} records; the specification fixes it at ${want}.`
      );
    }
  }

  for (const filter of projectFilters) {
    if (filter.count === 0) {
      add("empty-filter", `Project filter "${filter.key}" has no members.`);
    }
  }
  for (const filter of experienceFilters) {
    if (filter.count === 0) {
      add("empty-filter", `Experience filter "${filter.key}" has no members.`);
    }
  }

  // -------------------------------------------------------------- counts
  const expected: [string, number, number][] = [
    ["projects", allProjects.length, 7],
    ["experience", experience.length, 10],
    ["education", education.length, 2],
    ["awards", awards.length, 3],
    ["certifications", certifications.length, 1],
    ["volunteering", volunteering.length, 2],
  ];
  for (const [name, actual, want] of expected) {
    if (actual !== want) {
      add(
        "record-count",
        `Expected ${want} ${name} records, found ${actual}. Update this check deliberately if the change is intended.`
      );
    }
  }

  // ------------------------------------------------------------- skills
  const skillSet = new Set(allSkills.map((s) => s.toLowerCase()));
  for (const project of allProjects) {
    for (const tag of project.displayTags) {
      /* Product and pattern names legitimately sit outside the personal
         skills inventory; only tooling is expected to appear in both. */
      const tooling = /^(python|rust|typescript|react|next\.js|fastapi|django|postgresql|streamlit|criterion|pytorch)$/i;
      if (tooling.test(tag) && !skillSet.has(tag.toLowerCase())) {
        add(
          "tag-not-in-skills",
          `project ${project.slug}: "${tag}" is shown as a tag but is missing from the skills inventory.`
        );
      }
    }
  }

  // ------------------------------------------------------ forbidden copy
  const corpus = [
    profile.headline,
    profile.shortBio,
    ...profile.longBio,
    independentInvestingText,
    ...allProjects.map(projectText),
    ...experience.map(experienceText),
    ...awards.map((a) => `${a.title} ${a.summary}`),
    ...certifications.map((c) => `${c.name} ${c.description}`),
    ...volunteering.map((v) => `${v.summary} ${v.contributions.join(" ")}`),
    ...education.map((e) => `${e.summary} ${(e.distinctions ?? []).join(" ")}`),
  ].join("\n");

  for (const { pattern, why } of FORBIDDEN) {
    const match = corpus.match(pattern);
    if (match) {
      add(
        "forbidden-copy",
        `Found "${match[0]}" in rendered content — ${why}.`
      );
    }
  }

  /* The degree is in progress; wording that reads as completed is a factual
     error about a real person's credentials. */
  const uoft = education[0];
  if (/graduated|completed|earned/i.test(uoft.summary)) {
    add(
      "degree-completed",
      "The University of Toronto record reads as a completed degree."
    );
  }

  return issues;
}
