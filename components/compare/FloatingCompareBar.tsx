"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { GitCompare, X, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

interface CollegeMini {
  id: string;
  name: string;
  city: string;
  type: string;
  fees: number;
}

export default function FloatingCompareBar() {
  const router = useRouter();
  const [colleges, setColleges]   = useState<CollegeMini[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible]     = useState(false);
  const [animating, setAnimating] = useState(false);

  const loadColleges = async () => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem("compareList") || "[]");
      if (ids.length === 0) {
        setColleges([]);
        setVisible(false);
        return;
      }
      const res = await axios.post("/api/compare", { collegeIds: ids });
      setColleges(res.data.map((c: any) => ({
        id: c.id, name: c.name, city: c.city, type: c.type, fees: c.fees,
      })));
      // Animate in
      setAnimating(true);
      setVisible(true);
      setTimeout(() => setAnimating(false), 400);
    } catch {
      setColleges([]);
    }
  };

  useEffect(() => {
    loadColleges();
    window.addEventListener("compareUpdated", loadColleges);
    return () => window.removeEventListener("compareUpdated", loadColleges);
  }, []);

  const removeCollege = (id: string) => {
    const newIds = colleges.filter(c => c.id !== id).map(c => c.id);
    localStorage.setItem("compareList", JSON.stringify(newIds));
    window.dispatchEvent(new Event("compareUpdated"));
  };

  const clearAll = () => {
    localStorage.setItem("compareList", JSON.stringify([]));
    window.dispatchEvent(new Event("compareUpdated"));
  };

  if (!visible || colleges.length === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-400"
      style={{
        transform: animating ? "translateY(100%)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>

      {/* Collapsed tab */}
      {collapsed && (
        <div className="flex justify-center">
          <button
            onClick={() => setCollapsed(false)}
            className="flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wide"
            style={{
              background: "var(--ink)",
              color: "var(--accent)",
              fontFamily: "var(--font-dm-sans)",
              borderRadius: "12px 12px 0 0",
              border: "2px solid var(--accent)",
              borderBottom: "none",
            }}>
            <GitCompare className="w-4 h-4" />
            Compare ({colleges.length})
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expanded bar */}
      {!collapsed && (
        <div style={{ background: "var(--ink)", borderTop: "3px solid var(--accent)" }}>
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">

              {/* Label */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <GitCompare className="w-5 h-5" style={{ color: "var(--accent)" }} />
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:block"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                  Comparing
                </span>
              </div>

              {/* College pills */}
              <div className="flex items-center gap-2 flex-1 overflow-x-auto">
                {colleges.map(college => (
                  <div key={college.id}
                    className="flex items-center gap-2 px-3 py-1.5 flex-shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}>
                    <div>
                      <div className="text-xs font-bold whitespace-nowrap"
                        style={{ color: "var(--white)", fontFamily: "var(--font-dm-sans)", maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {college.name}
                      </div>
                      <div className="text-xs whitespace-nowrap"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>
                        {college.city}
                      </div>
                    </div>
                    <button onClick={() => removeCollege(college.id)}
                      className="flex-shrink-0 transition-colors hover:text-red-400"
                      style={{ color: "rgba(255,255,255,0.4)" }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Empty slots */}
                {[...Array(3 - colleges.length)].map((_, i) => (
                  <Link key={i} href="/colleges"
                    className="flex items-center gap-2 px-3 py-1.5 flex-shrink-0 transition-colors hover:border-accent"
                    style={{
                      border: "1px dashed rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.3)",
                    }}>
                    <span className="text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      + Add college
                    </span>
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {colleges.length >= 2 && (
                  <Link href="/compare"
                    className="flex items-center gap-1.5 px-4 py-2 font-bold text-xs uppercase tracking-wide transition-colors"
                    style={{
                      background: "var(--accent)",
                      color: "var(--ink)",
                      fontFamily: "var(--font-dm-sans)",
                    }}>
                    Compare Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button onClick={() => setCollapsed(true)}
                  className="p-2 transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  title="Collapse">
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button onClick={clearAll}
                  className="p-2 transition-colors hover:text-red-400"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  title="Clear all">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-dm-sans)" }}>
                {colleges.length}/3 colleges selected
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-8 h-1 transition-all duration-300"
                    style={{ background: i < colleges.length ? "var(--accent)" : "rgba(255,255,255,0.1)" }} />
                ))}
              </div>
              {colleges.length < 2 && (
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-dm-sans)" }}>
                  · Add {2 - colleges.length} more to compare
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
