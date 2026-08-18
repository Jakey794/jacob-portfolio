# Project captures

**The files served from `public/images/projects/` and `public/images/og/` are
derived assets. Do not edit them by hand.**

Sanitized source captures live outside the web-addressable tree in
`assets/captures/`. Run the complete media build from the repository root:

```sh
npm run media
```

`scripts/build-media.mjs` re-encodes every source, strips embedded metadata,
and writes:

- 1600×1000 `public/images/projects/<slug>-wide.webp` card images;
- 1100×688 `public/images/projects/<slug>-detail.webp` detail crops; and
- 1200×630 `public/images/og/<slug>.jpg` social cards.

The configured captures are LLM EvalOps, Market Regime + Portfolio Risk,
Incident Triage Copilot, and FormatClip. Projects without captures receive a
generated text-based social card from the same script.

## Privacy boundary

Raw screenshots are whole application or browser windows and can contain
browser chrome, bookmarks, account avatars, or other personal UI. Anything
under `public/` is directly addressable, even when no page links to it. Raw
captures therefore stay in `assets/captures/`; only the byte-cropped,
re-encoded derivatives belong under `public/`.

Set a project's `media.wide`, `media.detail`, and `media.social` fields in
`lib/projects.ts` to these derivatives, never to a raw capture. To add a new
capture, place `<slug>.png` in `assets/captures/`, add its crop configuration
to `CAPTURES` in `scripts/build-media.mjs`, run `npm run media`, and review all
three outputs for personal information before publishing.
