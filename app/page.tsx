import { About } from "@/components/about";
import { Highlights } from "@/components/highlights";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import {
  CaseStudyPreviewGrid,
  FeaturedProjectShowcase,
} from "@/components/projects";
import { ResumeCta } from "@/components/resume-cta";
import { HeroSpill } from "@/components/section-shell";
import { SiteNav } from "@/components/site-nav";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <main id="main-content">
        <Hero />
        {/* Zero-height bridge anchored to the hero's bottom edge. Keeps the
            plate's atmosphere alive across the fold — see `HeroSpill`. */}
        <HeroSpill />
        <Highlights />
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
