"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Search, BookOpen, ChevronRight } from "lucide-react";

const EXAM_TYPES = ["Engineering", "Medical", "Management", "Law"];

export default function ExamsPage() {
  const [exams, setExams]       = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [type, setType]         = useState("");
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setSearch(inputVal), 300);
    return () => clearTimeout(t);
  }, [inputVal]);

  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (search) params.search = search;
    if (type) params.type = type;
    axios.get("/api/exams", { params })
      .then(res => setExams(res.data))
      .catch(() => setExams([]))
      .finally(() => setLoading(false));
  }, [search, type]);

  const typeColors: Record<string, string> = {
    Engineering: "#1A3A7B", Medical: "#1B6B35",
    Management: "#7B3F00", Law: "#6B1A1A", International: "#4A1A7B"
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-xs uppercase tracking-widest mb-2 font-semibold"
            style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>Navigate</div>
          <h1 className="text-5xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>
            Entrance<br /><span style={{ color: "var(--accent)", fontStyle: "italic" }}>Exams</span>
          </h1>
          <p className="mt-3 text-sm max-w-lg" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
            Complete guide to JEE, CAT, NEET, GATE and every major entrance exam in India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search + type filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10"
              style={{ left: "1rem", color: "var(--ink-muted)" }} />
            <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}
              placeholder="Search exams..." className="search-input" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setType("")}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wide border-2 transition-colors"
              style={{
                borderColor: "var(--ink)",
                background: !type ? "var(--ink)" : "transparent",
                color: !type ? "var(--white)" : "var(--ink)",
                fontFamily: "var(--font-dm-sans)",
              }}>All</button>
            {EXAM_TYPES.map(t => (
              <button key={t} onClick={() => setType(type === t ? "" : t)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wide border-2 transition-colors"
                style={{
                  borderColor: "var(--ink)",
                  background: type === t ? "var(--ink)" : "transparent",
                  color: type === t ? "var(--white)" : "var(--ink)",
                  fontFamily: "var(--font-dm-sans)",
                }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Exams grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="editorial-card p-6 animate-pulse space-y-3">
                <div className="skeleton h-7 w-1/3 rounded" />
                <div className="skeleton h-4 w-2/3 rounded" />
                <div className="skeleton h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : exams.length === 0 ? (
          <div className="py-24 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--ink-muted)" }} />
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>No exams found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam: any) => {
              const color = typeColors[exam.type] || "#333";
              return (
                <Link key={exam.id} href={`/exams/${exam.id}`}
                  className="editorial-card p-6 flex flex-col group transition-all duration-200"
                  style={{ borderWidth: "1px" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${color}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}>

                  {/* Top color bar */}
                  <div className="h-1 -mx-6 -mt-6 mb-5" style={{ background: color }} />

                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 border mb-2 inline-block"
                        style={{ borderColor: color, color, fontFamily: "var(--font-dm-sans)" }}>
                        {exam.type}
                      </span>
                      <h2 className="text-3xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                        {exam.name}
                      </h2>
                    </div>
                    <ChevronRight className="w-5 h-5 mt-2 flex-shrink-0 transition-transform group-hover:translate-x-1"
                      style={{ color: "var(--ink-muted)" }} />
                  </div>

                  <p className="text-sm mb-1" style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)" }}>
                    {exam.fullName}
                  </p>
                  <p className="text-xs mb-4" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    {exam.description.slice(0, 100)}...
                  </p>

                  <div className="mt-auto grid grid-cols-3 gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                    {[
                      { label: "By", value: exam.conductedBy },
                      { label: "Level", value: exam.level },
                      { label: "Colleges", value: exam._count?.colleges || "—" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
                        <div className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
