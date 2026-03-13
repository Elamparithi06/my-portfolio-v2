"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { contact } from "../portfolioData";

type FormState = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  website: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  website: "",
};

type ToastState = {
  tone: "loading" | "success" | "error";
  title: string;
  message: string;
} | null;

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Feel free to send a quick message and I will get back to you soon.",
  );
  const [toast, setToast] = useState<ToastState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!toast || toast.tone === "loading") {
      return;
    }

    const timeoutId = window.setTimeout(() => setToast(null), toast.tone === "success" ? 3200 : 4400);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (toast) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [mounted, toast]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (submitState !== "idle") {
      setSubmitState("idle");
      setStatusMessage(
        "Feel free to send a quick message and I will get back to you soon.",
      );
    }
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "loading") {
      return;
    }

    setSubmitState("loading");
    setStatusMessage("Sending your message...");
    setToast({
      tone: "loading",
      title: "Sending message",
      message: "Your message is on the way. Please wait a moment.",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong while sending your message.");
      }

      setForm(initialFormState);
      setSubmitState("sent");
      setStatusMessage(data.message ?? "Message sent successfully.");
      setToast({
        tone: "success",
        title: "Message sent",
        message: data.message ?? "Thanks for reaching out. Your message has been sent.",
      });
    } catch (error) {
      setSubmitState("error");
      const message =
        error instanceof Error ? error.message : "Unable to send the message right now.";
      setStatusMessage(message);
      setToast({
        tone: "error",
        title: "Could not send",
        message,
      });
    }
  };

  return (
    <>
      {mounted && toast
        ? createPortal(
            <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
              <div className="absolute inset-0 bg-[color:var(--background)]/55 backdrop-blur-[4px]" />
              <div
                className={`relative w-full max-w-sm rounded-[1.75rem] border bg-[color:var(--surface-strong)] px-5 py-5 shadow-2xl transition duration-300 animate-[popup-enter_220ms_ease-out] ${
                  toast.tone === "success"
                    ? "border-emerald-400/35"
                    : toast.tone === "error"
                      ? "border-rose-400/35"
                      : "border-[color:var(--border)]/70"
                }`}
                role="alertdialog"
                aria-live="polite"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      toast.tone === "success"
                        ? "bg-emerald-500/14 text-emerald-500"
                        : toast.tone === "error"
                          ? "bg-rose-500/14 text-rose-500"
                          : "bg-[var(--spotlight)] text-[var(--accent)]"
                    }`}
                  >
                    {toast.tone === "loading" ? (
                      <span className="h-5 w-5 rounded-full border-2 border-current border-r-transparent animate-spin" />
                    ) : toast.tone === "success" ? (
                      "OK"
                    ) : (
                      "!"
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-[var(--foreground)]">{toast.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{toast.message}</p>
                  </div>
                  {toast.tone !== "loading" ? (
                    <button
                      type="button"
                      onClick={() => setToast(null)}
                      className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
                      aria-label="Dismiss notification"
                    >
                      ×
                    </button>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      <section
        id="contact"
        className="contact-section reveal relative overflow-hidden border-t border-[color:var(--border)]/70 px-0 py-10"
      >
        <div className="pointer-events-none absolute -left-10 top-10 h-36 w-36 rounded-full bg-[var(--spotlight)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 h-44 w-44 rounded-full bg-[var(--bg-glow-b)] blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_320px] xl:grid-cols-[minmax(0,1.45fr)_360px]">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
                Recruiter Contact
              </p>
              <div className="space-y-3">
                <h3 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                  Hiring for a role? <span className="hero-highlight">Let&apos;s connect directly.</span>
                </h3>
                <p className="max-w-2xl text-sm text-[var(--muted)] sm:text-base">
                  If you would like to discuss an opportunity or connect professionally, you can send a message here and I will reply by email.
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 border-t border-[color:var(--border)]/55 pt-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-xl font-semibold text-[var(--foreground)]">Send a recruiter message</h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    A short, clear message works best. I&apos;ll receive it in my inbox.
                  </p>
                </div>
                <span className="rounded-full border border-[color:var(--border)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-soft)]">
                  Secure form
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  <span>
                    Name <span className="text-xs text-[var(--accent)]">*</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={80}
                    className="rounded-2xl border border-[color:var(--border)]/70 bg-transparent px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    placeholder="Your full name"
                  />
                </label>
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  <span>
                    Email <span className="text-xs text-[var(--accent)]">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    maxLength={120}
                    className="rounded-2xl border border-[color:var(--border)]/70 bg-transparent px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    placeholder="yourname@company.com"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  Company
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    maxLength={120}
                    className="rounded-2xl border border-[color:var(--border)]/70 bg-transparent px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    placeholder="Company name"
                  />
                </label>
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  Subject
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    maxLength={120}
                    className="rounded-2xl border border-[color:var(--border)]/70 bg-transparent px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    placeholder="Let's connect"
                  />
                </label>
              </div>

              <label className="hidden" aria-hidden="true">
                Website
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <label className="grid gap-2 text-sm text-[var(--muted)]">
                <span>
                  Message <span className="text-xs text-[var(--accent)]">*</span>
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  maxLength={2000}
                  className="rounded-[1.5rem] border border-[color:var(--border)]/70 bg-transparent px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                  placeholder="Write your message here..."
                />
              </label>

              <div className="flex flex-col gap-4 border-t border-[color:var(--border)]/55 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[var(--foreground)]">Ready to send</p>
                  <p className="text-sm text-[var(--muted)]" aria-live="polite">
                    {statusMessage}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="btn-primary inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState === "loading"
                    ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                        Sending...
                      </>
                    )
                    : submitState === "sent"
                      ? "Message Sent"
                      : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          <div className="border-t border-[color:var(--border)]/55 pt-6 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-6 xl:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Direct Contact
            </p>
            <h4 className="mt-4 text-2xl font-semibold">Quick recruiter options</h4>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              You can also reach me directly by email, phone, or LinkedIn.
            </p>

            <div className="mt-6 space-y-4">
              <div className="border-b border-[color:var(--border)]/55 pb-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Email</p>
                <p className="mt-2 break-all text-sm font-semibold text-[var(--foreground)]">{contact.email}</p>
              </div>
              <div className="border-b border-[color:var(--border)]/55 pb-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Phone</p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{contact.phone}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                href={`mailto:${contact.email}`}
                className="btn-primary rounded-full px-6 py-3 text-center text-sm font-semibold transition hover:translate-y-[-2px]"
              >
                Email Directly
              </Link>
              <Link
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary rounded-full px-6 py-3 text-center text-sm font-semibold transition"
              >
                View LinkedIn
              </Link>
            </div>

            <div className="mt-6 border-t border-[color:var(--border)]/55 pt-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Open to connect</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                If you would like to discuss an opportunity, collaboration, or just say hello, feel free to reach out.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
