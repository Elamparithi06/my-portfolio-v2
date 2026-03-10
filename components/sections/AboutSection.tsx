import { aboutSummary, highlights } from "../portfolioData";

export default function AboutSection() {
  return (
    <section id="about" className="about-section reveal mb-20 grid gap-6 md:grid-cols-3">
      <div className="section-block md:col-span-2">
        <h3 className="mb-3 text-2xl font-semibold">About Me</h3>
        <p className="text-[var(--muted)]">{aboutSummary}</p>
      </div>
      <div className="section-block">
        <h3 className="mb-3 text-xl font-semibold">Highlights</h3>
        <ul className="space-y-2 pl-5 text-sm text-[var(--muted)] list-disc">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
