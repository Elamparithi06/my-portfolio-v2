"use client";

import Link from "next/link";
import { useState } from "react";
import { contact } from "../portfolioData";

export default function ContactSection() {
  const [mailState, setMailState] = useState<"idle" | "loading" | "sent">("idle");

  const handleContactClick = () => {
    if (mailState === "loading") return;
    setMailState("loading");

    window.setTimeout(() => {
      window.location.href = `mailto:${contact.email}`;
      setMailState("sent");
      window.setTimeout(() => setMailState("idle"), 2200);
    }, 450);
  };

  return (
    <section id="contact" className="contact-section reveal border-t border-[color:var(--border)]/70 pt-8">
      <h3 className="text-2xl font-semibold">Let&apos;s Work Together</h3>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        I am available for Software Developer and React Developer opportunities. Reach out by email or phone for my resume, portfolio walkthrough, and project details.
      </p>
      <p className="mt-3 text-sm text-[var(--muted)]">Phone: {contact.phone}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">Email: {contact.email}</p>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={handleContactClick}
          disabled={mailState === "loading"}
          className="btn-primary rounded-full px-6 py-3 text-sm font-semibold transition"
        >
          {mailState === "loading" ? "Opening Mail..." : mailState === "sent" ? "Opened" : "Contact by Email"}
        </button>
        <Link
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[color:var(--border)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          LinkedIn
        </Link>
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]" aria-live="polite">
        {mailState === "loading" ? "Preparing your email app..." : mailState === "sent" ? "Email app opened." : " "}
      </p>
    </section>
  );
}
