import { makeStars } from "./data";
import { cn } from "@/lib/utils";

export function Galaxy({ density = 70, seed = 7, className }: { density?: number; seed?: number; className?: string }) {
  const stars = makeStars(density, seed);
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute -left-1/4 -top-1/4 h-[70%] w-[80%] rounded-full bg-violet/18 blur-[90px] animate-drift" />
      <div
        className="absolute -right-1/4 top-1/3 h-[60%] w-[70%] rounded-full bg-silver/8 blur-[100px] animate-drift"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-20%] left-1/4 h-[50%] w-[60%] rounded-full bg-neon/12 blur-[100px] animate-drift"
        style={{ animationDelay: "-12s" }}
      />
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.size,
            height: st.size,
            animationDelay: `${st.delay}s`,
            animationDuration: `${st.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Equalizer({ bars = 5, className }: { bars?: number; className?: string }) {
  return (
    <div className={cn("flex h-4 items-end gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] h-full rounded-full bg-neon-gradient animate-eq"
          style={{ animationDelay: `${i * 0.13}s`, animationDuration: `${0.7 + (i % 3) * 0.2}s` }}
        />
      ))}
    </div>
  );
}

export function LiveBadge({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-glow" />
      {label}
    </span>
  );
}
