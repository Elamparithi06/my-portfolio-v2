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

export default function CreativeTemplate({ role, activeProject, onProjectHover }: TemplateProps) {
  return (
    <main className="site-main layout-creative relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-28 sm:px-10">
      <div className="template-grid creative-grid">
        <div className="creative-left space-y-6">
          <HeroSection role={role} />
          <SkillsSection />
          <ProjectsSection activeProject={activeProject} onProjectHover={onProjectHover} />
        </div>
        <aside className="creative-right space-y-6">
          <AboutSection />
          <ExperienceEducationSection />
          <ContactSection />
        </aside>
      </div>
    </main>
  );
}
