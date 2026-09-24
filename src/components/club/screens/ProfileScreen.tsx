import { useState } from "react";
import { BadgeCheck, Bookmark, ChevronDown, Crown, Grid3x3, Link2, Lock, Menu, Play, Plus, SquareUser, Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { img, profileGrid } from "../data";
import { IconBtn } from "../ui";

const highlights = [
  { label: "NYE '25", image: img.crowd },
  { label: "Goa", image: img.rooftop },
  { label: "Techno", image: img.underground },
  { label: "B'day", image: img.cocktail },
  { label: "Afters", image: img.lounge },
];

const tabs = [
  { id: "posts", icon: Grid3x3 },
  { id: "reels", icon: Clapperboard },
  { id: "tagged", icon: SquareUser },
  { id: "saved", icon: Bookmark },
] as const;

const nights = [40, 65, 30, 85, 55, 95, 70];

export function ProfileScreen() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("posts");
  const [following, setFollowing] = useState(false);
  const grid =
    tab === "reels" ? profileGrid.filter((g) => g.reel) : tab === "tagged" ? [...profileGrid].reverse() : tab === "saved" ? profileGrid.slice(2, 8) : profileGrid;

  return (
    <div className="relative pt-3">
      <header className="flex items-center justify-between px-5">
        <p className="flex items-center gap-1.5 font-display text-[16px] font-semibold">
          <Lock className="h-3.5 w-3.5" /> aarav.after.dark <ChevronDown className="h-4 w-4" />
        </p>
        <div className="flex gap-2">
          <IconBtn label="Create">
            <Plus className="h-5 w-5" />
          </IconBtn>
          <IconBtn label="Menu">
            <Menu className="h-5 w-5" />
          </IconBtn>
        </div>
      </header>

      {/* cover + avatar */}
      <div className="relative mx-5 mt-4 h-28 overflow-hidden rounded-[26px]">
        <img src={img.crowd} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="relative -mt-14 flex flex-col items-center px-5 text-center">
        <span className="relative flex h-28 w-28 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-gold-gradient animate-[spin_8s_linear_infinite]" style={{ background: "conic-gradient(from 0deg, var(--gold), transparent 40%, var(--gold) 60%, transparent 90%, var(--gold))" }} />
          <span className="absolute inset-[3px] rounded-full bg-background" />
          <img src={img.man} alt="Aarav Mehta" className="relative h-[100px] w-[100px] rounded-full object-cover" />
          <span className="absolute -bottom-2 flex items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-1 text-[9px] font-bold tracking-wider text-gold-foreground ring-2 ring-background">
            <Crown className="h-3 w-3" /> BLACK DIAMOND
          </span>
        </span>
        <h1 className="mt-4 flex items-center gap-1.5 font-display text-[22px] font-bold tracking-tight">
          Aarav Mehta <BadgeCheck className="h-5 w-5 fill-cyan text-background" />
        </h1>
        <p className="mt-1 font-serif text-[17px] italic text-foreground/80">Techno head · Rooftop regular · Mumbai</p>
        <p className="mt-1 flex items-center gap-1 text-[12px] text-cyan">
          <Link2 className="h-3.5 w-3.5" /> nocturne.app/aarav
        </p>
      </div>

      {/* stats */}
      <div className="mx-5 mt-5 grid grid-cols-4 rounded-[24px] glass py-3.5 text-center">
        {[
          ["128", "Posts"],
          ["24.6K", "Followers"],
          ["612", "Following"],
          ["87", "Nights"],
        ].map(([n, l], i) => (
          <div key={l} className={cn(i > 0 && "border-l border-glass-border")}>
            <p className="font-display text-[17px] font-bold">{n}</p>
            <p className="text-[10.5px] text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <div className="mx-5 mt-3 flex gap-2">
        <button
          onClick={() => setFollowing((f) => !f)}
          className={cn("h-11 flex-1 rounded-full text-[13px] font-bold transition-all", following ? "glass" : "bg-neon-gradient shadow-neon")}
        >
          {following ? "Following" : "Edit profile"}
        </button>
        <button className="h-11 flex-1 rounded-full glass text-[13px] font-semibold">Share profile</button>
        <button className="flex h-11 items-center gap-1 rounded-full bg-gold-gradient px-4 text-[12px] font-bold text-gold-foreground">
          <Crown className="h-4 w-4" /> VIP
        </button>
      </div>

      {/* night stats */}
      <div className="mx-5 mt-4 flex items-end gap-4 rounded-[24px] glass p-4">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">This month</p>
          <p className="mt-1 font-display text-[15px] font-semibold">9 nights · 4 venues</p>
          <p className="text-[11.5px] text-muted-foreground">Favourite DJ · <span className="text-neon">Kyra</span></p>
        </div>
        <div className="flex h-12 items-end gap-1.5">
          {nights.map((h, i) => (
            <span key={i} className="w-2.5 origin-bottom rounded-full bg-neon-gradient animate-fade-in" style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }} />
          ))}
        </div>
      </div>

      {/* highlights */}
      <div className="no-scrollbar mt-5 flex gap-4 overflow-x-auto px-5">
        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-glass-border">
            <Plus className="h-5 w-5" />
          </span>
          <span className="text-[11px]">New</span>
        </div>
        {highlights.map((h) => (
          <div key={h.label} className="flex shrink-0 flex-col items-center gap-1.5">
            <span className="rounded-full p-[2px] ring-1 ring-glass-border">
              <img src={h.image} alt="" className="h-[60px] w-[60px] rounded-full object-cover" />
            </span>
            <span className="text-[11px]">{h.label}</span>
          </div>
        ))}
      </div>

      {/* tabs */}
      <div className="relative mt-5 grid grid-cols-4 border-b border-glass-border">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} aria-label={t.id} className={cn("flex justify-center py-3 transition-colors", tab === t.id ? "text-foreground" : "text-muted-foreground")}>
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
        <span
          className="absolute bottom-0 h-[2px] w-1/4 bg-neon-gradient shadow-neon transition-transform duration-500"
          style={{ transform: `translateX(${tabs.findIndex((t) => t.id === tab) * 100}%)` }}
        />
      </div>

      <div key={tab} className="grid grid-cols-3 gap-[3px] p-[3px] animate-fade-in">
        {grid.map((g, i) => (
          <div key={i} className={cn("relative overflow-hidden rounded-lg", tab === "reels" ? "aspect-[9/16]" : "aspect-square")}>
            <img src={g.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            {g.reel && (
              <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[10px] font-bold drop-shadow">
                <Play className="h-3 w-3 fill-foreground" /> {g.views}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
