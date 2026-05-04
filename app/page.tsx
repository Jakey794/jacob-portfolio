import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { ResumeCta } from "@/components/resume-cta";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <ResumeCta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
