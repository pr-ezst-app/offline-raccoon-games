import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "games" | "anime" | "manhwa";

const gameCategories = [
  { icon: "🏎️", label: "Racing", count: 24, color: "var(--neon-cyan)", desc: "High-speed thrills" },
  { icon: "⚡", label: "Action", count: 87, color: "var(--neon-magenta)", desc: "Combat & adventure" },
  { icon: "♟️", label: "Strategy", count: 45, color: "var(--neon-purple)", desc: "Think & conquer" },
  { icon: "🥊", label: "Fighting", count: 33, color: "#ff6b35", desc: "1v1 to 4v4 brawls" },
  { icon: "🏆", label: "Sports", count: 29, color: "#39ff14", desc: "Competitive play" },
  { icon: "🕹️", label: "Platformer", count: 61, color: "#fbbf24", desc: "Jump & run" },
  { icon: "⚔️", label: "RPG", count: 52, color: "#e879f9", desc: "Worlds to explore" },
  { icon: "🎨", label: "Indie", count: 118, color: "#38bdf8", desc: "Community creations" },
  { icon: "👻", label: "Horror", count: 19, color: "#ff4444", desc: "Scare yourself" },
  { icon: "🧩", label: "Puzzle", count: 41, color: "#a3e635", desc: "Brain teasers" },
  { icon: "🚀", label: "Sci-Fi", count: 38, color: "#67e8f9", desc: "Future worlds" },
  { icon: "🎭", label: "Simulation", count: 26, color: "#fb923c", desc: "Build & manage" },
];

const animeCategories = [
  { icon: "⚔️", label: "Shonen", count: 312, color: "var(--neon-magenta)", desc: "Action & fighting anime" },
  { icon: "💜", label: "Shojo", count: 189, color: "#f472b6", desc: "Romance & drama" },
  { icon: "🌌", label: "Sci-Fi Anime", count: 143, color: "var(--neon-cyan)", desc: "Space & cyberpunk" },
  { icon: "🐉", label: "Fantasy", count: 267, color: "#a78bfa", desc: "Magic & mythical worlds" },
  { icon: "😂", label: "Comedy", count: 201, color: "#fbbf24", desc: "Slice of life & laughs" },
  { icon: "😱", label: "Thriller", count: 88, color: "#f87171", desc: "Dark & psychological" },
  { icon: "🤖", label: "Mecha", count: 67, color: "#6ee7b7", desc: "Giant robots & battles" },
  { icon: "🎬", label: "Movies", count: 94, color: "#fb923c", desc: "Anime feature films" },
];

const manhwaCategories = [
  { icon: "🌀", label: "Manhwa", count: 445, color: "var(--neon-cyan)", desc: "Korean full-color comics" },
  { icon: "📱", label: "Webtoon", count: 678, color: "#a78bfa", desc: "Vertical scroll format" },
  { icon: "⚔️", label: "Action Manhwa", count: 223, color: "var(--neon-magenta)", desc: "Combat & power systems" },
  { icon: "💕", label: "Romance", count: 312, color: "#f472b6", desc: "Love stories & drama" },
  { icon: "🏫", label: "School Life", count: 178, color: "#fbbf24", desc: "Students & friendships" },
  { icon: "🧙", label: "Fantasy Manhwa", count: 289, color: "#6ee7b7", desc: "Isekai & magic worlds" },
  { icon: "📖", label: "Manga", count: 521, color: "#fb923c", desc: "Japanese black & white" },
  { icon: "🎨", label: "Colored Manga", count: 134, color: "#38bdf8", desc: "Manga with full color" },
];

const tabs: { id: Tab; label: string; icon: string; desc: string; color: string }[] = [
  { id: "games", label: "GAMES", icon: "Gamepad2", desc: "All game genres", color: "var(--neon-cyan)" },
  { id: "anime", label: "ANIME & CARTOON", icon: "Tv", desc: "Watch & stream", color: "var(--neon-magenta)" },
  { id: "manhwa", label: "MANHWA & WEBTOON", icon: "BookOpen", desc: "Read & collect", color: "#a78bfa" },
];

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("games");

  const tabData = activeTab === "games" ? gameCategories : activeTab === "anime" ? animeCategories : manhwaCategories;
  const activeTabInfo = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="animate-fade-in min-h-full">
      {/* Header */}
      <div className="px-8 py-7 border-b" style={{ borderColor: "var(--surface-4)" }}>
        <h1 className="font-rajdhani font-bold text-4xl text-white mb-1" style={{ letterSpacing: "0.06em" }}>CATEGORIES</h1>
        <p className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Browse games, anime, and comics all in one place</p>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex items-center gap-2.5 px-8 py-4 font-rajdhani font-bold text-sm transition-all duration-200"
            style={{
              color: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : "2px solid transparent",
            }}
          >
            <Icon name={tab.icon} size={16} style={{ color: activeTab === tab.id ? tab.color : undefined }} />
            {tab.label}
            {activeTab === tab.id && (
              <span className="ml-1 font-mono-jet text-xs px-1.5 py-0.5 rounded" style={{ background: `rgba(${tab.color === "var(--neon-cyan)" ? "0,229,255" : tab.color === "var(--neon-magenta)" ? "255,0,170" : "167,139,250"},0.12)`, fontSize: "0.6rem" }}>
                {tabData.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Category banner */}
      <div className="mx-8 mt-6 mb-6 p-5 rounded-xl flex items-center gap-5"
        style={{ background: `linear-gradient(135deg, rgba(${activeTab === "games" ? "0,229,255" : activeTab === "anime" ? "255,0,170" : "167,139,250"},0.08), transparent)`, border: `1px solid ${activeTabInfo.color}22` }}>
        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `rgba(${activeTab === "games" ? "0,229,255" : activeTab === "anime" ? "255,0,170" : "167,139,250"},0.12)`, border: `1px solid ${activeTabInfo.color}44` }}>
          <Icon name={activeTabInfo.icon} size={26} style={{ color: activeTabInfo.color }} />
        </div>
        <div>
          <div className="font-rajdhani font-bold text-2xl text-white" style={{ letterSpacing: "0.05em" }}>{activeTabInfo.label}</div>
          <div className="font-exo text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            {activeTab === "games" && "Discover games by genre — filter for local multiplayer sessions"}
            {activeTab === "anime" && "Stream anime & cartoons — from classic shonen to cyberpunk sci-fi"}
            {activeTab === "manhwa" && "Read manhwa, webtoons, manga & colored comics in full color"}
          </div>
        </div>
        <div className="ml-auto font-mono-jet text-3xl font-bold" style={{ color: activeTabInfo.color, opacity: 0.3 }}>
          {tabData.reduce((s, c) => s + c.count, 0).toLocaleString()}
        </div>
      </div>

      {/* Grid */}
      <div className="px-8 pb-8 grid grid-cols-4 gap-4">
        {tabData.map((cat, i) => (
          <button
            key={cat.label}
            className="surface-card rounded-xl p-5 text-left group transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-mono-jet text-xs px-2 py-1 rounded" style={{ background: `${cat.color}15`, color: cat.color, fontSize: "0.62rem" }}>
                {cat.count}
              </span>
            </div>
            <div className="font-rajdhani font-bold text-lg text-white mb-1 group-hover:text-opacity-90" style={{ letterSpacing: "0.04em" }}>
              {cat.label}
            </div>
            <div className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{cat.desc}</div>
            <div className="mt-3 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-300" style={{ background: cat.color }} />
          </button>
        ))}
      </div>
    </div>
  );
}
