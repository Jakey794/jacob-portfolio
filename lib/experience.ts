/**
 * The experience collection: all ten current roles, complete.
 *
 * The index, the filters, the counts, every detail route, the previous/next
 * links and the structured data are derived from this array. There is no
 * hard-coded list of "roles that have a detail page" anywhere in the UI.
 *
 * Two rules do most of the work here:
 *
 * 1. Dates come from the live LinkedIn record, not from the previous version
 *    of this site. UTMIST/Flybits ends Aug 2026; the old file said "Present".
 *    The two overlapping UTEFA roles are both kept, because the overlap is
 *    what the source shows and silently editing either date would be a
 *    fabrication in the opposite direction.
 *
 * 2. An employer summary is bounded by what the public resume and LinkedIn
 *    already say. Northstar's OdooRedo work can be described because those
 *    documents describe it; the repository, its data, its configuration and
 *    its interface stay private, and `confidentialityNote` says so on the
 *    page rather than leaving a reader to assume otherwise.
 *
 * `current: true` means ongoing as of `lastVerified` — not a promise that it
 * stays current, which is why the field exists.
 */

import type {
  ExperienceCategory,
  ExperienceItem,
  FlowNode,
  Metric,
} from "./content-types";
import { experienceCategories } from "./content-types";

export type { ExperienceCategory, ExperienceItem, FlowNode, Metric };
export { experienceCategories };

const VERIFIED = "2026-08-17";

const roles: ExperienceItem[] = [
  // ------------------------------------------------------------------- 01
  {
    slug: "northstar-downhole-software-engineering-intern",
    organization: "Northstar Downhole Specialists",
    shortOrganization: "Northstar",
    role: "Software Engineering Intern",
    dateStart: "2026-06",
    current: true,
    displayDates: "Jun 2026 – Present",
    location: "Calgary, Alberta, Canada",
    categories: ["Software & ML", "Industry"],
    featured: true,
    archive: false,
    sortOrder: 1,

    oneLine:
      "Building secure enterprise backend and applied-ML workflows across OdooRedo, data migration, AWS infrastructure, CI, and end-to-end verification.",
    summary:
      "Enterprise backend development, data integrity, cloud infrastructure, automation, and verification across OdooRedo, an internal operational system.",
    context:
      "The public resume and LinkedIn record describe work across OdooRedo, an enterprise operational system. This page names it and summarizes that approved scope; the code, data, deployment details, and repository are private.",

    responsibilities: [
      "Built and extended backend workflows using Python 3.13, Django 5.2, and PostgreSQL 17.",
      "Worked on controlled Documents and IPR workflows and related RCA/CAPA, approval, notification, external-intake/submission, RBAC, and audit-trail behavior.",
      "Implemented and validated rollback-safe migration and reconciliation paths with explicit data-integrity checks.",
      "Worked with AWS services and Terraform-managed infrastructure spanning ECS, RDS, S3, SES, ALB, and WAF.",
      "Contributed to a nine-job CI workflow and a PostgreSQL-backed automated test suite.",
      "Used end-to-end browser coverage to verify critical user journeys.",
      "Ran a scoped synthetic load exercise with 40 simulated users and 200 requests.",
    ],

    metrics: [
      {
        value: "1,286",
        label: "PostgreSQL-backed tests in CI",
        methodology: "Validation snapshot reported in the current resume.",
        qualifier: "Point-in-time count, not a live counter.",
      },
      {
        value: "13",
        label: "Playwright end-to-end tests",
        methodology: "Validation snapshot reported in the current resume.",
      },
      {
        value: "9",
        label: "CI jobs spanning integration, E2E, typing, containers, security",
        methodology: "Pipeline composition as described in the current resume.",
      },
      {
        value: "≈128 ms",
        label: "p95 response time, 40 simulated users / 200 requests",
        methodology:
          "Scoped synthetic load exercise with zero unexpected errors observed in that specific test.",
        qualifier:
          "Synthetic point-in-time validation for the tested scenario; not a production SLA or a claim about every endpoint.",
      },
    ],

    proofChips: [
      "1,286 PostgreSQL-backed tests",
      "13 Playwright end-to-end tests",
      "9-job CI pipeline",
    ],

    tools: [
      "Python 3.13",
      "Django 5.2",
      "PostgreSQL 17",
      "pytest",
      "Playwright",
      "GitHub Actions",
      "AWS ECS",
      "AWS RDS",
      "Amazon S3",
      "Amazon SES",
      "Application Load Balancer",
      "AWS WAF",
      "Terraform",
      "Docker",
      "Git",
    ],

    workflow: [
      { label: "Intake", title: "Operational requirement" },
      { label: "Backend", title: "Backend workflow + authorization" },
      { label: "Data", title: "Data / migration control" },
      { label: "Infra", title: "Infrastructure-as-code change" },
      { label: "Test", title: "Unit + PostgreSQL validation" },
      { label: "Verify", title: "End-to-end verification" },
      { label: "Release", title: "Controlled release / rollback readiness" },
    ],

    confidentialityNote:
      "This summary is limited to information already present in Jacob's current public resume and LinkedIn profile. The underlying repository, customer data, operational configuration, and internal documentation are not public, and no employer screenshot, hostname, or internal architecture is shown.",

    claimCaveats: [
      "The 40-user, 200-request result is a synthetic validation workload, not production traffic.",
      "No uptime, customer count, compliance, or production-scale claim is made.",
    ],

    thumbnailMedia: {
      wide:
        "/images/experience/northstar-downhole-software-engineering-intern-thumbnail.webp",
      alt: "Conceptual editorial scene of a Northstar-branded service rig in a blue-hour mountain valley.",
      tone: "dark",
      kind: "conceptual",
    },
    detailAtmosphere: "/images/atmosphere/northstar-experience.jpg",
    relatedProjectSlugs: ["llm-evalops-platform", "incident-triage-copilot"],
    seo: {
      title: "Software Engineering Intern at Northstar",
      description:
        "Public-scope summary of Jacob Allan's Python, Django, PostgreSQL, AWS, Terraform, migration, CI, and verification work at Northstar Downhole Specialists.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 02
  {
    slug: "utefa-portfolio-manager",
    legacySlugs: ["uoft-efa-portfolio-manager"],
    organization: "University of Toronto Engineering Finance Association",
    shortOrganization: "UTEFA",
    role: "Portfolio Manager",
    parentRoleGroup: "UTEFA",
    dateStart: "2026-02",
    current: true,
    displayDates: "Feb 2026 – Present",
    workMode: "Remote",
    categories: ["Finance"],
    featured: true,
    archive: false,
    sortOrder: 2,

    oneLine:
      "Leading portfolio research and risk-aware modeling across factor analysis, portfolio construction, stress testing, and transaction-cost-aware evaluation.",
    summary:
      "Leads and reviews quantitative and fundamental research with an emphasis on disciplined portfolio construction, risk, and transparent assumptions.",
    context:
      "UTEFA is a student finance organization. This is student-led investment research and education, not regulated investment management or professional advisory activity.",

    responsibilities: [
      "Lead portfolio research and review across quantitative and fundamental workstreams.",
      "Promoted into this role from Sales & Trading Analyst.",
      "Apply probability, factor analysis, Value at Risk, stress testing, and efficient-frontier concepts to portfolio construction.",
      "Consider portfolio constraints, concentration, correlations, and transaction costs rather than presenting frictionless allocations.",
      "Translate macroeconomic and security-level research into structured portfolio discussions.",
      "Support analyst development and communicate assumptions, risks, and research limitations.",
    ],

    metrics: [],
    proofChips: [
      "Portfolio research leadership",
      "Promoted from Sales & Trading Analyst",
      "VaR, stress testing, efficient frontier",
    ],

    tools: [
      "Python",
      "Pandas",
      "NumPy",
      "Factor modeling",
      "Value at Risk",
      "Stress testing",
      "Efficient-frontier optimization",
      "Transaction costs",
      "Market research",
    ],

    claimCaveats: [
      "Student-led research and education; not investment advice and not a claim of managed client capital.",
      "No return, alpha, benchmark outperformance, assets under management, trade volume, or client outcome is published, because none was verified.",
    ],

    relatedProjectSlugs: ["market-regime-risk-platform", "ml-analysis-tool"],
    seo: {
      title: "UTEFA Portfolio Manager",
      description:
        "Jacob Allan's student-led portfolio research and leadership across factor analysis, portfolio risk, stress testing, optimization, and transaction costs.",
    },
    lastVerified: "2026-08-18",
  },

  // ------------------------------------------------------------------- 03
  {
    slug: "utefa-sales-trading-analyst",
    organization: "University of Toronto Engineering Finance Association",
    shortOrganization: "UTEFA",
    role: "Sales & Trading Analyst",
    parentRoleGroup: "UTEFA",
    dateStart: "2025-09",
    dateEnd: "2026-04",
    current: false,
    displayDates: "Sep 2025 – Apr 2026",
    workMode: "On-site",
    categories: ["Finance"],
    featured: false,
    archive: false,
    sortOrder: 3,

    oneLine:
      "Built a 22-factor XGBoost research model and developed market, fixed-income, options, optimization, and transaction-cost analysis through UTEFA.",
    summary:
      "Combined quantitative modeling with market education, building a 22-factor XGBoost model for a 50-participant competition.",

    responsibilities: [
      "Built a 22-factor XGBoost model for a 50-participant competition using macro, rates, momentum, and volatility features.",
      "Applied feature engineering and model-evaluation concepts to a financial research setting.",
      "Studied and used CAPM, yield curves, bond pricing, and options-pricing concepts.",
      "Explored optimization, transaction-cost analysis, and regime-aware risk.",
      "Communicated market views and model assumptions in a team environment.",
    ],

    metrics: [
      {
        value: "22",
        label: "Modeled factors",
        methodology:
          "Feature count of the competition model as reported in the current resume.",
      },
      {
        value: "50",
        label: "Competition participants",
        methodology: "Competition size as reported in the current resume.",
      },
    ],

    proofChips: ["22-factor XGBoost model", "50-participant competition"],

    tools: [
      "Python",
      "XGBoost",
      "Pandas",
      "NumPy",
      "Feature engineering",
      "Model evaluation",
      "CAPM",
      "Yield curves",
      "Bond pricing",
      "Options pricing",
      "Transaction-cost analysis",
    ],

    claimCaveats: [
      "Student competition and educational research; no claim of live trading, investment advice, or profitable performance.",
      "No competition placement, return, predictive accuracy, alpha, or trading profit is published, because none was verified.",
    ],

    relatedProjectSlugs: ["market-regime-risk-platform", "ml-analysis-tool"],
    seo: {
      title: "UTEFA Sales & Trading Analyst",
      description:
        "Student quantitative-finance work spanning a 22-factor XGBoost model, CAPM, fixed income, options, optimization, and transaction-cost analysis.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 04
  {
    slug: "utmist-flybits-machine-learning-engineer",
    legacySlugs: ["uoft-mist-flybits-ml-engineer"],
    organization:
      "University of Toronto Machine Intelligence Student Team (UTMIST), in collaboration with Flybits",
    shortOrganization: "UTMIST / Flybits",
    role: "Machine Learning Engineer",
    dateStart: "2025-09",
    /* The previous site said "Present". The live LinkedIn record, checked
       2026-08-17, ends this engagement at Aug 2026. */
    dateEnd: "2026-08",
    current: false,
    displayDates: "Sep 2025 – Aug 2026",
    location: "Toronto, Ontario, Canada",
    workMode: "On-site",
    categories: ["Software & ML"],
    featured: true,
    archive: false,
    sortOrder: 4,

    oneLine:
      "Developed privacy-preserving customer archetypes from more than 100,000 synthetic personas for a personalized digital-credit-offer prototype.",
    summary:
      "On a six-person UTMIST team working with Flybits, helped build a privacy-preserving prototype for personalized digital-credit offers.",
    context:
      "A UTMIST student-team collaboration with Flybits. The inputs were synthetic personas, not real bank or customer records, and the work was a prototype rather than a production financial product or deployed credit-decision system.",

    responsibilities: [
      "Processed and analyzed more than 100,000 synthetic customer personas.",
      "Explored clustering and autoencoder approaches for representation and segmentation.",
      "Helped identify more than five interpretable archetypes.",
      "Contributed to a six-person machine-learning engineering team.",
      "Supported the prototype's analysis, evaluation, and communication.",
    ],

    metrics: [
      {
        value: "100,000+",
        label: "Synthetic customer personas processed",
        methodology:
          "Scale of the generated persona dataset as reported in the current resume and LinkedIn record.",
        qualifier: "Synthetic personas — no real bank or customer records.",
      },
      {
        value: "5+",
        label: "Interpretable customer archetypes identified",
        methodology:
          "Archetype count reported for the prototype segmentation work.",
      },
      {
        value: "6",
        label: "Person machine-learning engineering team",
        methodology: "Team size as reported in the current LinkedIn record.",
      },
    ],

    proofChips: [
      "100,000+ synthetic personas",
      "5+ discovered archetypes",
      "6-person team",
    ],

    tools: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Clustering",
      "Autoencoders",
      "Synthetic data",
      "Model evaluation",
    ],

    workflow: [
      { label: "Input", title: "Synthetic persona inputs" },
      { label: "Prepare", title: "Validation + preprocessing" },
      { label: "Represent", title: "Representation learning" },
      { label: "Cluster", title: "Clustering" },
      { label: "Interpret", title: "Archetype interpretation" },
      { label: "Prototype", title: "Prototype offer logic" },
      { label: "Review", title: "Team review" },
    ],

    confidentialityNote:
      "No public repository or live demo exists for this work, and none is linked. Flybits branding and any partner-internal material are deliberately absent.",

    claimCaveats: [
      "Synthetic personas only; no real-customer experimentation.",
      "No claim of production deployment, credit approval, underwriting, fairness, revenue, conversion, or model-lift outcomes.",
    ],

    relatedProjectSlugs: [],
    seo: {
      title: "UTMIST / Flybits Machine Learning Engineer",
      description:
        "Privacy-preserving student-team ML work using 100,000+ synthetic personas, clustering, and autoencoders to explore interpretable customer archetypes.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 05
  {
    slug: "royal-military-college-machine-learning-researcher",
    legacySlugs: ["royal-military-college-ml-researcher"],
    organization: "Royal Military College of Canada",
    shortOrganization: "Royal Military College",
    role: "Machine Learning Researcher",
    dateStart: "2025-05",
    dateEnd: "2025-09",
    current: false,
    displayDates: "May 2025 – Sep 2025",
    location: "Kingston, Ontario, Canada",
    workMode: "On-site",
    categories: ["Software & ML", "Research & Engineering", "Industry"],
    featured: true,
    archive: false,
    sortOrder: 5,

    oneLine:
      "Developed and compared PyTorch CNNs for five-class RF-signal classification on approximately 150,000 samples, including noisy-condition and embedded tests.",
    summary:
      "Developed and evaluated more than five PyTorch CNN architectures for classifying five RF-signal categories from a corpus of approximately 150,000 samples.",
    context:
      "The work emphasized noisy-condition robustness and its connection to an embedded inference pipeline, rather than optimizing a single clean-data score.",

    responsibilities: [
      "Built and compared more than five convolutional neural-network architectures.",
      "Worked with a roughly 150,000-sample, five-class RF dataset.",
      "Used RTL-SDR-oriented signal-processing and ML workflows.",
      "Evaluated held-out and unseen performance and noisy-condition behavior.",
      "Improved noisy-condition accuracy by approximately 10%.",
      "Contributed to an embedded inference workflow operating at roughly 2 Hz.",
    ],

    metrics: [
      {
        value: "≈90%",
        label: "Average accuracy on unseen real-world signals",
        methodology:
          "Research-role result reported in the current Master and MLE/SWE resumes and the LinkedIn record.",
        qualifier: "Approximate; no public dataset supports reproduction.",
      },
      {
        value: "≈10%",
        label: "Improvement in noisy-band generalization",
        methodology:
          "Achieved through data augmentation, learning-rate decay, frequency-offset sampling, and spectrogram normalization.",
        qualifier:
          "The source does not state relative versus percentage-point lift; it is reported as written.",
      },
      {
        value: "150K / 5",
        label: "Sample RF dataset and signal classes",
        methodology: "Dataset scale as reported in the current resume.",
      },
      {
        value: "≈2 Hz",
        label: "Embedded inference cadence",
        methodology:
          "Refresh rate supported by the embedded inference pipeline.",
        qualifier: "An inference cadence, not a latency percentile.",
      },
    ],

    proofChips: [
      "5+ CNN architectures",
      "150,000 samples / 5 classes",
      "≈90% unseen-data accuracy",
    ],

    tools: [
      "Python",
      "PyTorch",
      "CNNs",
      "NumPy",
      "Signal processing",
      "RTL-SDR",
      "Embedded inference",
    ],

    workflow: [
      { label: "Capture", title: "RTL-SDR captures" },
      { label: "Dataset", title: "150K samples, 5 classes" },
      { label: "Prepare", title: "Augmentation + normalization" },
      { label: "Model", title: "5+ PyTorch CNNs" },
      { label: "Evaluate", title: "Unseen + noisy-condition tests" },
      { label: "Deploy", title: "≈2 Hz embedded inference" },
    ],

    confidentialityNote:
      "This page includes only the high-level project scale and approximate outcomes already present in the current public resumes and LinkedIn profile. Code, raw data, signal details, and operational context are not public, and the specific signal classes are not named.",

    claimCaveats: [
      "Every figure keeps its approximation mark, as the source states it.",
      "Not production-deployed; no operational or state-of-the-art claim is made.",
    ],

    relatedProjectSlugs: ["rf-signal-classification-research"],
    seo: {
      title: "Machine Learning Researcher at RMC",
      description:
        "Public-scope PyTorch CNN research on five-class RF signal classification, noisy-condition robustness, and embedded inference.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 06
  {
    slug: "sat-university-admissions-advisor",
    organization: "Self-employed",
    shortOrganization: "Independent",
    role: "SAT & University Admissions Advisor",
    dateStart: "2023-09",
    dateEnd: "2025-07",
    current: false,
    displayDates: "Sep 2023 – Jul 2025",
    location: "Kingston, Ontario, Canada",
    workMode: "Remote",
    categories: ["Teaching & Leadership"],
    featured: false,
    archive: true,
    sortOrder: 6,

    oneLine:
      "Delivered individualized SAT tutoring and created tailored study, interview-preparation, and university-application resources.",
    summary:
      "Delivered individualized tutoring and built practice, study, interview, and application resources around each student's needs.",

    responsibilities: [
      "Delivered individualized SAT tutoring.",
      "Created custom practice and study materials.",
      "Developed interview-preparation resources.",
      "Developed university-application resources.",
      "Adapted explanations, pacing, and preparation plans to individual needs.",
    ],

    metrics: [],
    proofChips: [],

    tools: [
      "Tutoring",
      "Curriculum design",
      "Structured practice",
      "Interview preparation",
      "Application guidance",
    ],

    claimCaveats: [
      "No score increase, admissions result, acceptance rate, student count, or testimonial is published, because none was verified.",
      "No student identity or application material appears anywhere on this site.",
    ],

    relatedProjectSlugs: [],
    seo: {
      title: "SAT & University Admissions Advisor",
      description:
        "Individual SAT tutoring and tailored study, interview-preparation, and university-application resources delivered from 2023 to 2025.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 07
  {
    slug: "bgc-canada-robotics-intern",
    organization: "BGC Canada",
    shortOrganization: "BGC Canada",
    role: "Robotics Intern",
    dateStart: "2023-09",
    dateEnd: "2024-07",
    current: false,
    displayDates: "Sep 2023 – Jul 2024",
    location: "Kingston, Ontario, Canada",
    workMode: "On-site",
    categories: ["Software & ML", "Teaching & Leadership"],
    featured: false,
    archive: true,
    sortOrder: 7,

    oneLine:
      "Supported youth robotics and STEM programming, created more than five coding and simulation guides, and helped deliver technical demonstrations.",
    summary:
      "Supported STEM-lab and robotics curriculum development, mentored youth through coding and simulation activities, and helped prepare technical demonstrations.",

    responsibilities: [
      "Supported STEM-lab and robotics curriculum development.",
      "Mentored youth during coding, robotics, and simulation activities.",
      "Created more than five coding and simulation guides.",
      "Helped prepare and deliver technical demonstrations.",
    ],

    metrics: [
      {
        value: "5+",
        label: "Coding and simulation guides written",
        methodology: "Count as reported in the current LinkedIn record.",
      },
    ],
    proofChips: ["5+ coding and simulation guides"],

    tools: [
      "Robotics",
      "Programming fundamentals",
      "Simulation",
      "Technical documentation",
      "Curriculum support",
    ],

    claimCaveats: [
      "No participant count, competition result, completion rate, or learning-improvement percentage is published.",
      "No minors, participant names, or classroom records appear anywhere on this site.",
    ],

    relatedProjectSlugs: [],
    seo: {
      title: "Robotics Intern at BGC Canada",
      description:
        "Youth robotics and STEM curriculum support, technical demonstrations, mentoring, and more than five coding and simulation guides.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 08
  {
    slug: "city-of-kingston-lifeguard-swim-instructor",
    organization: "City of Kingston",
    shortOrganization: "City of Kingston",
    role: "Lifeguard & Swim Instructor",
    dateStart: "2023-07",
    dateEnd: "2024-07",
    current: false,
    displayDates: "Jul 2023 – Jul 2024",
    location: "Kingston, Ontario, Canada",
    workMode: "On-site",
    categories: ["Teaching & Leadership"],
    featured: false,
    archive: true,
    sortOrder: 8,

    oneLine:
      "Delivered weekly swim instruction while supporting swimmer safety, pool operations, and emergency-response readiness.",
    summary:
      "Planned and delivered weekly lessons, monitored swimmer and facility safety, and supported day-to-day pool operations.",

    responsibilities: [
      "Planned and delivered weekly swim lessons.",
      "Adapted instruction to learners' needs.",
      "Monitored swimmer and facility safety.",
      "Supported pool operations.",
      "Maintained emergency-response readiness.",
    ],

    metrics: [],
    proofChips: [],

    tools: [
      "Instruction",
      "Safety monitoring",
      "Lesson planning",
      "Situational awareness",
      "Emergency-response readiness",
    ],

    claimCaveats: [
      "No rescue count, class size, pass rate, certification, or incident outcome is published.",
    ],

    relatedProjectSlugs: [],
    seo: {
      title: "Lifeguard & Swim Instructor, City of Kingston",
      description:
        "Weekly swim instruction, swimmer and facility safety, pool operations, and emergency-response readiness with the City of Kingston.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 09
  {
    slug: "queens-satellite-program",
    organization: "Queen's Satellite Program",
    shortOrganization: "Queen's Satellite Program",
    /* LinkedIn shows "Queen's Satellite Program" as both title and
       organization. The descriptive subtitle below is added for clarity; no
       officer, engineer, lead, or internship title is invented. */
    role: "Student high-altitude-balloon payload contributor",
    dateStart: "2023-12",
    dateEnd: "2024-04",
    current: false,
    displayDates: "Dec 2023 – Apr 2024",
    location: "Kingston, Ontario, Canada",
    workMode: "On-site",
    categories: ["Research & Engineering"],
    featured: false,
    archive: true,
    sortOrder: 9,

    oneLine:
      "Contributed to a student high-altitude-balloon payload integrating five instruments, data logging, structural work, testing, and assembly.",
    summary:
      "Contributed to a student high-altitude-balloon payload incorporating five instruments for UV, sound, temperature, pressure, and acceleration measurements.",

    responsibilities: [
      "Contributed to a student high-altitude-balloon payload.",
      "Integrated and supported five measurement instruments.",
      "Supported UV, sound, temperature, pressure, and acceleration measurements.",
      "Worked on SSD data logging.",
      "Supported payload structure, testing, and assembly.",
    ],

    metrics: [
      {
        value: "5",
        label: "Integrated measurement instruments",
        methodology: "Instrument count as reported in the LinkedIn record.",
      },
    ],
    proofChips: ["5 integrated instruments"],

    tools: [
      "Sensor integration",
      "Data logging",
      "Payload structure",
      "Assembly",
      "Testing",
    ],

    claimCaveats: [
      "No launch outcome, maximum altitude, mission duration, telemetry result, award, or leadership title is published.",
      "A high-altitude balloon payload, not an orbital spacecraft.",
    ],

    relatedProjectSlugs: [],
    seo: {
      title: "Queen's Satellite Program",
      description:
        "Student high-altitude-balloon payload work spanning five instruments, SSD data logging, structural assembly, and testing.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 10
  {
    slug: "mcdonald-institute-summer-science-student",
    organization:
      "Arthur B. McDonald Canadian Astroparticle Physics Research Institute",
    shortOrganization: "McDonald Institute",
    role: "McDonald Institute Summer Science Student",
    dateStart: "2023-06",
    dateEnd: "2023-09",
    current: false,
    displayDates: "Jun 2023 – Sep 2023",
    location: "Kingston, Ontario, Canada",
    workMode: "On-site",
    categories: ["Research & Engineering"],
    featured: false,
    archive: true,
    sortOrder: 10,

    oneLine:
      "Used Python for galaxy modeling while exploring particle physics, dark matter, optics, chemistry, the brachistochrone problem, and binary circuits.",
    summary:
      "Used Python for galaxy modeling while studying particle physics and dark matter and completing hands-on activities across optics, spectra, chemistry, and digital circuits.",

    responsibilities: [
      "Used Python for galaxy modeling.",
      "Studied particle physics and dark matter.",
      "Completed activities involving Snell's law.",
      "Explored emission spectra and chemistry experiments.",
      "Studied the brachistochrone problem.",
      "Built and explored binary circuits.",
    ],

    metrics: [],
    proofChips: [],

    tools: [
      "Python",
      "Scientific computing",
      "Galaxy modeling",
      "Optics",
      "Binary circuits",
    ],

    claimCaveats: [
      "No publication, research finding, dataset size, mentor, competition result, or university credit is claimed.",
    ],

    relatedProjectSlugs: [],
    seo: {
      title: "McDonald Institute Summer Science Student",
      description:
        "Summer science work using Python for galaxy modeling and exploring particle physics, optics, chemistry, mathematical modeling, and binary circuits.",
    },
    lastVerified: VERIFIED,
  },
];

/** Index order is the single source of truth for card, rail and next/prev. */
export const experience = [...roles].sort((a, b) => a.sortOrder - b.sortOrder);

// ------------------------------------------------------------------ derived

/** Timeline roles: the technical and finance work, in source order. */
export const primaryExperience = experience.filter((item) => !item.archive);

/** Earlier experience. Shown under its own heading — never dropped. */
export const earlierExperience = experience.filter((item) => item.archive);

/** The four roles previewed on the homepage. */
export const featuredExperience = experience.filter((item) => item.featured);

export const experienceSlugs = experience.map((item) => item.slug);

export function getExperienceBySlug(slug: string) {
  return experience.find((item) => item.slug === slug);
}

export function getAdjacentExperience(slug: string) {
  const index = experience.findIndex((item) => item.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: experience[(index - 1 + experience.length) % experience.length],
    next: experience[(index + 1) % experience.length],
  };
}

/** Filter buttons for the index, with counts computed from the records. */
export const experienceFilters = [
  { key: "All", count: experience.length },
  ...experienceCategories.map((category) => ({
    key: category,
    count: experience.filter((item) => item.categories.includes(category))
      .length,
  })),
] as const;

/**
 * Roles grouped by organisation, so a promotion reads as one employer with a
 * history rather than as two unrelated entries side by side.
 */
export function roleHistory(item: ExperienceItem) {
  if (!item.parentRoleGroup) return [];
  return experience.filter(
    (other) =>
      other.parentRoleGroup === item.parentRoleGroup && other.slug !== item.slug
  );
}
