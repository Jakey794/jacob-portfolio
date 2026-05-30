"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Download,
  GitBranch,
  GraduationCap,
  Link as LinkIcon,
  LineChart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const proofItems = [
  "University of Toronto Engineering Science",
  "Machine Intelligence + Mathematics",
  "Schulich Leader Scholar",
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <Badge className="mb-6 border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
            ML systems / quant modeling / full-stack AI
          </Badge>
          <h1
            id="hero-title"
            className="max-w-4xl text-5xl font-semibold text-slate-50 sm:text-6xl lg:text-7xl"
          >
            Jacob Allan
          </h1>
          <p className="mt-5 max-w-3xl text-2xl font-medium leading-tight text-cyan-100 sm:text-3xl">
            Machine Learning & Quantitative Software Engineering
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Engineering Science student at the University of Toronto building ML
            systems, full-stack AI tools, and quantitative modeling projects.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-slate-300">
            {proofItems.map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                {index > 0 ? (
                  <span className="hidden h-1 w-1 rounded-full bg-cyan-300/70 sm:block" />
                ) : null}
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              size="lg"
              nativeButton={false}
              className="h-11 bg-cyan-300 px-4 text-slate-950 hover:bg-cyan-200"
              render={<a href="#projects" />}
            >
              View Projects
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-11 border-slate-700 bg-slate-950/50 px-4 text-slate-100 hover:bg-slate-900"
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
            <Button
              size="icon-lg"
              variant="outline"
              nativeButton={false}
              className="border-slate-700 bg-slate-950/50 text-slate-100 hover:bg-slate-900"
              aria-label="GitHub"
              render={
                <a
                  href="https://github.com/Jakey794"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <GitBranch aria-hidden="true" />
            </Button>
            <Button
              size="icon-lg"
              variant="outline"
              nativeButton={false}
              className="border-slate-700 bg-slate-950/50 text-slate-100 hover:bg-slate-900"
              aria-label="LinkedIn"
              render={
                <a
                  href="https://www.linkedin.com/in/jacob-allan-ml/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <LinkIcon aria-hidden="true" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
        >
          <Card className="border border-cyan-300/15 bg-slate-950/70 shadow-2xl shadow-cyan-950/30 backdrop-blur">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase text-cyan-300">
                    Focus
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-50">
                    ML Systems · Quant Modeling · Full-stack AI
                  </h2>
                </div>
                <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
                  <Cpu aria-hidden="true" className="size-6" />
                </div>
              </div>

              <Separator className="my-6 bg-slate-800" />

              <dl className="space-y-5">
                <div className="grid gap-2 sm:grid-cols-[8rem_1fr]">
                  <dt className="flex items-center gap-2 text-sm text-slate-400">
                    <GraduationCap aria-hidden="true" className="size-4" />
                    Current
                  </dt>
                  <dd className="font-medium text-slate-100">
                    Engineering Science @ UofT
                  </dd>
                </div>
                <div className="grid gap-2 sm:grid-cols-[8rem_1fr]">
                  <dt className="flex items-center gap-2 text-sm text-slate-400">
                    <LineChart aria-hidden="true" className="size-4" />
                    Best Work
                  </dt>
                  <dd className="font-medium text-slate-100">
                    Incident Triage Copilot, FormatClip, RF Signal
                    Classification Research
                  </dd>
                </div>
              </dl>

              <div
                aria-hidden="true"
                className="mt-8 grid grid-cols-6 gap-2 opacity-80"
              >
                {Array.from({ length: 24 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-2 rounded-sm bg-cyan-300/20 data-[hot=true]:bg-cyan-300"
                    data-hot={index % 7 === 0 || index % 11 === 0}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
