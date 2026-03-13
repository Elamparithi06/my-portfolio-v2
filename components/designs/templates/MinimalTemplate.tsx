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

export default function MinimalTemplate({ role, activeProject, onProjectHover }: TemplateProps) {
  return (
    <main className="site-main layout-minimal relative z-10 mx-auto max-w-5xl px-6 pb-14 pt-28 sm:px-10">
      <HeroSection role={role} />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection activeProject={activeProject} onProjectHover={onProjectHover} />
      <ExperienceEducationSection />
      <ContactSection />
    </main>
  );
}
