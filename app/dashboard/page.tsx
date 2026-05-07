"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Heart, GitCompare, MessageSquare, BookOpen, ArrowRight, Star, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, label, value, href, color }: any) {
  return (
    <Link href={href} className="editorial-card p-6 flex items-start gap-4 transition-all duration-200"
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = color;
        (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${color}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}>
      <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
        style={{ background: color }}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="text-3xl font-black mb-1"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{value}</div>
        <div className="text-xs uppercase tracking-wide"
          style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
      </div>
    </Link>
  );
}

function QuickActionCard({ icon: Icon, label, sub, href }: any) {
  return (
    <Link href={href}
      className="editorial-card p-5 flex items-start gap-4 transition-all duration-200 group"
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)";
        (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0px var(--ink)";
        (e.currentTarget as HTMLElement).style.transform = "translate(-1px, -1px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
      }}>
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--accent)" }}>
        <Icon className="w-5 h-5" style={{ color: "var(--ink)" }} />
      </div>
      <div>
        <div className="font-bold text-sm" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
          {label}
        </div>
        <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
          {sub}
        </div>
      </div>
      <ArrowRight className="w-4 h-4 ml-auto mt-0.5 flex-shrink-0"
        style={{ color: "var(--ink-muted)" }} />
    </Link>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [savedColleges, setSavedColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login?callbackUrl=/dashboard"); return; }
    if (status === "authenticated") {
      axios.get("/api/saved")
        .then(res => setSavedColleges(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
        <div style={{ background: "var(--ink)", height: "160px" }} className="animate-pulse" />
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="editorial-card p-6 animate-pulse">
              <div className="skeleton h-8 w-12 rounded mb-2" />
              <div className="skeleton h-4 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const userName  = session?.user?.name || "Student";
  const userEmail = session?.user?.email || "";
  const compareCount = (() => {
    try { return JSON.parse(localStorage.getItem("compareList") || "[]").length; }
    catch { return 0; }
  })();

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 text-xl font-black"
              style={{ background: "var(--accent)", color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              {userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-1 font-semibold"
                style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>Dashboard</div>
              <h1 className="font-black" style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "var(--white)", lineHeight: "1.1",
              }}>Hello, {userName.split(" ")[0]}.</h1>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* Stats */}
        <div>
          <h2 className="text-xl font-black mb-5" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Your Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Heart} label="Saved Colleges" value={savedColleges.length} href="/saved" color="#E84545" />
            <StatCard icon={GitCompare} label="In Compare" value={compareCount} href="/compare" color="var(--ink)" />
            <StatCard icon={BookOpen} label="Colleges" value="30+" href="/colleges" color="#1A3A7B" />
            <StatCard icon={MessageSquare} label="Q&A Forum" value="Open" href="/qa" color="#1B6B35" />
          </div>
        </div>

        {/* Saved preview */}
        {savedColleges.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Recently Saved</h2>
              <Link href="/saved" className="text-sm font-bold uppercase tracking-wide"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)", textDecoration: "underline" }}>
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {savedColleges.slice(0, 4).map((college: any) => (
                <Link key={college.id} href={`/colleges/${college.id}`}
                  className="editorial-card p-4 flex items-center justify-between gap-4 transition-all duration-200"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0px var(--ink)";
                    (e.currentTarget as HTMLElement).style.transform = "translate(-1px, -1px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
                  }}>
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-xs font-black"
                      style={{ background: college.type === "Government" ? "#E8F5ED" : "#FFF3E8", color: college.type === "Government" ? "#1B6B35" : "#7B3F00", fontFamily: "var(--font-dm-sans)" }}>
                      {college.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm truncate"
                        style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{college.name}</h3>
                      <p className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                        {college.city}, {college.state}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold" style={{ color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>{college.rating}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs">
                      <TrendingUp className="w-3 h-3" style={{ color: "#1B6B35" }} />
                      <span className="font-bold" style={{ color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>{college.placementPct}%</span>
                    </div>
                    <span className="text-xs font-bold"
                      style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
                      {college.fees >= 100000 ? `₹${(college.fees / 100000).toFixed(1)}L` : `₹${(college.fees / 1000).toFixed(0)}K`}/yr
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div>
          <h2 className="text-xl font-black mb-5" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickActionCard icon={BookOpen} label="Browse All Colleges" sub="Search and filter 30+ colleges" href="/colleges" />
            <QuickActionCard icon={GitCompare} label="Compare Colleges" sub="Side-by-side decision tool" href="/compare" />
            <QuickActionCard icon={TrendingUp} label="Rank Predictor" sub="Find colleges for your rank" href="/predict" />
            <QuickActionCard icon={MessageSquare} label="Student Q&A" sub="Ask and answer questions" href="/qa" />
          </div>
        </div>

        {/* Account info */}
        <div className="editorial-card p-6">
          <h2 className="text-xl font-black mb-5" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Account Details</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center text-lg font-black"
              style={{ background: "var(--ink)", color: "var(--accent)", fontFamily: "var(--font-playfair)" }}>
              {userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
            </div>
            <div>
              <div className="font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{userName}</div>
              <div className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{userEmail}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            {[
              { label: "Member Since", value: "2025" },
              { label: "Colleges Saved", value: savedColleges.length.toString() },
              { label: "Account Type", value: "Free" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-xs uppercase tracking-wide mb-1"
                  style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
                <div className="font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
