import AboutSection from "../sections/AboutSection";
import ContactSection from "../sections/ContactSection";
import ExperienceEducationSection from "../sections/ExperienceEducationSection";
import HeroSection from "../sections/HeroSection";
import ProjectsSection from "../sections/ProjectsSection";
import SkillsSection from "../sections/SkillsSection";

type SunsetLayoutProps = {
  role: string;
  activeProject: string;
  onProjectHover: (title: string) => void;
};

export default function SunsetLayout({ role, activeProject, onProjectHover }: SunsetLayoutProps) {
  return (
    <main className="site-main site-main-sunset relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-28 sm:px-10">
      <HeroSection role={role} />
      <AboutSection />
      <ExperienceEducationSection />
      <SkillsSection />
      <ProjectsSection activeProject={activeProject} onProjectHover={onProjectHover} />
      <ContactSection />
    </main>
  );
}
