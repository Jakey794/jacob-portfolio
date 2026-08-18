# Project media

**The files served from `public/images/projects/`, `public/images/experience/`,
and `public/images/og/`, plus the generated Northstar atmosphere plate, are
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

## Conceptual thumbnails

Image-generated editorial masters live separately in `assets/artwork/`. They
are not product screenshots or evidence and must never be placed in a record's
full `media` field. The media build writes their 1600×1000 card derivatives,
and the content records reference those files through `thumbnailMedia` only.
That separation is deliberate: clicking a Trading Engine or RF card still
opens the structured system-architecture masthead and detailed architecture
panel.

The current conceptual thumbnails are:

- Low-Latency Event-Driven Trading Engine;
- RF Signal Classification Research; and
- Northstar Downhole Specialists experience.

The UI gives conceptual artwork a visible `Concept visual` disclosure. It is
not used as an Open Graph image, and no conceptual scene is presented as a real
jobsite, customer detail, internal interface, system, or measured result.

The Northstar master contains a blank equipment panel. During the media build,
the exact user-supplied mark in `assets/branding/northstar-mark.png` is converted
to a transparent overlay and placed on that panel. The generated approximation
is never shipped, and the source mark is not exposed as a standalone public
asset.

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

For conceptual card art, add the master to `assets/artwork/`, configure it in
`ARTWORKS`, and use `thumbnailMedia`. Do not reuse that field on a detail-page
masthead without an explicit design decision and an evidence review.
