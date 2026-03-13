import AboutSection from "../sections/AboutSection";
import ContactSection from "../sections/ContactSection";
import ExperienceEducationSection from "../sections/ExperienceEducationSection";
import HeroSection from "../sections/HeroSection";
import ProjectsSection from "../sections/ProjectsSection";
import SkillsSection from "../sections/SkillsSection";

type NeonLayoutProps = {
  role: string;
  activeProject: string | null;
  onProjectHover: (title: string | null) => void;
};

export default function NeonLayout({ role, activeProject, onProjectHover }: NeonLayoutProps) {
  return (
    <main className="site-main site-main-neon relative z-10 mx-auto w-full max-w-[88rem] px-6 pb-14 pt-28 sm:px-10 2xl:px-12">
      <HeroSection role={role} />
      <AboutSection />
      <ExperienceEducationSection />
      <SkillsSection />
      <ProjectsSection activeProject={activeProject} onProjectHover={onProjectHover} />
      <ContactSection />
    </main>
  );
}
