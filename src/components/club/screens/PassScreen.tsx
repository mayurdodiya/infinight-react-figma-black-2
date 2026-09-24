import { useState } from "react";
import { Briefcase, Building2, Car, Check, Crown, Diamond, Gem, Gift, GlassWater, Handshake, HeartHandshake, KeyRound, Music2, PartyPopper, Plane, Receipt, Sparkles, Star, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { img } from "../data";

export type Plan = { id: string; name: string; price: number; period: string; perks: string[] };

export const plans: (Plan & { icon: typeof Zap; style: string; text: string; badge?: string })[] = [
  { id: "silver", name: "Silver", price: 999, period: "month", icon: Zap, perks: ["Skip the line at 20+ clubs", "10% off at partner venues", "Community events access"], style: "bg-silver-gradient", text: "text-background" },
  { id: "gold", name: "Gold", price: 2499, period: "month", icon: Crown, badge: "Most loved", perks: ["Free entry + 1 guest", "25% off bottles", "Members-only nights"], style: "bg-gold-gradient animate-[shimmer_6s_linear_infinite]", text: "text-gold-foreground" },
  { id: "black", name: "Black Card", price: 7999, period: "month", icon: Gem, perks: ["Unlimited VIP entry", "Personal concierge 24/7", "Backstage & DJ meets"], style: "bg-graphite border border-silver/30", text: "text-foreground" },
];

const benefits = [
  { icon: KeyRound, title: "Priority entry", sub: "Skip queues at 40+ venues" },
  { icon: GlassWater, title: "Welcome drinks", sub: "On the house, every visit" },
  { icon: Gift, title: "Birthday night", sub: "Free entry + cake for 6" },
  { icon: Receipt, title: "Member pricing", sub: "Up to 25% off bills" },
  { icon: Music2, title: "Early access", sub: "First to know headliners" },
  { icon: Star, title: "Member points", sub: "Earn on every night out" },
];

const community = [
  { icon: Users, title: "Members-only socials", sub: "Monthly mixers & rooftop brunches" },
  { icon: HeartHandshake, title: "Curated crew", sub: "Meet verified members with your vibe" },
  { icon: PartyPopper, title: "Private listening parties", sub: "Album drops with resident DJs" },
];

const corporate = [
  { icon: Building2, title: "Team memberships", sub: "One bill for 10 to 500 seats" },
  { icon: Briefcase, title: "Client hosting", sub: "Dedicated host at partner lounges" },
  { icon: Handshake, title: "Offsites & launches", sub: "Private buyouts on request" },
];

const diamond = [
  { icon: Plane, title: "Global access", sub: "Partner clubs in Dubai, Goa, Bali" },
  { icon: Car, title: "Chauffeur drop", sub: "Safe ride home after 1 AM" },
  { icon: Sparkles, title: "Invite-only drops", sub: "Secret sets, sealed locations" },
  { icon: Crown, title: "Personal concierge", sub: "One number, any night, any city" },
];

const segs = ["Plans", "Benefits", "Corporate", "Diamond"] as const;

export function PassScreen({ onSubscribe }: { onSubscribe?: (p: Plan) => void }) {
  const [tier, setTier] = useState("gold");
  const [seg, setSeg] = useState<(typeof segs)[number]>("Plans");
  const selected = plans.find((t) => t.id === tier)!;

  return (
    <div className="relative space-y-8 pt-3">
      <header className="px-5 text-center">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-silver">Infinight</p>
        <h1 className="mt-1 font-display text-[30px] font-bold leading-none tracking-tight">
          Club <span className="text-gradient-gold">Pass</span>
        </h1>
        <p className="mx-auto mt-2 max-w-[270px] font-serif text-[18px] italic leading-snug text-foreground/75">
          Become part of the city's most exclusive night community.
        </p>
      </header>

      <div className="sticky top-0 z-10 px-5">
        <div className="flex rounded-full glass-strong p-1">
          {segs.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSeg(s);
                document.getElementById(`pass-${s}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn("flex-1 rounded-full py-2.5 text-[11.5px] font-bold transition-all duration-300", seg === s ? "bg-foreground text-background" : "text-foreground/70")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* plans */}
      <section id="pass-Plans" className="scroll-mt-16 space-y-4">
        <Title a="Subscription" b="plans" />
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
          {plans.map((t) => {
            const Icon = t.icon;
            const active = tier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                className={cn("relative h-[230px] w-[240px] shrink-0 snap-center overflow-hidden rounded-[28px] p-5 text-left transition-all duration-500", t.style, t.text, active ? "scale-100 opacity-100" : "scale-[0.94] opacity-65")}
                style={t.id !== "black" ? { backgroundSize: "200% 100%" } : undefined}
              >
                {t.id === "black" && <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon/25 blur-3xl" />}
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7" />
                    {t.badge && <span className="rounded-full bg-background/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground">{t.badge}</span>}
                    {active && !t.badge && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neon text-primary-foreground"><Check className="h-3.5 w-3.5" /></span>
                    )}
                  </div>
                  <p className="mt-4 font-display text-[20px] font-bold tracking-tight">{t.name}</p>
                  <p className="text-[13px] opacity-80"><span className="font-display text-[22px] font-bold">₹{t.price.toLocaleString("en-IN")}</span> / {t.period}</p>
                  <ul className="mt-auto space-y-1.5 text-[11.5px] font-medium">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2"><Diamond className="h-2.5 w-2.5 shrink-0 fill-current" /> {p}</li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
        <div className="px-5">
          <button onClick={() => onSubscribe?.(selected)} className="relative h-14 w-full overflow-hidden rounded-full bg-gold-gradient font-display text-[14px] font-bold text-gold-foreground shadow-gold animate-[shimmer_5s_linear_infinite]">
            Subscribe to {selected.name} →
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">Secure payment via Razorpay · Cancel anytime</p>
        </div>
      </section>

      {/* benefits */}
      <section id="pass-Benefits" className="scroll-mt-16 space-y-4">
        <Title a="Membership" b="benefits" />
        <div className="grid grid-cols-2 gap-2.5 px-5">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-[20px] glass p-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-silver"><b.icon className="h-4.5 w-4.5" /></span>
              <p className="mt-2.5 text-[13px] font-bold">{b.title}</p>
              <p className="text-[11px] leading-snug text-muted-foreground">{b.sub}</p>
            </div>
          ))}
        </div>

        <div className="px-5">
          <div className="relative overflow-hidden rounded-[26px] border border-glass-border">
            <img src={img.crowd} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/30" />
            <div className="relative p-5">
              <p className="font-display text-[9.5px] tracking-[0.25em] text-cyan">BEING PART OF THE COMMUNITY</p>
              <p className="mt-1 font-serif text-[28px] italic leading-none">More than a night out.</p>
              <div className="mt-4 space-y-3">
                {community.map((c) => (
                  <div key={c.title} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full glass"><c.icon className="h-4 w-4 text-neon" /></span>
                    <div>
                      <p className="text-[13px] font-bold">{c.title}</p>
                      <p className="text-[11px] text-muted-foreground">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex">
                  {[img.woman, img.man, img.djMale, img.djHero].map((a, i) => (
                    <img key={i} src={a} alt="" className="-ml-2 h-7 w-7 rounded-full object-cover ring-2 ring-void first:ml-0" />
                  ))}
                </div>
                <span className="text-[11.5px] font-semibold">12,400+ members in Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* corporate */}
      <section id="pass-Corporate" className="scroll-mt-16 space-y-4 px-5">
        <div className="rounded-[26px] bg-graphite p-5 ring-1 ring-silver/20">
          <div className="flex items-center justify-between">
            <p className="font-display text-[9.5px] tracking-[0.25em] text-silver">INFINIGHT CORPORATE</p>
            <Building2 className="h-5 w-5 text-silver" />
          </div>
          <p className="mt-1 font-display text-[20px] font-bold leading-tight">Celebrate wins <span className="font-serif font-normal italic text-gradient-silver">together</span></p>
          <div className="mt-4 space-y-2.5">
            {corporate.map((c) => (
              <div key={c.title} className="flex items-center gap-3 rounded-2xl bg-foreground/5 p-3">
                <c.icon className="h-5 w-5 shrink-0 text-silver" />
                <div className="flex-1">
                  <p className="text-[13px] font-bold">{c.title}</p>
                  <p className="text-[11px] text-muted-foreground">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-[11px] text-muted-foreground">From <span className="font-display text-[16px] font-bold text-foreground">₹1,799</span> / seat</p>
            <button onClick={() => onSubscribe?.({ id: "corp", name: "Corporate · 10 seats", price: 17990, period: "month", perks: [] })} className="rounded-full bg-silver-gradient px-4 py-2.5 text-[12px] font-bold text-background">Get for team</button>
          </div>
        </div>
      </section>

      {/* diamond */}
      <section id="pass-Diamond" className="scroll-mt-16 px-5">
        <div className="relative overflow-hidden rounded-[28px] bg-void p-5 ring-1 ring-neon/40 shadow-neon">
          <span className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-neon/30 blur-3xl" />
          <span className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-cyan/20 blur-3xl" />
          <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/10 to-transparent animate-[shimmer_5s_linear_infinite]" style={{ backgroundSize: "200% 100%" }} />
          <div className="relative">
            <div className="flex items-center gap-2">
              <Gem className="h-6 w-6 text-cyan" />
              <p className="font-display text-[18px] font-bold">Infinight<span className="text-gradient-neon">X</span></p>
            </div>
            <p className="mt-1 font-serif text-[22px] italic leading-tight text-foreground/90">Diamond members · by invitation</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {diamond.map((d) => (
                <div key={d.title} className="rounded-2xl glass p-3">
                  <d.icon className="h-4.5 w-4.5 text-cyan" />
                  <p className="mt-2 text-[12px] font-bold">{d.title}</p>
                  <p className="text-[10.5px] leading-snug text-muted-foreground">{d.sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground">Only 250 seats per city · 38 left</p>
            <button onClick={() => onSubscribe?.({ id: "diamond", name: "InfinightX Diamond", price: 24999, period: "month", perks: [] })} className="mt-3 h-12 w-full rounded-full bg-neon-gradient text-[13px] font-bold text-primary-foreground shadow-neon">
              Request Diamond access · ₹24,999
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Title({ a, b }: { a: string; b: string }) {
  return (
    <h3 className="px-5 font-display text-[17px] font-semibold">
      {a} <span className="font-serif text-[22px] font-normal italic text-gradient-neon">{b}</span>
    </h3>
  );
}
