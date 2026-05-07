"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ChevronLeft, BookOpen, Calendar, Award, Users, MapPin, Star } from "lucide-react";

function formatFees(fees: number) {
  if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L`;
  return `₹${(fees / 1000).toFixed(0)}K`;
}

export default function ExamDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [exam, setExam]     = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/exams/${id}`)
      .then(res => setExam(res.data))
      .catch(err => setError(err.response?.status === 404 ? "Exam not found." : "Failed to load exam."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: "var(--cream)", minHeight: "100vh" }} className="animate-pulse">
        <div style={{ background: "var(--ink)", height: "200px" }} />
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
          <div className="skeleton h-10 w-2/3 rounded" />
          <div className="skeleton h-6 w-1/2 rounded" />
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--cream)" }}>
        <h2 className="text-4xl font-black" style={{ fontFamily: "var(--font-playfair)" }}>{error}</h2>
        <Link href="/exams" className="btn-primary">← Back to Exams</Link>
      </div>
    );
  }

  const dates = exam.importantDates as Record<string, string> | null;

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-10">

          {/* Back */}
          <button onClick={() => router.back()}
            className="flex items-center gap-1 text-xs uppercase tracking-wide font-semibold mb-6 transition-colors hover:text-yellow-400"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
            <ChevronLeft className="w-4 h-4" /> Back to Exams
          </button>

          <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 border mb-4 inline-block"
            style={{ borderColor: "var(--accent)", color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
            {exam.type}
          </span>

          <h1 className="text-6xl font-black mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1" }}>
            {exam.name}
          </h1>
          <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-dm-sans)" }}>
            {exam.fullName}
          </p>

          {/* Key info strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.1)" }}>
            {[
              { label: "Conducted By", value: exam.conductedBy },
              { label: "Level", value: exam.level },
              { label: "Frequency", value: exam.frequency },
              { label: "Colleges Accept", value: exam.colleges?.length || 0 },
            ].map(({ label, value }) => (
              <div key={label} className="px-5 py-4" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
                <div className="text-lg font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--accent)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* About */}
        <div>
          <h2 className="text-2xl font-black mb-4" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>About {exam.name}</h2>
          <div className="editorial-card p-6">
            <p className="leading-relaxed" style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem" }}>
              {exam.description}
            </p>
          </div>
        </div>

        {/* Eligibility */}
        <div>
          <h2 className="text-2xl font-black mb-4" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Eligibility Criteria</h2>
          <div className="editorial-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent)" }}>
              <Users className="w-5 h-5" style={{ color: "var(--ink)" }} />
            </div>
            <p style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)", lineHeight: "1.7" }}>
              {exam.eligibility}
            </p>
          </div>
        </div>

        {/* Syllabus */}
        {exam.syllabus && (
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Syllabus Overview</h2>
            <div className="editorial-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "var(--ink)" }}>
                <BookOpen className="w-5 h-5" style={{ color: "var(--accent)" }} />
              </div>
              <p style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)", lineHeight: "1.7" }}>
                {exam.syllabus}
              </p>
            </div>
          </div>
        )}

        {/* Important Dates */}
        {dates && Object.keys(dates).length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>Important Dates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(dates).map(([key, value]) => (
                <div key={key} className="editorial-card p-5 flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent)" }}>
                    <Calendar className="w-4 h-4" style={{ color: "var(--ink)" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide mb-1 capitalize" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>{key}</div>
                    <div className="font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accepting Colleges */}
        {exam.colleges && exam.colleges.length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              Colleges Accepting {exam.name}
            </h2>
            <div className="space-y-3">
              {exam.colleges.map((ce: any, i: number) => (
                <Link key={ce.id} href={`/colleges/${ce.college.id}`}
                  className="editorial-card p-5 flex items-center justify-between group hover:bg-zinc-900 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black w-10 text-center" style={{ fontFamily: "var(--font-playfair)", color: "rgba(0,0,0,0.15)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-bold group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)", fontSize: "1rem" }}>
                        {ce.college.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs group-hover:text-white/60 transition-colors" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                          <MapPin className="w-3 h-3" />{ce.college.city}, {ce.college.state}
                        </span>
                        <span className="flex items-center gap-1 text-xs group-hover:text-white/60 transition-colors" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{ce.college.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    {ce.cutoff && (
                      <div>
                        <div className="text-xs uppercase tracking-wide group-hover:text-white/50 transition-colors" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Cutoff</div>
                        <div className="font-black group-hover:text-yellow-400 transition-colors" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                          #{ce.cutoff.toLocaleString("en-IN")}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs uppercase tracking-wide group-hover:text-white/50 transition-colors" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Fees/yr</div>
                      <div className="font-black group-hover:text-yellow-400 transition-colors" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                        {formatFees(ce.college.fees)}
                      </div>
                    </div>
                    <span className={`badge hidden sm:inline-flex ${ce.college.type === "Government" ? "badge-govt" : "badge-private"}`}>
                      {ce.college.type}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
