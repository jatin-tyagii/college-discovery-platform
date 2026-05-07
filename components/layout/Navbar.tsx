"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, GitCompare, GraduationCap, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compareCount, setCompareCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      try {
        const list = JSON.parse(localStorage.getItem("compareList") || "[]");
        setCompareCount(list.length);
      } catch { setCompareCount(0); }
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("compareUpdated", update);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("compareUpdated", update);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled ? "bg-white border-b-2 border-ink shadow-sm" : "bg-cream border-b border-border"
    }`} style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ink flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-accent" style={{ color: 'var(--accent)' }} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ink)' }}>
              EduFind
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/colleges", label: "Colleges" },
              { href: "/courses", label: "Courses" },
              { href: "/exams", label: "Exams" },
              { href: "/predict", label: "Predict" },
              { href: "/qa", label: "Q&A" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors hover:text-accent-dark"
                style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--ink-light)', letterSpacing: '0.05em' }}>
                {label}
              </Link>
            ))}
            <Link href="/compare" className="relative px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors"
              style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--ink-light)', letterSpacing: '0.05em' }}>
              <GitCompare className="w-4 h-4 inline mr-1" />
              Compare
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center font-bold"
                  style={{ background: 'var(--ink)', color: 'var(--accent)' }}>
                  {compareCount}
                </span>
              )}
            </Link>
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link href="/saved" className="text-sm font-semibold uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--ink-muted)' }}>
                  Saved
                </Link>
                <Link href="/dashboard" className="text-sm font-semibold uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--ink-muted)' }}>
                  {session.user?.name?.split(" ")[0]}
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary text-xs py-2 px-4">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--ink-muted)', letterSpacing: '0.05em' }}>
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-xs py-2 px-4">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t-2 border-ink bg-white">
          <div className="px-4 py-6 space-y-4">
            {[
              { href: "/colleges", label: "Colleges" },
              { href: "/courses", label: "Courses" },
              { href: "/exams", label: "Exams" },
              { href: "/compare", label: `Compare ${compareCount > 0 ? `(${compareCount})` : ""}` },
              { href: "/predict", label: "Rank Predictor" },
              { href: "/qa", label: "Q&A" },
              { href: "/saved", label: "Saved" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="block text-2xl font-bold"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ink)' }}>
                {label}
              </Link>
            ))}
            <div className="pt-4 flex gap-3">
              {session ? (
                <button onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false); }}
                  className="btn-secondary flex-1 justify-center">
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-secondary flex-1 justify-center">Login</Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="btn-primary flex-1 justify-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
