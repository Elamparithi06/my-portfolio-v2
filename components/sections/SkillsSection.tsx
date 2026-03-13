import { skills } from "../portfolioData";

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section reveal mb-20">
      <h3 className="mb-6 text-2xl font-semibold text-[var(--accent-soft)]">Skills</h3>
      <div className="skills-grid grid gap-6 sm:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-item border-b border-[color:var(--border)]/45 pb-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="font-medium">{skill.name}</p>
              <p className="font-mono text-xs text-[var(--accent)]">{skill.level}%</p>
            </div>
            <div className="skill-track h-2 rounded-full">
              <div
                className="skill-fill h-full rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
