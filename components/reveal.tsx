"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Enter animation for content below the fold.
 *
 * Deliberately small: eight pixels of rise and a fade, once, when the element
 * first comes near the viewport. The page is an editorial layout of hairlines
 * and negative space, and anything larger reads as a template — this should be
 * felt as the page settling, not noticed as an effect.
 *
 * Three properties matter:
 *
 * - It never moves anything horizontally, so it cannot cause overflow at
 *   320px the way a slide-in-from-the-side would.
 * - `once` is set, so scrolling back up does not replay it. Animation that
 *   repeats on every scroll is what makes a site feel like a demo.
 * - `amount: 0.15` triggers as soon as a band's first rows appear, so a tall
 *   section is never still fading in by the time the reader reaches its middle.
 *
 * ## Why the opt-outs are CSS and not JavaScript
 *
 * The hidden state is an inline `opacity: 0` written into the server-rendered
 * HTML. Two readers must never see that state persist: someone with
 * scripting disabled, and someone who has asked for reduced motion.
 *
 * Both are handled in CSS against `[data-reveal]` — the `<noscript>` block in
 * the root layout, and the `prefers-reduced-motion` rule in `globals.css`.
 * That is deliberate. The obvious alternative, branching on
 * `useReducedMotion()` and rendering a plain element instead, returns `false`
 * during the hydration render, so the animated element mounts anyway and the
 * swap is a hydration mismatch waiting to happen. A CSS rule with
 * `!important` overrides the inline style whatever the component decided, and
 * it reads the real media query rather than a hook's snapshot of it.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  /** Seconds. Used to stagger siblings; keep the total under ~0.2. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const Component = motion[as];

  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
