import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Phone mockup rendered at a native 390x844 and scaled with the CSS var --s.
 * Set the scale via className, e.g. "[--s:0.8] md:[--s:1]".
 */
export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("relative shrink-0 [--s:1]", className)}
      style={{ width: "calc(390px * var(--s))", height: "calc(844px * var(--s))" }}
    >
      <div
        className="absolute left-0 top-0 h-[844px] w-[390px] origin-top-left"
        style={{ transform: "scale(var(--s))" }}
      >
        {/* glow behind device */}
        <div className="absolute inset-8 rounded-[60px] bg-neon/30 blur-[60px]" aria-hidden />
        <div className="relative h-full w-full rounded-[58px] bg-gradient-to-b from-muted-foreground/40 via-secondary to-muted-foreground/30 p-[3px] shadow-neon">
          <div className="h-full w-full rounded-[55px] bg-void p-[9px]">
            <div className="relative h-full w-full overflow-hidden rounded-[46px] bg-background">
              {/* status bar */}
              <div className="absolute inset-x-0 top-0 z-40 flex h-12 items-center justify-between px-8 text-[14px] font-semibold text-foreground">
                <span>9:41</span>
                <span className="absolute left-1/2 top-2.5 h-[30px] w-[108px] -translate-x-1/2 rounded-full bg-void" />
                <span className="flex items-center gap-1.5">
                  <Signal className="h-3.5 w-3.5" />
                  <Wifi className="h-3.5 w-3.5" />
                  <BatteryFull className="h-4 w-4" />
                </span>
              </div>
              {children}
              {/* home indicator */}
              <div className="absolute bottom-2 left-1/2 z-50 h-[5px] w-32 -translate-x-1/2 rounded-full bg-foreground/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
