export interface Game {
  id: number;
  title: string;
  genre: string;
  rating: number;
  players: string;
  localMultiplayer: boolean;
  maxControllers: number;
  cover: string;
  tags: string[];
  size: string;
  installed: boolean;
  featured?: boolean;
  developer: string;
  description: string;
  progress?: number;
}

const HERO_IMG = "https://cdn.ezst.app/projects/ed2d0dcd-dc5d-4332-a1ad-74b1f60171ff/files/98132b11-37bd-42ba-8c55-242a4a6f0269.jpg";
const CARD_IMG = "https://cdn.ezst.app/projects/ed2d0dcd-dc5d-4332-a1ad-74b1f60171ff/files/5e4075a4-2a90-400e-b076-74de257623ca.jpg";

export const games: Game[] = [
  {
    id: 1,
    title: "NEON DRIFT",
    genre: "Racing",
    rating: 4.8,
    players: "1–4",
    localMultiplayer: true,
    maxControllers: 4,
    cover: CARD_IMG,
    tags: ["Racing", "Arcade", "Co-op"],
    size: "4.2 GB",
    installed: true,
    featured: true,
    developer: "CyberWheels Studio",
    description: "Blazing neon-lit city races with real-time controller detection for up to 4 local players. Drift your way to the top.",
    progress: 67,
  },
  {
    id: 2,
    title: "VOID PROTOCOL",
    genre: "Action",
    rating: 4.6,
    players: "1–2",
    localMultiplayer: true,
    maxControllers: 2,
    cover: HERO_IMG,
    tags: ["Shooter", "Sci-Fi", "Co-op"],
    size: "8.7 GB",
    installed: true,
    developer: "Dark Matter Games",
    description: "Co-op shooter set in a collapsing space station. Coordinate with your partner using split-screen local multiplayer.",
    progress: 23,
  },
  {
    id: 3,
    title: "CRYSTAL SIEGE",
    genre: "Strategy",
    rating: 4.4,
    players: "1–4",
    localMultiplayer: true,
    maxControllers: 4,
    cover: CARD_IMG,
    tags: ["Strategy", "Tower Defense", "Multiplayer"],
    size: "2.1 GB",
    installed: false,
    developer: "Prism Forge",
    description: "Real-time tower defense with asymmetric roles. Each player controls a unique faction on a shared screen.",
  },
  {
    id: 4,
    title: "SHADOWFIST",
    genre: "Fighting",
    rating: 4.9,
    players: "1–4",
    localMultiplayer: true,
    maxControllers: 4,
    cover: HERO_IMG,
    tags: ["Fighting", "Arcade", "Versus"],
    size: "5.5 GB",
    installed: false,
    developer: "Iron Knuckle Labs",
    description: "Hyper-stylized fighting game with 20 characters. Full local tournament bracket for up to 4 players.",
  },
  {
    id: 5,
    title: "ORBITAL RUN",
    genre: "Platformer",
    rating: 4.3,
    players: "1",
    localMultiplayer: false,
    maxControllers: 1,
    cover: CARD_IMG,
    tags: ["Platformer", "Indie", "Speedrun"],
    size: "1.4 GB",
    installed: true,
    developer: "Pixel Rocket",
    description: "Precision platformer where gravity shifts with every jump. Leaderboards, secrets, and relentless challenges await.",
    progress: 88,
  },
  {
    id: 6,
    title: "PULSE ARENA",
    genre: "Sports",
    rating: 4.5,
    players: "1–8",
    localMultiplayer: true,
    maxControllers: 8,
    cover: HERO_IMG,
    tags: ["Sports", "Party", "Multiplayer"],
    size: "3.8 GB",
    installed: false,
    developer: "HypeField Sports",
    description: "Futuristic sports arena with 8-player local support. Up to 4 controllers per side in team-based pulse battles.",
  },
];

export const categories = [
  { id: "racing", label: "Racing", icon: "🏎️", count: 24, color: "var(--neon-cyan)" },
  { id: "action", label: "Action", icon: "⚡", count: 87, color: "var(--neon-magenta)" },
  { id: "strategy", label: "Strategy", icon: "♟️", count: 45, color: "var(--neon-purple)" },
  { id: "fighting", label: "Fighting", icon: "🥊", count: 33, color: "#ff6b35" },
  { id: "sports", label: "Sports", icon: "🏆", count: 29, color: "#39ff14" },
  { id: "platformer", label: "Platformer", icon: "🕹️", count: 61, color: "#fbbf24" },
  { id: "rpg", label: "RPG", icon: "⚔️", count: 52, color: "#e879f9" },
  { id: "indie", label: "Indie", icon: "🎨", count: 118, color: "#38bdf8" },
];
