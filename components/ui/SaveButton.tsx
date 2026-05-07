"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import axios from "axios";

export default function SaveButton({ collegeId }: { collegeId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [burst, setBurst]       = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; rotate: number; scale: number }[]>([]);

  useEffect(() => {
    if (!session) return;
    axios.get("/api/saved").then(res => {
      setSaved(res.data.some((c: any) => c.id === collegeId));
    }).catch(() => {});
  }, [session, collegeId]);

  const triggerBurst = () => {
    const newParticles = [...Array(8)].map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: -(Math.random() * 50 + 20),
      rotate: (Math.random() - 0.5) * 360,
      scale: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
    setBurst(true);
    setTimeout(() => { setBurst(false); setParticles([]); }, 700);
  };

  const toggle = async () => {
    if (!session) { router.push("/login"); return; }
    setLoading(true);
    try {
      if (saved) {
        await axios.delete("/api/saved", { data: { collegeId } });
        setSaved(false);
      } else {
        await axios.post("/api/saved", { collegeId });
        setSaved(true);
        triggerBurst();
      }
    } catch {} finally { setLoading(false); }
  };

  return (
    <div className="relative inline-flex">
      {/* Burst particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%)`,
            animation: `particle-fly 0.65s ease-out forwards`,
            "--tx": `${p.x}px`,
            "--ty": `${p.y}px`,
            "--rotate": `${p.rotate}deg`,
            "--scale": p.scale,
          } as React.CSSProperties}>
          <Heart className="w-3 h-3 fill-red-500 text-red-500"
            style={{ transform: `scale(${p.scale})` }} />
        </div>
      ))}

      <button
        onClick={toggle}
        disabled={loading}
        className="relative w-9 h-9 flex items-center justify-center border-2 transition-all duration-200 overflow-visible"
        style={{
          borderColor: saved ? "#E84545" : "var(--ink)",
          background: saved ? "#FFF0F0" : "transparent",
          transform: burst ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s, border-color 0.2s",
        }}
        title={saved ? "Unsave" : "Save"}>
        <Heart
          className="w-4 h-4 transition-all duration-200"
          style={{
            color: saved ? "#E84545" : "var(--ink)",
            fill: saved ? "#E84545" : "none",
            transform: burst ? "scale(1.3)" : "scale(1)",
            transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </button>

      {/* Inline keyframes */}
      <style>{`
        @keyframes particle-fly {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) rotate(var(--rotate)) scale(0);
          }
        }
      `}</style>
    </div>
  );
}
