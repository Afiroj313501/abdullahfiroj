import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import GridBackground from "./GridBackground";

export default function SelectedWork() {
  return (
    <section id="work" className="relative px-6 py-28 md:px-12 md:py-40">
      <GridBackground />
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-signal">
              <span className="h-px w-8 bg-signal" />
              Selected work
            </p>
            <h2 className="font-display text-4xl leading-none md:text-6xl">Things I build.</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Systems for making complex ideas easier to search, understand, and use.
          </p>
        </div>
        <div className="mx-auto flex max-w-4xl flex-col gap-5">
          {projects.filter((project) => project.category !== "research").map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}