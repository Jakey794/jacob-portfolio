import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ResumeCta() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-xs uppercase text-cyan-200">
              Resume
            </p>
            <h2 id="resume-title" className="text-3xl font-semibold text-slate-50">
              Resume - Machine Learning, Software, and Quantitative Finance
            </h2>
            <Separator className="my-5 max-w-xl bg-cyan-300/20" />
            <p className="text-base leading-7 text-slate-300 sm:text-lg">
              A concise resume covering ML research, full-stack AI tools,
              quantitative modeling, and engineering experience.
            </p>
          </div>
          <Button
            size="lg"
            nativeButton={false}
            className="mt-7 h-11 bg-cyan-300 px-4 text-slate-950 hover:bg-cyan-200 lg:mt-0"
            render={
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Download Resume
            <Download aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
