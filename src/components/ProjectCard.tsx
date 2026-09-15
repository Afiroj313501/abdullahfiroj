import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      whileHover={{ y: -7 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="premium-project-card group relative min-h-[19rem] overflow-hidden border border-line p-6 md:p-8"
    >
      <div className="premium-project-glow absolute -right-20 -top-20 h-48 w-48 rounded-full" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-ink-muted">0{index + 1}</span>
          <span className="text-right text-[10px] uppercase tracking-[0.16em] text-ink-muted">{project.year}</span>
        </div>
        <div className="mt-10 max-w-2xl">
          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-signal">{project.role}</p>
          <h3 className="font-display text-3xl leading-none text-ink md:text-4xl">{project.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">{project.summary}</p>
        </div>
        <div className="mt-auto pt-8">
          <p className="max-w-2xl border-l border-signal/50 pl-3 text-xs leading-relaxed text-ink-muted">{project.challenge}</p>

          {project.metrics && (
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-3 border-y border-line py-4">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-ink-muted">{metric.label}</p>
                  <p className="mt-1 font-display text-lg text-signal">{metric.after}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-end justify-between gap-4">
            <ul className="flex max-w-xl flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="border border-line px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="flex shrink-0 gap-3 text-xs">
              {project.codeUrl ? (
                <a href={project.codeUrl} target="_blank" rel="noreferrer" className="premium-project-link premium-project-github" aria-label={`${project.title} GitHub repository`}>
                  <img src="https://cdn.simpleicons.org/github/ededec" alt="" aria-hidden="true" />
                  GitHub ↗
                </a>
              ) : (
                <span className="premium-project-link premium-project-link-disabled">Git</span>
              )}
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="premium-project-link" aria-label={`${project.title} live demo`}>Live ↗</a>
              ) : (
                <span className="premium-project-link premium-project-link-disabled">Live</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}