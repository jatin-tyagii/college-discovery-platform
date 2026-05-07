import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--white)' }} className="mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                <GraduationCap className="w-4 h-4" style={{ color: 'var(--ink)' }} />
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>EduFind</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
              India's most honest college discovery platform. No paid rankings. No sponsored listings. Just clean data to help you make the right decision.
            </p>
            <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)' }}>
              Research → Decide → Apply
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)' }}>Discover</h4>
            <div className="space-y-2">
              {[["Colleges", "/colleges"], ["Courses", "/courses"], ["Exams", "/exams"], ["Rankings", "/rankings"]].map(([label, href]) => (
                <Link key={href} href={href} className="block text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-dm-sans)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)' }}>Tools</h4>
            <div className="space-y-2">
              {[["Compare Colleges", "/compare"], ["Rank Predictor", "/predict"], ["Q&A Forum", "/qa"], ["Saved Colleges", "/saved"]].map(([label, href]) => (
                <Link key={href} href={href} className="block text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-dm-sans)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dm-sans)' }}>
            © 2025 EduFind. Built with honesty for students.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dm-sans)' }}>
            Data is indicative. Always verify from official sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
