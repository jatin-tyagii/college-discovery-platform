"use client";

const STATES = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Rajasthan", "UP", "Gujarat", "West Bengal", "Telangana", "Punjab", "Jharkhand", "Kerala", "Uttarakhand", "Assam", "Haryana"];
const TYPES  = ["Government", "Private", "Deemed"];
const COURSES = ["B.Tech", "M.Tech", "MBA", "MBBS", "MCA", "BCA", "PhD", "B.Arch", "LLB", "B.Pharm"];
const FEES   = [{ label: "Any", value: "" }, { label: "Up to ₹1L", value: "100000" }, { label: "Up to ₹2L", value: "200000" }, { label: "Up to ₹5L", value: "500000" }, { label: "Up to ₹10L", value: "1000000" }, { label: "Up to ₹25L", value: "2500000" }];
const RATINGS = [{ label: "Any", value: "" }, { label: "4.5+", value: "4.5" }, { label: "4.0+", value: "4.0" }, { label: "3.5+", value: "3.5" }];

interface FilterPanelProps {
  state: string; type: string; course: string; maxFees: string; minRating: string;
  onState: (v: string) => void; onType: (v: string) => void; onCourse: (v: string) => void;
  onMaxFees: (v: string) => void; onMinRating: (v: string) => void; onClear: () => void;
}

export default function FilterPanel({ state, type, course, maxFees, minRating, onState, onType, onCourse, onMaxFees, onMinRating, onClear }: FilterPanelProps) {
  const hasFilters = state || type || course || maxFees || minRating;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>Filters</h3>
          {hasFilters && (
            <button onClick={onClear} className="text-xs uppercase tracking-wide font-semibold"
              style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>Clear All</button>
          )}
        </div>

        <div className="space-y-5">
          {/* State */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>State</label>
            <select value={state} onChange={e => onState(e.target.value)} className="editorial-select">
              <option value="">All States</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>College Type</label>
            <div className="flex flex-col gap-2">
              {TYPES.map(t => (
                <button key={t} onClick={() => onType(type === t ? "" : t)}
                  className="text-left px-3 py-2 text-sm font-semibold transition-colors border-2"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    borderColor: type === t ? "var(--ink)" : "var(--border)",
                    background: type === t ? "var(--ink)" : "transparent",
                    color: type === t ? "var(--white)" : "var(--ink)",
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>Course</label>
            <select value={course} onChange={e => onCourse(e.target.value)} className="editorial-select">
              <option value="">All Courses</option>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Max Fees */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>Max Fees</label>
            <select value={maxFees} onChange={e => onMaxFees(e.target.value)} className="editorial-select">
              {FEES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>Min Rating</label>
            <select value={minRating} onChange={e => onMinRating(e.target.value)} className="editorial-select">
              {RATINGS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
}
