import AboutSection from "../sections/AboutSection";
import ContactSection from "../sections/ContactSection";
import ExperienceEducationSection from "../sections/ExperienceEducationSection";
import HeroSection from "../sections/HeroSection";
import ProjectsSection from "../sections/ProjectsSection";
import SkillsSection from "../sections/SkillsSection";

type NeonLayoutProps = {
  role: string;
  activeProject: string;
  onProjectHover: (title: string) => void;
};

export default function NeonLayout({ role, activeProject, onProjectHover }: NeonLayoutProps) {
  return (
    <main className="site-main site-main-neon relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-28 sm:px-10">
      <HeroSection role={role} />
      <AboutSection />
      <ExperienceEducationSection />
      <SkillsSection />
      <ProjectsSection activeProject={activeProject} onProjectHover={onProjectHover} />
      <ContactSection />
    </main>
  );
}
