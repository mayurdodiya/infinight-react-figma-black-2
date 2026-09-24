import { useState } from "react";
import { BadgeCheck, Bookmark, Heart, MapPin, MessageCircle, MoreHorizontal, Plus, Send, SquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { img, posts, stories, type Story } from "../data";
import { IconBtn, StoryAvatar } from "../ui";

export function FeedScreen({ onStory }: { onStory: (s: Story) => void }) {
  return (
    <div className="relative space-y-5 pt-3">
      <header className="flex items-center justify-between px-5">
        <h1 className="font-display text-[24px] font-bold tracking-tight">
          Night<span className="text-gradient-neon">feed</span>
        </h1>
        <div className="flex gap-2">
          <IconBtn label="New post">
            <SquarePlus className="h-5 w-5" />
          </IconBtn>
          <IconBtn label="Activity" dot>
            <Heart className="h-5 w-5" />
          </IconBtn>
          <IconBtn label="Messages">
            <Send className="h-5 w-5" />
          </IconBtn>
        </div>
      </header>

      {/* stories */}
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-5">
        <button className="flex shrink-0 flex-col items-center gap-1.5">
          <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed border-glass-border">
            <img src={img.man} alt="" className="h-16 w-16 rounded-full object-cover opacity-80" />
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-neon-gradient ring-2 ring-background">
              <Plus className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </span>
          <span className="text-[11px] text-foreground/80">Your story</span>
        </button>
        {stories.map((s) => (
          <StoryAvatar key={s.id} story={s} onClick={() => onStory(s)} />
        ))}
      </div>

      {/* check-in */}
      <div className="mx-5 flex items-center gap-3 rounded-[22px] glass p-3">
        <div className="flex">
          {[img.woman, img.man, img.djMale].map((a, i) => (
            <img key={i} src={a} alt="" className="-ml-2.5 h-9 w-9 rounded-full object-cover ring-2 ring-background first:ml-0" />
          ))}
        </div>
        <p className="flex-1 text-[12px] leading-snug">
          <b>riya.m</b> and 4 friends checked in at <b className="text-cyan">Club Cirrus</b>
        </p>
        <button className="rounded-full bg-foreground px-3 py-1.5 text-[11px] font-bold text-background">Join</button>
      </div>

      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}

function Post({ post }: { post: (typeof posts)[number] }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState(0);

  const like = () => {
    setLiked(true);
    setBurst((b) => b + 1);
  };

  return (
    <article className="space-y-3">
      <div className="flex items-center gap-3 px-5">
        <span className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute inset-0 rounded-full story-ring" />
          <img src={post.avatar} alt="" className="relative h-9 w-9 rounded-full object-cover ring-2 ring-background" />
        </span>
        <div className="flex-1">
          <p className="flex items-center gap-1 text-[13px] font-bold">
            {post.user} {post.verified && <BadgeCheck className="h-4 w-4 fill-cyan text-background" />}
          </p>
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3" /> {post.place}
          </p>
        </div>
        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="px-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-glass-border" onDoubleClick={like}>
          <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          {post.slides > 1 && (
            <span className="absolute right-3 top-3 rounded-full bg-void/60 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md">1/{post.slides}</span>
          )}
          {burst > 0 && (
            <Heart key={burst} className="absolute left-1/2 top-1/2 -ml-12 -mt-12 h-24 w-24 fill-neon text-neon drop-shadow-[0_0_30px_oklch(0.68_0.27_345)] animate-heart-pop" />
          )}
          <span className="absolute bottom-3 left-3 rounded-full glass px-3 py-1 text-[10.5px] font-medium">Double-tap to like</span>
        </div>
        {post.slides > 1 && (
          <div className="mt-2 flex justify-center gap-1">
            {Array.from({ length: post.slides }).map((_, i) => (
              <span key={i} className={cn("h-1.5 rounded-full", i === 0 ? "w-4 bg-neon" : "w-1.5 bg-foreground/30")} />
            ))}
          </div>
        )}
      </div>

      <div className="px-5">
        <div className="flex items-center gap-4">
          <button onClick={() => (liked ? setLiked(false) : like())} aria-label="Like" className="flex items-center gap-1.5 text-[13px] font-semibold">
            <Heart className={cn("h-6 w-6 transition-transform duration-300", liked && "scale-110 fill-neon text-neon")} />
            {(post.likes + (liked ? 1 : 0)).toLocaleString("en-US")}
          </button>
          <span className="flex items-center gap-1.5 text-[13px] font-semibold">
            <MessageCircle className="h-6 w-6" /> {post.comments}
          </span>
          <Send className="h-6 w-6" />
          <button onClick={() => setSaved((s) => !s)} aria-label="Save" className="ml-auto">
            <Bookmark className={cn("h-6 w-6", saved && "fill-gold text-gold")} />
          </button>
        </div>
        <p className="mt-2 text-[13px] leading-snug">
          <b>{post.user}</b> <span className="text-foreground/85">{post.caption}</span>
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">View all {post.comments} comments · {post.time} ago</p>
      </div>
    </article>
  );
}
