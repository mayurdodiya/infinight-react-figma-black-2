import { useState } from "react";
import { Clock, Heart, Map, Navigation, SlidersHorizontal, Search, Shirt, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { venues } from "../data";
import { Chip, IconBtn } from "../ui";

const filters = ["All", "Rooftop", "Lounge", "Underground", "Pool"] as const;

const pins = [
  { x: 28, y: 38, label: "Skybar 42", hot: true },
  { x: 62, y: 26, label: "Cirrus", hot: true },
  { x: 74, y: 64, label: "Velvet" },
  { x: 40, y: 72, label: "Aqua Deck" },
];

export function VenuesScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [saved, setSaved] = useState<Record<string, boolean>>({ v1: true });
  const list = filter === "All" ? venues : venues.filter((v) => v.type === filter);

  return (
    <div className="relative space-y-5 pt-3">
      <header className="flex items-start justify-between px-5">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Open now · 34 near you</p>
          <h1 className="mt-1 font-display text-[30px] font-bold leading-none tracking-tight">
            Venues<span className="text-neon">.</span>
          </h1>
        </div>
        <IconBtn label="Map view">
          <Map className="h-5 w-5" />
        </IconBtn>
      </header>

      <div className="flex gap-2 px-5">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-full glass px-5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-[13px] text-muted-foreground">Search clubs, areas…</span>
        </div>
        <button aria-label="Filters" className="flex h-12 w-12 items-center justify-center rounded-full bg-neon-gradient shadow-neon">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5">
        {filters.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      {/* glass map */}
      <div className="px-5">
        <div
          className="relative h-40 overflow-hidden rounded-[26px] glass"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.05) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path d="M0 60 C 25 50, 40 80, 60 55 S 90 30, 100 40" stroke="oklch(0.84 0.14 205 / 0.35)" strokeWidth="1.2" fill="none" />
            <path d="M10 0 C 20 30, 50 30, 45 100" stroke="oklch(1 0 0 / 0.12)" strokeWidth="0.8" fill="none" />
          </svg>
          {pins.map((p) => (
            <div key={p.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              {p.hot && <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/40 animate-ping" />}
              <span className={cn("relative block h-3 w-3 rounded-full ring-2 ring-foreground", p.hot ? "bg-neon" : "bg-cyan")} />
              <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full glass-strong px-2 py-0.5 text-[9.5px] font-semibold">
                {p.label}
              </span>
            </div>
          ))}
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-bold text-background">
            <Navigation className="h-3 w-3" /> You
          </span>
        </div>
      </div>

      <div className="space-y-4 px-5">
        {list.map((v, idx) => (
          <article key={v.id} className="overflow-hidden rounded-[28px] glass animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
            <div className="relative h-44">
              <img src={v.image} alt={v.name} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-void/60 px-3 py-1 text-[10.5px] font-semibold backdrop-blur-md">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan animate-glow" />
                {v.tag}
              </span>
              <button
                onClick={() => setSaved((s) => ({ ...s, [v.id]: !s[v.id] }))}
                aria-label="Save venue"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass-strong"
              >
                <Heart className={cn("h-4 w-4 transition-transform", saved[v.id] && "scale-110 fill-neon text-neon")} />
              </button>
              <p className="absolute bottom-3 left-4 font-display text-[10px] tracking-[0.2em] text-foreground/85">TONIGHT · {v.tonight.toUpperCase()}</p>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-[18px] font-semibold tracking-tight">{v.name}</h3>
                  <p className="text-[12px] text-muted-foreground">
                    {v.area} · {v.km}
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-[12px] font-bold text-gold">
                  <Star className="h-3.5 w-3.5 fill-gold" /> {v.rating}
                </span>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-3.5 w-3.5" /> Crowd right now</span>
                  <span className="font-bold">{v.crowd}% · {v.crowd > 85 ? "Packed" : v.crowd > 60 ? "Buzzing" : "Chill"}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <div className="h-full rounded-full bg-neon-gradient" style={{ width: `${v.crowd}%` }} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full border border-glass-border px-2.5 py-1">{v.price}</span>
                <span className="flex items-center gap-1 rounded-full border border-glass-border px-2.5 py-1"><Clock className="h-3 w-3" />{v.closes}</span>
                <span className="flex items-center gap-1 rounded-full border border-glass-border px-2.5 py-1"><Shirt className="h-3 w-3" />Smart casual</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button className="h-11 flex-1 rounded-full bg-foreground text-[13px] font-bold text-background">View details</button>
                <button className="h-11 rounded-full glass px-5 text-[13px] font-semibold">Directions</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
