import Link from "next/link";
import { ArrowRight, GitCompare, BookOpen, MessageSquare, Target } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getFeaturedColleges() {
  try {
    return await prisma.college.findMany({
      take: 6, orderBy: { rating: "desc" },
      select: { id: true, name: true, slug: true, city: true, state: true, type: true, fees: true, rating: true, nirf: true, placementPct: true },
    });
  } catch { return []; }
}

async function getTickerColleges() {
  try {
    return await prisma.college.findMany({
      take: 16, orderBy: { rating: "desc" },
      select: { id: true, name: true, city: true, nirf: true, placementPct: true, type: true },
    });
  } catch { return []; }
}

async function getStats() {
  try {
    const [colleges, exams, questions] = await Promise.all([
      prisma.college.count(), prisma.exam.count(), prisma.question.count(),
    ]);
    return { colleges, exams, questions };
  } catch { return { colleges: 30, exams: 10, questions: 5 }; }
}

function formatFeesShort(fees: number) {
  if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L`;
  return `₹${fees.toLocaleString("en-IN")}`;
}

export default async function HomePage() {
  const [colleges, tickerColleges, stats] = await Promise.all([
    getFeaturedColleges(), getTickerColleges(), getStats(),
  ]);

  const col1 = tickerColleges.slice(0, 8);
  const col2 = tickerColleges.slice(8, 16);

  return (
    <div style={{ background: "var(--cream)" }}>

      {/* Ticker + hero animations */}
      <style>{`
        @keyframes tickerUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes tickerDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .ticker-pill {
          display: block;
          padding: 10px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.2s, background 0.2s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ticker-pill:hover {
          border-color: #E8C547;
          background: rgba(232,197,71,0.06);
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center" style={{ background: "var(--ink)" }}>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center w-full">

          {/* LEFT */}
          <div className="flex-1 flex flex-col justify-center py-4 pr-0 lg:pr-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: "var(--accent)" }} />
              <span className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                India's Honest College Guide
              </span>
            </div>

            <h1 className="font-bold leading-none mb-6" style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              color: "var(--white)", lineHeight: "0.95",
            }}>
              Find Your<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>College.</span><br />
              Own Your<br />Future.
            </h1>

            <p className="text-lg max-w-md mt-6 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-dm-sans)" }}>
              No paid rankings. No sponsored listings. Just real data on {stats.colleges}+ colleges.
            </p>

            <div className="mt-10 max-w-xl">
              <div className="flex" style={{ border: "2px solid var(--accent)" }}>
                <Link href="/colleges" className="flex-1 px-5 py-4 text-sm flex items-center"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-dm-sans)" }}>
                  Search colleges, courses, exams...
                </Link>
                <Link href="/colleges" className="px-6 py-4 font-bold text-sm uppercase tracking-widest flex items-center gap-2 flex-shrink-0"
                  style={{ background: "var(--accent)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
                  Search <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Engineering", "Medical", "Management", "Law"].map(cat => (
                  <Link key={cat} href={`/colleges?course=${cat}`}
                    className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                    style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-dm-sans)" }}>
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 flex gap-10">
              {[
                { num: `${stats.colleges}+`, label: "Colleges" },
                { num: `${stats.exams}+`, label: "Exams" },
                { num: `${stats.questions}+`, label: "Q&A" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-4xl font-black"
                    style={{ fontFamily: "var(--font-playfair)", color: "var(--accent)" }}>{num}</div>
                  <div className="text-xs uppercase tracking-widest mt-1"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — ticker */}
          <div className="hidden lg:flex w-72 xl:w-80 flex-shrink-0 gap-3 py-4 pl-8 overflow-hidden relative h-[85vh]">
            {/* Fades */}
            <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{ height: "80px", background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{ height: "80px", background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

            {/* Column 1 — up */}
            <div className="flex-1 overflow-hidden">
              <div className="flex flex-col gap-2" style={{ animation: "tickerUp 22s linear infinite" }}>
                {[...col1, ...col1].map((college, i) => (
                  <Link key={`c1-${i}`} href={`/colleges/${college.id}`} className="ticker-pill">
                    <div className="font-bold text-xs mb-1.5 leading-tight"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--white)" }}>
                      {college.name}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs truncate"
                        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-dm-sans)" }}>
                        {college.city}
                      </span>
                      {college.nirf && (
                        <span className="text-xs font-bold flex-shrink-0"
                          style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                          #{college.nirf}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#1B6B35" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-dm-sans)" }}>
                        {college.placementPct}% placed
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2 — down */}
            <div className="flex-1 overflow-hidden">
              <div className="flex flex-col gap-2" style={{ animation: "tickerDown 30s linear infinite" }}>
                {[...col2, ...col2].map((college, i) => (
                  <Link key={`c2-${i}`} href={`/colleges/${college.id}`} className="ticker-pill">
                    <div className="font-bold text-xs mb-1.5 leading-tight"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--white)" }}>
                      {college.name}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs truncate"
                        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-dm-sans)" }}>
                        {college.city}
                      </span>
                      {college.nirf && (
                        <span className="text-xs font-bold flex-shrink-0"
                          style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                          #{college.nirf}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#1B6B35" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-dm-sans)" }}>
                        {college.placementPct}% placed
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "var(--accent)" }} />
      </section>

      {/* ── TOOLS STRIP ──────────────────────────── */}
      <section style={{ background: "var(--white)", borderBottom: "2px solid var(--ink)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderLeft: "2px solid var(--ink)" }}>
            {[
              { icon: GitCompare, label: "Compare Colleges", sub: "Side-by-side analysis", href: "/compare" },
              { icon: Target, label: "Rank Predictor", sub: "Find your best match", href: "/predict" },
              { icon: BookOpen, label: "Exam Guide", sub: "JEE, CAT, NEET & more", href: "/exams" },
              { icon: MessageSquare, label: "Student Q&A", sub: "Ask real students", href: "/qa" },
            ].map(({ icon: Icon, label, sub, href }) => (
              <Link key={href} href={href}
                className="p-6 flex items-start gap-4 group hover:bg-zinc-100 transition-colors"
                style={{ borderRight: "2px solid var(--ink)" }}>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent)" }}>
                  <Icon className="w-5 h-5" style={{ color: "var(--ink)" }} />
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{label}</div>
                  <div className="text-xs mt-0.5 group-hover:text-white/60 transition-colors"
                    style={{ color: "var(--ink-muted)" }}>{sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLEGES ────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold mb-2"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Top Rated</div>
            <h2 className="text-5xl font-black"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)", lineHeight: "1" }}>
              Featured<br />Colleges
            </h2>
          </div>
          <Link href="/colleges" className="btn-secondary hidden md:inline-flex">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--ink)" }}>
          {colleges.map((college, i) => (
            <Link key={college.id} href={`/colleges/${college.id}`}
              className="block p-6 group hover:bg-zinc-100 transition-colors"
              style={{ background: i % 2 === 0 ? "var(--white)" : "var(--cream)" }}>
              <div className="flex justify-between items-start mb-4">
                <span className={`badge ${college.type === "Government" ? "badge-govt" : "badge-private"}`}>{college.type}</span>
                {college.nirf && <span className="badge badge-nirf">NIRF #{college.nirf}</span>}
              </div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{college.name}</h3>
              <p className="text-sm mb-4 group-hover:text-white/60 transition-colors"
                style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                {college.city}, {college.state}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black group-hover:text-yellow-400 transition-colors"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                  {formatFeesShort(college.fees)}
                  <span className="text-xs font-normal ml-1" style={{ fontFamily: "var(--font-dm-sans)" }}>/yr</span>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wide mb-0.5 group-hover:text-white/60 transition-colors"
                    style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Placement</div>
                  <div className="font-bold group-hover:text-white transition-colors"
                    style={{ color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>{college.placementPct}%</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 md:hidden">
          <Link href="/colleges" className="btn-secondary w-full justify-center">
            View All Colleges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── WHY EDUFIND ──────────────────────────── */}
      <section style={{ background: "var(--ink)" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs uppercase tracking-widest mb-4 font-semibold"
            style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>Why EduFind</div>
          <h2 className="text-5xl font-black mb-16"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>
            Better than<br />Collegedunia.
          </h2>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.1)" }}>
            {[
              { num: "01", title: "No Paid Rankings", body: "Every other platform lets colleges pay to rank higher. We don't. Our rankings are based purely on data." },
              { num: "02", title: "Decision-First UX", body: "Other platforms dump information. We structure it to help you decide. Compare, predict, shortlist — all in one place." },
              { num: "03", title: "Real Student Voice", body: "Our Q&A section connects you with real students. No corporate PR. Just honest answers from people who've been there." },
            ].map(({ num, title, body }) => (
              <div key={num} className="p-8" style={{ background: "var(--ink)" }}>
                <div className="text-6xl font-black mb-6"
                  style={{ fontFamily: "var(--font-playfair)", color: "rgba(255, 255, 255, 0.2)" }}>{num}</div>
                <h3 className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--accent)" }}>{title}</h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--accent)" }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-4xl font-black"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)", lineHeight: "1.1" }}>
            Start your search.<br />Make your decision.
          </h2>
          <div className="flex gap-4">
            <Link href="/colleges" className="btn-primary">Browse Colleges <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/signup" className="btn-secondary">Create Account</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
