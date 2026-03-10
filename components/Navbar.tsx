import ThemeToggle from "./ThemeToggle";
import DesignToggle from "./DesignToggle";
import type { DesignMode, Theme } from "./types";

type NavbarProps = {
  theme: Theme;
  designMode: DesignMode;
  onToggleTheme: () => void;
  onToggleDesign: () => void;
  activeSection: string;
  onNavClick: (sectionId: string) => void;
};

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({
  theme,
  designMode,
  onToggleTheme,
  onToggleDesign,
  activeSection,
  onNavClick,
}: NavbarProps) {
  return (
    <header className="site-header fixed left-0 right-0 top-4 z-50">
      <div className="nav-shell mx-auto flex w-[min(96%,72rem)] items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[var(--surface)] px-4 py-3 shadow-lg shadow-cyan-500/10 backdrop-blur-xl sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Portfolio</p>
          <h1 className="text-lg font-semibold">Elamparithi</h1>
        </div>
        <div className="flex items-center gap-3">
          <nav className="hidden gap-5 text-sm text-[var(--muted)] sm:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => onNavClick(item.id)}
                  className={`transition hover:text-[var(--accent)] ${
                    isActive ? "text-[var(--accent)]" : "text-[var(--muted)]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <DesignToggle designMode={designMode} onToggle={onToggleDesign} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
