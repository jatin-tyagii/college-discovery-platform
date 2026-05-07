"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Star, TrendingUp, Award, MapPin, GitCompare, ArrowRight } from "lucide-react";

const RANKING_TYPES = [
  { value: "overall",     label: "Overall",       sub: "By rating" },
  { value: "engineering", label: "Engineering",   sub: "B.Tech colleges" },
  { value: "management",  label: "Management",    sub: "MBA colleges" },
  { value: "medical",     label: "Medical",       sub: "MBBS colleges" },
  { value: "placement",   label: "Best Placement",sub: "By placement %" },
  { value: "fees",        label: "Most Affordable",sub: "Lowest fees first" },
];

function formatFees(fees: number) {
  if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L`;
  return `₹${(fees / 1000).toFixed(0)}K`;
}

function addToCompare(id: string) {
  try {
    const list: string[] = JSON.parse(localStorage.getItem("compareList") || "[]");
    if (list.includes(id)) return;
    if (list.length >= 3) { alert("Max 3 colleges in compare."); return; }
    list.push(id);
    localStorage.setItem("compareList", JSON.stringify(list));
    window.dispatchEvent(new Event("compareUpdated"));
  } catch {}
}

export default function RankingsPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activeType, setActiveType] = useState("overall");

  useEffect(() => {
    setLoading(true);
    axios.get("/api/rankings", { params: { type: activeType } })
      .then(res => setColleges(res.data))
      .catch(() => setColleges([]))
      .finally(() => setLoading(false));
  }, [activeType]);

  const activeLabel = RANKING_TYPES.find(t => t.value === activeType)?.label || "Overall";

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="text-xs uppercase tracking-widest mb-2 font-semibold"
            style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
            Rankings 2025
          </div>
          <h1 className="text-5xl font-black mb-3"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>
            Top Colleges<br />
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>in India</span>
          </h1>
          <p className="text-sm max-w-lg"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
            Data-driven rankings based on NIRF scores, placement rates, fees, and student ratings. No paid placements.
          </p>
        </div>

        {/* Ranking type tabs */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto pb-0">
            {RANKING_TYPES.map(t => (
              <button key={t.value} onClick={() => setActiveType(t.value)}
                className="flex-shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wide transition-colors border-b-2"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color: activeType === t.value ? "var(--accent)" : "rgba(255,255,255,0.5)",
                  borderBottomColor: activeType === t.value ? "var(--accent)" : "transparent",
                  background: "transparent",
                }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Section title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              {activeLabel} Rankings
            </h2>
            <p className="text-xs mt-1"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              {loading ? "Loading..." : `${colleges.length} colleges ranked`}
            </p>
          </div>
          <div className="text-xs px-3 py-1.5 font-bold uppercase tracking-wide"
            style={{ background: "var(--accent)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
            2025 Edition
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 mb-6 border-l-4"
          style={{ borderColor: "var(--accent)", background: "rgba(232,197,71,0.08)" }}>
          <p className="text-xs leading-relaxed"
            style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
            <strong style={{ color: "var(--ink)" }}>Transparency Notice:</strong> These rankings are based on NIRF data, student ratings, placement records, and publicly available information. No college has paid to be ranked higher.
          </p>
        </div>

        {/* Rankings table */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="editorial-card p-5 animate-pulse flex gap-4">
                <div className="skeleton h-10 w-10 rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-5 w-2/3 rounded" />
                  <div className="skeleton h-4 w-1/3 rounded" />
                </div>
                <div className="skeleton h-8 w-20 rounded flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="py-20 text-center">
            <Award className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--ink-muted)" }} />
            <h2 className="text-2xl font-black mb-2"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              No colleges found
            </h2>
          </div>
        ) : (
          <div className="space-y-2">
            {colleges.map((college, i) => (
              <div key={college.id}
                className="editorial-card overflow-hidden flex items-stretch group hover:bg-zinc-900 transition-colors">

                {/* Rank number */}
                <div className="w-16 flex items-center justify-center flex-shrink-0 border-r"
                  style={{
                    borderColor: "var(--border)",
                    background: i < 3 ? "var(--ink)" : "transparent",
                  }}>
                  <span className="text-2xl font-black"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: i < 3 ? "var(--accent)" : "rgba(0,0,0,0.15)",
                    }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 flex items-center gap-4 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`badge text-xs ${college.type === "Government" ? "badge-govt" : "badge-private"}`}>
                        {college.type}
                      </span>
                      {college.nirf && (
                        <span className="badge badge-nirf text-xs">NIRF #{college.nirf}</span>
                      )}
                      {college.naac && (
                        <span className="text-xs font-bold"
                          style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                          {college.naac}
                        </span>
                      )}
                    </div>
                    <h3 className="font-black text-base leading-tight group-hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 group-hover:text-white/60 transition-colors"
                      style={{ color: "var(--ink-muted)" }}>
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {college.city}, {college.state}
                      </span>
                      {college.established && (
                        <span className="text-xs ml-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          · Est. {college.established}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm font-black group-hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {college.rating}
                      </div>
                      <div className="text-xs"
                        style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                        Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-black group-hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                        {college.placementPct}%
                      </div>
                      <div className="text-xs"
                        style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                        Placed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-black group-hover:text-yellow-400 transition-colors"
                        style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                        {formatFees(college.fees)}
                      </div>
                      <div className="text-xs"
                        style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                        /year
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-1 p-3 justify-center border-l flex-shrink-0"
                  style={{ borderColor: "var(--border)" }}>
                  <Link href={`/colleges/${college.id}`}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide border-2 text-center transition-colors hover:bg-ink hover:text-white"
                    style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
                    View
                  </Link>
                  <button onClick={() => addToCompare(college.id)}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-colors hover:bg-ink hover:text-white flex items-center justify-center gap-1"
                    style={{ borderColor: "var(--border)", color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    <GitCompare className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && colleges.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/colleges" className="btn-primary text-sm">
              Browse All Colleges <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/compare" className="btn-secondary text-sm">
              <GitCompare className="w-4 h-4" /> Compare Colleges
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
