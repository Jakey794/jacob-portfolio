# Page atmosphere plates

One plate per standalone route, plus one record-specific experience plate.
Every inner page used to open on the same crop
of `hero/mountains.png` and was differentiated only by luminance and
saturation, so `/about`, `/projects`, `/experience` and `/contact` read as the
same page four times.

All plates are the same **1672x941** frame as the hero plate, which is why the
crop geometry in `pageAtmospheres` transfers directly between them. Keep that
size if any of these is ever replaced.

| File             | Route(s)                        | Why this composition |
| ---------------- | ------------------------------- | -------------------- |
| `about.jpg`      | `/about`                        | A lone summit in deep fog. The left two thirds are almost pure black, so the masthead sits on empty frame — the quietest plate, and the only one with a single subject rather than a range. |
| `projects.jpg`   | `/projects`, `/projects/[slug]` | A storm cell over a distant ridge. Almost the whole frame is empty sky with one bright event held at the far right, so the band gives the page energy without putting anything behind the product captures. |
| `experience.jpg` | `/experience`, most `/experience/[slug]` routes | A high-key snowfield under cloud. Cold and high micro-contrast; cropped into the lit ridge it is the brightest and most clinical of the set, and the preset closes it with a drawn horizon that the timeline reads as its baseline. |
| `northstar-experience.jpg` | `/experience/northstar-downhole-software-engineering-intern` | A generated, conceptual blue-hour rig scene with deep copy-safe sky at left. It is not an employer photograph or a real jobsite. The structured public-scope workflow remains the clicked page's masthead visual. |
| `contact.jpg`    | `/contact`                      | Still water at dusk — the only horizontal, restful plate. Softened and run long so the band never resolves to a visible edge. |

Detail routes normally reuse their index's plate at a different crop, so a case
study is recognisably part of its section without being the same picture twice.
Northstar is the single exception and selects its plate through the record's
`detailAtmosphere` field.

## Encoding

The four original sources were 1.8-2.0 MB PNGs and were committed as JPEG at
quality 86:

```
sips -s format jpeg -s formatOptions 86 <source>.png --out <name>.jpg
```

That is ~1.1 MB for all four rather than ~7.5 MB. They are photographic and
sit under scrims at 60-90% opacity, so there is nothing for PNG to preserve.

The Northstar master stays outside `public/` under `assets/artwork/` and is
re-encoded to a 1672×941 JPEG by `npm run media`, which strips source metadata
and keeps the served derivative reproducible.

## Replacing one

Change nothing but the file. Every other dial — crop, brightness, contrast,
saturation, opacity, scrim strength and reach, dissolve length, blur, the
optional horizon rule — lives in `pageAtmospheres` in
`components/page-atmosphere.tsx` and is documented against each preset.

If a replacement is not 1672x941, re-check `position` on that preset: it is an
`object-position` against this frame.
