# Jacob Allan Portfolio

Personal portfolio website for showcasing machine learning, data engineering,
and full-stack AI projects.

**Live site:** [jacob-portfolio-six.vercel.app](https://jacob-portfolio-six.vercel.app/)

## Featured Projects

### Incident Triage Copilot
Full-stack AI incident triage app that converts alerts, logs, deployment notes, service context, and metrics into structured severity, root-cause, next-action, and confidence outputs.

**Stack:** Next.js, React, TypeScript, FastAPI, Python, Pydantic, Groq, Vercel, Google Cloud Run, pytest

### FormatClip
Chrome MV3 side-panel extension and FastAPI backend for saving snippets, formatting selected text, and reusing cleaned outputs with provider-swappable LLM support.

**Stack:** Chrome MV3, WXT, React, TypeScript, Tailwind, FastAPI, Python, Pydantic, Groq/OpenAI provider modes, pytest, Ruff, Biome

### RF Signal Classifier
Machine learning system for classifying RF spectrograms from RTL-SDR captures using custom Python data collection, preprocessing, and PyTorch CNN training pipelines.

**Stack:** Python, PyTorch, NumPy, SciPy, RTL-SDR, CNNs, data pipelines

## Focus Areas

- Software engineering
- Data engineering
- Applied machine learning
- Full-stack AI applications
- Model evaluation and deployment

## Local Development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run check
npm audit --audit-level=high
```

`npm run check` runs ESLint, TypeScript validation, and a production Next.js
build. GitHub Actions runs the same checks on pushes and pull requests.

## Security

The portfolio contains no user accounts, data collection, or server-side
credentials. Keep deployment configuration in the hosting provider and do not
commit `.env` files or private keys. See [SECURITY.md](SECURITY.md) for the
reporting policy.

## License

Source code is available under the [MIT License](LICENSE). The name, resume,
photographs, and other personal portfolio content are not licensed for reuse.
