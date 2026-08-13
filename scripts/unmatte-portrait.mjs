/**
 * Removes the white matte still baked into public/images/hero/portrait.png.
 *
 * The shipped file was keyed off a solid-white studio background with a hard
 * luminance threshold, so two artefacts survived:
 *
 *   1. a 1-3px ring of white-blended pixels hugging the whole silhouette
 *      (mean luminance 140 at d=1; 97% of the bright ones fully neutral),
 *   2. pockets of untouched pure white trapped inside the hair at the crown,
 *      which a flood fill from the frame edge could never reach.
 *
 * Both are the same problem. With a white background the observation is
 * C = a*F + (1-a)*255, so the minimum coverage consistent with C is
 * a = (255 - min_channel(C)) / 255 and F = 255 - (255 - C)/a.
 *
 * That algebra is exact but unstable: as a falls the division amplifies the
 * channel spread, turning warm-tinted spill into saturated speckle. So the
 * recovered colour is blended against the local interior colour (a blur of the
 * pixels well inside the silhouette), weighted by how much coverage there is
 * to divide by. Edges therefore resolve to the hair/jacket colour that
 * surrounds them instead of to amplified noise.
 *
 * Interior pixels — face, jacket, backpack — are left byte-identical.
 *
 * This has already been applied to the committed portrait; it is kept so the
 * transformation is reproducible and reviewable rather than an unexplained
 * binary change. Run it against the ORIGINAL white-matted source only — a
 * second pass over an already-corrected file would feather the alpha twice
 * and erode the hair edge.
 *
 *   node scripts/unmatte-portrait.mjs <source.png> <output.png>
 *
 * `sharp` is not a direct dependency; it resolves through next's install.
 */
import sharp from "sharp";

const SRC = process.argv[2] ?? "public/images/hero/portrait.png";
const OUT = process.argv[3] ?? "public/images/hero/portrait.png";

/** Width of the un-matting band, in pixels, measured in from the silhouette. */
const BAND = 6;
/** Full strength up to this distance, then ramps off to zero at BAND. */
const BAND_CORE = 1.6;
/** Gaussian sigma used to feather the hard binary alpha edge. */
const FEATHER_SIGMA = 0.7;
/** Saturation ramp above which a bright pixel is read as skin, not matte. */
const SPILL_SAT_LO = 18;
const SPILL_SAT_HI = 34;
/** Radius of the interior-colour blur used to stabilise the un-matte. */
const INTERIOR_RADIUS = 14;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = info.width;
const H = info.height;
const N = W * H;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const smooth = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

// ---------------------------------------------------------------- distance
// Chamfer distance from every opaque pixel to the nearest transparent one.
const INF = 1e9;
const dist = new Float32Array(N);
for (let i = 0; i < N; i++) dist[i] = data[i * 4 + 3] > 128 ? INF : 0;

const relax = (i, j, w) => {
  const d = dist[j] + w;
  if (d < dist[i]) dist[i] = d;
};
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (dist[i] === 0) continue;
    if (x > 0) relax(i, i - 1, 1);
    if (y > 0) relax(i, i - W, 1);
    if (x > 0 && y > 0) relax(i, i - W - 1, 1.414);
    if (x < W - 1 && y > 0) relax(i, i - W + 1, 1.414);
  }
}
for (let y = H - 1; y >= 0; y--) {
  for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x;
    if (dist[i] === 0) continue;
    if (x < W - 1) relax(i, i + 1, 1);
    if (y < H - 1) relax(i, i + W, 1);
    if (x < W - 1 && y < H - 1) relax(i, i + W + 1, 1.414);
    if (x > 0 && y < H - 1) relax(i, i + W - 1, 1.414);
  }
}

// -------------------------------------------------------- interior colour
// Separable box blur over "trustworthy" pixels only: well inside the
// silhouette, and not itself near-white. Weighted so the result is the mean
// interior colour in the neighbourhood rather than a blur toward the matte.
const srcR = new Float32Array(N);
const srcG = new Float32Array(N);
const srcB = new Float32Array(N);
const srcWgt = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const o = i * 4;
  const r = data[o];
  const g = data[o + 1];
  const b = data[o + 2];
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const trustworthy = data[o + 3] > 200 && dist[i] > 3 && lum < 185;
  if (!trustworthy) continue;
  srcR[i] = r;
  srcG[i] = g;
  srcB[i] = b;
  srcWgt[i] = 1;
}

function boxBlur(buf) {
  const out = new Float32Array(N);
  const tmp = new Float32Array(N);
  const R = INTERIOR_RADIUS;
  for (let y = 0; y < H; y++) {
    let acc = 0;
    for (let x = -R; x <= R; x++) acc += buf[y * W + clamp(x, 0, W - 1)];
    for (let x = 0; x < W; x++) {
      tmp[y * W + x] = acc;
      acc -= buf[y * W + clamp(x - R, 0, W - 1)];
      acc += buf[y * W + clamp(x + R + 1, 0, W - 1)];
    }
  }
  for (let x = 0; x < W; x++) {
    let acc = 0;
    for (let y = -R; y <= R; y++) acc += tmp[clamp(y, 0, H - 1) * W + x];
    for (let y = 0; y < H; y++) {
      out[y * W + x] = acc;
      acc -= tmp[clamp(y - R, 0, H - 1) * W + x];
      acc += tmp[clamp(y + R + 1, 0, H - 1) * W + x];
    }
  }
  return out;
}

const blurR = boxBlur(srcR);
const blurG = boxBlur(srcG);
const blurB = boxBlur(srcB);
const blurW = boxBlur(srcWgt);

// ------------------------------------------------------------- un-matting
const outAlpha = new Float32Array(N);
let touched = 0;
let pocketed = 0;

for (let i = 0; i < N; i++) {
  const o = i * 4;
  const a = data[o + 3];
  outAlpha[i] = a;
  if (a === 0) continue;

  const r = data[o];
  const g = data[o + 1];
  const b = data[o + 2];
  const min = Math.min(r, g, b);
  const sat = Math.max(r, g, b) - min;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // How much of this pixel is white background.
  //   edge   — geometric: anything hugging the silhouette is suspect.
  //   pocket — photometric: neutral near-white anywhere is matte the original
  //            key failed to reach, whatever its distance from the edge.
  const edgeWeight = 1 - smooth(BAND_CORE, BAND, dist[i]);
  const pocketWeight =
    smooth(188, 214, lum) * (1 - smooth(SPILL_SAT_LO, SPILL_SAT_HI, sat));
  let w = Math.max(edgeWeight, pocketWeight);

  // Never un-matte warm mid/high-luminance pixels: that is skin, not matte.
  if (sat > 30 && r > b && lum > 120) w *= 1 - smooth(30, 52, sat);
  if (w <= 0.001) continue;

  const aWhite = (255 - min) / 255;
  const aEff = Math.max(aWhite, 1 / 255);

  // Exact un-matte, and the local interior colour it is stabilised against.
  const algR = clamp(255 - (255 - r) / aEff, 0, 255);
  const algG = clamp(255 - (255 - g) / aEff, 0, 255);
  const algB = clamp(255 - (255 - b) / aEff, 0, 255);

  const wsum = blurW[i];
  const hasInterior = wsum > 4;
  const intR = hasInterior ? blurR[i] / wsum : algR;
  const intG = hasInterior ? blurG[i] / wsum : algG;
  const intB = hasInterior ? blurB[i] / wsum : algB;

  // Trust the algebra in proportion to the coverage it divides by.
  const trust = smooth(0.12, 0.6, aWhite);
  const fr = intR + (algR - intR) * trust;
  const fg = intG + (algG - intG) * trust;
  const fb = intB + (algB - intB) * trust;

  data[o] = Math.round(clamp(r + (fr - r) * w, 0, 255));
  data[o + 1] = Math.round(clamp(g + (fg - g) * w, 0, 255));
  data[o + 2] = Math.round(clamp(b + (fb - b) * w, 0, 255));
  outAlpha[i] = a * (1 - w + w * aWhite);

  touched++;
  if (pocketWeight > edgeWeight && pocketWeight > 0.5) pocketed++;
}

// ---------------------------------------------------------------- feather
// The original key was a hard threshold, so the alpha edge is aliased. A
// sub-pixel gaussian gives it the roll-off a real cutout would have.
const radius = Math.max(1, Math.ceil(FEATHER_SIGMA * 3));
const kernel = [];
let ksum = 0;
for (let k = -radius; k <= radius; k++) {
  const v = Math.exp(-(k * k) / (2 * FEATHER_SIGMA * FEATHER_SIGMA));
  kernel.push(v);
  ksum += v;
}
for (let k = 0; k < kernel.length; k++) kernel[k] /= ksum;

const tmp = new Float32Array(N);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let acc = 0;
    for (let k = -radius; k <= radius; k++)
      acc += outAlpha[y * W + clamp(x + k, 0, W - 1)] * kernel[k + radius];
    tmp[y * W + x] = acc;
  }
}
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let acc = 0;
    for (let k = -radius; k <= radius; k++)
      acc += tmp[clamp(y + k, 0, H - 1) * W + x] * kernel[k + radius];
    data[(y * W + x) * 4 + 3] = Math.round(clamp(acc, 0, 255));
  }
}

await sharp(data, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(OUT);

console.log(`un-matted ${touched} px (${pocketed} trapped-white pocket px) -> ${OUT}`);
