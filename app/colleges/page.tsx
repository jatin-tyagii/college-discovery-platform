"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CollegeCard from "@/components/college/CollegeCard";
import SearchBar from "@/components/filters/SearchBar";
import FilterPanel from "@/components/filters/FilterPanel";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Top Rated", value: "rating" },
  { label: "Fees: Low to High", value: "fees" },
  { label: "Best Placement", value: "placement" },
  { label: "NIRF Ranking", value: "ranking" },
  { label: "Name A-Z", value: "name" },
];

export default function CollegesPage() {
  const [colleges, setColleges]   = useState<any[]>([]);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage]           = useState(1);
  const [search, setSearch]       = useState("");
  const [state, setState]         = useState("");
  const [type, setType]           = useState("");
  const [course, setCourse]       = useState("");
  const [maxFees, setMaxFees]     = useState("");
  const [minRating, setMinRating] = useState("");
  const [sort, setSort]           = useState("rating");
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchColleges = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params: any = { page, sort };
      if (search) params.search = search;
      if (state) params.state = state;
      if (type) params.type = type;
      if (course) params.course = course;
      if (maxFees) params.maxFees = maxFees;
      if (minRating) params.minRating = minRating;

      const res = await axios.get("/api/colleges", { params });
      setColleges(res.data.colleges);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch {
      setError("Failed to load colleges. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, state, type, course, maxFees, minRating, sort, page]);

  useEffect(() => { fetchColleges(); }, [fetchColleges]);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleState  = (v: string) => { setState(v); setPage(1); };
  const handleType   = (v: string) => { setType(v); setPage(1); };
  const handleCourse = (v: string) => { setCourse(v); setPage(1); };
  const handleMaxFees = (v: string) => { setMaxFees(v); setPage(1); };
  const handleMinRating = (v: string) => { setMinRating(v); setPage(1); };
  const handleSort   = (v: string) => { setSort(v); setPage(1); };
  const handleClear  = () => { setState(""); setType(""); setCourse(""); setMaxFees(""); setMinRating(""); setPage(1); };

  const hasFilters = state || type || course || maxFees || minRating;

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* ── PAGE HEADER ─────────────────────────────── */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
            Discover
          </div>
          <h1 className="text-5xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>
            All Colleges
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
            {loading ? "Loading..." : `${total} colleges found`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── SEARCH + SORT BAR ───────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <SearchBar value={search} onChange={handleSearch} />
          <div className="flex gap-3">
            <select value={sort} onChange={e => handleSort(e.target.value)}
              className="editorial-select" style={{ minWidth: "180px" }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {/* Mobile filter toggle */}
            <button onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 font-semibold text-sm uppercase tracking-wide"
              style={{ borderColor: "var(--ink)", fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
              <SlidersHorizontal className="w-4 h-4" />
              Filters {hasFilters && <span className="w-5 h-5 flex items-center justify-center text-xs" style={{ background: "var(--ink)", color: "var(--accent)" }}>{[state, type, course, maxFees, minRating].filter(Boolean).length}</span>}
            </button>
          </div>
        </div>

        {/* ── ACTIVE FILTERS CHIPS ────────────────── */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { label: state, clear: () => setState("") },
              { label: type, clear: () => setType("") },
              { label: course, clear: () => setCourse("") },
              { label: maxFees ? `Max ₹${parseInt(maxFees).toLocaleString("en-IN")}` : "", clear: () => setMaxFees("") },
              { label: minRating ? `${minRating}+ Stars` : "", clear: () => setMinRating("") },
            ].filter(f => f.label).map((f, i) => (
              <button key={i} onClick={f.clear}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wide border-2"
                style={{ borderColor: "var(--ink)", background: "var(--ink)", color: "var(--white)", fontFamily: "var(--font-dm-sans)" }}>
                {f.label} <X className="w-3 h-3" />
              </button>
            ))}
            <button onClick={handleClear} className="px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>
              Clear All
            </button>
          </div>
        )}

        {/* ── MAIN LAYOUT ─────────────────────────── */}
        <div className="flex gap-8">

          {/* Sidebar filters — desktop always visible, mobile toggle */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <FilterPanel
              state={state} type={type} course={course} maxFees={maxFees} minRating={minRating}
              onState={handleState} onType={handleType} onCourse={handleCourse}
              onMaxFees={handleMaxFees} onMinRating={handleMinRating} onClear={handleClear}
            />
          </div>

          {/* College grid */}
          <div className="flex-1 min-w-0">
            {error && (
              <div className="mb-6 p-4 border-2 border-red-500 bg-red-50 text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans)", color: "#E84545" }}>
                {error}
              </div>
            )}

            {loading ? (
              <SkeletonGrid />
            ) : colleges.length === 0 ? (
              <EmptyState
                title="No colleges found."
                body="Try adjusting your search or removing some filters to see more results."
                cta="Clear All Filters"
                ctaHref="/colleges"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {colleges.map(college => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>

                {/* ── PAGINATION ──────────────────── */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-between">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex items-center gap-2 px-5 py-2.5 border-2 font-bold text-sm uppercase tracking-wide transition-colors disabled:opacity-40"
                      style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => {
                        const p = i + 1;
                        if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
                          return (
                            <button key={p} onClick={() => setPage(p)}
                              className="w-9 h-9 text-sm font-bold border-2 transition-colors"
                              style={{
                                borderColor: "var(--ink)",
                                background: p === page ? "var(--ink)" : "transparent",
                                color: p === page ? "var(--white)" : "var(--ink)",
                                fontFamily: "var(--font-dm-sans)",
                              }}>
                              {p}
                            </button>
                          );
                        }
                        if (Math.abs(p - page) === 2) return <span key={p} style={{ color: "var(--ink-muted)" }}>…</span>;
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="flex items-center gap-2 px-5 py-2.5 border-2 font-bold text-sm uppercase tracking-wide transition-colors disabled:opacity-40"
                      style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Results count */}
                <p className="mt-4 text-center text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                  Showing {(page - 1) * 12 + 1}–{Math.min(page * 12, total)} of {total} colleges
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
