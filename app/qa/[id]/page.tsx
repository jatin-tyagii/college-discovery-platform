"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  ChevronLeft, CheckCircle, Eye, MessageSquare,
  ThumbsUp, Send, Clock, AlertCircle
} from "lucide-react";

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24)  return `${hrs}h ago`;
  return `${days}d ago`;
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-black"
      style={{ background: "var(--ink)", color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
      {initials}
    </div>
  );
}

export default function QuestionDetailPage() {
  const { id } = useParams();
  const router  = useRouter();
  const { data: session } = useSession();
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const [submitting, setSubmitting]       = useState(false);
  const [submitError, setSubmitError]     = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`/api/qa/${id}`);
      setQuestion(res.data);
    } catch (err: any) {
      setError(err.response?.status === 404 ? "Question not found." : "Failed to load question.");
    } finally { setLoading(false); }
  };

  useEffect(() => { if (id) fetchQuestion(); }, [id]);

  const handleAnswer = async () => {
    if (!answerContent.trim()) { setSubmitError("Answer cannot be empty."); return; }
    if (!session) { router.push("/login"); return; }
    setSubmitting(true); setSubmitError(""); setSubmitSuccess(false);
    try {
      await axios.post(`/api/qa/${id}/answers`, { content: answerContent });
      setAnswerContent("");
      setSubmitSuccess(true);
      fetchQuestion(); // Refresh to show new answer
    } catch (err: any) {
      setSubmitError(err.response?.data?.error || "Failed to post answer.");
    } finally { setSubmitting(false); }
  };

  if (loading) {
    return (
      <div style={{ background: "var(--cream)", minHeight: "100vh" }} className="animate-pulse">
        <div style={{ background: "var(--ink)", height: "180px" }} />
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
          <div className="skeleton h-8 w-3/4 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--cream)" }}>
        <h2 className="text-4xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>{error}</h2>
        <Link href="/qa" className="btn-primary">← Back to Q&A</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--ink)", borderBottom: "3px solid var(--accent)" }}>
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-10">

          {/* Back + breadcrumb */}
          <button onClick={() => router.back()}
            className="flex items-center gap-1 text-xs uppercase tracking-wide font-semibold mb-6 transition-colors hover:text-yellow-400"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
            <ChevronLeft className="w-4 h-4" /> Back to Q&A
          </button>

          {/* Status badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {question.solved && (
              <span className="flex items-center gap-1 text-xs font-bold px-2 py-1"
                style={{ background: "#1B6B35", color: "var(--white)", fontFamily: "var(--font-dm-sans)" }}>
                <CheckCircle className="w-3 h-3" /> Solved
              </span>
            )}
            {question.tags?.map((tag: string) => (
              <span key={tag} className="text-xs font-bold px-2 py-1 border"
                style={{ borderColor: "var(--accent)", color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Question title */}
          <h1 className="font-black mb-4" style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "var(--white)",
            lineHeight: "1.2",
          }}>
            {question.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
            <span className="flex items-center gap-1">
              <Avatar name={question.user?.name || "?"} />
              <span className="ml-1">Asked by <strong style={{ color: "rgba(255,255,255,0.8)" }}>{question.user?.name}</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {timeAgo(question.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {question.views} views
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> {question.answers?.length || 0} answers
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Question body */}
        <div className="editorial-card p-6">
          <p className="leading-relaxed" style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>
            {question.content}
          </p>
        </div>

        {/* Answers section */}
        <div>
          <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
            {question.answers?.length || 0} Answer{question.answers?.length !== 1 ? "s" : ""}
          </h2>

          {question.answers?.length === 0 ? (
            <div className="editorial-card p-8 text-center mb-6">
              <MessageSquare className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--ink-muted)" }} />
              <p className="font-bold mb-1" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)", fontSize: "1.1rem" }}>
                No answers yet.
              </p>
              <p className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                Be the first to help this student!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {question.answers.map((answer: any, i: number) => (
                <div key={answer.id} className="editorial-card overflow-hidden"
                  style={{ border: answer.isAccepted ? "2px solid #1B6B35" : "1px solid var(--border)" }}>
                  {/* Accepted banner */}
                  {answer.isAccepted && (
                    <div className="px-5 py-2 flex items-center gap-2"
                      style={{ background: "#1B6B35" }}>
                      <CheckCircle className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold uppercase tracking-wide text-white"
                        style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Accepted Answer
                      </span>
                    </div>
                  )}

                  <div className="p-5">
                    {/* Answer meta */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Avatar name={answer.user?.name || "?"} />
                        <div>
                          <div className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
                            {answer.user?.name || "Anonymous"}
                          </div>
                          <div className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                            {timeAgo(answer.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{answer.helpfulCount} helpful</span>
                      </div>
                    </div>

                    {/* Answer content */}
                    <p className="leading-relaxed" style={{ color: "var(--ink-light)", fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", whiteSpace: "pre-wrap" }}>
                      {answer.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Post Answer Form */}
        <div className="editorial-card p-6" style={{ border: "2px solid var(--ink)" }}>
          <h3 className="text-xl font-black mb-5" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
            {session ? "Post Your Answer" : "Login to Answer"}
          </h3>

          {!session ? (
            <div className="text-center py-6">
              <p className="text-sm mb-4" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                You need to be logged in to post an answer.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/login" className="btn-primary text-sm">Login</Link>
                <Link href="/signup" className="btn-secondary text-sm">Sign Up</Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                  Your Answer
                </label>
                <textarea
                  value={answerContent}
                  onChange={e => { setAnswerContent(e.target.value); setSubmitError(""); setSubmitSuccess(false); }}
                  placeholder="Share your knowledge or experience. Be specific and helpful."
                  rows={6}
                  className="editorial-input resize-none"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    Minimum 20 characters
                  </span>
                  <span className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    {answerContent.length} chars
                  </span>
                </div>
              </div>

              {submitError && (
                <div className="flex items-center gap-2 p-3 border-2" style={{ borderColor: "#E84545", background: "#FFF0F0" }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#E84545" }} />
                  <p className="text-xs" style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>{submitError}</p>
                </div>
              )}

              {submitSuccess && (
                <div className="flex items-center gap-2 p-3 border-2" style={{ borderColor: "#1B6B35", background: "#E8F5ED" }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#1B6B35" }} />
                  <p className="text-xs font-medium" style={{ color: "#1B6B35", fontFamily: "var(--font-dm-sans)" }}>
                    Answer posted successfully!
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
                  Logged in as <strong>{session.user?.name}</strong>
                </p>
                <button onClick={handleAnswer} disabled={submitting || answerContent.length < 20}
                  className="btn-primary text-sm disabled:opacity-60 flex items-center gap-2">
                  {submitting ? "Posting..." : <><Send className="w-4 h-4" /> Post Answer</>}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Related links */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/qa" className="btn-secondary text-sm">
            ← All Questions
          </Link>
          <Link href="/colleges" className="btn-secondary text-sm">
            Browse Colleges
          </Link>
        </div>
      </div>
    </div>
  );
}
