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
    <section className="hero-section reveal mb-20 grid items-center gap-5 border-b border-[color:var(--border)]/60 pb-12 min-[520px]:grid-cols-[minmax(0,1fr)_11rem] min-[520px]:gap-6 md:gap-8 lg:mb-24 lg:grid-cols-[1.15fr_0.85fr] lg:pb-14">
      <div className="hero-content relative">
        <div className="hero-orb-a floating pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full blur-2xl" />
        <div className="hero-orb-b floating-delay pointer-events-none absolute -bottom-8 right-3 h-20 w-20 rounded-full blur-2xl" />

        <p className="mb-4 text-xs uppercase tracking-[0.26em] text-[var(--accent)] sm:text-sm sm:tracking-[0.3em]">Open to opportunities</p>
        <h2 className="max-w-3xl text-[2.5rem] font-semibold leading-tight sm:text-5xl lg:text-6xl">
          I build{" "}
          <span className="hero-highlight">user-focused web applications</span>{" "}
          with clean UI and{" "}
          <span className="hero-highlight-2">practical impact</span>.
        </h2>
        <p className="mt-6 text-base text-[var(--muted)] sm:text-lg">
          Role focus: <span className="hero-role font-semibold">{role}</span>
        </p>
        <p className="mt-4 max-w-xl text-sm text-[var(--muted)] sm:text-base">
          Computer Science graduate with frontend development experience in React and modern web technologies, plus hands-on business process automation support with IT teams.
        </p>
        <div className="mt-4 min-[520px]:hidden">
          <span className="inline-flex rounded-full bg-[var(--accent-2)]/20 px-3 py-1 text-[10px] font-medium text-[var(--accent-2)]">
            Next.js
          </span>
        </div>
        <div className="hero-actions mt-8 flex flex-wrap gap-3 sm:gap-4">
          <a
            href="#projects"
            className="btn-primary rounded-full px-5 py-3 text-sm font-semibold transition hover:translate-y-[-2px] sm:px-6"
          >
            View Projects
          </a>
          <Link
            href="#contact"
            className="btn-secondary rounded-full px-5 py-3 text-sm font-semibold transition sm:px-6"
          >
            Hire Me
          </Link>
          <a
            href={resume.file}
            download
            className="btn-secondary rounded-full px-5 py-3 text-sm font-semibold transition sm:px-6"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="hero-media hidden justify-center min-[520px]:flex min-[520px]:justify-end lg:justify-end [perspective:1200px]">
        <div
          ref={profileCardRef}
          onMouseMove={handleCardMove}
          onMouseLeave={resetCardTilt}
          className="profile-card relative mx-auto w-full max-w-[12rem] overflow-hidden rounded-[24px] border border-[color:var(--border)]/70 bg-transparent p-2.5 min-[520px]:mx-0 min-[520px]:max-w-[11rem] sm:max-w-[13rem] sm:p-3 md:max-w-[15rem] md:rounded-[26px] lg:max-w-sm lg:rounded-[28px] lg:p-4"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 140ms ease",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="profile-role-badge absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] min-[520px]:right-4 min-[520px]:top-4 sm:px-3 sm:text-[10px] md:right-5 md:top-5 md:text-xs [transform:translateZ(30px)]">
            3D Developer
          </div>
          <Image
            src="/profile.jpg"
            alt="Elamparithi profile"
            className="h-[210px] w-full rounded-[18px] object-cover min-[520px]:h-[220px] sm:h-[280px] md:h-[330px] lg:h-[420px] [transform:translateZ(20px)]"
            width={420}
            height={420}
            priority
          />
          <div className="mt-3 flex items-center justify-between gap-2.5 min-[520px]:mt-3.5 sm:mt-4 sm:gap-3 [transform:translateZ(26px)]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] sm:text-xs sm:tracking-[0.2em]">Frontend Engineer</p>
              <p className="text-base font-semibold sm:text-lg">Elamparithi</p>
            </div>
            <span className="hidden rounded-full bg-[var(--accent-2)]/20 px-2.5 py-1 text-[9px] font-medium text-[var(--accent-2)] lg:inline-flex lg:px-3 lg:text-xs">
              Next.js
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
