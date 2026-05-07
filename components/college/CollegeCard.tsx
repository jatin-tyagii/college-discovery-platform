"use client";
import Link from "next/link";
import { MapPin, Star, TrendingUp, GitCompare } from "lucide-react";
import SaveButton from "@/components/ui/SaveButton";

interface CollegeCardProps {
  college: {
    id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
    type: string;
    fees: number;
    rating: number;
    reviewCount: number;
    placementPct: number;
    avgPackage?: number | null;
    nirf?: number | null;
    naac?: string | null;
    coursesOffered: string[];
    examName?: string | null;
  };
  showUnsave?: boolean;
  onUnsave?: (id: string) => void;
}

function formatFees(fees: number) {
  if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L`;
  return `₹${(fees / 1000).toFixed(0)}K`;
}

function addToCompare(collegeId: string) {
  try {
    const list: string[] = JSON.parse(localStorage.getItem("compareList") || "[]");
    if (list.includes(collegeId)) return;
    if (list.length >= 3) { alert("Max 3 colleges in compare."); return; }
    list.push(collegeId);
    localStorage.setItem("compareList", JSON.stringify(list));
    window.dispatchEvent(new Event("compareUpdated"));
  } catch {}
}

export default function CollegeCard({ college, showUnsave, onUnsave }: CollegeCardProps) {
  return (
    <div className="editorial-card flex flex-col overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{
        background: college.type === "Government" ? "#1B6B35" : college.type === "Private" ? "#7B3F00" : "#1A3A7B"
      }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Badges row */}
        <div className="flex items-center justify-between mb-3">
          <span className={`badge ${college.type === "Government" ? "badge-govt" : college.type === "Private" ? "badge-private" : "badge-deemed"}`}>
            {college.type}
          </span>
          <div className="flex items-center gap-2">
            {college.nirf && <span className="badge badge-nirf">#{college.nirf}</span>}
            {college.naac && (
              <span className="text-xs font-bold" style={{ color: "var(--ink-muted)" }}>{college.naac}</span>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-bold mb-1 leading-tight"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)", fontSize: "1.1rem" }}>
          {college.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3" style={{ color: "var(--ink-muted)" }}>
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {college.city}, {college.state}
          </span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-3 py-3"
          style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div>
            <div className="text-xs uppercase tracking-wide mb-0.5"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Fees/yr</div>
            <div className="font-bold text-sm"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              {formatFees(college.fees)}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-0.5"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Rating</div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{college.rating}</span>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-0.5"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Placed</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" style={{ color: "#1B6B35" }} />
              <span className="font-bold text-sm"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{college.placementPct}%</span>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="flex flex-wrap gap-1 mb-4">
          {college.coursesOffered.slice(0, 3).map((c) => (
            <span key={c} className="text-xs px-2 py-0.5 font-medium"
              style={{ background: "var(--cream-dark)", color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)", border: "1px solid var(--border)" }}>
              {c}
            </span>
          ))}
          {college.coursesOffered.length > 3 && (
            <span className="text-xs px-2 py-0.5"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              +{college.coursesOffered.length - 3}
            </span>
          )}
        </div>

        {/* Avg package */}
        {college.avgPackage && (
          <div className="mb-4 text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
            Avg Package: <span className="font-bold" style={{ color: "var(--ink)" }}>₹{college.avgPackage} LPA</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-auto flex gap-2">
          {showUnsave ? (
            <>
              <Link href={`/colleges/${college.id}`} className="btn-primary flex-1 justify-center text-xs py-2">
                View Details
              </Link>
              <button
                onClick={() => onUnsave?.(college.id)}
                className="px-3 py-2 text-xs font-bold uppercase tracking-wide border-2 transition-colors"
                style={{ borderColor: "#E84545", color: "#E84545", fontFamily: "var(--font-dm-sans)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#FFF0F0";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}>
                Unsave
              </button>
            </>
          ) : (
            <>
              <Link href={`/colleges/${college.id}`} className="btn-primary flex-1 justify-center text-xs py-2">
                View Details
              </Link>

              {/* Compare button — fixed hover */}
              <button
                onClick={() => addToCompare(college.id)}
                className="w-9 h-9 flex items-center justify-center border-2 transition-all duration-150 relative group/compare"
                style={{ borderColor: "var(--ink)", color: "var(--ink)", background: "transparent" }}
                title="Add to Compare"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)";
                  (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)";
                  (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                }}>
                <GitCompare className="w-4 h-4" />
              </button>

              <SaveButton collegeId={college.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
