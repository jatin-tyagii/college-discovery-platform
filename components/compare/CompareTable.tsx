"use client";
import Link from "next/link";
import { X, Star, TrendingUp, CheckCircle, XCircle } from "lucide-react";

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  fees: number;
  rating: number;
  placementPct: number;
  avgPackage?: number | null;
  highestPackage?: number | null;
  nirf?: number | null;
  naac?: string | null;
  cutoffRank?: number | null;
  campusArea?: number | null;
  hostelAvailable: boolean;
  totalStudents?: number | null;
  totalFaculty?: number | null;
  courses?: { name: string }[];
  exams?: { exam: { name: string } }[];
}

interface CompareTableProps {
  colleges: College[];
  onRemove: (id: string) => void;
}

function formatFees(fees: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(fees);
}

export default function CompareTable({ colleges, onRemove }: CompareTableProps) {
  if (colleges.length === 0) return null;

  // Best value calculations
  const minFees       = Math.min(...colleges.map(c => c.fees));
  const maxRating     = Math.max(...colleges.map(c => c.rating));
  const maxPlacement  = Math.max(...colleges.map(c => c.placementPct));
  const maxAvgPkg     = Math.max(...colleges.map(c => c.avgPackage ?? 0));
  const maxHighPkg    = Math.max(...colleges.map(c => c.highestPackage ?? 0));
  const minNirf       = Math.min(...colleges.map(c => c.nirf ?? Infinity));
  const minCutoff     = Math.min(...colleges.map(c => c.cutoffRank ?? Infinity));
  const maxStudents   = Math.max(...colleges.map(c => c.totalStudents ?? 0));
  const maxArea       = Math.max(...colleges.map(c => c.campusArea ?? 0));

  const isBest = (college: College, key: string): boolean => {
    switch (key) {
      case "fees":      return college.fees === minFees;
      case "rating":    return college.rating === maxRating;
      case "placement": return college.placementPct === maxPlacement;
      case "avgPkg":    return (college.avgPackage ?? 0) === maxAvgPkg && maxAvgPkg > 0;
      case "highPkg":   return (college.highestPackage ?? 0) === maxHighPkg && maxHighPkg > 0;
      case "nirf":      return (college.nirf ?? Infinity) === minNirf;
      case "cutoff":    return (college.cutoffRank ?? Infinity) === minCutoff;
      case "students":  return (college.totalStudents ?? 0) === maxStudents && maxStudents > 0;
      case "area":      return (college.campusArea ?? 0) === maxArea && maxArea > 0;
      default: return false;
    }
  };

  const isWorst = (college: College, key: string): boolean => {
    if (colleges.length < 2) return false;
    switch (key) {
      case "fees":      return college.fees === Math.max(...colleges.map(c => c.fees));
      case "rating":    return college.rating === Math.min(...colleges.map(c => c.rating));
      case "placement": return college.placementPct === Math.min(...colleges.map(c => c.placementPct));
      default: return false;
    }
  };

  const cellStyle = (college: College, key: string) => {
    if (isBest(college, key)) return { background: "#E8F5ED", color: "#1B6B35", fontWeight: 700 };
    if (isWorst(college, key)) return { background: "#FFF0F0", color: "#E84545" };
    return {};
  };

  const rows = [
    {
      label: "Location",
      render: (c: College) => `${c.city}, ${c.state}`,
      key: "",
    },
    {
      label: "Type",
      render: (c: College) => (
        <span className={`badge ${c.type === "Government" ? "badge-govt" : "badge-private"}`}>{c.type}</span>
      ),
      key: "",
    },
    {
      label: "Annual Fees",
      render: (c: College) => <span className="font-black" style={{ fontFamily: "var(--font-playfair)" }}>{formatFees(c.fees)}</span>,
      key: "fees",
      note: "↓ Lower is better",
    },
    {
      label: "Rating",
      render: (c: College) => (
        <div className="flex items-center justify-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-black" style={{ fontFamily: "var(--font-playfair)" }}>{c.rating}</span>
          <span className="text-xs">/5</span>
        </div>
      ),
      key: "rating",
      note: "↑ Higher is better",
    },
    {
      label: "Placement %",
      render: (c: College) => (
        <div>
          <div className="font-black text-lg mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{c.placementPct}%</div>
          <div className="w-full h-1.5" style={{ background: "var(--border)" }}>
            <div className="h-1.5" style={{ width: `${c.placementPct}%`, background: "currentColor" }} />
          </div>
        </div>
      ),
      key: "placement",
      note: "↑ Higher is better",
    },
    {
      label: "Avg Package",
      render: (c: College) => c.avgPackage ? `₹${c.avgPackage} LPA` : "N/A",
      key: "avgPkg",
      note: "↑ Higher is better",
    },
    {
      label: "Highest Package",
      render: (c: College) => c.highestPackage ? `₹${c.highestPackage} LPA` : "N/A",
      key: "highPkg",
    },
    {
      label: "NIRF Rank",
      render: (c: College) => c.nirf ? `#${c.nirf}` : "N/A",
      key: "nirf",
      note: "↓ Lower is better",
    },
    {
      label: "NAAC Grade",
      render: (c: College) => c.naac || "N/A",
      key: "",
    },
    {
      label: "Cutoff Rank",
      render: (c: College) => c.cutoffRank ? `#${c.cutoffRank.toLocaleString("en-IN")}` : "N/A",
      key: "cutoff",
    },
    {
      label: "Campus Area",
      render: (c: College) => c.campusArea ? `${c.campusArea} acres` : "N/A",
      key: "area",
    },
    {
      label: "Total Students",
      render: (c: College) => c.totalStudents?.toLocaleString("en-IN") || "N/A",
      key: "students",
    },
    {
      label: "Hostel",
      render: (c: College) => c.hostelAvailable
        ? <CheckCircle className="w-5 h-5 mx-auto" style={{ color: "#1B6B35" }} />
        : <XCircle className="w-5 h-5 mx-auto" style={{ color: "#E84545" }} />,
      key: "",
    },
    {
      label: "Courses",
      render: (c: College) => (
        <div className="flex flex-wrap justify-center gap-1">
          {(c.courses || []).slice(0, 4).map(course => (
            <span key={course.name} className="text-xs px-2 py-0.5 border"
              style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)", borderColor: "var(--border)" }}>
              {course.name}
            </span>
          ))}
        </div>
      ),
      key: "",
    },
    {
      label: "Accepted Exams",
      render: (c: College) => (
        <div className="flex flex-wrap justify-center gap-1">
          {(c.exams || []).slice(0, 3).map(ce => (
            <span key={ce.exam.name} className="text-xs px-2 py-0.5 font-bold"
              style={{ background: "var(--accent)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
              {ce.exam.name}
            </span>
          ))}
        </div>
      ),
      key: "",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--ink)" }}>
            <th className="text-left p-4 w-40 sticky left-0" style={{ background: "var(--ink)" }}>
              <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                Criteria
              </span>
            </th>
            {colleges.map(college => (
              <th key={college.id} className="p-4 min-w-52 text-center align-top">
                <div className="flex flex-col items-center gap-3">
                  <span className={`badge ${college.type === "Government" ? "badge-govt" : "badge-private"}`}
                    style={{ background: college.type === "Government" ? "#E8F5ED" : "#FFF3E8" }}>
                    {college.type}
                  </span>
                  <Link href={`/colleges/${college.id}`}
                    className="text-base font-black leading-tight hover:underline"
                    style={{ fontFamily: "var(--font-playfair)", color: "var(--white)" }}>
                    {college.name}
                  </Link>
                  <button onClick={() => onRemove(college.id)}
                    className="flex items-center gap-1 text-xs uppercase tracking-wide font-semibold px-3 py-1 transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-dm-sans)" }}>
                    <X className="w-3 h-3" /> Remove
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.label} style={{ background: idx % 2 === 0 ? "var(--white)" : "var(--cream)" }}>
              <td className="p-4 sticky left-0 align-middle" style={{ background: idx % 2 === 0 ? "var(--white)" : "var(--cream)", borderRight: "2px solid var(--ink)" }}>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{row.label}</div>
                  {row.note && <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{row.note}</div>}
                </div>
              </td>
              {colleges.map(college => (
                <td key={college.id} className="p-4 text-center align-middle text-sm"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    borderLeft: "1px solid var(--border)",
                    ...cellStyle(college, row.key),
                  }}>
                  {row.render(college)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
