/**
 * Shares the horizontal margins of the homepage bands so the footer rule lines
 * up with every section divider above it.
 */
export function Footer() {
  return (
    <footer className="px-6 pb-12 sm:px-10 lg:px-[6.4rem]">
      <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.85rem] text-[#8d93a1] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium text-[#dfe2e9]">Jacob Allan</p>
          <p className="mt-1.5">
            Machine Learning &amp; Quantitative Software Engineering
          </p>
        </div>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/30">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
