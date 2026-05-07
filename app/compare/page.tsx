"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { GitCompare, Plus, ArrowRight, Trash2 } from "lucide-react";
import CompareTable from "@/components/compare/CompareTable";

export default function ComparePage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  const loadCompare = async () => {
    setLoading(true); setError("");
    try {
      const ids: string[] = JSON.parse(localStorage.getItem("compareList") || "[]");
      if (ids.length === 0) { setColleges([]); setLoading(false); return; }
      const res = await axios.post("/api/compare", { collegeIds: ids });
      setColleges(res.data);
    } catch {
      setError("Failed to load comparison data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCompare(); }, []);

  const handleRemove = (id: string) => {
    const updated = colleges.filter(c => c.id !== id);
    setColleges(updated);
    localStorage.setItem("compareList", JSON.stringify(updated.map(c => c.id)));
    window.dispatchEvent(new Event("compareUpdated"));
  };

  const handleClearAll = () => {
    setColleges([]);
    localStorage.setItem("compareList", JSON.stringify([]));
    window.dispatchEvent(new Event("compareUpdated"));
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                Decision Tool
              </div>
              <h1 className="text-5xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>
                Compare<br /><span style={{ color: "var(--accent)", fontStyle: "italic" }}>Colleges</span>
              </h1>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
                {colleges.length > 0
                  ? `Comparing ${colleges.length} college${colleges.length > 1 ? "s" : ""}. ${3 - colleges.length} slot${3 - colleges.length !== 1 ? "s" : ""} remaining.`
                  : "Add up to 3 colleges to compare side by side."}
              </p>
            </div>
            <div className="flex gap-3 mt-2">
              <Link href="/colleges" className="btn-accent text-xs py-2 px-4">
                <Plus className="w-4 h-4" /> Add College
              </Link>
              {colleges.length > 0 && (
                <button onClick={handleClearAll} className="btn-secondary text-xs py-2 px-4"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}>
                  <Trash2 className="w-4 h-4" /> Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Loading state */}
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="skeleton h-16 w-full rounded" />
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton h-12 w-full rounded" />)}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="p-4 border-2 text-sm font-medium mb-6"
            style={{ borderColor: "#E84545", background: "#FFF0F0", color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>
            {error}
          </div>
        )}

        {/* Empty state — no colleges */}
        {!loading && !error && colleges.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--ink)" }}>
              <GitCompare className="w-10 h-10" style={{ color: "var(--accent)" }} />
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              Nothing to compare yet.
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              Browse colleges and click the compare icon on any card to add it here. You can compare up to 3 colleges side by side.
            </p>
            <Link href="/colleges" className="btn-primary inline-flex">
              Browse Colleges <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Only 1 college — prompt to add more */}
        {!loading && !error && colleges.length === 1 && (
          <div className="mb-8 p-5 border-2 flex items-center justify-between"
            style={{ borderColor: "var(--accent)", background: "rgba(232,197,71,0.08)" }}>
            <div>
              <div className="font-bold mb-1" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
                Add at least 1 more college to compare
              </div>
              <div className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                You need at least 2 colleges for a meaningful comparison.
              </div>
            </div>
            <Link href="/colleges" className="btn-accent text-xs py-2 px-4 flex-shrink-0 ml-4">
              <Plus className="w-4 h-4" /> Add College
            </Link>
          </div>
        )}

        {/* Compare table — 2 or 3 colleges */}
        {!loading && !error && colleges.length >= 2 && (
          <div className="space-y-6">
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-6 p-4" style={{ background: "var(--white)", border: "1px solid var(--border)" }}>
              <span className="text-xs font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>Legend:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4" style={{ background: "#E8F5ED", border: "1px solid #1B6B35" }} />
                <span className="text-xs font-semibold" style={{ fontFamily: "var(--font-dm-sans)", color: "#1B6B35" }}>Best Value</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4" style={{ background: "#FFF0F0", border: "1px solid #E84545" }} />
                <span className="text-xs font-semibold" style={{ fontFamily: "var(--font-dm-sans)", color: "#E84545" }}>Needs Improvement</span>
              </div>
              <div className="ml-auto text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                Scroll horizontally on mobile →
              </div>
            </div>

            {/* Table */}
            <div className="editorial-card overflow-hidden p-0">
              <CompareTable colleges={colleges} onRemove={handleRemove} />
            </div>

            {/* Add more CTA */}
            {colleges.length < 3 && (
              <div className="text-center pt-4">
                <Link href="/colleges" className="btn-secondary inline-flex">
                  <Plus className="w-4 h-4" /> Add Another College ({3 - colleges.length} slot left)
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
