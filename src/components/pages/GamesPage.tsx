import { useState } from "react";
import Icon from "@/components/ui/icon";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";

const genres = ["All", "Racing", "Action", "Strategy", "Fighting", "Sports", "Platformer"];

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [multiplayerOnly, setMultiplayerOnly] = useState(false);

  const filtered = games.filter((g) => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) || g.developer.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "All" || g.genre === genre;
    const matchMp = !multiplayerOnly || g.localMultiplayer;
    return matchSearch && matchGenre && matchMp;
  });

  return (
    <div className="animate-fade-in min-h-full">
      {/* Header */}
      <div className="px-8 py-7 border-b" style={{ borderColor: "var(--surface-4)" }}>
        <h1 className="font-rajdhani font-bold text-4xl text-white mb-1" style={{ letterSpacing: "0.06em" }}>GAME LIBRARY</h1>
        <p className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Discover and launch games from the Raccoon collection</p>

        {/* Filters */}
        <div className="flex items-center gap-4 mt-5">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm font-exo outline-none transition-colors"
              style={{
                background: "var(--surface-3)",
                border: "1px solid var(--surface-4)",
                color: "rgba(255,255,255,0.85)",
              }}
            />
          </div>

          {/* Genre pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className="px-3 py-1.5 rounded text-xs font-exo transition-all duration-200"
                style={
                  genre === g
                    ? { background: "rgba(0,229,255,0.15)", border: "1px solid var(--neon-cyan)", color: "var(--neon-cyan)" }
                    : { background: "var(--surface-3)", border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.45)" }
                }
              >
                {g}
              </button>
            ))}
          </div>

          {/* Multiplayer toggle */}
          <button
            onClick={() => setMultiplayerOnly(!multiplayerOnly)}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-exo transition-all duration-200 ml-auto"
            style={
              multiplayerOnly
                ? { background: "rgba(57,255,20,0.12)", border: "1px solid rgba(57,255,20,0.5)", color: "#39ff14" }
                : { background: "var(--surface-3)", border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.45)" }
            }
          >
            <Icon name="Gamepad2" size={13} />
            LOCAL CO-OP ONLY
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono-jet text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>
            {filtered.length} GAME{filtered.length !== 1 ? "S" : ""} FOUND
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-3 gap-5">
            {filtered.map((g) => <GameCard key={g.id} game={g} size="lg" />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Icon name="SearchX" size={40} style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="font-rajdhani font-bold text-xl mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>NO GAMES FOUND</p>
            <p className="font-exo text-sm mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
