export type Project = {
  slug: string;
  title: string;
  oneLine: string;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  metrics: string[];
  proof: string[];
  technicalDecisions: string[];
  futureImprovements: string[];
  github?: string;
  liveDemo?: string;
  statusLabel?: "Live demo" | "GitHub" | "Research preview" | "Case study";
  image?: string;
  imageAlt?: string;
  featured: boolean;
};

export const allProjects: Project[] = [
  {
    slug: "incident-triage-copilot",
    title: "Incident Triage Copilot",
    oneLine:
      "Full-stack AI incident-response tool with typed triage outputs and reliable fallback behavior.",
    summary:
      "AI incident-response app that turns alerts, logs, deployment notes, service context, and metrics into structured severity, root-cause, next-action, and confidence outputs.",
    problem:
      "Incident responders need fast, consistent triage from messy operational context without relying on unstructured model output.",
    role:
      "Built the full-stack triage workflow across product UI, typed backend contracts, provider-backed AI calls, and fallback behavior.",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Pydantic",
      "Groq",
      "Gemini",
      "Vercel",
      "Cloud Run",
      "pytest",
    ],
    metrics: [],
    proof: [
      "Built a typed Next.js + FastAPI triage workflow with structured response contracts.",
      "Supports heuristic fallback plus optional Groq/Gemini LLM-backed triage for reliable demos.",
    ],
    technicalDecisions: [
      "Used Pydantic response contracts to keep severity, root-cause, next-action, and confidence outputs structured.",
      "Kept a heuristic fallback path so the product remains demoable when provider-backed AI is unavailable.",
    ],
    futureImprovements: [
      "Add deeper incident timelines and service dependency context.",
      "Expand evaluation fixtures for more realistic alert and log combinations.",
    ],
    github: "https://github.com/Jakey794/incident-triage-copilot",
    statusLabel: "GitHub",
    image: "/images/incident-triage.png",
    imageAlt:
      "Incident Triage Copilot interface preview with severity and root-cause panels",
    featured: true,
  },
  {
    slug: "formatclip",
    title: "FormatClip",
    oneLine:
      "Chrome extension and FastAPI backend for formatting saved snippets with provider-swappable LLM support.",
    summary:
      "Chrome MV3 extension and FastAPI backend for saving snippets, formatting selected text, and reusing cleaned outputs with provider-swappable LLM support.",
    problem:
      "People working across web text need a lightweight way to save, clean, and reuse snippets without sending everything through an opaque workflow.",
    role:
      "Built the extension and backend workflow, including local snippet storage, explicit formatting actions, and mock/provider fallback behavior.",
    stack: [
      "Chrome MV3",
      "WXT",
      "React",
      "TypeScript",
      "Tailwind",
      "FastAPI",
      "Python",
      "Pydantic",
      "Groq/OpenAI",
      "Ruff",
      "Biome",
    ],
    metrics: [],
    proof: [
      "Built privacy-conscious local snippet storage with explicit Format action.",
      "Designed provider-swappable backend with mock fallback for demos and testing.",
    ],
    technicalDecisions: [
      "Kept snippet storage local and user-triggered to avoid unnecessary text processing.",
      "Separated provider integration behind a backend path that can fall back to mock responses for tests and demos.",
    ],
    futureImprovements: [
      "Add richer snippet organization and search.",
      "Expand formatting presets for different writing and coding workflows.",
    ],
    github: "https://github.com/Jakey794/formatclip",
    statusLabel: "GitHub",
    image: "/images/formatclip.png",
    imageAlt: "FormatClip extension and backend workflow preview",
    featured: false,
  },
  {
    slug: "rf-signal-classification-research",
    title: "RF Signal Classification Research",
    oneLine:
      "PyTorch CNN research pipeline for classifying real-world RF spectrograms from RTL-SDR captures.",
    summary:
      "PyTorch CNN research project for classifying RF spectrograms captured with RTL-SDR pipelines.",
    problem:
      "Real-world RF signals are noisy and variable, so signal classifiers need datasets and augmentation that reflect imperfect capture conditions.",
    role:
      "Curated the RF spectrogram dataset and built the PyTorch CNN training and evaluation workflow.",
    stack: [
      "PyTorch",
      "CNNs",
      "RTL-SDR",
      "Spectrograms",
      "Signal Classification",
      "Data Pipelines",
    ],
    metrics: [
      "Curated a 150K-sample, 5-class RF spectrogram dataset.",
      "Achieved 90% average accuracy on unseen real-world signals.",
      "Improved noisy-band generalization by 10% through augmentation, frequency-offset sampling, and spectrogram normalization.",
    ],
    proof: [
      "Curated a 150K-sample, 5-class RF spectrogram dataset for real-world signal classification.",
      "Achieved 90% average accuracy on unseen real-world signals.",
      "Improved noisy-band generalization by 10% through augmentation, frequency-offset sampling, and spectrogram normalization.",
    ],
    technicalDecisions: [
      "Used spectrogram-based CNN classification to model RF captures as image-like signal representations.",
      "Applied augmentation, frequency-offset sampling, and normalization to improve noisy-band generalization.",
    ],
    futureImprovements: [
      "Add a publishable architecture diagram and training pipeline breakdown.",
      "Compare model performance across additional RF capture conditions.",
    ],
    statusLabel: "Research preview",
    featured: false,
  },
  {
    slug: "regime-specialist-stock-predictor",
    title: "Regime Specialist Stock Predictor",
    oneLine:
      "Regime-aware stock prediction system using GMM clustering and XGBoost return models.",
    summary:
      "Regime-aware trading evaluation system using GMM clustering and XGBoost return-prediction models.",
    problem:
      "Single-market models can blur behavior across different market regimes, weakening evaluation and trade interpretation.",
    role:
      "Engineered time-series indicators, trained regime-specialist models, and built a Streamlit app for evaluation.",
    stack: [
      "Python",
      "XGBoost",
      "GMM",
      "Streamlit",
      "Time-Series Indicators",
      "Quant Modeling",
    ],
    metrics: [
      "Engineered 10+ time-series indicators.",
      "Trained 16 XGBoost return-prediction models.",
      "Achieved 70% directional accuracy and 60% return accuracy on one year of unseen data.",
    ],
    proof: [
      "Engineered 10+ time-series indicators and trained 16 XGBoost return-prediction models.",
      "Achieved 70% directional accuracy and 60% return accuracy on one year of unseen data.",
      "Built Streamlit app for regime classification, model comparison, and trade evaluation.",
    ],
    technicalDecisions: [
      "Used GMM clustering to separate market regimes before model comparison.",
      "Built Streamlit surfaces for regime classification, model comparison, and trade evaluation.",
    ],
    futureImprovements: [
      "Add clearer walk-forward validation reporting.",
      "Expand risk and portfolio evaluation beyond directional and return accuracy.",
    ],
    featured: false,
  },
];

const projectBySlug = new Map(
  allProjects.map((project) => [project.slug, project])
);

export const featuredProjects = allProjects;

export const featuredProject =
  allProjects.find((project) => project.featured) ?? allProjects[0];

export const caseStudyProjects = [
  "formatclip",
  "rf-signal-classification-research",
  "regime-specialist-stock-predictor",
]
  .map((slug) => projectBySlug.get(slug))
  .filter((project): project is Project => Boolean(project));

export function getProjectBySlug(slug: string) {
  return projectBySlug.get(slug);
}
