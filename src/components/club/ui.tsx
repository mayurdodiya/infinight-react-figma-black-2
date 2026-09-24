import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Story } from "./data";

export function SectionTitle({ title, accent, action }: { title: string; accent?: string; action?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between px-5">
      <h3 className="font-display text-[17px] font-semibold tracking-tight">
        {title} {accent && <span className="font-serif text-[22px] font-normal italic text-gradient-neon">{accent}</span>}
      </h3>
      {action && <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{action} →</span>}
    </div>
  );
}

export function IconBtn({ children, label, dot, className }: { children: ReactNode; label: string; dot?: boolean; className?: string }) {
  return (
    <button aria-label={label} className={cn("relative flex h-11 w-11 items-center justify-center rounded-full glass", className)}>
      {children}
      {dot && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-neon shadow-neon animate-glow" />}
    </button>
  );
}

export function Chip({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all duration-300",
        active ? "bg-neon-gradient text-primary-foreground shadow-neon" : "glass text-foreground/80 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function StoryAvatar({ story, size = 64, onClick }: { story: Story; size?: number; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex shrink-0 flex-col items-center gap-1.5">
      <span className="relative flex items-center justify-center" style={{ width: size + 8, height: size + 8 }}>
        <span className="absolute inset-0 rounded-full story-ring" />
        <span className="absolute inset-[2.5px] rounded-full bg-background" />
        <img src={story.avatar} alt="" className="relative rounded-full object-cover" style={{ width: size, height: size }} />
        {story.live && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-md bg-live px-1.5 py-[1px] text-[8.5px] font-bold tracking-wider text-primary-foreground ring-2 ring-background">
            LIVE
          </span>
        )}
      </span>
      <span className="max-w-[72px] truncate text-[11px] text-foreground/80">{story.name}</span>
    </button>
  );
}
