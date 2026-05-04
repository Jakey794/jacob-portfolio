export type ExperienceItem = {
  organization: string;
  role: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    organization: "Royal Military College of Canada",
    role: "Machine Learning Researcher",
    dates: "May 2025 - Sept 2025",
    bullets: [
      "Built and trained PyTorch CNNs for RF spectrogram classification using RTL-SDR captures and custom Python scanning pipelines.",
      "Curated large RF dataset and improved generalization on noisy real-world signals.",
      "Designed latency/accuracy CNN variants for embedded RF scanning.",
    ],
  },
  {
    organization: "UTMIST x Flybits",
    role: "Machine Learning Engineer",
    dates: "Sept 2025 - Present",
    bullets: [
      "Building ML-driven personalization system for digital credit offers.",
      "Created synthetic data pipeline for 100K+ customer personas.",
      "Prototyped clustering and autoencoder approaches for customer archetypes and offer evaluation.",
    ],
  },
  {
    organization: "University of Toronto Engineering Finance Association",
    role: "Portfolio Manager / Former Sales & Trading Analyst",
    dates: "Sept 2025 - Present",
    bullets: [
      "Built 22-factor XGBoost return-prediction model for quant trading contest.",
      "Uses VaR, efficient frontier optimization, factor thinking, and macro research for trade proposals.",
      "Applies CAPM, yield curves, bond-pricing concepts, and options fundamentals.",
    ],
  },
];
