/**
 * Derives the project captures that actually ship from the raw screenshots.
 *
 * The two committed screenshots are whole browser windows. They contain three
 * things that must never reach the page:
 *
 *   1. `incident-triage.png` opens with a saturated red browser toolbar and a
 *      personal bookmarks bar ("Top MTG Decks", "RYSE Supplement…"). That is
 *      somebody's browsing history on a recruiting site, and the red is the
 *      one hue on the page that fights the indigo palette.
 *   2. `formatclip.png` opens with the Google Docs title bar and the account
 *      avatar.
 *   3. Both carry large areas of empty page gutter that are not the product.
 *
 * This was first solved in CSS, with crop fractions applied through an
 * oversized inner frame. That is not safe: `object-fit: cover` re-crops
 * whatever it is given to fit the container, so at some container aspect
 * ratios the toolbar came back into frame. Cropping the bytes instead is
 * deterministic — the chrome cannot reappear because it is no longer in the
 * file — and it drops ~75% of the delivered weight.
 *
 * Rectangles are in source pixels, measured off the committed originals. The
 * originals stay in the repo unchanged so this is reproducible and reviewable.
 *
 *   node scripts/crop-captures.mjs
 *
 * `sharp` is not a direct dependency; it resolves through next's install.
 */
import sharp from "sharp";

/**
 * `wide` fills the large slots (featured card, case-study masthead) and is
 * held near 16:9 so `object-cover` has little left to trim. `detail` is the
 * one region of each product that still reads at thumbnail size, and is held
 * landscape for the same reason.
 */
const CAPTURES = [
  {
    source: "public/images/incident-triage.png",
    // 2362x1640. Left edge clears the empty page gutter, top clears the
    // toolbar and bookmarks bar.
    wide: {
      out: "public/images/projects/incident-triage-wide.jpg",
      left: 413,
      top: 139,
      width: 1843,
      height: 1100,
    },
    // The triage output column: severity, impacted service, and the head of
    // the generated summary — the part that shows what the tool produces.
    detail: {
      out: "public/images/projects/incident-triage-detail.jpg",
      left: 1540,
      top: 160,
      width: 730,
      height: 460,
    },
  },
  {
    source: "public/images/formatclip.png",
    // 3022x1640. Top clears the Docs title bar and account avatar; the sides
    // clear the outer edge of the extension panel's red border.
    wide: {
      out: "public/images/projects/formatclip-wide.jpg",
      left: 16,
      top: 130,
      width: 2990,
      height: 1480,
    },
    // Inside the extension panel, past its red border on every side.
    detail: {
      out: "public/images/projects/formatclip-detail.jpg",
      left: 2295,
      top: 560,
      width: 710,
      height: 445,
    },
  },
];

for (const capture of CAPTURES) {
  const { width: sw, height: sh } = await sharp(capture.source).metadata();

  for (const key of ["wide", "detail"]) {
    const { out, ...rect } = capture[key];

    if (
      rect.left < 0 ||
      rect.top < 0 ||
      rect.left + rect.width > sw ||
      rect.top + rect.height > sh
    ) {
      throw new Error(
        `${capture.source}: ${key} rectangle falls outside ${sw}x${sh}`
      );
    }

    await sharp(capture.source)
      .extract(rect)
      .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
      .toFile(out);

    console.log(
      `${out}  ${rect.width}x${rect.height}  (${(rect.width / rect.height).toFixed(2)}:1)`
    );
  }
}
