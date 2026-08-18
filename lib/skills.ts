/**
 * The technical inventory.
 *
 * Two rules:
 *
 * 1. Everything here is backed by a project record, an experience record, or
 *    the current resumes. Spark, Databricks, Airflow, MLflow, feature stores,
 *    Kubernetes, model-governance frameworks, fraud/AML and production credit
 *    risk are all absent, and stay absent until there is evidence for them.
 *
 * 2. No self-rated percentages. A bar reading "Python 92%" is a number with no
 *    method behind it on a site whose whole argument is that figures carry
 *    their method.
 *
 * `homeStack` is the deliberate short list shown on the homepage. It is a
 * subset of the groups below rather than a fourteenth independent list.
 */

import type { SkillGroup } from "./content-types";

export type { SkillGroup };

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      "Python",
      "Rust",
      "C",
      "C++",
      "SQL",
      "TypeScript",
      "JavaScript",
      "Java",
      "MATLAB",
    ],
  },
  {
    category: "ML & Data",
    skills: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "NumPy",
      "Pandas",
      "CNNs",
      "Clustering",
      "Autoencoders",
      "GMM",
      "HMM",
      "KMeans",
      "Model evaluation",
      "Synthetic-data pipelines",
      "Time-series modeling",
      "Time-series validation",
      "Leakage-aware validation",
    ],
  },
  {
    category: "Backend & Web",
    skills: [
      "FastAPI",
      "Django",
      "PostgreSQL",
      "REST APIs",
      "Pydantic",
      "Alembic",
      "Next.js",
      "React",
      "Streamlit",
    ],
  },
  {
    category: "Cloud & Delivery",
    skills: [
      "AWS",
      "ECS",
      "RDS",
      "S3",
      "SES",
      "ALB",
      "WAF",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "Google Cloud Run",
    ],
  },
  {
    category: "Testing & Quality",
    skills: [
      "pytest",
      "Playwright",
      "Ruff",
      "CodeQL",
      "Criterion",
      "Property-based testing",
      "Integration testing",
      "End-to-end testing",
      "Synthetic load testing",
      "Benchmarking",
      "Git",
      "GitHub",
    ],
  },
  {
    category: "Quantitative",
    skills: [
      "Probability and statistics",
      "Value at Risk",
      "Stress testing",
      "Efficient-frontier optimization",
      "Portfolio optimization",
      "Portfolio P&L",
      "CAPM",
      "Yield curves",
      "Bond-pricing fundamentals",
      "Options-pricing fundamentals",
      "Transaction costs",
      "Market-regime modeling",
    ],
  },
  {
    category: "Signals & Embedded",
    skills: [
      "RTL-SDR",
      "RF spectrograms",
      "Signal classification",
      "Embedded ML inference",
    ],
  },
];

/**
 * The compact selection previewed on the homepage.
 *
 * Ordered by how much of the work actually runs on it, not alphabetically and
 * not by framework prominence. Python and the libraries around it come first
 * because that is where the ML and quantitative work lives; Django is real —
 * it is most of the Northstar application — but it sits after the numerical
 * stack rather than second in the list.
 */
export const homeStack = [
  "Python",
  "PyTorch",
  "scikit-learn",
  "XGBoost",
  "Pandas",
  "NumPy",
  "FastAPI",
  "Django",
  "PostgreSQL",
  "Rust",
  "TypeScript",
  "AWS",
  "Terraform",
  "Docker",
];

/** Every skill in the inventory, flattened. Used by the content checks. */
export const allSkills = skillGroups.flatMap((group) => group.skills);
