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
  const handleBrandClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50">
      <div className="nav-shell flex w-full flex-col gap-3 border-b border-[color:var(--border)] bg-[var(--surface)] px-4 py-3 shadow-lg shadow-cyan-500/10 backdrop-blur-xl sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 2xl:px-10">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBrandClick}
            className="text-left transition hover:opacity-85"
            aria-label="Go to portfolio home"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent)] sm:text-xs">Portfolio</p>
            <h1 className="text-base font-semibold sm:text-lg">Elamparithi</h1>
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <DesignToggle designMode={designMode} onToggle={onToggleDesign} />
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
          <nav className="flex flex-1 flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--muted)] lg:flex-none lg:gap-5">
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
          <div className="hidden items-center gap-3 lg:flex">
            <DesignToggle designMode={designMode} onToggle={onToggleDesign} />
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
