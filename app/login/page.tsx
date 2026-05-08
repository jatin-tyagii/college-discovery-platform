"use client";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/colleges";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);

    const res = await signIn("credentials", {
      email, password, redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--cream)" }}>

      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: "var(--ink)" }}>
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
            Welcome<br />back.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)", maxWidth: "320px" }}>
            Log in to save colleges, track your shortlist, and get personalised recommendations.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { num: "30+", label: "Colleges in database" },
            { num: "10+", label: "Entrance exams covered" },
            { num: "100%", label: "Honest, unsponsored data" },
          ].map(({ num, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="text-2xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--accent)", minWidth: "4rem" }}>{num}</div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
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
              Sign In
            </h1>
            <p className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              Don't have an account?{" "}
              <Link href="/signup" className="font-bold underline" style={{ color: "var(--ink)" }}>
                Create one →
              </Link>
            </p>
          </div>

          {/* Demo credentials hint */}
          <div className="p-4 mb-6 border-l-4" style={{ borderColor: "var(--accent)", background: "rgba(232,197,71,0.08)" }}>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink)" }}>
              Demo Account
            </p>
            <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
              Email: <strong>demo@example.com</strong> · Password: <strong>password123</strong>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-4 mb-6 border-2" style={{ borderColor: "#E84545", background: "#FFF0F0" }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#E84545" }} />
              <p className="text-sm" style={{ color: "#E84545", fontFamily: "var(--font-dm-sans)" }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 w-4 h-4" style={{ left: "1rem", color: "var(--ink-muted)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  required
                  className="icon-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--ink-muted)" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 w-4 h-4" style={{ left: "1rem", color: "var(--ink-muted)" }} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  required
                  className="icon-input icon-input-right"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--ink-muted)" }}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-xs text-center" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
              By signing in, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}