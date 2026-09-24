import { useEffect, useState } from "react";
import { Bell, CalendarDays, ChevronDown, Clock, Crown, Gem, Heart, Info, MapPin, Pause, Search, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { djs, img, stories, venues, type Story, type TabId } from "../data";
import { Equalizer, LiveBadge } from "../Galaxy";
import { Chip, IconBtn, SectionTitle, StoryAvatar } from "../ui";

const genres = ["All", "Techno", "House", "Bollywood", "Hip-Hop", "Afro"];
const ticker = ["LIVE · DJ KYRA @ SKYBAR 42", "2.4K INTERESTED TONIGHT", "LADIES NIGHT · WED", "NEW · INFINIGHTX DIAMOND", "VELVET ROOM · JAZZ SUNDAYS"];

const banners = [
  { kicker: "THIS SATURDAY", title: "Neon Eclipse", sub: "DJ Kyra b2b Nova · Skybar 42", image: img.djHero },
  { kicker: "EVERY WEDNESDAY", title: "Ladies Night", sub: "Free entry + 2 cocktails · Aqua Deck", image: img.crowd },
  { kicker: "SUNDAYS", title: "Jazz & Champagne", sub: "Velvet Room, Colaba", image: img.lounge },
];

const events = [
  { day: "FRI", date: "26", title: "Red Room Techno", venue: "Club Cirrus", time: "11 PM", image: img.underground, genre: "Techno", hot: true },
  { day: "SAT", date: "27", title: "Neon Eclipse", venue: "Skybar 42", time: "10 PM", image: img.djHero, genre: "Melodic" },
  { day: "SUN", date: "28", title: "Sundowner Sessions", venue: "Aqua Deck", time: "5 PM", image: img.rooftop, genre: "Afro House" },
  { day: "WED", date: "01", title: "Bollywood Bash", venue: "Velvet Room", time: "9 PM", image: img.crowd, genre: "Bollywood" },
];

const highlights = [
  { title: "Happy Hours", sub: "Buy 2 get 1 · 7–10 PM", image: img.cocktail, tone: "text-cyan" },
  { title: "Rooftop Sundays", sub: "Pool deck open", image: img.rooftop, tone: "text-gold" },
  { title: "Members Mixer", sub: "Gold & above", image: img.lounge, tone: "text-neon" },
];

export function HomeScreen({ onStory, goTo }: { onStory: (s: Story) => void; goTo: (t: TabId) => void }) {
  const [genre, setGenre] = useState("All");
  const [slide, setSlide] = useState(0);
  const [fav, setFav] = useState<string[]>([]);

  useEffect(() => {
    const t = setInterval(() => setSlide((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative space-y-8 pt-3">
      <header className="flex items-center gap-3 px-5">
        <span className="relative flex h-12 w-12 items-center justify-center">
          <span className="absolute inset-0 rounded-full story-ring" />
          <img src={img.man} alt="" className="relative h-11 w-11 rounded-full object-cover ring-2 ring-background" />
        </span>
        <div className="flex-1">
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground">Tonight in <ChevronDown className="h-3 w-3" /></p>
          <p className="text-[15px] font-bold">Bandra, Mumbai</p>
        </div>
        <IconBtn label="Notifications" dot><Bell className="h-5 w-5" /></IconBtn>
      </header>

      <div className="px-5">
        <p className="mb-1 flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-px w-5 bg-muted-foreground" /> Good evening, Aarav
        </p>
        <h1 className="font-serif text-[40px] italic leading-[1.02]">
          Where does the night <span className="text-gradient-neon">take you?</span>
        </h1>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-3 rounded-full glass py-2 pl-5 pr-2">
          <Search className="h-4.5 w-4.5 text-muted-foreground" />
          <span className="flex-1 text-[13px] text-muted-foreground">Clubs, DJs, events…</span>
          <span className="flex items-center gap-1.5 rounded-full border border-silver/30 bg-foreground/5 px-3 py-1.5 text-[12px] font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-neon" /> Vibe AI
          </span>
        </div>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto px-5">
        {stories.map((s) => <StoryAvatar key={s.id} story={s} size={58} onClick={() => onStory(s)} />)}
      </div>

      {/* hero banner carousel */}
      <div className="px-5">
        <div className="relative h-[380px] overflow-hidden rounded-[30px] border border-glass-border">
          {banners.map((b, i) => (
            <div key={b.title} className={cn("absolute inset-0 transition-all duration-1000", i === slide ? "scale-100 opacity-100" : "scale-110 opacity-0")}>
              <img src={b.image} alt={b.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-fade" />
              <div className="absolute inset-x-5 bottom-12">
                <p className="font-display text-[10px] tracking-[0.25em] text-foreground/70">{b.kicker}</p>
                <h2 className="mt-1 font-display text-[32px] font-bold leading-none tracking-tight">{b.title}</h2>
                <p className="mt-1.5 font-serif text-[18px] italic text-foreground/85">{b.sub}</p>
              </div>
            </div>
          ))}
          <span className="absolute left-1/3 top-0 h-[140%] w-[2px] bg-gradient-to-b from-neon to-transparent opacity-60 animate-sweep" />
          <span className="absolute left-2/3 top-0 h-[140%] w-[2px] bg-gradient-to-b from-silver to-transparent opacity-50 animate-sweep" style={{ animationDelay: "-3s" }} />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            <span className="rounded-full glass px-3 py-1.5 font-display text-[9.5px] font-medium tracking-[0.2em]">FEATURED</span>
            <LiveBadge />
          </div>
          <div className="absolute inset-x-5 bottom-5 flex gap-1.5">
            {banners.map((b, i) => (
              <span key={b.title} className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/20">
                {i === slide && <span key={slide} className="block h-full bg-foreground animate-[progress_4s_linear_forwards] origin-left" />}
                {i < slide && <span className="block h-full bg-foreground" />}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-glass-border bg-glass py-2">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-[10.5px] font-medium tracking-[0.2em] text-foreground/80">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-8">{t} <span className="text-silver">✦</span></span>
          ))}
        </div>
      </div>

      {/* events */}
      <section>
        <SectionTitle title="Events" accent="this week" action="All" />
        <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto px-5">
          {genres.map((g) => <Chip key={g} active={genre === g} onClick={() => setGenre(g)}>{g}</Chip>)}
        </div>
        <div className="space-y-3 px-5">
          {events.map((e) => (
            <article key={e.title} className="flex items-center gap-3 rounded-[22px] glass p-2.5">
              <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[16px]">
                <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
                <div className="absolute bottom-1.5 left-2 leading-none">
                  <p className="font-display text-[8.5px] tracking-widest text-foreground/80">{e.day}</p>
                  <p className="font-display text-[20px] font-bold">{e.date}</p>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-silver">{e.genre}</span>
                  {e.hot && <span className="rounded-full bg-neon/20 px-1.5 py-0.5 text-[8.5px] font-bold text-neon">HOT</span>}
                </div>
                <p className="mt-0.5 truncate text-[15px] font-bold">{e.title}</p>
                <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>
                </p>
              </div>
              <button
                aria-label="Interested"
                onClick={() => setFav((f) => (f.includes(e.title) ? f.filter((x) => x !== e.title) : [...f, e.title]))}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass"
              >
                <Heart className={cn("h-4.5 w-4.5 transition-all", fav.includes(e.title) && "scale-110 fill-neon text-neon")} />
              </button>
            </article>
          ))}
          <p className="flex items-center justify-center gap-1.5 pt-1 text-[10.5px] text-muted-foreground">
            <Info className="h-3 w-3" /> Listings only — entry & tables handled by the venue
          </p>
        </div>
      </section>

      {/* membership highlight */}
      <div className="px-5">
        <button onClick={() => goTo("pass")} className="relative w-full overflow-hidden rounded-[28px] bg-graphite p-5 text-left ring-1 ring-silver/25">
          <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/25 blur-3xl" />
          <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/8 to-transparent animate-[shimmer_6s_linear_infinite]" style={{ backgroundSize: "200% 100%" }} />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="font-display text-[9.5px] tracking-[0.25em] text-gold">CLUB PASS</p>
              <p className="mt-1 font-display text-[21px] font-bold leading-tight">
                Live the night <span className="font-serif font-normal italic text-gradient-gold">like a member</span>
              </p>
              <p className="mt-1.5 text-[12px] text-muted-foreground">Priority entry, welcome drinks & members-only nights.</p>
            </div>
            <Crown className="h-8 w-8 shrink-0 text-gold animate-float" />
          </div>
          <div className="relative mt-4 flex gap-2">
            {[
              { n: "Silver", p: "₹999", c: "bg-silver-gradient text-background" },
              { n: "Gold", p: "₹2,499", c: "bg-gold-gradient text-gold-foreground" },
              { n: "Black", p: "₹7,999", c: "bg-void text-foreground ring-1 ring-silver/30" },
            ].map((t) => (
              <span key={t.n} className={cn("flex-1 rounded-2xl px-3 py-2.5", t.c)}>
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">{t.n}</span>
                <span className="font-display text-[14px] font-bold">{t.p}</span>
              </span>
            ))}
          </div>
          <span className="relative mt-4 flex h-11 items-center justify-center rounded-full bg-foreground text-[13px] font-bold text-background">View plans →</span>
        </button>
      </div>

      {/* featured venues */}
      <section>
        <SectionTitle title="Featured" accent="venues" action="View all" />
        <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-5">
          {venues.map((v) => (
            <button key={v.id} onClick={() => goTo("venues")} className="relative h-[240px] w-[180px] shrink-0 snap-start overflow-hidden rounded-[24px] border border-glass-border text-left">
              <img src={v.image} alt={v.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-fade" />
              <span className="absolute left-3 top-3 rounded-full glass px-2.5 py-1 font-display text-[8.5px] tracking-[0.18em]">{v.type.toUpperCase()}</span>
              <div className="absolute inset-x-3 bottom-3">
                <p className="font-serif text-[22px] italic leading-none">{v.name}</p>
                <p className="mt-1 truncate text-[10.5px] text-foreground/70">{v.tonight}</p>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-foreground/80">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" />{v.rating}</span>
                  <span>·</span><span>{v.area}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* offer highlights */}
      <section>
        <SectionTitle title="Tonight's" accent="highlights" />
        <div className="grid grid-cols-2 gap-2.5 px-5">
          {highlights.map((h, i) => (
            <div key={h.title} className={cn("relative overflow-hidden rounded-[22px] border border-glass-border", i === 0 ? "col-span-2 h-[130px]" : "h-[150px]")}>
              <img src={h.image} alt={h.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/50 to-transparent" />
              <div className="absolute bottom-3 left-3.5">
                <p className="font-serif text-[22px] italic leading-none">{h.title}</p>
                <p className={cn("mt-1 text-[11px] font-semibold", h.tone)}>{h.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* diamond teaser */}
      <div className="px-5">
        <button onClick={() => goTo("pass")} className="flex w-full items-center gap-3 rounded-[22px] bg-void p-4 text-left ring-1 ring-neon/40 shadow-neon">
          <Gem className="h-7 w-7 shrink-0 text-cyan" />
          <div className="flex-1">
            <p className="font-display text-[14px] font-bold">Infinight<span className="text-gradient-neon">X</span> Diamond</p>
            <p className="text-[11px] text-muted-foreground">Invite-only · 38 seats left in Mumbai</p>
          </div>
          <span className="text-[11px] font-bold text-neon">Apply →</span>
        </button>
      </div>

      {/* now spinning */}
      <div className="px-5">
        <div className="flex items-center gap-3 rounded-[24px] glass p-3">
          <span className="relative h-14 w-14 shrink-0">
            <span className="absolute inset-0 rounded-full bg-void ring-1 ring-glass-border animate-[spin_4s_linear_infinite]" style={{ backgroundImage: "repeating-radial-gradient(circle, transparent 0 3px, oklch(1 0 0 / 0.06) 3px 4px)" }} />
            <img src={img.djMale} alt="" className="absolute inset-[14px] rounded-full object-cover animate-[spin_4s_linear_infinite]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">Now spinning · Club Cirrus</p>
            <p className="truncate text-[14px] font-bold">Midnight Echoes</p>
            <p className="text-[12px] text-muted-foreground">Nova · Progressive house</p>
          </div>
          <Equalizer bars={6} className="h-6" />
          <button aria-label="Pause" className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
            <Pause className="h-4 w-4 fill-background" />
          </button>
        </div>
      </div>

      <section>
        <SectionTitle title="Top" accent="DJs" action="See all" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5">
          {djs.map((d) => (
            <div key={d.name} className="flex w-[76px] shrink-0 flex-col items-center text-center">
              <span className="relative flex h-[76px] w-[76px] items-center justify-center">
                <span className="absolute inset-0 rounded-full story-ring opacity-80" />
                <img src={d.image} alt={d.name} className="relative h-[70px] w-[70px] rounded-full object-cover ring-2 ring-background" />
              </span>
              <p className="mt-2 text-[12.5px] font-bold">{d.name}</p>
              <p className="text-[10px] text-muted-foreground">{d.genre}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="flex items-center justify-center gap-1.5 px-5 text-[10.5px] text-muted-foreground">
        <CalendarDays className="h-3 w-3" /> New events added every Thursday
      </p>
    </div>
  );
}
