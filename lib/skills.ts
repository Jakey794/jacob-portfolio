export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "Java", "C/C++", "SQL", "TypeScript/JavaScript", "MATLAB"],
  },
  {
    category: "ML / Data",
    skills: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "NumPy",
      "Pandas",
      "GMMs",
      "clustering",
      "autoencoders",
      "model evaluation",
    ],
  },
  {
    category: "Quant / Finance",
    skills: [
      "VaR",
      "efficient frontier optimization",
      "factor modeling",
      "return prediction",
      "portfolio risk",
      "CAPM",
      "yield curves",
      "options fundamentals",
    ],
  },
  {
    category: "Software / Tools",
    skills: [
      "React",
      "Next.js",
      "FastAPI",
      "Chrome Extensions",
      "Git/GitHub",
      "Streamlit",
      "pytest",
      "Ruff",
      "Biome",
      "Vercel",
      "Cloud Run",
      "LLM APIs",
    ],
  },
];
