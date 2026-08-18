/**
 * Derives every shipped project image from the sources in `assets/captures/`.
 *
 *   node scripts/build-media.mjs
 *
 * Why the sources live outside `public/`: a raw capture is a whole browser
 * window and carries toolbars, bookmark bars and account avatars. Anything
 * under `public/` is web-addressable, so a raw file placed there is published
 * whether or not a page references it. The sources stay out of the served tree
 * and only the crops below are written into it.
 *
 * Every derivative is re-encoded from pixels, so EXIF, ICC profiles and any
 * other embedded metadata are dropped rather than passed through. Colour is
 * normalised to sRGB.
 *
 * Add a capture by dropping `<slug>.png` into `assets/captures/` and adding an
 * entry to CAPTURES. `crop` is optional and is applied before any resize; it
 * exists to remove browser chrome from the bytes rather than hiding it behind
 * `object-fit`, which re-crops per container and can bring the chrome back.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "assets/captures");
const CARDS = path.join(root, "public/images/projects");
const SOCIAL = path.join(root, "public/images/og");

/** Card slot: 16:10, sized for the widest slot any card renders at. */
const WIDE = { width: 1600, height: 1000 };
/** Detail slot: a zoomed region that still reads at thumbnail size. */
const DETAIL = { width: 1100, height: 688 };
/** Open Graph. Fixed by the specification at exactly 1200x630. */
const SOCIAL_SIZE = { width: 1200, height: 630 };

const CAPTURES = [
  {
    slug: "llm-evalops",
    title: "LLM Reliability + EvalOps Platform",
    kicker: "Evaluation runs, graders, and CI quality gates",
    // Dark product UI already; only the outer 4% is trimmed to reach 16:10.
    wideFocus: "top",
    // The four run metrics across the top of the dashboard.
    detailCrop: { left: 40, top: 250, width: 1180, height: 738 },
    socialCrop: { left: 0, top: 0, width: 1999, height: 1050 },
  },
  {
    slug: "market-regime-risk",
    title: "Market Regime + Portfolio Risk Platform",
    kicker: "Portfolio risk, regime diagnostics, and cost-aware backtests",
    wideFocus: "top",
    // The risk metric grid, above the benchmark chart.
    detailCrop: { left: 40, top: 20, width: 1250, height: 781 },
    socialCrop: { left: 0, top: 0, width: 1999, height: 1050 },
  },
  {
    slug: "incident-triage",
    title: "Incident Triage Copilot",
    kicker: "Structured triage from messy operational context",
    wideFocus: "top",
    // The structured response column: severity, impacted service, summary.
    detailCrop: { left: 1040, top: 0, width: 803, height: 502 },
    socialCrop: { left: 0, top: 0, width: 1843, height: 968 },
  },
  {
    slug: "formatclip",
    // The source is a whole Google Docs window. The top strip is the editor
    // toolbar and ruler; both are application chrome, not the extension, and
    // are cut out of the bytes here.
    crop: { left: 380, top: 132, width: 2610, height: 1348 },
    title: "FormatClip",
    kicker: "Local-first Chrome extension with an explicit format action",
    wideFocus: "right",
    // The extension side panel: the product itself, rather than the document.
    // `detailCrop` and `socialCrop` are in post-`crop` coordinates.
    detailCrop: { left: 1830, top: 200, width: 780, height: 488 },
    socialCrop: { left: 700, top: 0, width: 1910, height: 1003 },
  },
];

const BRAND = {
  ink: "#e4e7ed",
  muted: "#9299a7",
  accent: "#8590f6",
  background: "#080b12",
};

function escapeXml(value) {
  return value.replace(
    /[<>&'"]/g,
    (c) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[
        c
      ]
  );
}

/**
 * Wraps a title onto at most two lines at roughly the width the card allows.
 * Long single words are never broken — they overhang instead, which is far
 * less visible than a hyphenated split at this size.
 */
function wrap(text, maxChars, maxLines) {
  const lines = [];
  let line = "";

  for (const word of text.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = candidate;
    }
  }

  if (lines.length < maxLines) lines.push(line);
  return lines.filter(Boolean);
}

/**
 * The social card: the capture, graded back hard, under a title block.
 *
 * The capture is kept rather than replaced with flat colour so the card still
 * shows the real product, but it is dimmed to roughly a third so the type
 * stays legible against it at the size these are actually seen.
 */
function socialOverlay({ title, kicker }) {
  const { width, height } = SOCIAL_SIZE;
  const titleLines = wrap(title, 30, 2);
  const titleSize = titleLines.length > 1 ? 62 : 70;
  const titleTop = 268;

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${BRAND.background}" stop-opacity="0.74"/>
      <stop offset="46%" stop-color="${BRAND.background}" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="${BRAND.background}" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND.accent}" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#scrim)"/>
  <rect x="72" y="86" width="3" height="34" fill="${BRAND.accent}" fill-opacity="0.8"/>
  <text x="96" y="112" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="27" font-weight="500" fill="${BRAND.ink}">Jacob Allan</text>
  <text x="${width - 72}" y="112" text-anchor="end" font-family="Menlo, Consolas, monospace" font-size="18" letter-spacing="3.4" fill="${BRAND.muted}" fill-opacity="0.85">SOFTWARE · ML · QUANT</text>
  <rect x="72" y="${titleTop - 74}" width="${width - 144}" height="1" fill="url(#rule)"/>
  ${titleLines
    .map(
      (line, index) =>
        `<text x="72" y="${titleTop + index * (titleSize + 12)}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${titleSize}" font-weight="500" letter-spacing="-1.6" fill="${BRAND.ink}">${escapeXml(line)}</text>`
    )
    .join("\n  ")}
  <text x="72" y="${titleTop + titleLines.length * (titleSize + 12) + 24}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="27" fill="${BRAND.muted}">${escapeXml(kicker)}</text>
  <rect x="72" y="${height - 96}" width="26" height="2" fill="${BRAND.accent}" fill-opacity="0.7"/>
  <text x="112" y="${height - 88}" font-family="Menlo, Consolas, monospace" font-size="19" letter-spacing="2.4" fill="${BRAND.muted}" fill-opacity="0.8">jacob-portfolio-six.vercel.app</text>
</svg>`);
}

/** The same card, with no capture behind it, for pages that have no media. */
function plainSocial({ title, kicker }) {
  const { width, height } = SOCIAL_SIZE;

  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: BRAND.background,
    },
  })
    .composite([
      {
        input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <radialGradient id="haze" cx="0.62" cy="0.3" r="0.75">
      <stop offset="0%" stop-color="#3e4888" stop-opacity="0.42"/>
      <stop offset="52%" stop-color="#1a203e" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${BRAND.background}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M46 0H0V46" fill="none" stroke="#94a3b8" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#haze)"/>
</svg>`),
        top: 0,
        left: 0,
      },
      { input: socialOverlay({ title, kicker }), top: 0, left: 0 },
    ])
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" });
}

async function build() {
  await mkdir(CARDS, { recursive: true });
  await mkdir(SOCIAL, { recursive: true });

  const written = [];

  for (const capture of CAPTURES) {
    const source = path.join(SRC, `${capture.slug}.png`);

    if (!existsSync(source)) {
      console.warn(`  skip  ${capture.slug} — no source at assets/captures/`);
      continue;
    }

    const base = sharp(await readFile(source)).toColorspace("srgb");
    const cropped = capture.crop
      ? base.clone().extract(capture.crop)
      : base.clone();
    const bytes = await cropped.png().toBuffer();

    const wide = path.join(CARDS, `${capture.slug}-wide.webp`);
    await sharp(bytes)
      .resize({ ...WIDE, fit: "cover", position: capture.wideFocus ?? "top" })
      .webp({ quality: 84, effort: 6 })
      .toFile(wide);
    written.push(wide);

    const detail = path.join(CARDS, `${capture.slug}-detail.webp`);
    await sharp(bytes)
      .extract(capture.detailCrop)
      .resize({ ...DETAIL, fit: "cover", position: "top" })
      .webp({ quality: 86, effort: 6 })
      .toFile(detail);
    written.push(detail);

    const social = path.join(SOCIAL, `${capture.slug}.jpg`);
    await sharp(bytes)
      .extract(capture.socialCrop)
      .resize({ ...SOCIAL_SIZE, fit: "cover", position: "top" })
      .composite([{ input: socialOverlay(capture), top: 0, left: 0 }])
      .jpeg({ quality: 86, chromaSubsampling: "4:4:4" })
      .toFile(social);
    written.push(social);
  }

  /* Pages with no capture of their own still need a social card. */
  const generated = [
    {
      name: "default",
      title: "Software, ML & Quantitative Systems",
      kicker: "Jacob Allan — Engineering Science, University of Toronto",
    },
    {
      name: "low-latency-trading-engine",
      title: "Event-Driven Trading Engine",
      kicker: "Deterministic Rust matching, replay, risk controls",
    },
    {
      name: "rf-signal-classification-research",
      title: "RF Signal Classification Research",
      kicker: "PyTorch CNNs over a five-class, 150,000-sample corpus",
    },
    {
      name: "ml-analysis-tool",
      title: "Collaborative Market Regime Modeling",
      kicker: "Contributed research on hidden-state market regimes",
    },
    {
      name: "projects",
      title: "Projects",
      kicker: "Systems and research with source, validation, and limits",
    },
    {
      name: "experience",
      title: "Experience",
      kicker: "Software, applied ML research, and quantitative work",
    },
    {
      name: "about",
      title: "About Jacob Allan",
      kicker: "Secure systems, careful evaluation, explicit boundaries",
    },
    {
      name: "contact",
      title: "Contact",
      kicker: "Software, ML, quantitative development, and research",
    },
  ];

  for (const card of generated) {
    const file = path.join(SOCIAL, `${card.name}.jpg`);
    await plainSocial(card).toFile(file);
    written.push(file);
  }

  /*
    App icon for the web manifest. Drawn rather than photographed: the
    wordmark's accent bar over the page background, at the one size the
    manifest asks for.
  */
  const icon = path.join(root, "public/icon.png");
  await sharp({
    create: { width: 512, height: 512, channels: 3, background: BRAND.background },
  })
    .composite([
      {
        input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <defs>
    <radialGradient id="haze" cx="0.5" cy="0.36" r="0.72">
      <stop offset="0%" stop-color="#3e4888" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${BRAND.background}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#haze)"/>
  <rect x="112" y="150" width="8" height="212" fill="${BRAND.accent}" fill-opacity="0.85"/>
  <text x="164" y="330" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="230" font-weight="500" letter-spacing="-8" fill="${BRAND.ink}">JA</text>
</svg>`),
        top: 0,
        left: 0,
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(icon);
  written.push(icon);

  /* A manifest the content checks read, so a record cannot point at a
     derivative that was never generated. */
  const manifest = written
    .map((file) => `/${path.relative(path.join(root, "public"), file)}`)
    .sort();
  await writeFile(
    path.join(root, "assets/captures/manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
  );

  for (const file of manifest) console.log(`  wrote ${file}`);
  console.log(`\n${manifest.length} derivatives written.`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
