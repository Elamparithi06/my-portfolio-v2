import Image from "next/image";
import { projects } from "../portfolioData";

type ProjectsSectionProps = {
  activeProject: string;
  onProjectHover: (title: string) => void;
};

export default function ProjectsSection({ activeProject, onProjectHover }: ProjectsSectionProps) {
  return (
    <section id="projects" className="projects-section reveal mb-20">
      <h3 className="mb-6 text-2xl font-semibold text-[var(--accent-soft)]">Featured Projects</h3>
      <div className="projects-grid grid gap-5 md:grid-cols-3">
        {projects.map((project) => {
          const active = activeProject === project.title;
          return (
            <article
              key={project.title}
              onMouseEnter={() => onProjectHover(project.title)}
              className={`project-card rounded-2xl border p-5 transition ${
                active
                  ? "project-card-active"
                  : "border-[color:var(--border)] bg-[var(--surface)] hover:border-[color:var(--accent)]/40"
              }`}
            >
              <div className="mb-4 overflow-hidden rounded-xl border border-[color:var(--border)]/80">
                <Image
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  width={1200}
                  height={700}
                  className="h-40 w-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>
              <p className="mt-3 text-sm font-medium text-[var(--accent-2)]">{project.impact}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-soft)]"
              >
                Case Study &rarr;
              </a>
              <div className="mt-3">
                {project.liveLink ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold text-[var(--accent)] transition hover:border-[var(--accent)] hover:text-[var(--accent-soft)]"
                  >
                    Live Demo
                  </a>
                ) : (
                  <p className="text-xs text-[var(--muted)]">Add `liveLink` in portfolioData to show Live Demo.</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
