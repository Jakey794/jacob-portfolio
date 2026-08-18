/**
 * The project collection: one record per project, complete.
 *
 * This file used to have a twin — `lib/case-studies.ts` held a second copy of
 * the same titles, links, metrics and architecture, keyed by the same slugs,
 * and the two had already drifted. There is one record now. The index cards,
 * the detail routes, `generateStaticParams`, `generateMetadata`, the filters,
 * the counts, the sitemap and the structured data are all derived from it, so
 * adding a project cannot produce a card that links to a 404.
 *
 * Rules that hold for every record here:
 *
 * - Every figure in `metrics` carries the run that produced it. Nothing is
 *   presented as a live counter or a production SLA.
 * - `ownership` is honest. `ml-analysis-tool` is a repository Jacob
 *   contributed nine commits to, not one he owns, and it says so on the card,
 *   on the detail page and in its structured data.
 * - A link is only listed when its destination exists. There is no disabled
 *   "coming soon" action anywhere in the UI.
 * - Media is either a sanitised capture of the real product or nothing, in
 *   which case the page draws the record's own architecture instead. No
 *   generated screenshot, and no generated chart, is presented as evidence.
 */

import type { Metric, Project, ProjectCategory } from "./content-types";
import { projectCategories } from "./content-types";

export type { Project, ProjectCategory };
export { projectCategories };

/**
 * Source audit date for the whole collection — the day the figures below were
 * counted.
 *
 * Re-checked 2026-08-18: every public repository, live demo, release and
 * documentation link still resolves; the latest `main` workflow run on all
 * five owned repositories reported success; the test and check counts below
 * were recounted from those successful workflow logs; and the FormatClip
 * v1.0.0 asset remains exactly 77,949 bytes.
 */
const VERIFIED = "2026-08-18";

const projects: Project[] = [
  // ------------------------------------------------------------------- 01
  {
    slug: "llm-evalops-platform",
    title: "LLM Reliability + EvalOps Platform",
    shortTitle: "LLM EvalOps",
    eyebrow: "LLM Evaluation Platform",
    ownership: "owned",
    displayDate: "August 2026",
    dateStart: "2026-08",
    dateEnd: "2026-08",
    statusLabel: "Live reference implementation",
    featured: true,
    archive: false,
    sortOrder: 1,
    categories: ["ML", "Software"],
    displayTags: ["Python", "FastAPI", "PostgreSQL", "Next.js", "TypeScript"],
    stack: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Python",
      "TypeScript",
      "Alembic",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Google Cloud Run",
    ],

    oneLine:
      "Full-stack LLM evaluation platform with versioned datasets, graders, quality gates, and cost-latency analysis.",
    summary:
      "A Next.js, FastAPI, and PostgreSQL reference implementation for measuring the quality, reliability, estimated cost, and latency of LLM-powered workflows across versioned datasets, prompts, models, and graders.",
    problem:
      "LLM changes can improve one metric while quietly degrading reliability, cost, or latency. Teams need reproducible evaluation runs, failed-example inspection, and explicit release gates rather than anecdotal prompt testing.",
    role: "Designed and built the full-stack reference platform, evaluation runner, grader system, analytics UI, persistence layer, and CI quality-gate workflow.",

    whatBuilt: [
      "Versioned datasets, prompt versions, and model configurations.",
      "Synchronous evaluation runs with result, estimated-cost, and latency tracking.",
      "Exact-match, JSON-schema, text-similarity, citation/grounding, and optional Gemini LLM-as-judge grading.",
      "Composite scoring, run history, breakdowns, and failed-example analysis.",
      "Cost-versus-quality and latency-versus-quality comparisons.",
      "A CI evaluation-gate CLI with pass-rate, score, cost, and p95 thresholds, stable exit codes, and JSON reports.",
      "Document-grounded RAG QA using supplied documents rather than a vector database.",
      "Next.js dashboard, FastAPI API, PostgreSQL persistence, and Alembic migrations.",
      "Vercel/Cloud Run packaging and GitHub Actions validation.",
    ],

    architecture: [
      {
        label: "Inputs",
        title: "Versioned inputs",
        body: "Datasets, prompt versions, model configurations, and grader settings.",
      },
      {
        label: "API",
        title: "FastAPI control plane",
        body: "Typed API contracts create and inspect evaluation runs.",
      },
      {
        label: "Runner",
        title: "Evaluation runner",
        body: "Executes cases, records outputs, cost estimates, and latency.",
      },
      {
        label: "Graders",
        title: "Grader layer",
        body: "Deterministic graders plus optional LLM-as-judge composite scoring.",
      },
      {
        label: "Store",
        title: "PostgreSQL / Alembic",
        body: "Persists versioned artifacts, cases, run results, and comparisons.",
      },
      {
        label: "Analytics",
        title: "Next.js analytics",
        body: "Run history, failed examples, breakdowns, and cost/latency-quality views.",
      },
      {
        label: "Gate",
        title: "CI quality gate",
        body: "Enforces pass-rate, score, cost, and p95 thresholds with machine-readable reports.",
      },
    ],

    technicalDecisions: [
      "Version artifacts so comparisons can be reproduced.",
      "Combine deterministic graders with an optional model-based judge rather than making every evaluation provider-dependent.",
      "Give CI gates stable exit codes and JSON reports for automation.",
      "Keep document-grounded RAG QA tied to supplied documents rather than suggesting a general vector-search platform.",
      "Surface cost and latency next to quality so one-dimensional improvements are visible.",
    ],

    proof: [
      "A controlled 20-case RAG regression moved the pass rate from 95.0% to 85.0% and more than doubled estimated cost.",
      "221 backend tests, a successful frontend production build, and passing backend, frontend, and eval-gate workflows.",
    ],

    testingAndValidation: [
      "Fixed 20-case RAG QA dataset held constant across both recorded runs.",
      "Baseline run: 95.0% pass rate, 0.987 average score, 1 failed case, $0.02939670 estimated cost, 745.5 ms average latency, 867 ms p95.",
      "Intentionally degraded prompt: 85.0% pass rate, 0.953 average score, 3 failed cases, $0.06300110 estimated cost, 808.15 ms average latency, 908 ms p95.",
      "Both recorded runs reported zero provider errors.",
      "221 backend tests and a successful frontend production build at the evidence snapshot.",
    ],

    metrics: [
      {
        value: "95.0% → 85.0%",
        label: "Pass rate, baseline vs degraded prompt",
        methodology:
          "Repository-recorded 20-case RAG regression documented on 2026-08-05.",
        date: "2026-08-05",
        qualifier: "Controlled comparison, not a customer or usage metric.",
      },
      {
        value: "1 → 3",
        label: "Failed cases across the same dataset",
        methodology:
          "Same fixed 20-case dataset; only the prompt version changed.",
        date: "2026-08-05",
      },
      {
        value: "$0.0294 → $0.0630",
        label: "Estimated run cost",
        methodology:
          "Estimated model cost recorded by the runner for each of the two runs.",
        date: "2026-08-05",
        qualifier: "Estimate produced by the platform, not a billed amount.",
      },
      {
        value: "221",
        label: "Backend tests",
        methodology:
          "Latest successful main-branch Backend CI run 32046570725 (2026-08-17), rechecked 2026-08-18.",
        date: "2026-08-17",
        qualifier: "Point-in-time count, not a live counter.",
      },
    ],

    limitations: [
      "A reference implementation seeded with synthetic data, not a product.",
      "No general-purpose authentication or secure multi-tenant boundary is claimed.",
      "Public write endpoints would require authentication, authorization, rate limits, audit logging, and threat-model review.",
      "The runner is synchronous. One documented run of approximately 16 minutes outlasted its initiating browser request; production scale would require asynchronous workers and polling.",
      "No enterprise SaaS, production multi-tenancy, or large-scale usage is claimed.",
    ],

    outcome:
      "A reproducible way to compare prompt and model versions on quality, cost, and latency together, with a CI gate that fails a change before it ships rather than after.",
    securityAndPrivacy:
      "Seeded with synthetic evaluation data. No customer content, credentials, or production traffic is present in the public deployment.",

    links: [
      {
        kind: "live",
        label: "Open live demo",
        href: "https://llmevalops.com/",
      },
      {
        kind: "source",
        label: "View source",
        href: "https://github.com/Jakey794/llm-evalops-platform",
      },
    ],

    media: {
      wide: "/images/projects/llm-evalops-wide.webp",
      detail: "/images/projects/llm-evalops-detail.webp",
      social: "/images/og/llm-evalops.jpg",
      alt: "LLM EvalOps dashboard showing pass rate, cost, latency, and recent evaluation runs using demo data.",
      caption:
        "Synthetic/demo evaluation data shown in the public reference implementation.",
      tone: "dark",
      kind: "screenshot",
    },

    relatedExperienceSlugs: ["northstar-downhole-software-engineering-intern"],
    seo: {
      title: "LLM Reliability + EvalOps Platform",
      description:
        "Full-stack LLM evaluation reference platform with versioned data and prompts, deterministic and model-based graders, failed-example analysis, and CI quality gates.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 02
  {
    slug: "incident-triage-copilot",
    title: "Incident Triage Copilot",
    shortTitle: "Incident Triage",
    eyebrow: "Operational AI Tooling",
    ownership: "owned",
    displayDate: "March – April 2026",
    dateStart: "2026-03",
    dateEnd: "2026-04",
    statusLabel: "Completed public demo",
    featured: true,
    archive: false,
    sortOrder: 2,
    categories: ["ML", "Software"],
    displayTags: ["Python", "FastAPI", "Next.js", "TypeScript", "Cloud Run"],
    stack: [
      "Next.js",
      "FastAPI",
      "Python",
      "TypeScript",
      "Cloud Run",
      "Vercel",
      "pytest",
      "Ruff",
    ],

    oneLine:
      "Live incident-triage demo that turns operational context into a validated, structured response with deterministic fallback behavior.",
    summary:
      "A Next.js and FastAPI application that accepts alerts, logs, metrics, deployment notes, service context, and incident descriptions, then produces a structured summary, severity, impacted service, root-cause hypothesis, immediate actions, and confidence.",
    problem:
      "Incident responders need fast, consistent triage from messy operational context without depending on unvalidated free-form model output.",
    role: "Built the typed frontend-to-backend workflow, provider adapters, deterministic heuristic mode, response validation, failure handling, tests, and public deployment.",

    whatBuilt: [
      "Structured incident-input form with sample scenarios and input limits.",
      "Typed Next.js-to-FastAPI API contract.",
      "Frontend validation before response rendering.",
      "Deterministic heuristic triage mode.",
      "Optional Gemini and Groq provider adapters.",
      "Provider timeout and fallback when credentials are absent or output validation fails.",
      "Backend pytest coverage, Ruff validation, and a frontend production build.",
      "Vercel frontend and Google Cloud Run backend.",
    ],

    architecture: [
      {
        label: "Input",
        title: "Incident context",
        body: "Alerts, logs, metrics, deployment notes, service, environment, and narrative.",
      },
      {
        label: "Surface",
        title: "Next.js input surface",
        body: "Typed form, built-in samples, length limits, and a public-data warning.",
      },
      {
        label: "Contract",
        title: "FastAPI contract",
        body: "Validated request and structured response schemas.",
      },
      {
        label: "Triage",
        title: "Triage path",
        body: "Deterministic heuristic mode or an optional Gemini/Groq provider.",
      },
      {
        label: "Guard",
        title: "Validation / fallback",
        body: "Rejects malformed model output and falls back safely.",
      },
      {
        label: "Output",
        title: "Product response",
        body: "Summary, severity, impacted service, likely cause, actions, and confidence.",
      },
      {
        label: "Deploy",
        title: "Deployment",
        body: "Vercel frontend, Cloud Run backend, tests, and CI.",
      },
    ],

    technicalDecisions: [
      "Structured outputs rather than unbounded text.",
      "Built-in sample incidents so the demo is useful without any real data.",
      "Optional model providers, so the demo is not provider-dependent.",
      "A deterministic fallback path that runs with no credentials configured.",
      "Request-length limits and visible public-data safety guidance.",
    ],

    proof: [
      "16 passing backend tests, Ruff validation, and a successful frontend production build at the evidence snapshot.",
      "Public demo verified live and reachable anonymously at incidentcopilottriage.com.",
    ],

    testingAndValidation: [
      "16 passing backend tests at the current evidence snapshot.",
      "Ruff validation across the backend.",
      "Successful frontend production build.",
      "Current main CI succeeded.",
      "Live public page verified at incidentcopilottriage.com.",
    ],

    metrics: [
      {
        value: "16",
        label: "Backend tests passing",
        methodology:
          "Latest successful main-branch CI run 32055680295 (2026-08-17), rechecked 2026-08-18.",
        date: "2026-08-17",
        qualifier: "Point-in-time count, not a live counter.",
      },
      {
        value: "6",
        label: "Structured response fields returned per triage",
        methodology:
          "Counted from the response schema in the public repository.",
        date: "2026-08-17",
      },
    ],

    limitations: [
      "Decision support, not an autonomous incident responder.",
      "Use sample or sanitized data only.",
      "No incident history.",
      "No Slack or PagerDuty integration.",
      "No team handoff or timeline generation.",
      "No published accuracy, user-count, or mean-time-to-resolution metric.",
    ],

    outcome:
      "A working demonstration that a model-backed triage step can be typed, validated, and degraded safely — the response shape holds whether a provider answers, times out, or is not configured at all.",
    securityAndPrivacy:
      "The interface warns users to submit sample or sanitized input only. No incident data is retained.",

    links: [
      {
        kind: "live",
        label: "Open live demo",
        href: "https://incidentcopilottriage.com/",
      },
      {
        kind: "source",
        label: "View source",
        href: "https://github.com/Jakey794/incident-triage-copilot",
      },
    ],

    media: {
      wide: "/images/projects/incident-triage-wide.webp",
      detail: "/images/projects/incident-triage-detail.webp",
      social: "/images/og/incident-triage.jpg",
      alt: "Incident Triage Copilot demo form and structured triage brief populated with a sanitized sample incident.",
      caption: "Public demo using a built-in sample; no real incident data.",
      tone: "light",
      kind: "screenshot",
    },

    relatedExperienceSlugs: ["northstar-downhole-software-engineering-intern"],
    seo: {
      title: "Incident Triage Copilot",
      description:
        "Live Next.js and FastAPI incident-triage demo with typed outputs, response validation, optional Gemini/Groq providers, and deterministic fallback.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 03
  {
    slug: "low-latency-trading-engine",
    title: "Low-Latency Event-Driven Trading Engine",
    shortTitle: "Event-Driven Trading Engine",
    eyebrow: "Systems / Market Microstructure",
    ownership: "owned",
    displayDate: "August 2026",
    dateStart: "2026-08",
    dateEnd: "2026-08",
    statusLabel: "Open-source systems project",
    featured: true,
    archive: false,
    sortOrder: 3,
    categories: ["Software", "Quant", "Systems"],
    displayTags: ["Rust", "Event-Driven", "Matching Engine", "Replay", "Criterion"],
    stack: [
      "Rust",
      "Event-Driven",
      "Matching Engine",
      "Replay",
      "Criterion",
      "Property-based testing",
      "hdrhistogram",
      "Python",
      "GitHub Actions",
    ],

    oneLine:
      "Deterministic Rust limit-order-book and matching engine with replay, portfolio accounting, risk controls, property tests, and reproducible local benchmarks.",
    summary:
      "A Rust event-driven simulation stack centered on price-time-priority market microstructure, deterministic replay, explicit pre-trade risk boundaries, and measured local performance.",
    problem:
      "Trading-system projects often jump to strategies or headline throughput before establishing deterministic matching, accounting, cancellation, risk controls, and testable replay.",
    role: "Designed and implemented the order book, matching, replay, portfolio/risk, strategy, testing, and benchmark layers, with a Python comparison baseline.",

    whatBuilt: [
      "FIFO price-time-priority limit order book.",
      "Limit, market, and cancel operations.",
      "Partial fills and multi-level sweeps.",
      "Multi-symbol routing and deterministic JSONL replay.",
      "Golden-file replay scenarios.",
      "Average-cost positions, cash, realized/unrealized P&L, and equity.",
      "Pre-trade limits, a loss-triggered kill switch, and post-kill cancellation.",
      "Bounded strategy-plugin commands with market-making and momentum demos.",
      "Property-based tests.",
      "Criterion benchmarks and an hdrhistogram measurement harness.",
      "A naive Python comparison baseline.",
      "An experimental order pool and lock-free queue, isolated behind feature flags.",
      "Mock/localhost paper WebSocket path only.",
    ],

    architecture: [
      {
        label: "Input",
        title: "Event input",
        body: "JSONL replay, generated workloads, or a localhost paper feed.",
      },
      {
        label: "Router",
        title: "Multi-symbol router",
        body: "Directs events to deterministic symbol-specific books.",
      },
      {
        label: "Book",
        title: "Limit order book",
        body: "Price-time priority, cancellations, partial fills, and sweeps.",
      },
      {
        label: "Fills",
        title: "Match / fill events",
        body: "Deterministic executions feed accounting and strategies.",
      },
      {
        label: "P&L",
        title: "Portfolio / P&L",
        body: "Average-cost positions, cash, realized/unrealized P&L, and equity.",
      },
      {
        label: "Risk",
        title: "Risk controls",
        body: "Pre-trade limits, a loss-triggered kill switch, and cancellation.",
      },
      {
        label: "Strategy",
        title: "Strategy boundary",
        body: "Bounded commands for demonstration strategies.",
      },
      {
        label: "Proof",
        title: "Test / benchmark",
        body: "Golden tests, property tests, Criterion, histograms, and a Python baseline.",
      },
    ],

    technicalDecisions: [
      "Deterministic replay and accounting correctness precede strategy work.",
      "Risk limits and a kill switch are explicit engine boundaries, not strategy concerns.",
      "Experimental concurrency and allocator paths stay feature-gated.",
      "The order-pool experiment was slower than ordinary vector churn and stayed isolated rather than being promoted as an optimization win.",
      "Demo strategies make no alpha or profitability claim.",
    ],

    proof: [
      "247 passing CI tests, deterministic golden-file replay, and property-based tests at the evidence snapshot.",
      "Benchmarks are committed as JSON with the machine, OS, and toolchain that produced them.",
    ],

    testingAndValidation: [
      "247 passing CI tests at the evidence snapshot.",
      "Current main CI succeeded, as did the scheduled security/code scan.",
      "Deterministic replay validated against committed golden scenarios.",
      "Property-based tests over book invariants.",
      "Release-build and experimental-feature suites documented in the public project evidence.",
    ],

    metrics: [
      {
        value: "125 ns",
        label: "p50, 10K synthetic core workload (≈4.61M events/s)",
        methodology:
          "Committed local Criterion benchmark. Apple M4 Pro, 24 GiB, macOS 26.5.2, rustc 1.96.0.",
        date: "2026-08-05",
        qualifier:
          "Local, machine-specific measurement — not a latency guarantee, an exchange measurement, or production throughput.",
      },
      {
        value: "83 ns",
        label: "p50, cancel resting order (≈3.10M events/s)",
        methodology:
          "Committed local Criterion benchmark on the same machine and toolchain.",
        date: "2026-08-05",
        qualifier: "Local benchmark, same caveats.",
      },
      {
        value: "≈1.16M events/s",
        label: "Naive Python 10K baseline, same workload",
        methodology:
          "Comparison baseline run on the same machine to make the Rust figure interpretable.",
        date: "2026-08-05",
      },
      {
        value: "247",
        label: "CI tests passing",
        methodology:
          "Latest successful main-branch CI run 31980194986 (2026-08-16), rechecked 2026-08-18.",
        date: "2026-08-16",
        qualifier: "Point-in-time count, not a live counter.",
      },
    ],

    limitations: [
      "No real exchange adapter.",
      "No durable production persistence.",
      "No real capital, and no profitability evidence.",
      "No production concurrency model.",
      "Mock/localhost paper feed only.",
      "“Low latency” names the project domain; it is not an exchange-grade claim.",
    ],

    outcome:
      "A matching engine whose behaviour is reproducible before it is fast: the same JSONL replay produces the same fills, accounting, and risk decisions every run, and the benchmark numbers are published with the machine that produced them.",

    links: [
      {
        kind: "source",
        label: "View source",
        href: "https://github.com/Jakey794/low-latency-trading-engine",
      },
      {
        kind: "docs",
        label: "Benchmark results (JSON)",
        href: "https://github.com/Jakey794/low-latency-trading-engine/blob/main/docs/benchmarks/latest.json",
        note: "Committed local measurements, with machine and toolchain recorded.",
      },
    ],

    relatedExperienceSlugs: ["utefa-portfolio-manager"],
    seo: {
      title: "Rust Event-Driven Trading Engine",
      description:
        "Deterministic Rust matching engine with price-time priority, multi-symbol replay, portfolio accounting, risk controls, property tests, and qualified local benchmarks.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 04
  {
    slug: "market-regime-risk-platform",
    title: "Market Regime + Portfolio Risk Platform",
    shortTitle: "Market Regime & Risk",
    eyebrow: "Quantitative Risk Research Platform",
    ownership: "owned",
    displayDate: "August 2026",
    dateStart: "2026-08",
    dateEnd: "2026-08",
    statusLabel: "Open-source research platform",
    featured: true,
    archive: false,
    sortOrder: 4,
    categories: ["Quant", "ML", "Research"],
    displayTags: [
      "Python",
      "Streamlit",
      "Risk Analytics",
      "Regime Detection",
      "Backtesting",
    ],
    stack: [
      "Python",
      "Streamlit",
      "scikit-learn",
      "Risk Analytics",
      "Regime Detection",
      "Backtesting",
      "Time Series",
      "GMM",
      "HMM",
      "KMeans",
      "GitHub Actions",
    ],

    oneLine:
      "An auditable research platform for portfolio risk, regime diagnostics, stress testing, and chronologically valid strategy evaluation.",
    summary:
      "Builds validated ETF research datasets, estimates portfolio and tail risk, compares multiple regime-detection approaches, runs defined stress scenarios, and evaluates shifted, cost-aware strategies without presenting the output as investment advice.",
    problem:
      "Quantitative research becomes difficult to trust when data validation, feature construction, model fitting, signal timing, transaction costs, and reporting are scattered across notebooks. The project packages those stages into an inspectable workflow whose assumptions and failure modes can be reviewed.",
    role: "Designed and implemented the end-to-end research platform, including dataset construction, portfolio analytics, regime features and models, stress testing, backtest controls, reporting, automated tests, CI, and the Streamlit interface.",

    whatBuilt: [
      "Configuration-driven ETF universe and portfolio construction.",
      "Price ingestion and validation with explicit data-quality reporting.",
      "Return, volatility, drawdown, tail-risk, and risk-adjusted performance metrics.",
      "Portfolio concentration, correlation, beta, and risk-contribution views.",
      "Regime feature diagnostics.",
      "Threshold, K-means, Gaussian-mixture, hidden-Markov, and change-point research approaches.",
      "Chronological splitting and train-only fitting for learned transformations or models.",
      "Defined stress scenarios and portfolio impact analysis.",
      "Shifted-signal backtesting, so a decision cannot trade on the observation that created it.",
      "Turnover and transaction-cost modeling.",
      "Quarterly memo and report generation.",
      "A tracked synthetic dataset and an offline-capable validation path.",
      "Future-mutation tests intended to detect accidental look-ahead leakage.",
      "Unit, integration, and Streamlit AppTest coverage across supported Python versions.",
    ],

    architecture: [
      {
        label: "Config",
        title: "Configuration",
        body: "Universe, weights, dates, risk assumptions, regime settings, stress scenarios, and backtest controls.",
      },
      {
        label: "Ingest",
        title: "Data ingestion",
        body: "Loads market data when available, with a deterministic synthetic/offline path.",
      },
      {
        label: "Validate",
        title: "Data validation",
        body: "Checks alignment, missingness, schema, ordering, and documented quality conditions.",
      },
      {
        label: "Features",
        title: "Feature + risk layer",
        body: "Returns, rolling statistics, drawdowns, tail metrics, correlations, beta, concentration, and regime features.",
      },
      {
        label: "Regimes",
        title: "Regime research",
        body: "Threshold, clustering, mixture, HMM, or change-point approaches on chronological boundaries.",
      },
      {
        label: "Stress",
        title: "Stress engine",
        body: "Applies named scenarios and calculates portfolio impacts.",
      },
      {
        label: "Backtest",
        title: "Backtest lab",
        body: "Shifts signals, applies costs and turnover, and reports strategy diagnostics.",
      },
      {
        label: "Report",
        title: "Reporting",
        body: "Renders nine Streamlit pages and generates the quarterly research memo.",
      },
      {
        label: "Proof",
        title: "Validation",
        body: "Runs unit, offline, mutation, and AppTest checks in CI.",
      },
    ],

    technicalDecisions: [
      "Chronological boundaries instead of random train/test splitting for time-series research.",
      "Train-only fitting for learned steps, to reduce leakage.",
      "Explicit signal shifting before return attribution.",
      "Configurable turnover and cost assumptions instead of frictionless-only reporting.",
      "Multiple regime methods rather than presenting one method as ground truth.",
      "Synthetic tracked inputs, so tests stay reproducible when remote market data is unavailable.",
      "Data-quality and regime-diagnostic pages, so model output is never divorced from its inputs.",
      "Future-data mutation tests as a direct guard against look-ahead errors.",
    ],

    proof: [
      "322 automated checks pass across a Python 3.12–3.14 CI matrix.",
      "Chronological splits, train-only scaling, shifted signals, and future-mutation tests guard against look-ahead bias.",
    ],

    testingAndValidation: [
      "322 passing checks across Python 3.12, 3.13, and 3.14 in the current CI matrix.",
      "Unit, integration, and Streamlit AppTest coverage.",
      "A deterministic synthetic-data path so tests run without remote market data.",
      "Future-mutation tests that fail if a future observation can influence a past decision.",
      "Nine Streamlit pages are implemented in the checked-in application and covered by AppTests.",
    ],

    metrics: [
      {
        value: "322",
        label: "Automated checks in the CI matrix",
        methodology:
          "Latest successful main-branch CI run 32056520339 (2026-08-17): 322 checks on each of Python 3.12, 3.13, and 3.14; rechecked 2026-08-18.",
        date: "2026-08-17",
        qualifier: "Point-in-time count, not a live counter.",
      },
      {
        value: "9",
        label: "Streamlit research pages in the application",
        methodology:
          "Counted from the checked-in application navigation; repository state rechecked 2026-08-18.",
        date: "2026-08-18",
      },
      {
        value: "5",
        label: "Regime-detection approaches compared",
        methodology:
          "Threshold, K-means, Gaussian mixture, hidden Markov, and change-point methods in the checked-in implementation.",
        date: "2026-08-17",
      },
    ],

    limitations: [
      "Research and education only; not investment advice.",
      "No brokerage or live order-execution integration.",
      "No claim of profitable live performance.",
      "No claim that any regime method discovers a uniquely “true” market state.",
      "The dashboard uses sample or synthetic data unless configured otherwise.",
      "No public hosted demo is currently offered; the source remains available.",
      "Model outputs depend on the chosen universe, period, data source, and assumptions.",
      "Backtest output is historical and simulated; it is not evidence of future returns.",
    ],

    outcome:
      "A reproducible research environment that brings portfolio diagnostics, regime analysis, stress tests, and cost-aware backtesting into one inspectable workflow. The value is the research discipline and testability, not a forecasting edge.",
    securityAndPrivacy:
      "Runs on a configured ETF universe and a tracked synthetic dataset. No personal holdings, brokerage credentials, or account data are involved.",

    links: [
      {
        kind: "source",
        label: "View source",
        href: "https://github.com/Jakey794/market-regime-risk-platform",
      },
    ],

    media: {
      wide: "/images/projects/market-regime-risk-wide.webp",
      detail: "/images/projects/market-regime-risk-detail.webp",
      social: "/images/og/market-regime-risk.jpg",
      alt: "Market risk research dashboard showing portfolio metrics, regime diagnostics, stress tests, and chronologically controlled backtesting.",
      caption:
        "Research interface on the bundled sample portfolio; results are illustrative and not investment advice.",
      tone: "dark",
      kind: "screenshot",
    },

    relatedExperienceSlugs: [
      "utefa-portfolio-manager",
      "utefa-sales-trading-analyst",
    ],
    seo: {
      title: "Market Regime & Portfolio Risk Platform",
      description:
        "Auditable Python and Streamlit research platform for portfolio risk, regime diagnostics, stress testing, and chronologically controlled, cost-aware backtesting.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 05
  {
    slug: "formatclip",
    title: "FormatClip",
    shortTitle: "FormatClip",
    eyebrow: "Local-First Chrome Extension",
    ownership: "owned",
    displayDate: "August 2026",
    dateStart: "2026-08",
    dateEnd: "2026-08",
    statusLabel: "v1.0.0 public release",
    featured: true,
    archive: false,
    sortOrder: 5,
    categories: ["Software"],
    displayTags: ["Chrome MV3", "WXT", "React", "TypeScript", "FastAPI"],
    stack: [
      "Chrome MV3",
      "WXT",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "Local-First",
      "LLM Integration",
    ],

    oneLine:
      "A local-first Chrome extension that reformats selected text through an explicit, user-triggered workflow and a typed FastAPI backend.",
    summary:
      "Uses a minimal-permission Manifest V3 extension, local settings, bounded backend contracts, and optional OpenAI or Groq providers to transform only text the user chooses to send.",
    problem:
      "Text copied from websites often carries formatting, spacing, or structure that does not fit the destination. A useful formatter should be fast and intentional without silently collecting browsing history, requesting broad permissions, or requiring a hosted account.",
    role: "Designed and implemented the extension UI, local configuration flow, typed API boundary, provider adapters, deterministic development mode, validation, accessibility details, tests, release packaging, and public documentation.",

    whatBuilt: [
      "Manifest V3 browser extension built with WXT, React, TypeScript, and Tailwind.",
      "Side-panel interface for saving, selecting, formatting, replacing, deleting, and clearing reusable text snippets.",
      "An explicit “Format” action; no passive capture of page contents.",
      "Local snippets and settings stored with chrome.storage.local.",
      "Minimal browser permissions appropriate to the checked-in extension.",
      "FastAPI backend with typed request/response contracts and bounded inputs.",
      "A deterministic mock provider for local testing.",
      "Optional OpenAI and Groq provider adapters.",
      "A loopback/local backend as the default development boundary.",
      "Error and loading states, plus documented keyboard and accessibility behaviour.",
      "Automated backend and extension tests, bundle-size checks, and reproducible packaging.",
      "A tagged v1.0.0 GitHub release.",
    ],

    architecture: [
      {
        label: "Select",
        title: "User selection",
        body: "The user chooses the text they want to reformat.",
      },
      {
        label: "Action",
        title: "Explicit action",
        body: "The extension sends nothing until the user invokes Format.",
      },
      {
        label: "UI",
        title: "Local extension UI",
        body: "React/WXT renders snippets, settings, progress, result, and errors.",
      },
      {
        label: "Storage",
        title: "Local settings",
        body: "chrome.storage.local retains snippets and configuration on the device.",
      },
      {
        label: "API",
        title: "Typed API",
        body: "FastAPI validates bounded requests and returns a defined response shape.",
      },
      {
        label: "Provider",
        title: "Provider adapter",
        body: "Mock mode is deterministic; configured providers can process the selected text.",
      },
      {
        label: "Result",
        title: "Result",
        body: "The formatted text returns to the extension for review and copying.",
      },
      {
        label: "Release",
        title: "Release pipeline",
        body: "Tests and bundle checks validate a versioned installable archive.",
      },
    ],

    technicalDecisions: [
      "Manifest V3 and a minimal-permission design.",
      "An explicit formatting action instead of background monitoring.",
      "chrome.storage.local for user-controlled settings.",
      "Typed request/response validation at the FastAPI boundary.",
      "Bounded input sizes and predictable error states.",
      "A provider abstraction so deterministic mock behaviour and optional real providers share one contract.",
      "Loopback-first configuration, rather than pretending a hosted service exists.",
      "Release checks that include tests, build output, and bundle budgets.",
    ],

    proof: [
      "Tagged v1.0.0 release with a 77,949-byte archive and a published SHA-256.",
      "31 automated tests across the backend and the extension at the evidence snapshot.",
    ],

    testingAndValidation: [
      "26 backend tests and 5 extension tests in the current public project evidence.",
      "Bundle-size budgets enforced as part of release packaging.",
      "A documented mock-provider path so the extension can be exercised with no external provider.",
      "v1.0.0 archive size 77,949 bytes; SHA-256 e4429155f35d633f9c1af32668887e1b896dd1b42d45d45acbbda57406d95436.",
    ],

    metrics: [
      {
        value: "31",
        label: "Automated tests (26 backend, 5 extension)",
        methodology:
          "Latest successful main-branch CI run 31925733707 (2026-08-16): 26 backend tests plus 5 extension tests; rechecked 2026-08-18.",
        date: "2026-08-16",
        qualifier: "Point-in-time count, not a live counter.",
      },
      {
        value: "77,949 B",
        label: "v1.0.0 release archive size",
        methodology:
          "Verified size of the published v1.0.0 release asset, dated 2026-08-16.",
        date: "2026-08-16",
        qualifier:
          "Release archive size, not the installed browser footprint.",
      },
      {
        value: "2",
        label: "Browser permissions requested (sidePanel, storage)",
        methodology:
          "Counted from the manifest in the tagged v1.0.0 source, plus the documented local backend origins.",
        date: "2026-08-17",
      },
    ],

    limitations: [
      "No verified Chrome Web Store listing.",
      "No hosted multi-user product or account system.",
      "No claim of user count, adoption, revenue, or productivity improvement.",
      "External model providers receive selected text when the user enables them.",
      "The default local/loopback workflow requires the backend to be available.",
      "Browser compatibility claims are limited to what is documented and tested.",
    ],

    outcome:
      "A compact, installable v1.0.0 extension with a deliberate privacy boundary, deterministic local testing, optional provider integrations, and automated package checks.",
    securityAndPrivacy:
      "FormatClip is designed around explicit user action and local snippets and settings. It needs no account or hosted service, and the verified release contains no analytics or telemetry. If a user configures an external model provider, the selected text is sent to that configured provider for processing — so this is not an “all data stays on device” product.",

    links: [
      {
        kind: "release",
        label: "View release and install notes",
        href: "https://github.com/Jakey794/formatclip/releases/tag/v1.0.0",
      },
      {
        kind: "source",
        label: "Inspect source",
        href: "https://github.com/Jakey794/formatclip",
      },
    ],

    media: {
      wide: "/images/projects/formatclip-wide.webp",
      detail: "/images/projects/formatclip-detail.webp",
      social: "/images/og/formatclip.jpg",
      alt: "FormatClip Chrome extension side panel showing a saved snippet, a formatting instruction, and the explicit Format action.",
      caption:
        "Local-first extension workflow; external providers receive only explicitly submitted text when configured.",
      tone: "light",
      kind: "screenshot",
    },

    relatedExperienceSlugs: [],
    seo: {
      title: "FormatClip Local-First Chrome Extension",
      description:
        "Manifest V3 text-formatting extension with explicit user action, local settings, a typed FastAPI backend, deterministic mock mode, and an auditable v1.0.0 release.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 06
  {
    slug: "rf-signal-classification-research",
    title: "RF Signal Classification Research",
    shortTitle: "RF Signal Classification",
    eyebrow: "Machine Learning Research",
    ownership: "research",
    attribution:
      "Completed as a Machine Learning Researcher at the Royal Military College of Canada.",
    displayDate: "May – September 2025",
    dateStart: "2025-05",
    dateEnd: "2025-09",
    statusLabel: "Research project",
    featured: false,
    archive: false,
    sortOrder: 6,
    categories: ["Research", "ML"],
    displayTags: ["PyTorch", "CNNs", "RTL-SDR", "Signal Processing", "Python"],
    stack: [
      "PyTorch",
      "CNNs",
      "RTL-SDR",
      "Signal Processing",
      "Python",
      "NumPy",
      "Embedded Inference",
    ],

    oneLine:
      "PyTorch CNN research for classifying five RF signal categories from a 150,000-sample corpus and evaluating robustness under noisy conditions.",
    summary:
      "Developed and compared more than five convolutional architectures, improved noisy-condition accuracy by about 10%, and contributed to a roughly 2 Hz embedded inference pipeline.",
    problem:
      "RF classification models must distinguish signal types while remaining useful under noise and deployment constraints. The work explored model architecture, data handling, augmentation, evaluation, and embedded inference rather than optimizing a single clean-data score.",
    role: "Worked as a Machine Learning Researcher at the Royal Military College of Canada from May through September 2025, developing and evaluating CNN architectures, preparing RF data captured with RTL-SDR hardware, analyzing noisy-condition behaviour, and supporting embedded deployment.",

    whatBuilt: [
      "RF data-processing and training workflows in Python and PyTorch.",
      "More than five CNN architectures for comparative evaluation.",
      "Five-class classification over a corpus of approximately 150,000 samples.",
      "Noise-oriented augmentation and preprocessing experiments.",
      "Evaluation on held-out and unseen data.",
      "Embedded inference integration operating at approximately 2 Hz.",
      "Research analysis and iteration with the RMC team.",
    ],

    architecture: [
      {
        label: "Capture",
        title: "RTL-SDR capture",
        body: "Real-world RF captures collected with software-defined radio hardware.",
      },
      {
        label: "Dataset",
        title: "Corpus construction",
        body: "Approximately 150,000 samples across five signal classes.",
      },
      {
        label: "Prepare",
        title: "Preprocessing",
        body: "Spectrogram normalization, augmentation, and frequency-offset sampling.",
      },
      {
        label: "Model",
        title: "CNN comparison",
        body: "More than five PyTorch architectures trained and compared.",
      },
      {
        label: "Evaluate",
        title: "Held-out evaluation",
        body: "Unseen-signal accuracy and noisy-condition behaviour.",
      },
      {
        label: "Deploy",
        title: "Embedded inference",
        body: "Latency-accuracy variants running at approximately 2 Hz.",
      },
    ],

    technicalDecisions: [
      "Compare several architectures instead of reporting only the final network.",
      "Treat noisy conditions as a first-class constraint rather than an afterthought.",
      "Connect model development to the embedded inference cadence it had to hit.",
      "Report approximate research outcomes and dataset scale without implying public reproducibility.",
    ],

    proof: [
      "Approximately 90% average accuracy on unseen real-world signals across five classes.",
      "Approximately 10% improvement in noisy-band generalization through augmentation and normalization.",
    ],

    testingAndValidation: [
      "Evaluation on held-out and unseen real-world signals.",
      "Comparative evaluation across more than five architectures.",
      "Noisy-condition evaluation treated as a separate result rather than folded into the headline figure.",
    ],

    metrics: [
      {
        value: "≈90%",
        label: "Average accuracy on unseen signals",
        methodology:
          "Research-role result as reported in the current Master and MLE/SWE resumes and the LinkedIn record.",
        qualifier:
          "Approximate, reported by the research role. No public repository, paper, or dataset supports independent reproduction.",
      },
      {
        value: "≈10%",
        label: "Improvement in noisy-band generalization",
        methodology:
          "Source wording is “improved by ~10%”, achieved through augmentation, learning-rate decay, frequency-offset sampling, and spectrogram normalization.",
        qualifier:
          "The source does not state whether this is a relative lift or ten percentage points; it is reported as written.",
      },
      {
        value: "150K / 5",
        label: "Labeled samples and signal classes",
        methodology:
          "Dataset scale as reported in the current resumes and LinkedIn record.",
      },
      {
        value: "≈2 Hz",
        label: "Embedded inference cadence",
        methodology:
          "Refresh rate supported by the embedded inference pipeline.",
        qualifier: "An inference cadence, not a latency percentile.",
      },
    ],

    limitations: [
      "No public code, paper, dataset, or demo.",
      "Dataset provenance and exact split details are not public.",
      "Not production-deployed, and no operational use is claimed.",
      "No state-of-the-art performance claim.",
      "Signal classes, hardware context, and research applications beyond the public record are deliberately omitted.",
      "No precision, recall, F1, confusion matrix, parameter count, or inference-hardware figure is published.",
    ],

    outcome:
      "Approximately 90% accuracy on unseen data, an approximately 10% improvement in noisy-condition accuracy, and an embedded inference workflow running at about 2 Hz.",
    securityAndPrivacy:
      "Only the high-level project scale and approximate outcomes already present in the public resumes and LinkedIn record are published here. Code, raw data, signal details, and operational context are not public.",

    links: [],
    relatedExperienceSlugs: [
      "royal-military-college-machine-learning-researcher",
    ],
    seo: {
      title: "RF Signal Classification Research",
      description:
        "PyTorch CNN research on a five-class, 150,000-sample RF corpus, including noisy-condition evaluation and approximately 2 Hz embedded inference.",
    },
    lastVerified: VERIFIED,
  },

  // ------------------------------------------------------------------- 07
  {
    slug: "ml-analysis-tool",
    /* The old portfolio published this repository as "Regime Specialist Stock
       Predictor" with performance figures the source does not support. The
       route is kept and permanently redirected so the old link still resolves,
       but every unsupported claim is gone rather than migrated. */
    legacySlugs: ["regime-specialist-stock-predictor"],
    title: "Market Regime Modeling — Collaborative Research",
    shortTitle: "Collaborative Regime Modeling",
    eyebrow: "Collaborative Quantitative Research",
    ownership: "collaborative",
    attribution:
      "Repository owned by supermogaboy; Jacob contributed 9 commits.",
    displayDate: "Collaborative contribution",
    dateStart: "2025-01",
    dateEnd: "2025-06",
    statusLabel: "Collaborative / archived",
    featured: false,
    archive: true,
    sortOrder: 7,
    categories: ["Quant", "ML", "Research"],
    displayTags: [
      "Python",
      "Hidden Markov Models",
      "Classification",
      "Regression",
      "Feature Engineering",
    ],
    stack: [
      "Python",
      "Hidden Markov Models",
      "Classification",
      "Regression",
      "Feature Engineering",
      "scikit-learn",
    ],

    oneLine:
      "Collaborative exploration of market regimes and regime-conditional classification and regression, with Jacob credited as a contributor rather than the repository owner.",
    summary:
      "Uses engineered market features, hidden-state regime analysis, and separate classification and regression experiments by regime. Retained as an honest record of collaborative work, not as a validated forecasting product.",
    problem:
      "Explore whether market behavior can be segmented into regimes, and whether regime-conditional models provide a useful framework for studying direction and returns.",
    role: "Contributed code and research iterations to a public repository owned by supermogaboy. Jacob is a contributor, not the founder, owner, lead, or sole developer.",

    whatBuilt: [
      "Market feature engineering with 17 features.",
      "Hidden Markov Model / hidden-state regime analysis.",
      "Regime-conditional probability and return experiments.",
      "Four model variants per regime in the visible implementation.",
      "Logistic regression for classification.",
      "GradientBoostingRegressor for return modeling.",
    ],

    architecture: [],

    technicalDecisions: [
      "Segment the series into hidden states before fitting per-regime models, rather than fitting one model across all conditions.",
      "Separate the direction question from the return question into distinct classification and regression experiments.",
    ],

    proof: [
      "9 commits by Jacob in a repository owned by supermogaboy.",
      "17 engineered market features feeding hidden-state regime analysis.",
    ],

    testingAndValidation: [
      "No CI, automated test suite, or reproducibility harness is present in the public repository.",
      "The audit found train/test overlap risk in the collaborative implementation, so no model-performance figure from this project is published here.",
    ],

    metrics: [
      {
        value: "9",
        label: "Commits by Jacob",
        methodology:
          "Counted from the public repository history at revision 1300b7d.",
        date: "2026-08-17",
      },
      {
        value: "17",
        label: "Engineered market features",
        methodology: "Counted from the checked-in feature construction.",
        date: "2026-08-17",
      },
    ],

    limitations: [
      "A collaborative, exploratory repository — not a product.",
      "No verified license.",
      "No verified live demo.",
      "Train/test boundaries are not demonstrably free of overlap, so no performance figure is published.",
      "Not the same project as the separately owned Market Regime + Portfolio Risk Platform.",
      "Repository-owner work must not be read as authored by Jacob.",
    ],

    outcome:
      "Contributed to a collaborative regime-modeling prototype spanning engineered market features, hidden-state regimes, and per-regime classification and regression. Reviewing the project later reinforced the importance of chronological validation, leakage controls, and explicit research limitations — principles applied in the newer Market Regime + Portfolio Risk Platform.",

    links: [
      {
        kind: "source",
        label: "View collaborative repository",
        href: "https://github.com/supermogaboy/ML-Analysis-tool",
        note: "Repository owned by supermogaboy; Jacob contributed 9 commits.",
      },
    ],

    relatedExperienceSlugs: ["utefa-sales-trading-analyst"],
    seo: {
      title: "Collaborative Market Regime Modeling",
      description:
        "An honestly attributed collaborative exploration of engineered market features, hidden-state regimes, and regime-conditional classification and regression.",
    },
    lastVerified: VERIFIED,
  },
];

/** Index order is the single source of truth for card, rail and next/prev. */
export const allProjects = [...projects].sort(
  (a, b) => a.sortOrder - b.sortOrder
);

// ------------------------------------------------------------------ derived

/** Index order: everything owned or research-backed, then the archive. */
export const primaryProjects = allProjects.filter((p) => !p.archive);
export const archiveProjects = allProjects.filter((p) => p.archive);

/** Homepage "Selected work": the five owned, public, flagship records. */
export const featuredProjects = allProjects.filter((p) => p.featured);

/** The lead card on the homepage showcase. */
export const featuredProject = featuredProjects[0];

/** The rest of the homepage list — featured tail plus the research preview. */
export const previewProjects = allProjects.filter(
  (p) => !p.archive && p !== featuredProject
);

export const projectSlugs = allProjects.map((p) => p.slug);

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}

/**
 * Previous/next, walking the index order and wrapping. Derived rather than
 * stored, so a reordering cannot leave a `nextProjectSlug` pointing at a
 * record that has moved or gone.
 */
export function getAdjacentProjects(slug: string) {
  const index = allProjects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: allProjects[(index - 1 + allProjects.length) % allProjects.length],
    next: allProjects[(index + 1) % allProjects.length],
  };
}

/** Filter buttons for the index, with counts computed from the records. */
export const projectFilters = [
  { key: "All", count: allProjects.length },
  ...projectCategories.map((category) => ({
    key: category,
    count: allProjects.filter((p) => p.categories.includes(category)).length,
  })),
] as const;

export const ownershipLabels: Record<Project["ownership"], string> = {
  owned: "Owned project",
  collaborative: "Collaborative / Archive",
  research: "Research role",
};

/** The one metric a card shows. Prefers a figure that carries a comparison. */
export function headlineMetric(project: Project): Metric | undefined {
  return project.metrics[0];
}
