import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceEducationSection from "@/components/sections/ExperienceEducationSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";

type TemplateProps = {
  role: string;
  activeProject: string | null;
  onProjectHover: (title: string | null) => void;
};

export default function SplitTemplate({ role, activeProject, onProjectHover }: TemplateProps) {
  return (
    <main className="site-main layout-split relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-28 sm:px-10">
      <section className="split-hero-wrap">
        <HeroSection role={role} />
      </section>
      <section className="split-columns grid gap-10 xl:grid-cols-2">
        <AboutSection />
        <ExperienceEducationSection />
      </section>
      <section className="split-work grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
        <SkillsSection />
        <ProjectsSection activeProject={activeProject} onProjectHover={onProjectHover} />
      </section>
      <ContactSection />
    </main>
  );
}
