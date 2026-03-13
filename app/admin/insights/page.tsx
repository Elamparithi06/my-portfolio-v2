import type { Metadata } from "next";
import { getRecords } from "@/lib/server/storage";

export const metadata: Metadata = {
  title: "Admin Insights",
  robots: {
    index: false,
    follow: false,
  },
};

type VisitorRecord = {
  visitedAt?: string;
  path?: string;
  ip?: string;
  referrer?: string;
  userAgent?: string;
  language?: string;
  timezone?: string;
  screenWidth?: number | null;
  screenHeight?: number | null;
  location?: {
    city?: string;
    region?: string;
    country?: string;
  };
};

type ContactRecord = {
  submittedAt?: string;
  name?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
  ip?: string;
  referrer?: string;
  userAgent?: string;
  location?: {
    city?: string;
    region?: string;
    country?: string;
  };
};

function formatLocation(location?: { city?: string; region?: string; country?: string }) {
  return [location?.city, location?.region, location?.country].filter(Boolean).join(", ") || "Unknown";
}

function formatDate(value?: string) {
  if (!value) {
    return "Unknown";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString("en-US");
}

function countBy<T>(items: T[], getKey: (item: T) => string) {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    const key = getKey(item).trim() || "Unknown";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function getDeviceType(width?: number | null) {
  if (!width) {
    return "Unknown";
  }

  if (width < 640) {
    return "Mobile";
  }

  if (width < 1024) {
    return "Tablet";
  }

  return "Desktop";
}

export default async function AdminInsightsPage() {
  const visitors = (await getRecords("visitors.json")) as VisitorRecord[];
  const contacts = (await getRecords("contact-submissions.json")) as ContactRecord[];
  const topCountries = countBy(visitors, (visitor) => visitor.location?.country ?? "").slice(0, 5);
  const topPages = countBy(visitors, (visitor) => visitor.path ?? "/").slice(0, 5);
  const topReferrers = countBy(visitors, (visitor) => visitor.referrer || "Direct").slice(0, 5);
  const deviceMix = countBy(visitors, (visitor) => getDeviceType(visitor.screenWidth)).slice(0, 3);
  const latestVisitor = visitors[0];
  const latestContact = contacts[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#0f233f_0%,#091423_42%,#050910_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                Private Admin
              </p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Visitor and contact insights</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Track who is visiting, where they may be coming from, which pages are drawing attention, and which contact messages deserve follow-up.
              </p>
            </div>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Log Out
              </button>
            </form>
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-[1.6rem] border border-cyan-300/14 bg-[linear-gradient(180deg,rgba(18,32,56,0.86),rgba(9,16,28,0.96))] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Visitors Saved</p>
              <p className="mt-3 text-4xl font-semibold">{visitors.length}</p>
              <p className="mt-3 text-sm text-slate-300">
                Latest visit: {latestVisitor ? formatDate(latestVisitor.visitedAt) : "No data yet"}
              </p>
            </article>
            <article className="rounded-[1.6rem] border border-emerald-300/14 bg-[linear-gradient(180deg,rgba(18,32,56,0.86),rgba(9,16,28,0.96))] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">Leads Saved</p>
              <p className="mt-3 text-4xl font-semibold">{contacts.length}</p>
              <p className="mt-3 text-sm text-slate-300">
                Latest contact: {latestContact ? latestContact.name || latestContact.email || "Unknown" : "No data yet"}
              </p>
            </article>
            <article className="rounded-[1.6rem] border border-violet-300/14 bg-[linear-gradient(180deg,rgba(18,32,56,0.86),rgba(9,16,28,0.96))] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-violet-300">Top Country</p>
              <p className="mt-3 text-2xl font-semibold">{topCountries[0]?.[0] ?? "No data"}</p>
              <p className="mt-3 text-sm text-slate-300">
                {topCountries[0]?.[1] ?? 0} visits captured
              </p>
            </article>
            <article className="rounded-[1.6rem] border border-amber-300/14 bg-[linear-gradient(180deg,rgba(18,32,56,0.86),rgba(9,16,28,0.96))] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Top Page</p>
              <p className="mt-3 text-2xl font-semibold">{topPages[0]?.[0] ?? "No data"}</p>
              <p className="mt-3 text-sm text-slate-300">
                {topPages[0]?.[1] ?? 0} visits captured
              </p>
            </article>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5">
              <p className="text-sm font-semibold text-white">Traffic Snapshot</p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Top Countries</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-200">
                    {topCountries.length === 0 ? <p>No data</p> : topCountries.map(([label, count]) => <p key={label}>{label} - {count}</p>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Top Pages</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-200">
                    {topPages.length === 0 ? <p>No data</p> : topPages.map(([label, count]) => <p key={label}>{label} - {count}</p>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Device Mix</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-200">
                    {deviceMix.length === 0 ? <p>No data</p> : deviceMix.map(([label, count]) => <p key={label}>{label} - {count}</p>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5">
              <p className="text-sm font-semibold text-white">Referrer Snapshot</p>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                {topReferrers.length === 0 ? (
                  <p>No referrers recorded yet.</p>
                ) : (
                  topReferrers.map(([label, count]) => (
                    <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                      <p className="break-all font-medium text-white">{label}</p>
                      <p className="mt-1 text-slate-400">{count} visits</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Recent Visitors</h2>
            <span className="rounded-full border border-white/12 px-3 py-1 text-xs text-cyan-200">
              {visitors.length} saved
            </span>
          </div>
          <div className="grid gap-4">
          {visitors.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300">
              No visitor records yet.
            </div>
          ) : (
            visitors.slice(0, 50).map((visitor, index) => (
              <article
                key={`${visitor.visitedAt ?? "visit"}-${index}`}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{visitor.path || "/"}</p>
                    <p className="mt-1 text-xs text-slate-400">{formatDate(visitor.visitedAt)}</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs text-emerald-300">
                    {formatLocation(visitor.location)}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                  <p><strong className="text-white">IP:</strong> {visitor.ip || "Unknown"}</p>
                  <p><strong className="text-white">Language:</strong> {visitor.language || "Unknown"}</p>
                  <p><strong className="text-white">Timezone:</strong> {visitor.timezone || "Unknown"}</p>
                  <p><strong className="text-white">Screen:</strong> {visitor.screenWidth && visitor.screenHeight ? `${visitor.screenWidth} x ${visitor.screenHeight}` : "Unknown"}</p>
                  <p><strong className="text-white">Device:</strong> {getDeviceType(visitor.screenWidth)}</p>
                  <p><strong className="text-white">Country:</strong> {visitor.location?.country || "Unknown"}</p>
                  <p className="md:col-span-2 break-all"><strong className="text-white">Referrer:</strong> {visitor.referrer || "Direct"}</p>
                  <p className="md:col-span-2 break-all"><strong className="text-white">User Agent:</strong> {visitor.userAgent || "Unknown"}</p>
                </div>
              </article>
            ))
          )}
          </div>
        </section>

        <section className="mt-10 pb-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Contact Submissions</h2>
            <span className="rounded-full border border-white/12 px-3 py-1 text-xs text-cyan-200">
              {contacts.length} saved
            </span>
          </div>
          <div className="grid gap-4">
          {contacts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300">
              No contact submissions yet.
            </div>
          ) : (
            contacts.slice(0, 50).map((entry, index) => (
              <article
                key={`${entry.submittedAt ?? "contact"}-${index}`}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{entry.name || "Unknown sender"}</p>
                    <p className="mt-1 text-sm text-slate-300">{entry.email || "No email"}</p>
                  </div>
                  <span className="rounded-full bg-cyan-400/12 px-3 py-1 text-xs text-cyan-300">
                    {formatDate(entry.submittedAt)}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                  <p><strong className="text-white">Company:</strong> {entry.company || "Not provided"}</p>
                  <p><strong className="text-white">Subject:</strong> {entry.subject || "Not provided"}</p>
                  <p><strong className="text-white">IP:</strong> {entry.ip || "Unknown"}</p>
                  <p><strong className="text-white">Location:</strong> {formatLocation(entry.location)}</p>
                  <p className="md:col-span-2 break-all"><strong className="text-white">Referrer:</strong> {entry.referrer || "Direct"}</p>
                  <p className="md:col-span-2 break-all"><strong className="text-white">User Agent:</strong> {entry.userAgent || "Unknown"}</p>
                </div>
                <div className="mt-4 rounded-2xl border border-white/8 bg-slate-950/45 p-4 text-sm leading-6 text-white">
                  {entry.message || "No message"}
                </div>
              </article>
            ))
          )}
          </div>
        </section>
      </div>
    </main>
  );
}
