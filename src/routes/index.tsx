import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";
import { Galaxy } from "@/components/club/Galaxy";
import { Phone } from "@/components/club/Phone";
import { NocturneApp, TABS } from "@/components/club/NocturneApp";
import type { TabId } from "@/components/club/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infinight — Luxury Night Club App Concept" },
      {
        name: "description",
        content: "Interactive client preview of Infinight: home, venues, club pass, social feed and profile screens for a luxury night club app.",
      },
      { property: "og:title", content: "Infinight — Luxury Night Club App Concept" },
      {
        property: "og:description",
        content: "Five interactive screens for a black-galaxy, glassmorphic night club app. Tap through the full flow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SCREENS: { id: TabId; num: string; title: string; accent: string; points: string[] }[] = [
  {
    id: "home",
    num: "01",
    title: "Home",
    accent: "tonight, at a glance",
    points: ["Rotating highlight banners", "Events this week & featured venues", "Membership highlight + offers", "Stories, top DJs & now spinning"],
  },
  {
    id: "venues",
    num: "02",
    title: "Venues",
    accent: "find your room",
    points: ["Filter by Rooftop, Lounge, Underground, Pool", "Live map with hot-spot pins", "Real-time crowd meter", "Info only — opening hours, dress code, directions"],
  },
  {
    id: "pass",
    num: "03",
    title: "Club Pass",
    accent: "memberships & offers",
    points: ["Subscription plans + Razorpay checkout", "Membership & community benefits", "Infinight Corporate for teams", "InfinightX Diamond members club"],
  },
  {
    id: "feed",
    num: "04",
    title: "Nightfeed",
    accent: "social, after dark",
    points: ["Instagram-style stories with live badge", "Tap a story to open the full viewer", "Double-tap posts to like", "Friends' check-ins at venues"],
  },
  {
    id: "profile",
    num: "05",
    title: "Profile",
    accent: "your night, your story",
    points: ["VIP tier badge & gold ring", "Followers, following & nights out", "Monthly night stats", "Posts, Reels, Tagged & Saved grid"],
  },
];

function Index() {
  const [tab, setTab] = useState<TabId>("home");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void text-foreground grain">
      <div className="fixed inset-0">
        <Galaxy density={140} seed={3} />
      </div>

      {/* nav */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <span className="font-display text-[18px] font-bold tracking-[0.3em]">
          NOCT<span className="text-gradient-neon">U</span>RNE
        </span>
        <span className="rounded-full glass px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80">
          Client preview · Concept v1
        </span>
      </nav>

      {/* hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-6 lg:grid-cols-[1fr_auto] lg:px-10">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-neon" /> A night club app concept
          </p>
          <h1 className="mt-5 font-display text-[56px] font-bold leading-[0.95] tracking-tight md:text-[84px]">
            The night,
            <br />
            <span className="font-serif text-[64px] font-normal italic text-gradient-neon md:text-[100px]">curated.</span>
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-foreground/75">
            Discover tonight's events, book the hottest venues, unlock VIP passes and share every moment with your crowd — all in one
            black-galaxy experience.
          </p>

          <ol className="mt-10 space-y-2">
            {SCREENS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setTab(s.id)}
                  className={cn(
                    "group flex w-full items-center gap-5 rounded-2xl px-5 py-3.5 text-left transition-all duration-300",
                    tab === s.id ? "glass-strong shadow-neon" : "hover:bg-glass",
                  )}
                >
                  <span className={cn("font-display text-[13px] font-bold", tab === s.id ? "text-neon" : "text-muted-foreground")}>{s.num}</span>
                  <span className="font-display text-[17px] font-semibold">{s.title}</span>
                  <span className="font-serif text-[18px] italic text-foreground/60">{s.accent}</span>
                  <span className={cn("ml-auto h-2 w-2 rounded-full transition-all", tab === s.id ? "bg-neon shadow-neon" : "bg-transparent")} />
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center gap-2 text-[13px] text-muted-foreground">
            <MousePointerClick className="h-4 w-4 text-cyan" /> Everything inside the phone is tappable — try the tab bar, stories and likes.
          </p>
        </div>

        <div className="relative mx-auto animate-float">
          <Phone className="[--s:0.82] sm:[--s:0.95]">
            <NocturneApp tab={tab} onTabChange={setTab} seed={11} />
          </Phone>
        </div>
      </section>

      {/* all screens */}
      <section className="relative z-10 pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">The full flow</p>
          <h2 className="mt-3 font-display text-[36px] font-bold tracking-tight md:text-[52px]">
            Five screens, <span className="font-serif font-normal italic text-gradient-neon">one night out.</span>
          </h2>
        </div>

        <div className="no-scrollbar mt-12 flex snap-x gap-8 overflow-x-auto px-6 pb-6 lg:px-10">
          {SCREENS.map((s, i) => (
            <div key={s.id} className="w-[250px] shrink-0 snap-start">
              <Phone className="[--s:0.64]">
                <NocturneApp initialTab={s.id} seed={20 + i} />
              </Phone>
              <div className="mt-6">
                <p className="font-display text-[12px] font-bold text-neon">{s.num}</p>
                <h3 className="mt-1 font-display text-[20px] font-semibold">{s.title}</h3>
                <p className="font-serif text-[18px] italic text-foreground/60">{s.accent}</p>
                <ul className="mt-3 space-y-1.5 text-[13px] text-foreground/75">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* design language */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-6 rounded-[36px] glass p-8 md:grid-cols-3 md:p-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Palette</p>
            <div className="mt-4 flex gap-3">
              {[
                ["bg-void", "Void"],
                ["bg-neon", "Neon"],
                ["bg-violet", "Violet"],
                ["bg-cyan", "Cyan"],
                ["bg-gold", "Gold"],
              ].map(([c, l]) => (
                <div key={l} className="text-center">
                  <span className={cn("block h-12 w-12 rounded-full ring-1 ring-glass-border", c)} />
                  <span className="mt-2 block text-[11px] text-muted-foreground">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Typography</p>
            <p className="mt-4 font-display text-[26px] font-bold">Unbounded</p>
            <p className="font-serif text-[28px] italic leading-none">Instrument Serif</p>
            <p className="mt-1 text-[15px] text-foreground/75">Manrope for everything you read.</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Mood & motion</p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/75">
              Black galaxy backdrop with drifting nebula, frosted glass surfaces, laser sweeps, spinning story rings, live equalizers and
              gold shimmer for VIP moments.
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-glass-border py-8 text-center text-[12px] text-muted-foreground">
        Infinight · Design concept for client review · 2026
      </footer>
    </div>
  );
}
