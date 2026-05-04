import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="px-6 pb-10 pt-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Separator className="mb-6 bg-slate-800" />
        <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-semibold text-slate-100">Jacob Allan</p>
            <p>Machine Learning & Quantitative Software Engineering</p>
          </div>
          <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
