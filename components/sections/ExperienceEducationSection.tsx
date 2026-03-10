import { education, experiencePoints } from "../portfolioData";

export default function ExperienceEducationSection() {
  return (
    <section className="experience-section reveal mb-20 grid gap-6 md:grid-cols-2">
      <div className="section-block">
        <h3 className="mb-3 text-2xl font-semibold">Work Experience</h3>
        <ul className="space-y-2 pl-5 text-sm text-[var(--muted)] list-disc">
          {experiencePoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="section-block">
        <h3 className="mb-3 text-2xl font-semibold">Education</h3>
        <ul className="space-y-2 pl-5 text-sm text-[var(--muted)] list-disc">
          {education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4 className="mb-2 mt-5 text-lg font-semibold">Languages</h4>
        <p className="text-sm text-[var(--muted)]">Tamil, English</p>
      </div>
    </section>
  );
}
