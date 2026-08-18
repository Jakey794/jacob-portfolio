/**
 * Skip link.
 *
 * Visually hidden until focused, then it lands as a real button over the top
 * left of the page. Every route gives its `<main>` `id="main-content"`, which
 * is what this targets — on a site whose header carries five nav items and
 * whose detail pages open with a masthead, a keyboard user would otherwise
 * tab through the same dozen elements on every page before reaching content.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:inline-flex focus:h-11 focus:items-center focus:rounded-md focus:bg-accent-indigo focus:px-5 focus:text-[0.94rem] focus:text-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-background"
    >
      Skip to main content
    </a>
  );
}
