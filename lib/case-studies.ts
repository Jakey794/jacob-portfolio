/**
 * Case-study content, moved out of `app/projects/[slug]/page.tsx` so the
 * index and detail pages can share it. The `eyebrow`, `highlights`,
 * `whatBuilt`, `architecture` and `metricsProof` blocks are carried over
 * unchanged; `results` was added for the detail page's stat tiles.
 *
 * Every value here must be supported by the project itself. Leave `results`
 * undefined rather than inventing figures — the page falls back to the
 * validation list when it is absent.
 */

export type ArchitectureStage = {
  label: string;
  title: string;
  body: string;
};

export type ResultTile = {
  value: string;
  label: string;
};

export type CaseStudyContent = {
  eyebrow: string;
  highlights: [string, string][];
  whatBuilt: string[];
  architecture: ArchitectureStage[];
  metricsProof: string[];
  results?: ResultTile[];
};

export const caseStudies: Record<string, CaseStudyContent> = {
  "incident-triage-copilot": {
    eyebrow: "Case Study / Full-stack AI",
    highlights: [
      ["Frontend", "Next.js"],
      ["Backend", "FastAPI"],
      ["Deploy", "Vercel + Cloud Run"],
    ],
    whatBuilt: [
      "A full-stack AI triage workflow that transforms incident inputs into severity, root-cause, next-actions, and confidence outputs.",
      "A Next.js frontend connected to a FastAPI backend with typed response contracts.",
      "Provider-backed Groq/Gemini triage support plus a heuristic fallback for reliable demos.",
    ],
    architecture: [
      {
        label: "Input Context",
        title: "Operational signal bundle",
        body: "Alerts, logs, deployment notes, service context, and metrics are gathered into one triage context.",
      },
      {
        label: "Frontend",
        title: "Next.js triage surface",
        body: "The product interface frames the incident context and presents severity, root-cause, next-action, and confidence outputs.",
      },
      {
        label: "Backend",
        title: "FastAPI response contract",
        body: "Typed backend contracts keep model and fallback outputs structured enough for a reliable product workflow.",
      },
      {
        label: "AI + Fallback",
        title: "Groq/Gemini with heuristic path",
        body: "LLM-backed triage can run through Groq or Gemini, while a heuristic fallback keeps demos dependable.",
      },
      {
        label: "Deploy + Test",
        title: "Vercel, Cloud Run, pytest",
        body: "The frontend is designed for Vercel deployment, the backend for Cloud Run, with pytest coverage around backend behavior.",
      },
    ],
    metricsProof: [
      "Built a typed Next.js + FastAPI triage workflow with structured response contracts.",
      "Implemented severity, impacted service, root-cause, next-action, and confidence outputs.",
      "Supports optional Groq/Gemini LLM-backed triage with a heuristic fallback for reliable demos.",
      "Deployed frontend on Vercel and backend on Google Cloud Run.",
      "Added pytest coverage around backend behavior and response structure.",
    ],
    results: [
      { value: "Typed", label: "Pydantic response contracts" },
      { value: "Fallback", label: "Heuristic path when providers are down" },
      { value: "2", label: "LLM providers (Groq, Gemini)" },
      { value: "pytest", label: "Backend behaviour covered" },
    ],
  },
  formatclip: {
    eyebrow: "Case Study / Chrome AI Tool",
    highlights: [
      ["Extension", "Chrome MV3"],
      ["Frontend", "WXT + React"],
      ["Backend", "FastAPI"],
    ],
    whatBuilt: [
      "A Chrome MV3 extension built with WXT, React, TypeScript, and Tailwind.",
      "Local snippet saving for privacy-conscious reuse without page monitoring.",
      "An explicit Format action that sends selected text to the backend only when clicked.",
      "A FastAPI backend with provider-swappable LLM support and a mock fallback for demos and testing.",
    ],
    architecture: [
      {
        label: "Extension",
        title: "Chrome MV3 shell",
        body: "The extension uses Chrome MV3 with WXT, React, TypeScript, and Tailwind for the user-facing snippet and formatting workflow.",
      },
      {
        label: "Local Storage",
        title: "Privacy-conscious snippets",
        body: "Saved snippets stay local, supporting reuse without continuous page monitoring.",
      },
      {
        label: "Format Action",
        title: "Explicit user trigger",
        body: "Selected text is sent to the backend only when the user clicks Format.",
      },
      {
        label: "Backend",
        title: "FastAPI formatting service",
        body: "The FastAPI backend handles formatting requests and keeps provider integration outside the extension.",
      },
      {
        label: "LLM Layer",
        title: "Provider-swappable backend",
        body: "The LLM backend is designed so providers can be swapped without changing the extension workflow.",
      },
      {
        label: "Fallback",
        title: "Mock path for demos/testing",
        body: "A mock fallback supports demos and testing without depending on a live provider response.",
      },
    ],
    metricsProof: [
      "Built a Chrome MV3 extension with WXT, React, TypeScript, and Tailwind.",
      "Saves snippets locally for privacy-conscious reuse.",
      "Formats selected text only through an explicit user-triggered Format action.",
      "Avoids page monitoring; backend calls happen only when Format is clicked.",
      "Uses a FastAPI backend with provider-swappable LLM support.",
      "Includes a mock fallback path for demos and testing.",
    ],
  },
  "rf-signal-classification-research": {
    eyebrow: "Case Study / RF ML Research",
    highlights: [
      ["Research", "RMC project"],
      ["Modeling", "PyTorch CNNs"],
      ["Dataset", "150K samples"],
    ],
    whatBuilt: [
      "An RF spectrogram classification research workflow using RTL-SDR captures and PyTorch CNNs.",
      "Custom Python data collection and scanning pipelines for building real-world RF spectrogram datasets.",
      "Latency/accuracy CNN variants for embedded RF scanning at a 2Hz refresh rate.",
    ],
    architecture: [
      {
        label: "Capture",
        title: "RTL-SDR signal collection",
        body: "RTL-SDR captures provide real-world RF signal inputs for the classification workflow.",
      },
      {
        label: "Pipeline",
        title: "Custom Python scanning",
        body: "Custom Python data collection and scanning pipelines prepare RF captures for dataset construction and evaluation.",
      },
      {
        label: "Representation",
        title: "RF spectrogram dataset",
        body: "Captured signals are represented as RF spectrograms for model training and classification.",
      },
      {
        label: "Dataset",
        title: "150K samples, 5 classes",
        body: "The research workflow uses a 150K-sample, 5-class RF dataset built for real-world signal classification.",
      },
      {
        label: "Modeling",
        title: "PyTorch CNN classifiers",
        body: "PyTorch CNNs classify RF spectrograms and support comparisons across accuracy and generalization behavior.",
      },
      {
        label: "Embedded Scan",
        title: "Latency/accuracy variants",
        body: "CNN variants explore latency and accuracy tradeoffs for embedded RF scanning at a 2Hz refresh rate.",
      },
    ],
    metricsProof: [
      "RMC research project focused on RF spectrogram classification.",
      "Built custom Python data collection and scanning pipelines around RTL-SDR captures.",
      "Curated a 150K-sample, 5-class RF dataset.",
      "Achieved 90% average accuracy on unseen real-world signals.",
      "Improved noisy-band generalization by 10%.",
      "Built latency/accuracy CNN variants for embedded RF scanning at a 2Hz refresh rate.",
    ],
    results: [
      { value: "150K", label: "Curated RF spectrogram samples across 5 classes" },
      { value: "90%", label: "Average accuracy on unseen real-world signals" },
      { value: "+10%", label: "Noisy-band generalization improvement" },
      { value: "2Hz", label: "Embedded scanning refresh rate" },
    ],
  },
  "regime-specialist-stock-predictor": {
    eyebrow: "Case Study / Educational Quant System",
    highlights: [
      ["Regimes", "GMM clustering"],
      ["Models", "16 XGBoost"],
      ["Evaluation", "1 year unseen"],
    ],
    whatBuilt: [
      "A regime-aware trading evaluation system framed as an educational project, not financial advice.",
      "A quantitative workflow that uses GMM clustering to separate market regimes before model evaluation.",
      "XGBoost return-prediction models built around 10+ engineered time-series indicators.",
      "A Streamlit app for regime classification, model comparison, and trade evaluation.",
    ],
    architecture: [
      {
        label: "Indicators",
        title: "Time-series feature layer",
        body: "The system starts from 10+ engineered time-series indicators used as model inputs for regime-aware evaluation.",
      },
      {
        label: "Regimes",
        title: "GMM market clustering",
        body: "GMM clustering separates market behavior into regimes before comparing return-prediction models.",
      },
      {
        label: "Modeling",
        title: "XGBoost return predictors",
        body: "The workflow trains 16 XGBoost return-prediction models for regime-specific comparison.",
      },
      {
        label: "Evaluation",
        title: "Unseen-data performance",
        body: "Model behavior is evaluated on one year of unseen data using directional accuracy and return accuracy.",
      },
      {
        label: "Interface",
        title: "Streamlit evaluation app",
        body: "The Streamlit app surfaces regime classification, model comparison, and trade evaluation in one project interface.",
      },
      {
        label: "Scope",
        title: "Educational project framing",
        body: "The system is presented as an educational quantitative software project and not as financial advice or a production trading recommendation engine.",
      },
    ],
    metricsProof: [
      "Built a regime-aware trading evaluation system using GMM clustering and XGBoost return-prediction models.",
      "Engineered 10+ time-series indicators.",
      "Trained 16 XGBoost return-prediction models.",
      "Achieved 70% directional accuracy and 60% return accuracy on one year of unseen data.",
      "Built a Streamlit app for regime classification, model comparison, and trade evaluation.",
      "Framed the system as an educational/project evaluation tool, not financial advice.",
    ],
    results: [
      { value: "16", label: "XGBoost return-prediction models trained" },
      { value: "10+", label: "Engineered time-series indicators" },
      { value: "70%", label: "Directional accuracy on one year of unseen data" },
      { value: "60%", label: "Return accuracy on the same unseen window" },
    ],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return caseStudies[slug];
}
