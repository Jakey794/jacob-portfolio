# Portfolio Redesign Rules

## Goal
Upgrade this portfolio into a premium technical portfolio for ML/software/quant internship recruiting.

The site should feel:
- fast
- minimal
- premium
- technical
- proof-heavy
- not AI-template-generated

Visual direction:
Apple spacing + OpenAI restraint + Nike confidence + engineering proof.

## Stack
Use the existing stack:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion / motion where already installed
- Vercel deployment

Do not add heavy dependencies without approval.

## Product constraints
The site must:
- load fast
- work well on mobile
- preserve accessibility
- keep semantic HTML
- avoid scroll-jacking
- avoid particle spam / cyberpunk effects / generic AI blobs
- preserve correct resume/contact facts

## Portfolio positioning
Jacob Allan is an Engineering Science student at UofT building:
- ML systems
- full-stack AI tools
- quantitative software

Homepage should quickly answer:
- who Jacob is
- what he builds
- why he is credible
- what to click next

## Project hierarchy
Primary projects:
1. LLM Reliability + EvalOps Platform
2. Incident Triage Copilot
3. Low-Latency Event-Driven Trading Engine
4. Market Regime + Portfolio Risk Platform
5. FormatClip

Research:
- RF Signal Classification Research

Collaborative / archive:
- Collaborative Market Regime Modeling (`ML-Analysis-tool`), with contribution
  scope and repository ownership stated explicitly

Every project record should preserve its source, validation method,
limitations, and ownership boundary.

## Quality requirements
Before finishing implementation tasks, run:
- npm run media
- npm run build
- npm run lint
- npm run typecheck
- npm run check:content

Prefer small, reviewable changes.
