import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { resume } from "../portfolioData";

type HeroSectionProps = {
  role: string;
};

export default function HeroSection({ role }: HeroSectionProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const profileCardRef = useRef<HTMLDivElement>(null);

  const handleCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = profileCardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 14;
    const rotateX = (0.5 - y / rect.height) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };

  const resetCardTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="hero-section reveal mb-24 grid items-center gap-10 rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-8 shadow-2xl shadow-cyan-500/10 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="hero-content relative">
        <div className="hero-orb-a floating pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full blur-2xl" />
        <div className="hero-orb-b floating-delay pointer-events-none absolute -bottom-8 right-3 h-20 w-20 rounded-full blur-2xl" />

        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Open to opportunities</p>
        <h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          I build{" "}
          <span className="hero-highlight">user-focused web applications</span>{" "}
          with clean UI and{" "}
          <span className="hero-highlight-2">practical impact</span>.
        </h2>
        <p className="mt-6 text-lg text-[var(--muted)]">
          Role focus: <span className="hero-role font-semibold">{role}</span>
        </p>
        <p className="mt-4 max-w-xl text-[var(--muted)]">
          Computer Science graduate with frontend development experience in React and modern web technologies, plus hands-on business process automation support with IT teams.
        </p>
        <div className="hero-actions mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="btn-primary rounded-full px-6 py-3 text-sm font-semibold transition hover:translate-y-[-2px]"
          >
            View Projects
          </a>
          <Link
            href="#contact"
            className="rounded-full border border-[color:var(--border)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Hire Me
          </Link>
          <a
            href={resume.file}
            download
            className="rounded-full border border-[color:var(--border)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="hero-media flex justify-center lg:justify-end [perspective:1200px]">
        <div
          ref={profileCardRef}
          onMouseMove={handleCardMove}
          onMouseLeave={resetCardTilt}
          className="profile-card relative mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[var(--surface-strong)] p-4 shadow-2xl"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 140ms ease",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="profile-role-badge absolute right-6 top-6 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] [transform:translateZ(30px)]">
            3D Developer
          </div>
          <Image
            src="/profile.jpg"
            alt="Elamparithi profile"
            className="h-[420px] w-full rounded-2xl object-cover [transform:translateZ(20px)]"
            width={420}
            height={420}
            priority
          />
          <div className="mt-4 flex items-center justify-between [transform:translateZ(26px)]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Frontend Engineer</p>
              <p className="text-lg font-semibold">Elamparithi</p>
            </div>
            <span className="rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-xs font-medium text-[var(--accent-2)]">
              Next.js
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
