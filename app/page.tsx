import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import {
  CaseStudyPreviewGrid,
  FeaturedProjectShowcase,
} from "@/components/projects";
import { ResumeCta } from "@/components/resume-cta";
import { SiteNav } from "@/components/site-nav";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <About />
        <FeaturedProjectShowcase />
        <CaseStudyPreviewGrid />
        <Experience />
        <Skills />
        <ResumeCta />
      </main>
      <Footer />
    </div>
  );
}
