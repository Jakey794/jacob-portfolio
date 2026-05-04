import { featuredProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured Projects"
          title="Technical work with product-shaped edges"
        >
          <p>
            A focused gallery of ML systems, AI tooling, quantitative modeling,
            and applied research projects.
          </p>
        </SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
