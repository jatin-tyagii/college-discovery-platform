"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, MapPin } from "lucide-react";
import axios from "axios";

interface Suggestion {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  nirf?: number | null;
  fees: number;
}

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

function formatFees(fees: number) {
  if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L`;
  return `₹${(fees / 1000).toFixed(0)}K`;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const router = useRouter();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const suggestTimeout  = useRef<NodeJS.Timeout | null>(null);
  const containerRef    = useRef<HTMLDivElement>(null);

  const [inputVal, setInputVal]       = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDrop, setShowDrop]       = useState(false);
  const [loadingSug, setLoadingSug]   = useState(false);
  const [activeIdx, setActiveIdx]     = useState(-1);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); setShowDrop(false); return; }
    setLoadingSug(true);
    try {
      const res = await axios.get("/api/colleges/suggestions", { params: { q } });
      setSuggestions(res.data);
      setShowDrop(res.data.length > 0);
    } catch {
      setSuggestions([]);
    } finally { setLoadingSug(false); }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    setActiveIdx(-1);
    if (suggestTimeout.current) clearTimeout(suggestTimeout.current);
    suggestTimeout.current = setTimeout(() => fetchSuggestions(val), 200);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => onChange(val), 300);
  };

  const handleSuggestionClick = (college: Suggestion) => {
    setInputVal(college.name);
    setSuggestions([]);
    setShowDrop(false);
    onChange(college.name);
  };

  const handleSuggestionNavigate = (college: Suggestion, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/colleges/${college.id}`);
    setShowDrop(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDrop || suggestions.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    else if (e.key === "Enter" && activeIdx >= 0) { e.preventDefault(); handleSuggestionClick(suggestions[activeIdx]); }
    else if (e.key === "Escape") { setShowDrop(false); setActiveIdx(-1); }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setShowDrop(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleClear = () => {
    setInputVal("");
    setSuggestions([]);
    setShowDrop(false);
    onChange("");
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="relative">
        {/* Icon — fixed position */}
        <Search
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10"
          style={{ left: "1rem", color: loadingSug ? "var(--accent)" : "var(--ink-muted)", transition: "color 0.2s" }}
        />
        <input
          type="text"
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowDrop(true)}
          placeholder="Search colleges, cities, states..."
          className="search-input"
          style={{ paddingRight: inputVal ? "3rem" : "1rem" }}
          autoComplete="off"
        />
        {inputVal && (
          <button onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70">
            <X className="w-4 h-4" style={{ color: "var(--ink-muted)" }} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDrop && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden"
          style={{ background: "var(--white)", border: "2px solid var(--ink)", boxShadow: "4px 4px 0px var(--ink)" }}>
          <div className="px-4 py-2 flex items-center justify-between"
            style={{ borderBottom: "1px solid var(--border)", background: "var(--cream)" }}>
            <span className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Suggestions</span>
            <span className="text-xs hidden sm:block" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              ↑↓ navigate · Enter select · Esc close
            </span>
          </div>
          {suggestions.map((college, i) => (
            <div key={college.id} onClick={() => handleSuggestionClick(college)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer transition-colors"
              style={{
                background: i === activeIdx ? "var(--ink)" : "transparent",
                borderBottom: i < suggestions.length - 1 ? "1px solid var(--border)" : "none",
              }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(-1)}>
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-black"
                  style={{ background: i === activeIdx ? "var(--accent)" : "var(--cream-dark)", color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                  {college.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate"
                    style={{ fontFamily: "var(--font-playfair)", color: i === activeIdx ? "var(--white)" : "var(--ink)" }}>
                    {college.name}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-xs"
                      style={{ color: i === activeIdx ? "rgba(255,255,255,0.6)" : "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                      <MapPin className="w-3 h-3" />{college.city}, {college.state}
                    </span>
                    {college.nirf && (
                      <span className="text-xs font-bold"
                        style={{ color: i === activeIdx ? "var(--accent)" : "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                        NIRF #{college.nirf}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold"
                    style={{ fontFamily: "var(--font-dm-sans)", color: i === activeIdx ? "var(--accent)" : "var(--ink)" }}>
                    {formatFees(college.fees)}/yr
                  </div>
                  <div className="text-xs"
                    style={{ color: i === activeIdx ? "rgba(255,255,255,0.5)" : "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    {college.type}
                  </div>
                </div>
                <button onClick={(e) => handleSuggestionNavigate(college, e)}
                  className="text-xs font-bold uppercase tracking-wide px-2 py-1 border flex-shrink-0"
                  style={{ borderColor: i === activeIdx ? "var(--accent)" : "var(--border)", color: i === activeIdx ? "var(--accent)" : "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                  View →
                </button>
              </div>
            </div>
          ))}
          <div className="px-4 py-2 flex items-center gap-2"
            style={{ background: "var(--cream)", borderTop: "1px solid var(--border)" }}>
            <Search className="w-3 h-3" style={{ color: "var(--ink-muted)" }} />
            <span className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              Press <strong>Enter</strong> to search all results for "<strong>{inputVal}</strong>"
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
