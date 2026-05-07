"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Heart, ArrowRight, BookOpen } from "lucide-react";
import CollegeCard from "@/components/college/CollegeCard";

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/saved");
      return;
    }
    if (status === "authenticated") {
      axios.get("/api/saved")
        .then(res => setColleges(res.data))
        .catch(() => setColleges([]))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const handleUnsave = async (collegeId: string) => {
    try {
      await axios.delete("/api/saved", { data: { collegeId } });
      setColleges(prev => prev.filter(c => c.id !== collegeId));
    } catch {}
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
        <div style={{ background: "var(--ink)", height: "160px" }} className="animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="editorial-card p-5 animate-pulse space-y-3">
                <div className="skeleton h-6 w-2/3 rounded" />
                <div className="skeleton h-4 w-1/2 rounded" />
                <div className="skeleton h-20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest mb-2 font-semibold"
                style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                My List
              </div>
              <h1 className="text-5xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>
                Saved<br /><span style={{ color: "var(--accent)", fontStyle: "italic" }}>Colleges</span>
              </h1>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
                {colleges.length > 0
                  ? `${colleges.length} college${colleges.length !== 1 ? "s" : ""} in your list`
                  : "Your saved colleges will appear here"}
              </p>
            </div>
            {colleges.length > 0 && (
              <Link href="/compare" className="btn-accent text-xs py-2 px-4 flex-shrink-0 mt-2">
                Compare Saved →
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {colleges.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
              style={{ background: "var(--ink)" }}>
              <Heart className="w-10 h-10" style={{ color: "var(--accent)" }} />
            </div>
            <h2 className="text-4xl font-black mb-3"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              No saved colleges yet.
            </h2>
            <p className="text-sm mb-8 max-w-sm mx-auto"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              Browse colleges and click the heart icon to save them to your personal list.
            </p>
            <Link href="/colleges" className="btn-primary inline-flex">
              Browse Colleges <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map(college => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  showUnsave
                  onUnsave={handleUnsave}
                />
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/colleges" className="btn-secondary text-sm">
                <BookOpen className="w-4 h-4" /> Browse More Colleges
              </Link>
              <Link href="/compare" className="btn-primary text-sm">
                Compare These Colleges <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
