import Image from "next/image";
import { ExternalLink, GitBranch, Radio } from "lucide-react";

import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full border border-slate-800 bg-slate-950/70 shadow-xl shadow-slate-950/40 transition-colors hover:border-cyan-300/35">
      {project.image ? (
        <div className="mx-4 mt-4 aspect-[16/9] overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={900}
            height={520}
            className="h-full w-full rounded-xl object-cover"
            priority={project.featured === true}
          />
        </div>
      ) : (
        <div className="mx-4 mt-4 grid aspect-[16/9] place-items-center rounded-lg border border-slate-800 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(15,23,42,0.95)),linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:auto,22px_22px,22px_22px]">
          <div className="flex items-center gap-3 text-cyan-100">
            <Radio aria-hidden="true" className="size-5" />
            <span className="font-mono text-xs uppercase">
              Research preview
            </span>
          </div>
        </div>
      )}
      <CardHeader className="gap-3 px-5 pt-5">
        <div className="space-y-3">
          <CardTitle className="text-xl text-slate-50">
            {project.title}
          </CardTitle>
          {project.statusLabel ? (
            <Badge
              variant="outline"
              className="border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
            >
              {project.statusLabel}
            </Badge>
          ) : null}
        </div>
        {project.github || project.liveDemo ? (
          <CardAction>
            <div className="flex gap-2">
              {project.liveDemo ? (
                <Button
                  size="icon-sm"
                  variant="outline"
                  nativeButton={false}
                  className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  aria-label={`${project.title} live demo`}
                  render={
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <ExternalLink aria-hidden="true" />
                </Button>
              ) : null}
              {project.github ? (
                <Button
                  size="icon-sm"
                  variant="outline"
                  nativeButton={false}
                  className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  aria-label={`${project.title} GitHub repository`}
                  render={
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <GitBranch aria-hidden="true" />
                </Button>
              ) : null}
            </div>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-5 pb-5">
        <p className="text-sm leading-6 text-slate-300">{project.summary}</p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
          {project.proof.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.displayTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-slate-700 bg-slate-900/70 text-slate-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
        {project.liveDemo || project.github ? (
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100"
              >
                Live demo
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100"
              >
                GitHub
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
