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
      "Built and trained 5+ PyTorch CNNs to classify RF spectrograms from RTL-SDR captures using custom Python data collection and scanning pipelines.",
      "Curated a 150K-sample, 5-class RF dataset and achieved 90% average accuracy on unseen real-world signals.",
      "Improved noisy-band generalization by 10% through augmentation, learning-rate decay, frequency-offset sampling, and spectrogram normalization.",
      "Designed latency-accuracy CNN variants for embedded drone-mounted inference, supporting RF scanning at a 2Hz refresh rate.",
    ],
  },
  {
    organization: "University of Toronto Machine Intelligence Student Team - Flybits Industry Project",
    role: "Machine Learning Engineer",
    dates: "Sept 2025 - Present",
    bullets: [
      "Designing an ML-driven system to personalize digital credit offers using demographic, transactional, and product-level features.",
      "Built a scalable synthetic data pipeline for 100K+ customer personas with realistic population, spending, and credit-product distributions.",
      "Implemented clustering and autoencoder prototypes in Python/PyTorch to create 5+ customer archetypes and evaluate offer quality.",
    ],
  },
  {
    organization: "University of Toronto Engineering Finance Association",
    role: "Portfolio Manager - promoted from Sales & Trading Analyst",
    dates: "Sept 2025 - Present",
    bullets: [
      "Built a 22-factor XGBoost return-prediction model for a 50-participant quant trading contest using macro, technical, momentum, volatility, and rates features.",
      "Use ML, VaR, and efficient frontier optimization for asset allocation, risk management, and trade proposals.",
      "Develop thesis-driven trade proposals combining model outputs, risk constraints, transaction-cost assumptions, and macroeconomic research.",
    ],
  },
];
