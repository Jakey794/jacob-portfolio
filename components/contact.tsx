import { GitBranch, Link as LinkIcon, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

const links = [
  {
    label: "Email",
    href: "mailto:jacob.allan@mail.utoronto.ca",
    text: "jacob.allan@mail.utoronto.ca",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com/Jakey794",
    text: "github.com/Jakey794",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jacob-allan-ml/",
    text: "linkedin.com/in/jacob-allan-ml",
    icon: LinkIcon,
  },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Open to focused technical work"
        >
          <p>
            Open to machine learning, software engineering, quantitative
            development, quantitative research, and ML research assistant
            opportunities.
          </p>
        </SectionHeading>
        <div className="grid gap-3">
          {links.map(({ label, href, text, icon: Icon }) => (
            <Button
              key={label}
              variant="outline"
              nativeButton={false}
              className="h-auto justify-start border-slate-800 bg-slate-950/70 px-4 py-4 text-left text-slate-100 hover:bg-slate-900"
              render={
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                />
              }
            >
              <Icon aria-hidden="true" className="size-5 text-cyan-300" />
              <span className="grid gap-1 whitespace-normal">
                <span className="text-xs uppercase text-slate-500">
                  {label}
                </span>
                <span className="break-all text-sm sm:text-base">{text}</span>
              </span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
