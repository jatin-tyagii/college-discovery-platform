import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--ink)" }}>
      <div className="text-center px-4">
        <div className="text-9xl font-black mb-4"
          style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.06)" }}>
          404
        </div>
        <h1 className="text-5xl font-black mb-4"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--white)", lineHeight: "1" }}>
          Page not<br />
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>found.</span>
        </h1>
        <p className="text-sm mb-8 max-w-sm mx-auto"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-accent inline-flex">
          Back to Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
