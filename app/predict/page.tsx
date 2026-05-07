"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Target, ArrowRight, Star, TrendingUp, GitCompare, ChevronRight, AlertCircle } from "lucide-react";

const EXAMS = [
  { value: "JEE Advanced", label: "JEE Advanced", sub: "For IIT admissions", inputLabel: "Your JEE Advanced Rank" },
  { value: "JEE Main",     label: "JEE Main",     sub: "For NIT/IIIT admissions", inputLabel: "Your JEE Main Rank" },
  { value: "CAT",          label: "CAT",           sub: "For MBA admissions", inputLabel: "Your CAT Percentile (e.g. 98.5)" },
  { value: "NEET",         label: "NEET",          sub: "For MBBS admissions", inputLabel: "Your NEET Rank" },
  { value: "GATE",         label: "GATE",          sub: "For M.Tech admissions", inputLabel: "Your GATE Score (out of 1000)" },
];

const CATEGORIES = ["General", "OBC", "SC", "ST"];

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

export default function PredictPage() {
  const [exam, setExam]         = useState("JEE Advanced");
  const [rank, setRank]         = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<any>(null);
  const [error, setError]       = useState("");

  const selectedExam = EXAMS.find(e => e.value === exam)!;

  const handleSubmit = async () => {
    if (!rank) { setError("Please enter your rank or score."); return; }
    const rankNum = parseFloat(rank);
    if (isNaN(rankNum) || rankNum <= 0) { setError("Please enter a valid rank or score."); return; }

    setError(""); setLoading(true); setResult(null);
    try {
      const res = await axios.post("/api/predict", { exam, rank: rankNum, category });
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const matchStrength = (college: any): { label: string; color: string } => {
    if (!result) return { label: "", color: "" };
    if (college.rating >= 4.7) return { label: "Excellent Match", color: "#1B6B35" };
    if (college.rating >= 4.4) return { label: "Strong Match", color: "#2D7A4F" };
    if (college.rating >= 4.0) return { label: "Good Match", color: "#7B5F00" };
    return { label: "Possible Match", color: "#6B6B6B" };
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* ── HEADER ───────────────────────────────── */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
            Smart Tool
          </div>
          <h1 className="text-5xl font-black mb-3" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>
            Rank<br /><span style={{ color: "var(--accent)", fontStyle: "italic" }}>Predictor</span>
          </h1>
          <p className="text-sm max-w-lg" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
            Enter your exam rank or score and category. We'll show you the best colleges you can realistically target.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── FORM ─────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="editorial-card p-6 sticky top-24">
              <h2 className="text-xl font-black mb-6" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                Your Details
              </h2>

              {/* Exam selector */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-widest font-bold mb-3" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                  Select Exam
                </label>
                <div className="space-y-2">
                  {EXAMS.map(e => (
                    <button key={e.value} onClick={() => { setExam(e.value); setResult(null); setError(""); }}
                      className="w-full text-left px-4 py-3 border-2 transition-all"
                      style={{
                        borderColor: exam === e.value ? "var(--ink)" : "var(--border)",
                        background: exam === e.value ? "var(--ink)" : "var(--white)",
                        color: exam === e.value ? "var(--white)" : "var(--ink)",
                        fontFamily: "var(--font-dm-sans)",
                      }}>
                      <div className="font-bold text-sm">{e.label}</div>
                      <div className="text-xs mt-0.5 opacity-70">{e.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rank input */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                  {selectedExam.inputLabel}
                </label>
                <input
                  type="number"
                  value={rank}
                  onChange={e => { setRank(e.target.value); setError(""); }}
                  placeholder={exam === "CAT" ? "e.g. 98.5" : "e.g. 5432"}
                  className="editorial-input"
                  min="1"
                  step={exam === "CAT" ? "0.01" : "1"}
                />
                {exam === "CAT" && (
                  <p className="text-xs mt-1" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    Enter percentile (0–100), e.g. 98.5
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)}
                      className="py-2 text-sm font-bold border-2 transition-all"
                      style={{
                        borderColor: category === cat ? "var(--ink)" : "var(--border)",
                        background: category === cat ? "var(--ink)" : "transparent",
                        color: category === cat ? "var(--white)" : "var(--ink)",
                        fontFamily: "var(--font-dm-sans)",
                      }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 p-3 mb-4 border-2" style={{ borderColor: "#E84545", background: "#FFF0F0" }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#E84545" }} />
                  <p className="text-xs" style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>{error}</p>
                </div>
              )}

              {/* Submit */}
              <button onClick={handleSubmit} disabled={loading}
                className="btn-accent w-full justify-center text-sm py-3 disabled:opacity-60">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    Predicting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Target className="w-4 h-4" /> Predict My Colleges
                  </span>
                )}
              </button>

              {/* Disclaimer */}
              <p className="text-xs mt-4 leading-relaxed" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                * Predictions are indicative and based on historical data. Always verify cutoffs on official websites before applying.
              </p>
            </div>
          </div>

          {/* ── RESULTS ──────────────────────────── */}
          <div className="lg:col-span-3">

            {/* Default state */}
            {!result && !loading && (
              <div className="py-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--ink)" }}>
                  <Target className="w-10 h-10" style={{ color: "var(--accent)" }} />
                </div>
                <h2 className="text-3xl font-black mb-3" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                  Enter your rank to begin.
                </h2>
                <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                  Fill in your exam, rank, and category on the left. We'll show you the best colleges you can get into.
                </p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="editorial-card p-5 animate-pulse">
                    <div className="flex justify-between mb-3">
                      <div className="skeleton h-6 w-1/3 rounded" />
                      <div className="skeleton h-5 w-20 rounded" />
                    </div>
                    <div className="skeleton h-4 w-2/3 rounded mb-2" />
                    <div className="skeleton h-4 w-1/2 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            {result && !loading && (
              <div className="space-y-6">

                {/* Result summary card */}
                <div className="p-6" style={{ background: "var(--ink)", border: "3px solid var(--accent)" }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent)" }}>
                      <Target className="w-4 h-4" style={{ color: "var(--ink)" }} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                        {result.tier}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans)" }}>
                        {result.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <div>
                      <div className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>Exam</div>
                      <div className="font-bold" style={{ color: "var(--white)", fontFamily: "var(--font-dm-sans)" }}>{result.exam}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>
                        {result.exam === "CAT" ? "Percentile" : "Rank"}
                      </div>
                      <div className="font-black text-xl" style={{ color: "var(--accent)", fontFamily: "var(--font-playfair)" }}>
                        {result.exam === "CAT" ? result.rank : `#${result.rank.toLocaleString("en-IN")}`}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>Category</div>
                      <div className="font-bold" style={{ color: "var(--white)", fontFamily: "var(--font-dm-sans)" }}>{result.category}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>Results</div>
                      <div className="font-bold" style={{ color: "var(--white)", fontFamily: "var(--font-dm-sans)" }}>{result.colleges.length} colleges</div>
                    </div>
                  </div>
                </div>

                {/* College result cards */}
                {result.colleges.length === 0 ? (
                  <div className="editorial-card p-8 text-center">
                    <p className="mb-4" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                      No specific colleges found for this criteria. Try a different rank or category.
                    </p>
                    <Link href="/colleges" className="btn-primary inline-flex">
                      Browse All Colleges <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {result.colleges.map((college: any, i: number) => {
                      const match = matchStrength(college);
                      return (
                        <div key={college.id} className="editorial-card p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              {/* Rank number */}
                              <div className="text-3xl font-black flex-shrink-0 w-10 text-center" style={{ fontFamily: "var(--font-playfair)", color: "rgba(0,0,0,0.12)" }}>
                                {String(i + 1).padStart(2, "0")}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-xs font-bold px-2 py-0.5" style={{ background: match.color, color: "var(--white)", fontFamily: "var(--font-dm-sans)" }}>
                                    {match.label}
                                  </span>
                                  <span className={`badge ${college.type === "Government" ? "badge-govt" : "badge-private"}`}>{college.type}</span>
                                  {college.nirf && <span className="badge badge-nirf">NIRF #{college.nirf}</span>}
                                </div>
                                <h3 className="font-black text-lg leading-tight mb-1" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                                  {college.name}
                                </h3>
                                <p className="text-xs mb-3" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                                  {college.city}, {college.state}
                                </p>

                                {/* Key stats */}
                                <div className="flex flex-wrap gap-4">
                                  <div className="flex items-center gap-1 text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold" style={{ color: "var(--ink)" }}>{college.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="font-bold" style={{ color: "var(--ink)" }}>{college.placementPct}% placed</span>
                                  </div>
                                  <div className="text-xs font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
                                    {formatFees(college.fees)}/yr
                                  </div>
                                  {college.avgPackage && (
                                    <div className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                                      Avg: <span className="font-bold" style={{ color: "var(--ink)" }}>₹{college.avgPackage} LPA</span>
                                    </div>
                                  )}
                                </div>

                                {/* Courses */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {college.coursesOffered.slice(0, 3).map((c: string) => (
                                    <span key={c} className="text-xs px-2 py-0.5 border"
                                      style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)", borderColor: "var(--border)" }}>
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col gap-2 flex-shrink-0">
                              <Link href={`/colleges/${college.id}`}
                                className="flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wide border-2 transition-colors hover:bg-ink hover:text-white"
                                style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
                                View <ChevronRight className="w-3 h-3" />
                              </Link>
                              <button onClick={() => addToCompare(college.id)}
                                className="flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wide border-2 transition-colors hover:bg-ink hover:text-white"
                                style={{ borderColor: "var(--border)", color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                                <GitCompare className="w-3 h-3" /> Compare
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Bottom CTA */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/compare" className="btn-primary text-sm">
                    <GitCompare className="w-4 h-4" /> Compare These Colleges
                  </Link>
                  <Link href="/colleges" className="btn-secondary text-sm">
                    Browse All Colleges <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
