import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface EmptyStateProps {
  title: string;
  body: string;
  cta?: string;
  ctaHref?: string;
}

export default function EmptyState({ title, body, cta, ctaHref }: EmptyStateProps) {
  return (
    <div className="py-24 text-center">
      <div className="text-8xl font-black mb-6" style={{ fontFamily: "var(--font-playfair)", color: "rgba(0,0,0,0.06)" }}>
        404
      </div>
      <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>
        {title}
      </h2>
      <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans)" }}>
        {body}
      </p>
      {cta && ctaHref && (
        <Link href={ctaHref} className="btn-primary inline-flex">
          {cta} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
