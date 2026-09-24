import { useState } from "react";
import { Heart, Send, X } from "lucide-react";
import { stories } from "./data";
import { LiveBadge } from "./Galaxy";

export function StoryViewer({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [i, setI] = useState(Math.max(0, startIndex));
  const [liked, setLiked] = useState(false);
  const s = stories[i] ?? stories[0]!;

  const next = () => {
    setLiked(false);
    if (i < stories.length - 1) setI(i + 1);
    else onClose();
  };
  const prev = () => {
    setLiked(false);
    if (i > 0) setI(i - 1);
  };

  return (
    <div className="absolute inset-0 z-[60] bg-void animate-scale-in">
      <img key={s.id} src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover animate-fade-in" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-transparent to-void/90" />

      {/* progress */}
      <div className="absolute inset-x-3 top-12 z-10 flex gap-1">
        {stories.map((st, idx) => (
          <div key={st.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-foreground/25">
            {idx < i && <div className="h-full w-full bg-foreground" />}
            {idx === i && (
              <div key={s.id} className="h-full w-full bg-foreground animate-story-progress" onAnimationEnd={next} />
            )}
          </div>
        ))}
      </div>

      {/* header */}
      <div className="absolute inset-x-4 top-[4.5rem] z-10 flex items-center gap-3">
        <img src={s.avatar} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-neon" />
        <div className="flex-1">
          <p className="text-[13px] font-semibold">{s.name}</p>
          <p className="text-[11px] text-foreground/70">{s.time}</p>
        </div>
        {s.live && <LiveBadge />}
        <button onClick={onClose} aria-label="Close story" className="flex h-9 w-9 items-center justify-center rounded-full glass">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* tap zones */}
      <button aria-label="Previous" onClick={prev} className="absolute left-0 top-24 bottom-28 w-1/3" />
      <button aria-label="Next" onClick={next} className="absolute right-0 top-24 bottom-28 w-2/3" />

      <p className="absolute inset-x-6 bottom-32 z-10 font-serif text-3xl italic leading-tight">{s.caption}</p>

      <div className="absolute inset-x-4 bottom-10 z-10 flex items-center gap-2">
        <div className="flex h-12 flex-1 items-center rounded-full glass px-5 text-[13px] text-foreground/70">
          Reply to {s.name}…
        </div>
        <button
          onClick={() => setLiked((v) => !v)}
          aria-label="Like story"
          className="flex h-12 w-12 items-center justify-center rounded-full glass"
        >
          <Heart className={liked ? "h-5 w-5 fill-neon text-neon" : "h-5 w-5"} />
        </button>
        <button aria-label="Share story" className="flex h-12 w-12 items-center justify-center rounded-full glass">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
