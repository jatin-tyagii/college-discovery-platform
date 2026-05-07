"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  GraduationCap, Mail, Lock, User,
  AlertCircle, CheckCircle, ArrowRight, Eye, EyeOff
} from "lucide-react";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 6 characters", ok: password.length >= 6 },
    { label: "Contains a number", ok: /\d/.test(password) },
    { label: "Contains a letter", ok: /[a-zA-Z]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const colors = ["#E84545", "#E89045", "#1B6B35"];
  const labels = ["Weak", "Fair", "Strong"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all"
            style={{ background: i < score ? colors[score - 1] : "var(--border)" }} />
        ))}
      </div>
      <p className="text-xs font-semibold" style={{ color: score > 0 ? colors[score - 1] : "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
        {score > 0 ? labels[score - 1] : ""}
      </p>
      <div className="space-y-1">
        {checks.map(c => (
          <div key={c.label} className="flex items-center gap-1.5 text-xs"
            style={{ color: c.ok ? "#1B6B35" : "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
            {c.ok
              ? <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: "#1B6B35" }} />
              : <div className="w-3 h-3 rounded-full border flex-shrink-0" style={{ borderColor: "var(--ink-muted)" }} />
            }
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Full name is required."); return; }
    if (!email.trim()) { setError("Email is required."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPass) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      await axios.post("/api/signup", { name, email, password });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-center max-w-sm mx-4">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center" style={{ background: "#1B6B35" }}>
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-black mb-3" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
            Account Created!
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
            Welcome to EduFind, {name.split(" ")[0]}! Redirecting you to login...
          </p>
          <div className="w-8 h-8 mx-auto border-2 border-ink/20 border-t-ink rounded-full animate-spin"
            style={{ borderTopColor: "var(--ink)" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--cream)" }}>

      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style={{ background: "var(--ink)" }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center" style={{ background: "var(--accent)" }}>
            <GraduationCap className="w-4 h-4" style={{ color: "var(--ink)" }} />
          </div>
          <span className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--white)" }}>EduFind</span>
        </Link>

        <div>
          <h2 className="font-black mb-6" style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.5rem, 4vw, 4rem)",
            color: "var(--white)",
            lineHeight: "1",
          }}>
            Start your<br />journey.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)", maxWidth: "320px" }}>
            Create a free account to save colleges, compare shortlists, and get the most out of EduFind.
          </p>
        </div>

        <div className="space-y-3">
          {[
            "Save unlimited colleges to your list",
            "Compare up to 3 colleges side-by-side",
            "Ask questions in the student community",
            "Get personalised college predictions",
          ].map(feat => (
            <div key={feat} className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-dm-sans)" }}>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — signup form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "var(--ink)" }}>
              <GraduationCap className="w-4 h-4" style={{ color: "var(--accent)" }} />
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>EduFind</span>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
              Create Account
            </h1>
            <p className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              Already have an account?{" "}
              <Link href="/login" className="font-bold underline" style={{ color: "var(--ink)" }}>
                Sign in →
              </Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-4 mb-6 border-2" style={{ borderColor: "#E84545", background: "#FFF0F0" }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#E84545" }} />
              <p className="text-sm" style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                Full Name
              </label>
              <div className="relative">
                <User className="absolute top-1/2 -translate-y-1/2 w-4 h-4" style={{ left: "1rem", color: "var(--ink-muted)" }} />
                <input type="text" value={name} onChange={e => { setName(e.target.value); setError(""); }}
                  placeholder="Rahul Sharma" required
                  className="icon-input" autoComplete="name" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 w-4 h-4" style={{ left: "1rem", color: "var(--ink-muted)" }} />
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com" required
                  className="icon-input" autoComplete="email" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 w-4 h-4" style={{ left: "1rem", color: "var(--ink-muted)" }} />
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Min 6 characters" required
                  className="icon-input icon-input-right" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-muted)" }}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 w-4 h-4" style={{ left: "1rem", color: "var(--ink-muted)" }} />
                <input type={showPass ? "text" : "password"} value={confirmPass}
                  onChange={e => { setConfirmPass(e.target.value); setError(""); }}
                  placeholder="Repeat your password" required
                  className="icon-input"
                  style={{
                    borderColor: confirmPass && password !== confirmPass ? "#E84545" : "var(--ink)",
                  }}
                  autoComplete="new-password" />
              </div>
              {confirmPass && password !== confirmPass && (
                <p className="text-xs mt-1 font-medium" style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>
                  Passwords do not match
                </p>
              )}
              {confirmPass && password === confirmPass && password.length >= 6 && (
                <p className="text-xs mt-1 font-medium flex items-center gap-1" style={{ color: "#1B6B35", fontFamily: "var(--font-dm-sans)" }}>
                  <CheckCircle className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            <button type="submit" disabled={loading || (!!confirmPass && password !== confirmPass)}
              className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-xs text-center" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              By creating an account, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
