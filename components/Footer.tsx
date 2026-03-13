import Link from "next/link";
import { contact } from "./portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-10 mt-10 w-full border-t border-[color:var(--border)] bg-[var(--surface)]">
      <div className="footer-inner mx-auto flex w-full max-w-[88rem] flex-col items-start justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center sm:px-10 2xl:px-12">
        <p className="text-sm text-[var(--muted)]">
          (c) {year} {contact.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a href="#about" className="text-[var(--muted)] transition hover:text-[var(--accent)]">
            About
          </a>
          <a href="#projects" className="text-[var(--muted)] transition hover:text-[var(--accent)]">
            Projects
          </a>
          <Link
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] transition hover:text-[var(--accent)]"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${contact.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] transition hover:text-[var(--accent)]"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
