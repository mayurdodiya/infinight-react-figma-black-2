import { useState } from "react";
import { Crown, Flame, House, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { img, type Story, type TabId, stories } from "./data";
import { Galaxy } from "./Galaxy";
import { HomeScreen } from "./screens/HomeScreen";
import { VenuesScreen } from "./screens/VenuesScreen";
import { PassScreen } from "./screens/PassScreen";
import { FeedScreen } from "./screens/FeedScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { StoryViewer } from "./StoryViewer";
import { Checkout } from "./Checkout";
import type { Plan } from "./screens/PassScreen";

export const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "venues", label: "Venues" },
  { id: "pass", label: "Club Pass" },
  { id: "feed", label: "Feed" },
  { id: "profile", label: "Profile" },
];

type Props = {
  tab?: TabId;
  onTabChange?: (t: TabId) => void;
  initialTab?: TabId;
  seed?: number;
};

export function NocturneApp({ tab: controlled, onTabChange, initialTab = "home", seed = 7 }: Props) {
  const [internal, setInternal] = useState<TabId>(initialTab);
  const tab = controlled ?? internal;
  const setTab = (t: TabId) => {
    setInternal(t);
    onTabChange?.(t);
  };
  const [openStory, setOpenStory] = useState<number | null>(null);
  const [checkout, setCheckout] = useState<Plan | null>(null);

  const openStoryBy = (s: Story) => setOpenStory(stories.findIndex((x) => x.id === s.id));

  return (
    <div className="absolute inset-0 bg-background font-sans text-foreground">
      <Galaxy density={45} seed={seed} />
      <div key={tab} className="no-scrollbar absolute inset-0 overflow-y-auto pb-32 pt-12 animate-screen-in">
        {tab === "home" && <HomeScreen onStory={openStoryBy} goTo={setTab} />}
        {tab === "venues" && <VenuesScreen />}
        {tab === "pass" && <PassScreen onSubscribe={setCheckout} />}
        {tab === "feed" && <FeedScreen onStory={openStoryBy} />}
        {tab === "profile" && <ProfileScreen />}
      </div>
      {/* bottom fade so content dissolves under the bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <TabBar tab={tab} setTab={setTab} />
      {checkout && <Checkout plan={checkout} onClose={() => setCheckout(null)} />}
      {openStory !== null && (
        <StoryViewer startIndex={openStory} onClose={() => setOpenStory(null)} />
      )}
    </div>
  );
}

function TabBar({ tab, setTab }: { tab: TabId; setTab: (t: TabId) => void }) {
  const Item = ({ id, icon: Icon, label }: { id: TabId; icon: typeof House; label: string }) => {
    const active = tab === id;
    return (
      <button
        onClick={() => setTab(id)}
        aria-label={label}
        className={cn(
          "flex h-12 items-center justify-center gap-2 rounded-full transition-all duration-500",
          active ? "bg-neon-gradient px-4 text-primary-foreground shadow-neon" : "w-12 text-muted-foreground hover:text-foreground",
        )}
      >
        <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.4 : 1.8} />
        {active && <span className="text-[13px] font-semibold">{label}</span>}
      </button>
    );
  };
  return (
    <nav className="absolute inset-x-4 bottom-6 z-30 flex items-center justify-between rounded-full glass-strong p-1.5 shadow-[0_20px_50px_-10px_oklch(0_0_0/0.8)]">
      <Item id="home" icon={House} label="Home" />
      <Item id="venues" icon={MapPin} label="Venues" />
      <button
        onClick={() => setTab("pass")}
        aria-label="Club Pass"
        className={cn(
          "relative -mt-9 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-gold-foreground shadow-gold ring-4 ring-background transition-transform duration-300",
          tab === "pass" ? "scale-110" : "hover:scale-105",
        )}
      >
        <span className="absolute inset-0 rounded-full bg-gold/60 blur-md animate-glow" aria-hidden />
        <Crown className="relative h-6 w-6" strokeWidth={2.2} />
      </button>
      <Item id="feed" icon={Flame} label="Feed" />
      <button
        onClick={() => setTab("profile")}
        aria-label="Profile"
        className={cn(
          "flex h-12 items-center gap-2 rounded-full transition-all duration-500",
          tab === "profile" ? "bg-neon-gradient pl-1.5 pr-4 text-primary-foreground shadow-neon" : "w-12 justify-center",
        )}
      >
        <img src={img.man} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-foreground/20" />
        {tab === "profile" && <span className="text-[13px] font-semibold">You</span>}
      </button>
    </nav>
  );
}
