# Project captures

**These are derived files. Do not edit them by hand.**

`scripts/crop-captures.mjs` produces everything here from the raw screenshots
one directory up (`../incident-triage.png`, `../formatclip.png`), which stay in
the repo unchanged so the crops are reproducible and reviewable:

```
node scripts/crop-captures.mjs
```

| File                          | From                   | Slot |
| ----------------------------- | ---------------------- | ---- |
| `incident-triage-wide.jpg`    | `incident-triage.png`  | Featured card, case-study masthead, homepage showcase |
| `incident-triage-detail.jpg`  | `incident-triage.png`  | Index rows, case-study evidence tile |
| `formatclip-wide.jpg`         | `formatclip.png`       | as above |
| `formatclip-detail.jpg`       | `formatclip.png`       | as above |

## Why the raw files are never served

The raw screenshots are whole browser windows, and they carry three things
that must not reach a recruiting site:

1. `incident-triage.png` opens with a saturated red browser toolbar and a
   **personal bookmarks bar** — real browsing history, and the only hue on the
   page that fights the indigo palette.
2. `formatclip.png` opens with the Google Docs title bar and the **account
   avatar**.
3. Both carry wide areas of empty page gutter that are not the product.

This was first solved in CSS with crop fractions. That is not safe:
`object-fit: cover` re-crops whatever it is given to fit its container, so at
some container aspect ratios the toolbar came back into frame. Cropping the
bytes is deterministic — the chrome cannot reappear because it is no longer in
the file — and it drops roughly 75% of the delivered weight.

Set `image` and `imageDetail` on a project in `lib/projects.ts` to a file here,
never to a raw capture.

## Known issue

`formatclip-wide.jpg` still contains the extension panel's own **red border**
as a thin vertical line about three quarters across. It is interior to the
frame, so no crop that keeps both the document and the panel can remove it.
`formatclip-detail.jpg` is inset past it on all four sides and is clean.

A re-shot capture without that border — ideally in a dark theme, at 16:9, with
no browser chrome and no personal data on screen — would remove the last
compromise in the project media.
