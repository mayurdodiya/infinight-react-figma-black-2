import { useState } from "react";
import { ArrowLeft, Building, Check, CreditCard, Lock, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Plan } from "./screens/PassScreen";

const methods = [
  { id: "upi", label: "UPI", sub: "GPay, PhonePe, Paytm", icon: Smartphone },
  { id: "card", label: "Credit / Debit card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "nb", label: "Net banking", sub: "All major banks", icon: Building },
  { id: "wallet", label: "Wallets", sub: "Amazon Pay, Mobikwik", icon: Wallet },
];

export function Checkout({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [method, setMethod] = useState("upi");
  const [cycle, setCycle] = useState<"month" | "year">("month");
  const [stage, setStage] = useState<"form" | "paying" | "done">("form");
  const base = cycle === "year" ? Math.round(plan.price * 10) : plan.price;
  const gst = Math.round(base * 0.18);
  const total = base + gst;
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const pay = () => {
    setStage("paying");
    setTimeout(() => setStage("done"), 1600);
  };

  return (
    <div className="absolute inset-0 z-40 bg-background animate-screen-in">
      <div className="no-scrollbar absolute inset-0 overflow-y-auto px-5 pb-10 pt-14">
        <header className="flex items-center gap-3">
          <button onClick={onClose} aria-label="Back" className="flex h-10 w-10 items-center justify-center rounded-full glass"><ArrowLeft className="h-4.5 w-4.5" /></button>
          <p className="font-display text-[16px] font-bold">Checkout</p>
          <span className="ml-auto flex items-center gap-1 text-[10.5px] text-muted-foreground"><Lock className="h-3 w-3" /> Secure</span>
        </header>

        {stage === "done" ? (
          <div className="mt-20 flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-neon-gradient shadow-neon animate-float"><Check className="h-10 w-10 text-primary-foreground" /></span>
            <p className="mt-6 font-display text-[22px] font-bold">Welcome to {plan.name}</p>
            <p className="mt-2 max-w-[260px] font-serif text-[18px] italic text-foreground/75">Your digital pass is live. See you on the dance floor.</p>
            <p className="mt-3 text-[11px] text-muted-foreground">Payment ID pay_Demo8XkQ2 · {inr(total)}</p>
            <button onClick={onClose} className="mt-8 h-12 w-full rounded-full bg-foreground text-[13px] font-bold text-background">Back to Club Pass</button>
          </div>
        ) : (
          <>
            <div className="mt-6 rounded-[24px] bg-graphite p-5 ring-1 ring-silver/20">
              <p className="font-display text-[9.5px] tracking-[0.25em] text-silver">YOUR PLAN</p>
              <p className="mt-1 font-display text-[20px] font-bold">{plan.name}</p>
              <div className="mt-4 flex rounded-full bg-foreground/5 p-1">
                {(["month", "year"] as const).map((c) => (
                  <button key={c} onClick={() => setCycle(c)} className={cn("flex-1 rounded-full py-2 text-[12px] font-bold transition-all", cycle === c ? "bg-foreground text-background" : "text-foreground/70")}>
                    {c === "month" ? "Monthly" : "Yearly · 2 months free"}
                  </button>
                ))}
              </div>
            </div>

            <p className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pay with</p>
            <div className="space-y-2">
              {methods.map((m) => (
                <button key={m.id} onClick={() => setMethod(m.id)} className={cn("flex w-full items-center gap-3 rounded-2xl p-3.5 text-left transition-all", method === m.id ? "glass-strong ring-1 ring-neon/60" : "glass")}>
                  <m.icon className="h-5 w-5 text-silver" />
                  <div className="flex-1">
                    <p className="text-[13px] font-bold">{m.label}</p>
                    <p className="text-[11px] text-muted-foreground">{m.sub}</p>
                  </div>
                  <span className={cn("h-4.5 w-4.5 rounded-full border-2", method === m.id ? "border-neon bg-neon" : "border-glass-border")} />
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-2 rounded-2xl glass p-4 text-[12.5px]">
              <Row a={`${plan.name} (${cycle === "month" ? "1 month" : "12 months"})`} b={inr(base)} />
              <Row a="GST 18%" b={inr(gst)} />
              <div className="my-1 h-px bg-glass-border" />
              <Row a="Total" b={inr(total)} bold />
            </div>

            <button onClick={pay} disabled={stage === "paying"} className="mt-6 h-14 w-full rounded-full bg-gold-gradient font-display text-[14px] font-bold text-gold-foreground shadow-gold animate-[shimmer_5s_linear_infinite]">
              {stage === "paying" ? "Opening Razorpay…" : `Pay ${inr(total)}`}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" /> Payments secured by Razorpay · demo only</p>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ a, b, bold }: { a: string; b: string; bold?: boolean }) {
  return (
    <div className={cn("flex justify-between", bold ? "text-[14px] font-bold" : "text-muted-foreground")}>
      <span>{a}</span>
      <span className={bold ? "" : "text-foreground"}>{b}</span>
    </div>
  );
}
