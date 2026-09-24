import djHero from "@/assets/dj-hero.jpg";
import djMale from "@/assets/dj-male.jpg";
import rooftop from "@/assets/venue-rooftop.jpg";
import underground from "@/assets/venue-underground.jpg";
import lounge from "@/assets/venue-lounge.jpg";
import crowd from "@/assets/crowd.jpg";
import cocktail from "@/assets/cocktail.jpg";
import woman from "@/assets/portrait-woman.jpg";
import man from "@/assets/portrait-man.jpg";

export const img = { djHero, djMale, rooftop, underground, lounge, crowd, cocktail, woman, man };

export type TabId = "home" | "venues" | "pass" | "feed" | "profile";

export type Story = {
  id: string;
  name: string;
  avatar: string;
  image: string;
  caption: string;
  live?: boolean;
  time: string;
};

export const stories: Story[] = [
  { id: "s1", name: "kyra.dj", avatar: djHero, image: djHero, caption: "Warming up the decks 🔊 Skybar tonight", live: true, time: "now" },
  { id: "s2", name: "riya.m", avatar: woman, image: crowd, caption: "Confetti o'clock ✨", time: "12m" },
  { id: "s3", name: "skybar", avatar: rooftop, image: rooftop, caption: "Pool deck is OPEN 🌊", time: "34m" },
  { id: "s4", name: "nova", avatar: djMale, image: djMale, caption: "Main stage, 1 AM. Don't be late.", time: "1h" },
  { id: "s5", name: "cirrus", avatar: underground, image: underground, caption: "Red room is full 🔴", time: "2h" },
  { id: "s6", name: "velvet", avatar: lounge, image: lounge, caption: "Champagne hour 🥂", time: "3h" },
];

export type Venue = {
  id: string;
  name: string;
  area: string;
  km: string;
  rating: number;
  image: string;
  type: "Rooftop" | "Lounge" | "Underground" | "Pool";
  crowd: number;
  price: string;
  closes: string;
  tag: string;
  tonight: string;
};

export const venues: Venue[] = [
  { id: "v1", name: "Skybar 42", area: "Lower Parel", km: "1.2 km", rating: 4.9, image: rooftop, type: "Rooftop", crowd: 82, price: "₹4,500 for 2", closes: "Till 3 AM", tag: "Guest list open", tonight: "Neon Eclipse · DJ Kyra" },
  { id: "v2", name: "Club Cirrus", area: "Bandra West", km: "2.8 km", rating: 4.7, image: underground, type: "Underground", crowd: 94, price: "₹3,000 for 2", closes: "Till 5 AM", tag: "Almost full", tonight: "Red Room Techno" },
  { id: "v3", name: "Velvet Room", area: "Colaba", km: "6.1 km", rating: 4.8, image: lounge, type: "Lounge", crowd: 46, price: "₹6,000 for 2", closes: "Till 2 AM", tag: "Members only", tonight: "Jazz & Champagne" },
  { id: "v4", name: "Aqua Deck", area: "Juhu", km: "4.4 km", rating: 4.6, image: crowd, type: "Pool", crowd: 71, price: "₹3,800 for 2", closes: "Till 4 AM", tag: "Ladies free till 11", tonight: "Foam & Afro House" },
];

export const djs = [
  { name: "Kyra", genre: "Melodic Techno", image: djHero },
  { name: "Nova", genre: "Progressive", image: djMale },
  { name: "Riya", genre: "Bollywood", image: woman },
  { name: "Arjun", genre: "Hip-Hop", image: man },
  { name: "Velvet", genre: "Deep House", image: lounge },
];

export const posts = [
  {
    id: "p1",
    user: "kyra.dj",
    avatar: djHero,
    verified: true,
    place: "Skybar 42, Mumbai",
    image: djHero,
    likes: 2318,
    comments: 184,
    caption: "Last night was pure magic 💜 Thank you Mumbai for 4 hours of lasers & love.",
    time: "2h",
    slides: 4,
  },
  {
    id: "p2",
    user: "riya.m",
    avatar: woman,
    verified: false,
    place: "Aqua Deck, Juhu",
    image: crowd,
    likes: 864,
    comments: 52,
    caption: "When the drop hits and the confetti drops too 🎉 #FridayNight",
    time: "5h",
    slides: 1,
  },
  {
    id: "p3",
    user: "velvet.room",
    avatar: lounge,
    verified: true,
    place: "Velvet Room, Colaba",
    image: cocktail,
    likes: 1402,
    comments: 97,
    caption: "Introducing ‘Midnight Spark’ — our new signature. Members get the first one on us ✨",
    time: "8h",
    slides: 2,
  },
];

export const profileGrid = [
  { image: crowd, reel: false, views: "" },
  { image: rooftop, reel: true, views: "48.2K" },
  { image: cocktail, reel: false, views: "" },
  { image: djHero, reel: true, views: "112K" },
  { image: lounge, reel: false, views: "" },
  { image: underground, reel: true, views: "23.9K" },
  { image: djMale, reel: false, views: "" },
  { image: woman, reel: true, views: "9.4K" },
  { image: crowd, reel: false, views: "" },
];

/** Deterministic pseudo-random so SSR and client render the same stars. */
export function makeStars(count: number, seed = 7) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 1.8 + 0.6,
    delay: rand() * 4,
    duration: 2 + rand() * 4,
  }));
}
