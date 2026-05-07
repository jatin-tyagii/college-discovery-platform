"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  MapPin, Star, TrendingUp, GitCompare, ChevronLeft,
  BookOpen, DollarSign, Award, Users, Building,
  TreePine, Globe, CheckCircle, XCircle
} from "lucide-react";
import SaveButton from "@/components/ui/SaveButton";

const MOCK_RECRUITERS = ["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Goldman Sachs", "Morgan Stanley", "Deloitte", "McKinsey", "KPMG", "Accenture"];

function formatFees(fees: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(fees);
}

function addToCompare(id: string) {
  try {
    const list: string[] = JSON.parse(localStorage.getItem("compareList") || "[]");
    if (list.includes(id)) { alert("Already in compare list."); return; }
    if (list.length >= 3) { alert("Max 3 colleges in compare."); return; }
    list.push(id);
    localStorage.setItem("compareList", JSON.stringify(list));
    window.dispatchEvent(new Event("compareUpdated"));
    alert("Added to compare!");
  } catch {}
}

function SkeletonDetail() {
  return (
    <div className="animate-pulse" style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <div style={{ background: "var(--ink)", height: "200px" }} />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        <div className="skeleton h-10 w-2/3 rounded" />
        <div className="skeleton h-6 w-1/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}

export default function CollegeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/colleges/${id}`)
      .then(res => setCollege(res.data))
      .catch(err => {
        if (err.response?.status === 404) setError("College not found.");
        else setError("Failed to load college details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <SkeletonDetail />;

  if (error || !college) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--cream)" }}>
        <h2 className="text-4xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{error}</h2>
        <Link href="/colleges" className="btn-primary">← Back to Colleges</Link>
      </div>
    );
  }

  const tabs = ["overview", "courses", "placements", "exams", "reviews"];

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────── */}
      <div style={{ background: "var(--ink)" }}>
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-10">

          {/* Breadcrumb + back */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => router.back()}
              className="flex items-center gap-1 text-xs uppercase tracking-wide font-semibold transition-colors hover:text-yellow-400"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <Link href="/colleges" className="text-xs uppercase tracking-wide font-semibold transition-colors hover:text-yellow-400"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>Colleges</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
              {college.name}
            </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`badge ${college.type === "Government" ? "badge-govt" : "badge-private"}`}
              style={{ background: college.type === "Government" ? "#E8F5ED" : "#FFF3E8" }}>
              {college.type}
            </span>
            {college.nirf && <span className="badge badge-nirf">NIRF #{college.nirf}</span>}
            {college.naac && (
              <span className="text-xs font-bold px-2 py-1 border"
                style={{ borderColor: "var(--accent)", color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                NAAC {college.naac}
              </span>
            )}
          </div>

          {/* Name */}
          <h1 className="font-black mb-2" style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--white)",
            lineHeight: "1.1",
          }}>
            {college.name}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-1 mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <MapPin className="w-4 h-4" />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem" }}>
              {college.city}, {college.state}
            </span>
            {college.established && (
              <span className="ml-3 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>
                Est. {college.established}
              </span>
            )}
          </div>

          {/* Key stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.1)" }}>
            {[
              { label: "Annual Fees", value: college.fees >= 100000 ? `₹${(college.fees / 100000).toFixed(1)}L` : formatFees(college.fees) },
              { label: "Rating", value: `${college.rating} ★` },
              { label: "Placement", value: `${college.placementPct}%` },
              { label: "Avg Package", value: college.avgPackage ? `₹${college.avgPackage} LPA` : "N/A" },
            ].map(({ label, value }) => (
              <div key={label} className="px-5 py-4" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
                <div className="text-xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--accent)" }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => addToCompare(college.id)} className="btn-secondary text-xs py-2 px-4"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "var(--white)" }}>
              <GitCompare className="w-4 h-4" /> Add to Compare
            </button>
            <SaveButton collegeId={college.id} />
            {college.websiteUrl && (
              <a href={college.websiteUrl} target="_blank" rel="noopener noreferrer"
                className="btn-accent text-xs py-2 px-4 flex items-center gap-1">
                <Globe className="w-4 h-4" /> Official Website
              </a>
            )}
          </div>
        </div>

        {/* Tab navigation */}
        <div className="max-w-5xl mx-auto px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="tab-button capitalize whitespace-nowrap"
                style={{
                  color: activeTab === tab ? "var(--accent)" : "rgba(255,255,255,0.5)",
                  borderBottomColor: activeTab === tab ? "var(--accent)" : "transparent",
                }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-black mb-4" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>About</h2>
              <div className="editorial-card p-6">
                <p className="leading-relaxed" style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem" }}>
                  {college.about || college.description}
                </p>
              </div>
            </div>

            {/* Info grid */}
            <div>
              <h2 className="text-2xl font-black mb-4" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Key Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: DollarSign, label: "Annual Fees", value: formatFees(college.fees), color: "#1B6B35" },
                  { icon: DollarSign, label: "Max Fees", value: college.feesMax ? formatFees(college.feesMax) : "N/A", color: "#1B6B35" },
                  { icon: Star, label: "Rating", value: `${college.rating} / 5`, color: "#C9A832" },
                  { icon: TrendingUp, label: "Placement Rate", value: `${college.placementPct}%`, color: "#1A3A7B" },
                  { icon: Award, label: "NIRF Rank", value: college.nirf ? `#${college.nirf}` : "N/A", color: "#7B3F00" },
                  { icon: Award, label: "NAAC Grade", value: college.naac || "N/A", color: "#7B3F00" },
                  { icon: BookOpen, label: "Entrance Exam", value: college.examName || "Multiple", color: "#6B3FA0" },
                  { icon: Award, label: "Cutoff Rank", value: college.cutoffRank ? `#${college.cutoffRank.toLocaleString("en-IN")}` : "N/A", color: "#6B3FA0" },
                  { icon: Users, label: "Total Students", value: college.totalStudents?.toLocaleString("en-IN") || "N/A", color: "#1B6B35" },
                  { icon: Users, label: "Total Faculty", value: college.totalFaculty?.toLocaleString("en-IN") || "N/A", color: "#1B6B35" },
                  { icon: TreePine, label: "Campus Area", value: college.campusArea ? `${college.campusArea} acres` : "N/A", color: "#2D7A4F" },
                  { icon: Building, label: "Hostel", value: college.hostelAvailable ? "Available" : "Not Available", color: college.hostelAvailable ? "#1B6B35" : "#E84545" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="editorial-card p-4 flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide mb-0.5" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
                      <div className="font-bold text-sm" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === "courses" && (
          <div>
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              Courses Offered
            </h2>
            {college.courses && college.courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {college.courses.map((course: any) => (
                  <div key={course.id} className="editorial-card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{course.name}</h3>
                        <div className="text-sm mt-0.5" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                          {course.duration} Year{course.duration > 1 ? "s" : ""} Program
                        </div>
                      </div>
                      <BookOpen className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: "var(--ink-muted)" }} />
                    </div>
                    {course.description && (
                      <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                        {course.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                      <div>
                        <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Annual Fees</div>
                        <div className="font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{formatFees(course.fees)}</div>
                      </div>
                      {course.seats && (
                        <div className="text-right">
                          <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Seats</div>
                          <div className="font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{course.seats}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="editorial-card p-8 text-center">
                <p style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Course details coming soon.</p>
              </div>
            )}
          </div>
        )}

        {/* PLACEMENTS TAB */}
        {activeTab === "placements" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Placement Report</h2>

            {/* Placement stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Placement Rate", value: `${college.placementPct}%`, sub: "of eligible students" },
                { label: "Average Package", value: college.avgPackage ? `₹${college.avgPackage} LPA` : "N/A", sub: "per annum" },
                { label: "Highest Package", value: college.highestPackage ? `₹${college.highestPackage} LPA` : "N/A", sub: "per annum" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="editorial-card p-6 text-center">
                  <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
                  <div className="text-4xl font-black mb-1" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{value}</div>
                  <div className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Placement bar */}
            <div className="editorial-card p-6">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>Overall Placement Rate</span>
                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{college.placementPct}%</span>
              </div>
              <div className="w-full h-4 rounded-none" style={{ background: "var(--cream-dark)" }}>
                <div className="h-4 transition-all duration-700" style={{ width: `${college.placementPct}%`, background: "var(--ink)" }} />
              </div>
            </div>

            {/* Top recruiters */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Top Recruiters</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {MOCK_RECRUITERS.map(recruiter => (
                  <div key={recruiter} className="editorial-card px-4 py-3 text-center">
                    <span className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{recruiter}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                * Recruiter list is indicative based on historical data.
              </p>
            </div>
          </div>
        )}

        {/* EXAMS TAB */}
        {activeTab === "exams" && (
          <div>
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              Accepted Entrance Exams
            </h2>
            {college.exams && college.exams.length > 0 ? (
              <div className="space-y-4">
                {college.exams.map((ce: any) => (
                  <div key={ce.id} className="editorial-card p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                            {ce.exam.name}
                          </h3>
                          <span className="badge" style={{ borderColor: "var(--ink-muted)", color: "var(--ink-muted)" }}>
                            {ce.exam.type}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{ce.exam.fullName}</p>
                      </div>
                      {ce.cutoff && (
                        <div className="text-right">
                          <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Cutoff Rank</div>
                          <div className="text-xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                            #{ce.cutoff.toLocaleString("en-IN")}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="pt-3 mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3" style={{ borderTop: "1px solid var(--border)" }}>
                      <div>
                        <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Conducted By</div>
                        <div className="text-sm font-semibold mt-0.5" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{ce.exam.conductedBy}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Level</div>
                        <div className="text-sm font-semibold mt-0.5" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{ce.exam.level}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Frequency</div>
                        <div className="text-sm font-semibold mt-0.5" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{ce.exam.frequency}</div>
                      </div>
                    </div>
                    <Link href={`/exams/${ce.exam.id}`} className="inline-flex items-center gap-1 text-xs font-semibold mt-3 uppercase tracking-wide"
                      style={{ color: "var(--ink)", fontFamily: "var(--font-dm-sans)", textDecoration: "underline" }}>
                      View Exam Details →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="editorial-card p-8 text-center">
                <p style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Exam details coming soon.</p>
              </div>
            )}
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                Student Reviews
              </h2>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{college.rating}</span>
                <span className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>/ 5</span>
              </div>
            </div>

            {college.reviews && college.reviews.length > 0 ? (
              <div className="space-y-6">
                {college.reviews.map((review: any) => (
                  <div key={review.id} className="editorial-card p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold mb-1" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)", fontSize: "1.1rem" }}>
                          {review.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                          <span>{review.user?.name || "Anonymous"}</span>
                          {review.course && <span>· {review.course}</span>}
                          {review.batch && <span>· Batch {review.batch}</span>}
                          {review.verified && (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1" style={{ background: "var(--accent)" }}>
                        <Star className="w-3 h-3 fill-current" style={{ color: "var(--ink)" }} />
                        <span className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{review.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)" }}>
                      {review.content}
                    </p>

                    {(review.pros || review.cons) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                        {review.pros && (
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <CheckCircle className="w-4 h-4" style={{ color: "#1B6B35" }} />
                              <span className="text-xs uppercase tracking-wide font-bold" style={{ color: "#1B6B35", fontFamily: "var(--font-dm-sans)" }}>Pros</span>
                            </div>
                            <p className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{review.pros}</p>
                          </div>
                        )}
                        {review.cons && (
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <XCircle className="w-4 h-4" style={{ color: "#E84545" }} />
                              <span className="text-xs uppercase tracking-wide font-bold" style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>Cons</span>
                            </div>
                            <p className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{review.cons}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="editorial-card p-8 text-center">
                <p className="mb-4" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>No reviews yet. Be the first to review!</p>
                <Link href="/login" className="btn-primary inline-flex">Write a Review</Link>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
