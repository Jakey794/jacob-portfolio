export type Project = {
  title: string;
  summary: string;
  tags: string[];
  proof: string[];
  github?: string;
  liveDemo?: string;
  statusLabel?: "Live demo" | "GitHub" | "Research preview";
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

export const featuredProjects: Project[] = [
  {
    title: "Incident Triage Copilot",
    summary:
      "AI incident-response app that turns alerts, logs, deployment notes, service context, and metrics into structured severity, root-cause, next-action, and confidence outputs.",
    tags: [
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
    proof: [
      "Built a typed Next.js + FastAPI triage workflow with structured response contracts.",
      "Supports heuristic fallback plus optional Groq/Gemini LLM-backed triage for reliable demos.",
    ],
    github: "https://github.com/Jakey794/incident-triage-copilot",
    statusLabel: "GitHub",
    image: "/images/incident-triage.png",
    imageAlt:
      "Incident Triage Copilot interface preview with severity and root-cause panels",
  },
  {
    title: "FormatClip",
    summary:
      "Chrome MV3 extension and FastAPI backend for saving snippets, formatting selected text, and reusing cleaned outputs with provider-swappable LLM support.",
    tags: [
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
    proof: [
      "Built privacy-conscious local snippet storage with explicit Format action.",
      "Designed provider-swappable backend with mock fallback for demos and testing.",
    ],
    github: "https://github.com/Jakey794/formatclip",
    statusLabel: "GitHub",
    image: "/images/formatclip.png",
    imageAlt: "FormatClip extension and backend workflow preview",
  },
  {
    title: "Regime Specialist Stock Predictor",
    summary:
      "Regime-aware trading evaluation system using GMM clustering and XGBoost return-prediction models.",
    tags: [
      "Python",
      "XGBoost",
      "GMM",
      "Streamlit",
      "Time-Series Indicators",
      "Quant Modeling",
    ],
    proof: [
      "Engineered 10+ time-series indicators and trained 16 XGBoost return-prediction models.",
      "Achieved 70% directional accuracy and 60% return accuracy on one year of unseen data.",
      "Built Streamlit app for regime classification, model comparison, and trade evaluation.",
    ],
  },
  {
    title: "RF Signal Classification Research",
    summary:
      "PyTorch CNN research project for classifying RF spectrograms captured with RTL-SDR pipelines.",
    tags: [
      "PyTorch",
      "CNNs",
      "RTL-SDR",
      "Spectrograms",
      "Signal Classification",
      "Data Pipelines",
    ],
    proof: [
      "Curated a 150K-sample, 5-class RF spectrogram dataset for real-world signal classification.",
      "Achieved 90% average accuracy on unseen real-world signals.",
      "Improved noisy-band generalization by 10% through augmentation, frequency-offset sampling, and spectrogram normalization.",
    ],
    statusLabel: "Research preview",
  },
];
