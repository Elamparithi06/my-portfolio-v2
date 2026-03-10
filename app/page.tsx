"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects, roles } from "@/components/portfolioData";
import type { DesignMode, Theme } from "@/components/types";
import NeonLayout from "@/components/designs/NeonLayout";
import SunsetLayout from "@/components/designs/SunsetLayout";
import MonoLayout from "@/components/designs/MonoLayout";

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeProject, setActiveProject] = useState(projects[0].title);
  const [activeSection, setActiveSection] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 600, y: 300 });
  const [theme, setTheme] = useState<Theme>("dark");
  const [designMode, setDesignMode] = useState<DesignMode>("neon");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme: Theme =
      savedTheme === "light" || (!savedTheme && prefersLight) ? "light" : "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);

    const savedDesign = window.localStorage.getItem("portfolio-design");
    const initialDesign: DesignMode =
      savedDesign === "sunset" || savedDesign === "mono" ? savedDesign : "neon";
    setDesignMode(initialDesign);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-35% 0px -45% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [designMode]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;

      if (nearBottom) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-design", designMode);
    window.localStorage.setItem("portfolio-design", designMode);
  }, [designMode]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.16 },
    );

    const targets = document.querySelectorAll(".reveal");
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
      observer.disconnect();
    };
  }, [designMode]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  const toggleDesign = () => {
    const order: DesignMode[] = ["neon", "sunset", "mono"];
    const index = order.indexOf(designMode);
    const next = order[(index + 1) % order.length];
    setDesignMode(next);
    document.documentElement.setAttribute("data-design", next);
    window.localStorage.setItem("portfolio-design", next);
  };

  const sharedLayoutProps = {
    role: roles[roleIndex],
    activeProject,
    onProjectHover: setActiveProject,
  };

  return (
    <div className="site-shell relative text-[var(--foreground)]">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(520px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--design-spotlight), transparent 42%)`,
        }}
      />

      <Navbar
        theme={theme}
        designMode={designMode}
        onToggleTheme={toggleTheme}
        onToggleDesign={toggleDesign}
        activeSection={activeSection}
        onNavClick={setActiveSection}
      />
      {designMode === "sunset" ? (
        <SunsetLayout {...sharedLayoutProps} />
      ) : designMode === "mono" ? (
        <MonoLayout {...sharedLayoutProps} />
      ) : (
        <NeonLayout {...sharedLayoutProps} />
      )}
      <Footer />
    </div>
  );
}
