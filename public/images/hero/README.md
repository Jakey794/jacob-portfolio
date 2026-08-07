# Hero assets

| File            | Source                                              | Notes |
| --------------- | --------------------------------------------------- | ----- |
| `mountains.png` | `HP seperate 2.png` (1672x941, copied unchanged)     | Used full-bleed via `object-cover object-center`. The hero grading assumes the bright cloud break sits upper-right and the left third stays dark, since the headline sits over it. |
| `portrait.png`  | `HP seperate.png` (1536x1024), white background keyed out | The supplied file was RGB with a solid white background, so it could not composite over the dark scene. The white was removed by flood-filling from the frame edge (leaving interior mid-tones such as the face intact) and unmultiplying the white spill from the soft hair edges. |

## Portrait geometry

`components/hero.tsx` positions the plate from the subject's measured alpha
bounding box, so it must be re-derived if the portrait is ever re-cut:

- subject spans **47.3%** of the frame width
- subject is centred at **55.5%** of the frame width
- crown sits **2.2%** down from the top edge
- torso runs off the bottom edge

## Follow-ups

- The keyed cutout is an automated luminance/flood-fill key, not a hand-made
  mask. It holds up at hero scale, but a manual cutout would be more robust —
  worth checking the hair edge against a light background if the theme ever
  gains a light mode.
- `mountains.png` is ~1.9 MB. `next/image` re-encodes it to WebP/AVIF on
  delivery, so this only costs repository size. To trim it:
  `sips -s format jpeg -s formatOptions 90 mountains.png --out mountains.jpg`
  then update the `src` in `HeroBackdrop`.
