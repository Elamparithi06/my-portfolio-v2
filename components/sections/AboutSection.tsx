import { aboutSummary, highlights } from "../portfolioData";

function getAuditExperienceHighlight() {
  const startDate = new Date(2024, 5, 1); // June 1, 2024
  const now = new Date();
  const elapsedMs = Math.max(now.getTime() - startDate.getTime(), 0);
  const years = elapsedMs / (1000 * 60 * 60 * 24 * 365.25);
  const roundedYears = Math.round(years * 10) / 10;
  return `${roundedYears} years industry experience in audit operations`;
}

export default function AboutSection() {
  const dynamicHighlights = [getAuditExperienceHighlight(), ...highlights];

  return (
    <section id="about" className="about-section reveal mb-20 grid gap-6 md:grid-cols-3">
      <div className="section-block md:col-span-2">
        <h3 className="mb-3 text-2xl font-semibold">About Me</h3>
        <p className="text-[var(--muted)]">{aboutSummary}</p>
      </div>
      <div className="section-block">
        <h3 className="mb-3 text-xl font-semibold">Highlights</h3>
        <ul className="space-y-2 pl-5 text-sm text-[var(--muted)] list-disc">
          {dynamicHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
