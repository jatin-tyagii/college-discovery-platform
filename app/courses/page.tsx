"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { BookOpen, ChevronLeft, ChevronRight, Search, Clock, DollarSign } from "lucide-react";

const DURATION_OPTIONS = [{ label: "Any Duration", value: "" }, { label: "1 Year", value: "1" }, { label: "2 Years", value: "2" }, { label: "3 Years", value: "3" }, { label: "4 Years", value: "4" }, { label: "5 Years", value: "5" }];
const FEES_OPTIONS = [{ label: "Any Fees", value: "" }, { label: "Up to ₹1L", value: "100000" }, { label: "Up to ₹2L", value: "200000" }, { label: "Up to ₹5L", value: "500000" }, { label: "Up to ₹25L", value: "2500000" }];

function formatFees(fees: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(fees);
}

export default function CoursesPage() {
  const [courses, setCourses]     = useState<any[]>([]);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage]           = useState(1);
  const [search, setSearch]       = useState("");
  const [duration, setDuration]   = useState("");
  const [maxFees, setMaxFees]     = useState("");
  const [loading, setLoading]     = useState(true);
  const [inputVal, setInputVal]   = useState("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { page };
      if (search) params.search = search;
      if (duration) params.duration = duration;
      if (maxFees) params.maxFees = maxFees;
      const res = await axios.get("/api/courses", { params });
      setCourses(res.data.courses);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch { setCourses([]); }
    finally { setLoading(false); }
  }, [search, duration, maxFees, page]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  useEffect(() => {
    const t = setTimeout(() => { setSearch(inputVal); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [inputVal]);

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>Explore</div>
          <h1 className="text-5xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>All Courses</h1>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
            {loading ? "Loading..." : `${total} courses across all colleges`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute top-1/2 -translate-y-1/2 w-4 h-4 z-10" style={{ left: "1rem", color: "var(--ink-muted)" }} />
            <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}
              placeholder="Search courses or colleges..."
              className="search-input" />
          </div>
          <select value={duration} onChange={e => { setDuration(e.target.value); setPage(1); }} className="editorial-select" style={{ minWidth: "150px" }}>
            {DURATION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={maxFees} onChange={e => { setMaxFees(e.target.value); setPage(1); }} className="editorial-select" style={{ minWidth: "150px" }}>
            {FEES_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Course grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="editorial-card p-5 space-y-3 animate-pulse">
                <div className="skeleton h-6 w-1/2 rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-4 w-1/3 rounded" />
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="py-24 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--ink-muted)" }} />
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>No courses found</h2>
            <p style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course: any) => (
                <div key={course.id} className="editorial-card flex flex-col overflow-hidden">
                  <div className="h-1" style={{ background: "var(--accent)" }} />
                  <div className="p-5 flex flex-col flex-1">
                    {/* Course name */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{course.name}</h3>
                      <BookOpen className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: "var(--ink-muted)" }} />
                    </div>

                    {/* College name */}
                    <Link href={`/colleges/${course.college.id}`}
                      className="text-sm font-semibold mb-1 hover:underline"
                      style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)" }}>
                      {course.college.name}
                    </Link>
                    <p className="text-xs mb-4" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                      {course.college.city}, {course.college.state}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 py-3 mb-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" style={{ color: "var(--ink-muted)" }} />
                        <div>
                          <div className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Duration</div>
                          <div className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{course.duration} Year{course.duration > 1 ? "s" : ""}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5" style={{ color: "var(--ink-muted)" }} />
                        <div>
                          <div className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Annual Fees</div>
                          <div className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
                            {course.fees >= 100000 ? `₹${(course.fees / 100000).toFixed(1)}L` : `₹${(course.fees / 1000).toFixed(0)}K`}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* College badges */}
                    <div className="flex items-center gap-2 mt-auto">
                      <span className={`badge text-xs ${course.college.type === "Government" ? "badge-govt" : "badge-private"}`}>{course.college.type}</span>
                      {course.college.nirf && <span className="badge badge-nirf text-xs">NIRF #{course.college.nirf}</span>}
                      {course.seats && <span className="text-xs ml-auto" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{course.seats} seats</span>}
                    </div>

                    <Link href={`/colleges/${course.college.id}`} className="btn-primary w-full justify-center text-xs py-2 mt-3">
                      View College
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-between">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="flex items-center gap-2 px-5 py-2.5 border-2 font-bold text-sm uppercase tracking-wide disabled:opacity-40"
                  style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
                  Page {page} of {totalPages}
                </span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 border-2 font-bold text-sm uppercase tracking-wide disabled:opacity-40"
                  style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
