"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MessageSquare, Eye, CheckCircle, ChevronLeft, ChevronRight, Plus, Clock, TrendingUp } from "lucide-react";

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24)  return `${hrs}h ago`;
  return `${days}d ago`;
}

const SORT_OPTIONS = [
  { value: "recent",  label: "Recent",  icon: Clock },
  { value: "popular", label: "Popular", icon: TrendingUp },
  { value: "answers", label: "Most Answered", icon: MessageSquare },
];

const FILTER_OPTIONS = [
  { value: "",           label: "All Questions" },
  { value: "unanswered", label: "Unanswered" },
  { value: "solved",     label: "Solved" },
];

export default function QAPage() {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<any[]>([]);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage]           = useState(1);
  const [sort, setSort]           = useState("recent");
  const [filter, setFilter]       = useState("");
  const [loading, setLoading]     = useState(true);
  const [showAskForm, setShowAskForm] = useState(false);
  const [newTitle, setNewTitle]   = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/qa", { params: { sort, filter, page } });
      setQuestions(res.data.questions);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch { setQuestions([]); }
    finally { setLoading(false); }
  }, [sort, filter, page]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const handleAskQuestion = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      setSubmitError("Title and content are required.");
      return;
    }
    setSubmitting(true); setSubmitError("");
    try {
      const tags = newTags.split(",").map(t => t.trim()).filter(Boolean);
      await axios.post("/api/qa", { title: newTitle, content: newContent, tags });
      setNewTitle(""); setNewContent(""); setNewTags("");
      setShowAskForm(false);
      fetchQuestions();
    } catch (err: any) {
      setSubmitError(err.response?.data?.error || "Failed to post question.");
    } finally { setSubmitting(false); }
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>Community</div>
              <h1 className="text-5xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1.1" }}>
                Student<br /><span style={{ color: "var(--accent)", fontStyle: "italic" }}>Q&A</span>
              </h1>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
                {total} questions from real students. Ask anything about colleges, exams, and admissions.
              </p>
            </div>
            <button
              onClick={() => session ? setShowAskForm(!showAskForm) : window.location.href = "/login"}
              className="btn-accent text-xs py-2 px-4 flex-shrink-0 mt-2">
              <Plus className="w-4 h-4" /> Ask Question
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Ask Question Form */}
        {showAskForm && (
          <div className="editorial-card p-6 mb-8" style={{ border: "2px solid var(--ink)" }}>
            <h2 className="text-xl font-black mb-5" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              Ask a Question
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                  Question Title *
                </label>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. What is the difference between JEE Main and JEE Advanced?"
                  className="editorial-input" maxLength={200} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                  Details *
                </label>
                <textarea value={newContent} onChange={e => setNewContent(e.target.value)}
                  placeholder="Explain your question in detail. The more specific you are, the better answers you'll get."
                  rows={5} className="editorial-input resize-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                  Tags (comma separated)
                </label>
                <input type="text" value={newTags} onChange={e => setNewTags(e.target.value)}
                  placeholder="e.g. JEE, IIT Bombay, Computer Science"
                  className="editorial-input" />
              </div>
              {submitError && (
                <p className="text-xs font-medium" style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>{submitError}</p>
              )}
              <div className="flex gap-3">
                <button onClick={handleAskQuestion} disabled={submitting} className="btn-primary text-sm disabled:opacity-60">
                  {submitting ? "Posting..." : "Post Question"}
                </button>
                <button onClick={() => setShowAskForm(false)} className="btn-secondary text-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Sort + Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Filter tabs */}
          <div className="flex gap-1">
            {FILTER_OPTIONS.map(f => (
              <button key={f.value} onClick={() => { setFilter(f.value); setPage(1); }}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide border-2 transition-colors"
                style={{
                  borderColor: "var(--ink)",
                  background: filter === f.value ? "var(--ink)" : "transparent",
                  color: filter === f.value ? "var(--white)" : "var(--ink)",
                  fontFamily: "var(--font-dm-sans)",
                }}>
                {f.label}
              </button>
            ))}
          </div>
          {/* Sort tabs */}
          <div className="flex gap-1">
            {SORT_OPTIONS.map(s => (
              <button key={s.value} onClick={() => { setSort(s.value); setPage(1); }}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border transition-colors"
                style={{
                  borderColor: sort === s.value ? "var(--ink)" : "var(--border)",
                  background: sort === s.value ? "var(--cream-dark)" : "transparent",
                  color: sort === s.value ? "var(--ink)" : "var(--ink-muted)",
                  fontFamily: "var(--font-dm-sans)",
                }}>
                <s.icon className="w-3 h-3" /> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions list */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="editorial-card p-5 animate-pulse space-y-3">
                <div className="skeleton h-6 w-3/4 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-2/3 rounded" />
                <div className="flex gap-4">
                  <div className="skeleton h-4 w-16 rounded" />
                  <div className="skeleton h-4 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--ink-muted)" }} />
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>No questions yet.</h2>
            <p className="mb-6" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>Be the first to ask a question!</p>
            <button onClick={() => session ? setShowAskForm(true) : window.location.href = "/login"}
              className="btn-primary inline-flex">
              <Plus className="w-4 h-4" /> Ask First Question
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q: any) => (
              <Link key={q.id} href={`/qa/${q.id}`}
                className="editorial-card p-5 flex gap-4 group hover:bg-zinc-900 transition-colors block">
                {/* Stats column */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0 w-14 text-center pt-1">
                  <div>
                    <div className="text-xl font-black" style={{ fontFamily: "var(--font-playfair)", color: q._count.answers > 0 ? "var(--ink)" : "var(--ink-muted)" }}>
                      {q._count.answers}
                    </div>
                    <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                      {q._count.answers === 1 ? "ans" : "ans"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                      {q.views}
                    </div>
                    <div className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>views</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px self-stretch" style={{ background: "var(--border)" }} />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2 flex-wrap">
                    {q.solved && (
                      <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5"
                        style={{ background: "#E8F5ED", color: "#1B6B35", fontFamily: "var(--font-dm-sans)" }}>
                        <CheckCircle className="w-3 h-3" /> Solved
                      </span>
                    )}
                    {q._count.answers === 0 && (
                      <span className="text-xs font-bold px-2 py-0.5 border"
                        style={{ borderColor: "#E84545", color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>
                        Unanswered
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
                    {q.title}
                  </h3>

                  <p className="text-sm mb-3 line-clamp-2 group-hover:text-white/70 transition-colors"
                    style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    {q.content}
                  </p>

                  {/* Tags */}
                  {q.tags && q.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {q.tags.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="text-xs px-2 py-0.5 font-medium"
                          style={{ background: "var(--cream-dark)", color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)", border: "1px solid var(--border)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    <span>Asked by <strong>{q.user?.name || "Anonymous"}</strong></span>
                    <span>·</span>
                    <span>{timeAgo(q.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="flex items-center gap-2 px-5 py-2.5 border-2 font-bold text-sm uppercase tracking-wide disabled:opacity-40 transition-colors"
              style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
              Page {page} of {totalPages}
            </span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex items-center gap-2 px-5 py-2.5 border-2 font-bold text-sm uppercase tracking-wide disabled:opacity-40 transition-colors"
              style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-dm-sans)" }}>
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
