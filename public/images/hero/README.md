# Hero assets

| File            | Source                                            | Notes |
| --------------- | ------------------------------------------------- | ----- |
| `mountains.png` | `HP seperate 2.png` (1672x941, copied unchanged)   | Used full-bleed via `object-cover object-[62%_center]`. The hero grading assumes the bright cloud break sits upper-right and the left third stays dark, since the headline sits over it. |
| `portrait.png`  | `HP seperate.png` (1536x1024), white background removed | RGB with a solid white studio background. See below — the first key left a white matte behind, which has since been removed. |

## Portrait: white matte removal

The supplied PNG **was** alpha-transparent, so the problem was not a missing
cutout. It was that the key was a hard luminance threshold against a white
background, which left the white blended into the pixels it kept:

| Measure (silhouette edge band) | Before | After |
| ------------------------------ | -----: | ----: |
| Mean luminance                 |  170.2 |  36.5 |
| Pixels brighter than 170        |  62.9% |  0.0% |
| Partially transparent pixels    |  2,338 | 21,323 |

Two artefacts came out of that threshold:

1. a 1–3px ring of white-blended pixels hugging the entire silhouette — the
   visible halo, 97% of it fully neutral in hue, so unambiguously matte
   rather than rim light;
2. pockets of untouched pure white (RGB 252–255) trapped inside the hair at
   the crown, which a flood fill from the frame edge could never reach — the
   bright cap over the hairline.

Both were removed by `scripts/unmatte-portrait.mjs`, which solves
`C = a*F + (1-a)*255` for the foreground and stabilises the result against
the local interior colour where there is too little coverage to divide by.
Warm pixels are excluded so genuine skin is never un-matted, and interior
pixels — face, jacket, backpack — are left byte-identical. The file also got
smaller: 969 KB → 327 KB.

The alpha bounding box is unchanged to within a pixel, so the hero geometry
below still holds.

## Portrait geometry

`components/hero.tsx` positions the plate from the subject's measured alpha
bounding box, so it must be re-derived if the portrait is ever re-cut:

- subject spans **47.3%** of the frame width
- subject is centred at **55.5%** of the frame width
- crown sits **2.2%** down from the top edge
- torso runs off the bottom edge

The plate is `object-contain`, so it scales to the box *height* on short
viewports. The container therefore starts below the navigation
(`lg:top-[5.25rem]`), which bounds the drawn height and stops the crown from
climbing into the nav — it previously collided with "About" at a 713px-tall
viewport.

## Follow-ups

- The cutout is still an automated key, now decontaminated, rather than a
  hand-made mask. It holds up at hero scale on a dark background; a manual
  cutout would be more robust if the theme ever gains a light mode.
- `mountains.png` is ~1.9 MB. `next/image` re-encodes it to WebP/AVIF on
  delivery, so this only costs repository size. To trim it:
  `sips -s format jpeg -s formatOptions 90 mountains.png --out mountains.jpg`
  then update the `src` in `HeroBackdrop`.
- **No unique photography exists for the inner pages.** `/about`,
  `/projects`, `/experience`, `/contact` and both detail routes all point at
  `mountains.png` and are differentiated only by crop, luminance, saturation
  and opacity. See `pageAtmospheres` in `components/page-atmosphere.tsx` —
  each preset only needs its `src` changed when its own image arrives.
