import type { Metadata } from "next";
import { areAdminCredentialsConfigured } from "@/lib/server/adminAuth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    next?: string;
  }>;
};

function getMessage(error?: string) {
  if (error === "invalid") {
    return "That username or password was not correct.";
  }

  if (error === "setup") {
    return "Admin credentials are not configured on the server yet.";
  }

  return "";
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = params?.next?.startsWith("/admin") ? params.next : "/admin/insights";
  const errorMessage = getMessage(params?.error);
  const isConfigured = areAdminCredentialsConfigured();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#16355f_0%,#0b1730_38%,#060b16_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(96,165,250,0.18),transparent_36%,rgba(52,211,153,0.16)_74%,transparent)]" />
      <div className="pointer-events-none absolute left-[-6rem] top-[-4rem] h-56 w-56 rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-5rem] right-[-3rem] h-64 w-64 rounded-full bg-emerald-400/14 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="grid w-full items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="hidden rounded-[2rem] border border-white/10 bg-white/6 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:block">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Private Access</p>
            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.02]">
              Portfolio insights with a cleaner admin experience.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Visitor activity, contact submissions, location signals, device details, and recent engagement patterns stay on the backend and are available only after sign-in.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-cyan-300/18 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Visitor Intelligence</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Latest paths, referrers, countries, timezones, and screen sizes in one place.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-emerald-300/18 bg-slate-950/30 p-5">
                <p className="text-sm font-semibold text-white">Lead History</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Every contact submission is stored with server-side metadata for follow-up.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[rgba(7,14,28,0.88)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
            <div className="mx-auto max-w-md">
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Admin Login</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Sign in to insights</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                This area is private and not linked from the public portfolio.
              </p>

              {!isConfigured ? (
                <div className="mt-8 rounded-[1.5rem] border border-amber-300/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                  Add `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`, then restart the dev server.
                </div>
              ) : null}

              {errorMessage ? (
                <div className="mt-8 rounded-[1.5rem] border border-rose-300/30 bg-rose-400/10 p-4 text-sm leading-6 text-rose-100">
                  {errorMessage}
                </div>
              ) : null}

              <form action="/api/admin/login" method="POST" className="mt-8 grid gap-5">
                <input type="hidden" name="next" value={nextPath} />

                <label className="grid gap-2 text-sm text-slate-300">
                  Username
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    className="rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/8"
                    placeholder="Enter admin username"
                  />
                </label>

                <label className="grid gap-2 text-sm text-slate-300">
                  Password
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    className="rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/8"
                    placeholder="Enter admin password"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6ee7f9_0%,#34d399_100%)] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_38px_rgba(52,211,153,0.24)] transition hover:translate-y-[-1px]"
                >
                  Open Dashboard
                </button>
              </form>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                Successful login creates a secure HTTP-only session cookie. Visitors cannot see this dashboard unless they know your credentials.
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
