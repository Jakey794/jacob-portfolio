/**
 * Experience data.
 *
 * `organization`, `role`, `dates` and `bullets` are the original verified
 * entries. The structured fields added around them are either drawn directly
 * from the bullet text (`tools`, `results`, `workflow`) or left undefined so
 * the pages render an explicit placeholder — never invented.
 *
 * Fields still to be filled in: `location`, `summary`, `context`, `image`,
 * and `team`. Anything left undefined shows a "pending" marker in the UI
 * rather than fabricated copy.
 */

export const experienceCategories = [
  "Industry",
  "Research",
  "Leadership",
  "Quant",
] as const;

export type ExperienceCategory = (typeof experienceCategories)[number];

/** One stage of a workflow diagram. */
export type WorkflowStage = {
  label: string;
  title: string;
  /** Optional sub-items listed inside the stage box. */
  items?: string[];
};

export type ResultTile = {
  value: string;
  label: string;
};

export type ExperienceItem = {
  slug: string;
  organization: string;
  /** Shorter label for compact rows where the full name will not fit. */
  shortName: string;
  role: string;
  dates: string;
  categories: ExperienceCategory[];
  /** Technologies named explicitly in `bullets`. */
  tools: string[];
  bullets: string[];
  /** Figures quoted in `bullets`, surfaced as tiles. */
  results?: ResultTile[];
  /** Pipeline described by `bullets`. */
  workflow?: WorkflowStage[];
  feedbackLabel?: string;
  /** Marks the entry shown in the index hero slot. */
  featured?: boolean;

  // ---- Not yet supplied. Leave undefined to render a pending marker. ----
  location?: string;
  summary?: string;
  context?: string;
  image?: string;
  imageAlt?: string;
  team?: { label: string; items: string[] }[];
};

export const experience: ExperienceItem[] = [
  {
    slug: "royal-military-college-ml-researcher",
    organization: "Royal Military College of Canada",
    shortName: "Royal Military College of Canada",
    role: "Machine Learning Researcher",
    dates: "May 2025 - Sept 2025",
    categories: ["Research"],
    featured: true,
    tools: [
      "Python",
      "PyTorch",
      "CNNs",
      "RTL-SDR",
      "Spectrograms",
      "Embedded Inference",
    ],
    bullets: [
      "Built and trained 5+ PyTorch CNNs to classify RF spectrograms from RTL-SDR captures using custom Python data collection and scanning pipelines.",
      "Curated a 150K-sample, 5-class RF dataset and achieved 90% average accuracy on unseen real-world signals.",
      "Improved noisy-band generalization by 10% through augmentation, learning-rate decay, frequency-offset sampling, and spectrogram normalization.",
      "Designed latency-accuracy CNN variants for embedded drone-mounted inference, supporting RF scanning at a 2Hz refresh rate.",
    ],
    results: [
      { value: "5+", label: "PyTorch CNNs built and trained" },
      { value: "150K", label: "Sample RF dataset, 5 classes" },
      { value: "90%", label: "Average accuracy on unseen signals" },
      { value: "+10%", label: "Noisy-band generalization" },
      { value: "2Hz", label: "Embedded RF scanning refresh rate" },
    ],
    workflow: [
      {
        label: "Capture",
        title: "RTL-SDR",
        items: ["Real-world RF captures"],
      },
      {
        label: "Pipeline",
        title: "Custom Python",
        items: ["Data collection", "Scanning"],
      },
      {
        label: "Dataset",
        title: "RF spectrograms",
        items: ["150K samples", "5 classes", "Normalization"],
      },
      {
        label: "Modeling",
        title: "PyTorch CNNs",
        items: ["Augmentation", "LR decay", "Frequency offset"],
      },
      {
        label: "Deployment",
        title: "Embedded inference",
        items: ["Drone-mounted", "2Hz scanning"],
      },
    ],
    feedbackLabel: "Latency / accuracy variant comparison",
  },
  {
    slug: "uoft-mist-flybits-ml-engineer",
    organization:
      "University of Toronto Machine Intelligence Student Team - Flybits Industry Project",
    shortName: "UofT MIST — Flybits Industry Project",
    role: "Machine Learning Engineer",
    dates: "Sept 2025 - Present",
    categories: ["Industry"],
    tools: [
      "Python",
      "PyTorch",
      "Clustering",
      "Autoencoders",
      "Synthetic Data",
    ],
    bullets: [
      "Designing an ML-driven system to personalize digital credit offers using demographic, transactional, and product-level features.",
      "Built a scalable synthetic data pipeline for 100K+ customer personas with realistic population, spending, and credit-product distributions.",
      "Implemented clustering and autoencoder prototypes in Python/PyTorch to create 5+ customer archetypes and evaluate offer quality.",
    ],
    results: [
      { value: "100K+", label: "Synthetic customer personas generated" },
      { value: "5+", label: "Customer archetypes produced" },
      { value: "3", label: "Feature families: demographic, transactional, product" },
    ],
    workflow: [
      {
        label: "Features",
        title: "Customer signals",
        items: ["Demographic", "Transactional", "Product-level"],
      },
      {
        label: "Data",
        title: "Synthetic pipeline",
        items: ["100K+ personas", "Spending distributions"],
      },
      {
        label: "Modeling",
        title: "Clustering + autoencoders",
        items: ["Python / PyTorch"],
      },
      {
        label: "Segments",
        title: "Customer archetypes",
        items: ["5+ archetypes"],
      },
      {
        label: "Evaluation",
        title: "Offer quality",
        items: ["Personalized credit offers"],
      },
    ],
  },
  {
    slug: "uoft-efa-portfolio-manager",
    organization: "University of Toronto Engineering Finance Association",
    shortName: "UofT Engineering Finance Association",
    role: "Portfolio Manager - promoted from Sales & Trading Analyst",
    dates: "Sept 2025 - Present",
    categories: ["Quant", "Leadership"],
    tools: [
      "XGBoost",
      "VaR",
      "Efficient Frontier",
      "Factor Models",
    ],
    bullets: [
      "Built a 22-factor XGBoost return-prediction model for a 50-participant quant trading contest using macro, technical, momentum, volatility, and rates features.",
      "Use ML, VaR, and efficient frontier optimization for asset allocation, risk management, and trade proposals.",
      "Develop thesis-driven trade proposals combining model outputs, risk constraints, transaction-cost assumptions, and macroeconomic research.",
    ],
    results: [
      { value: "22", label: "Factors in the return-prediction model" },
      { value: "50", label: "Participants in the quant trading contest" },
      { value: "5", label: "Feature groups: macro, technical, momentum, volatility, rates" },
    ],
    workflow: [
      {
        label: "Features",
        title: "Factor set",
        items: ["Macro", "Technical", "Momentum", "Volatility", "Rates"],
      },
      {
        label: "Modeling",
        title: "XGBoost returns",
        items: ["22 factors"],
      },
      {
        label: "Risk",
        title: "VaR + optimization",
        items: ["Efficient frontier", "Asset allocation"],
      },
      {
        label: "Output",
        title: "Trade proposals",
        items: ["Thesis-driven", "Transaction costs"],
      },
    ],
  },
];

const experienceBySlug = new Map(experience.map((item) => [item.slug, item]));

export const featuredExperience =
  experience.find((item) => item.featured) ?? experience[0];

/** Everything except the featured entry, in the order given above. */
export const supportingExperience = experience.filter(
  (item) => item.slug !== featuredExperience.slug
);

export const experienceSlugs = experience.map((item) => item.slug);

export function getExperienceBySlug(slug: string) {
  return experienceBySlug.get(slug);
}

export function getAdjacentExperience(slug: string) {
  const index = experience.findIndex((item) => item.slug === slug);
  if (index === -1) return undefined;
  return experience[(index + 1) % experience.length];
}
