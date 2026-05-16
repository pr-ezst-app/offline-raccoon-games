import { useState } from "react";
import Icon from "@/components/ui/icon";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";

type Tab = "installed" | "library" | "wishlist";

export default function MyGamesPage() {
  const [tab, setTab] = useState<Tab>("installed");

  const installed = games.filter((g) => g.installed);
  const library = games;
  const wishlist = games.filter((g) => !g.installed);

  const current = tab === "installed" ? installed : tab === "library" ? library : wishlist;

  return (
    <div className="animate-fade-in min-h-full">
      <div className="px-8 py-7 border-b" style={{ borderColor: "var(--surface-4)" }}>
        <h1 className="font-rajdhani font-bold text-4xl text-white mb-1" style={{ letterSpacing: "0.06em" }}>MY GAMES</h1>
        <p className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Your personal game collection on Raccoon</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
        {([
          { id: "installed" as Tab, label: "INSTALLED", icon: "HardDrive", count: installed.length },
          { id: "library" as Tab, label: "LIBRARY", icon: "Library", count: library.length },
          { id: "wishlist" as Tab, label: "WISHLIST", icon: "Heart", count: wishlist.length },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-7 py-4 font-rajdhani font-bold text-sm transition-all duration-200"
            style={{
              color: tab === t.id ? "var(--neon-cyan)" : "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              borderBottom: tab === t.id ? "2px solid var(--neon-cyan)" : "2px solid transparent",
            }}
          >
            <Icon name={t.icon} size={15} style={{ color: tab === t.id ? "var(--neon-cyan)" : undefined }} />
            {t.label}
            <span className="font-mono-jet text-xs px-1.5 py-0.5 rounded ml-1" style={{ background: tab === t.id ? "rgba(0,229,255,0.12)" : "var(--surface-3)", color: tab === t.id ? "var(--neon-cyan)" : "rgba(255,255,255,0.3)", fontSize: "0.6rem" }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Stats row for installed */}
      {tab === "installed" && installed.length > 0 && (
        <div className="flex items-center gap-8 px-8 py-4 border-b" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
          <div>
            <span className="font-mono-jet text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem" }}>TOTAL SIZE </span>
            <span className="font-rajdhani font-bold text-lg" style={{ color: "var(--neon-cyan)" }}>14.3 GB</span>
          </div>
          <div>
            <span className="font-mono-jet text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem" }}>LOCAL CO-OP READY </span>
            <span className="font-rajdhani font-bold text-lg" style={{ color: "#39ff14" }}>{installed.filter((g) => g.localMultiplayer).length}</span>
          </div>
          <div>
            <span className="font-mono-jet text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem" }}>TOTAL HOURS </span>
            <span className="font-rajdhani font-bold text-lg text-white">312</span>
          </div>
          <button className="ml-auto btn-neon-cyan px-4 py-2 rounded-lg text-xs flex items-center gap-1.5">
            <Icon name="RefreshCw" size={13} />
            CHECK UPDATES
          </button>
        </div>
      )}

      {/* Quick launch — installed games with progress */}
      {tab === "installed" && (
        <div className="px-8 pt-7 pb-3">
          <h2 className="font-rajdhani font-bold text-lg text-white mb-4" style={{ letterSpacing: "0.06em" }}>CONTINUE PLAYING</h2>
          <div className="space-y-2 mb-7">
            {installed.filter((g) => g.progress !== undefined).map((g) => (
              <div key={g.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}>
                <img src={g.cover} alt={g.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-rajdhani font-bold text-white">{g.title}</span>
                    {g.localMultiplayer && (
                      <span className="multiplayer-badge px-1.5 py-0.5 rounded flex items-center gap-1" style={{ fontSize: "0.58rem" }}>
                        <Icon name="Gamepad2" size={9} />{g.maxControllers}P
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-4)" }}>
                      <div className="h-full rounded-full progress-bar-fill" style={{ width: `${g.progress}%` }} />
                    </div>
                    <span className="font-mono-jet text-xs flex-shrink-0" style={{ color: "var(--neon-cyan)", fontSize: "0.65rem" }}>{g.progress}%</span>
                  </div>
                </div>
                <button className="btn-neon-filled px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 flex-shrink-0">
                  <Icon name="Play" size={13} />
                  PLAY
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="px-8 pb-8">
        {tab !== "installed" && (
          <h2 className="font-rajdhani font-bold text-lg text-white mb-5" style={{ letterSpacing: "0.06em" }}>
            {tab === "library" ? "ALL GAMES" : "WISHLIST"}
          </h2>
        )}
        {tab === "installed" && <h2 className="font-rajdhani font-bold text-lg text-white mb-4" style={{ letterSpacing: "0.06em" }}>ALL INSTALLED</h2>}
        <div className="grid grid-cols-3 gap-4">
          {current.map((g) => <GameCard key={g.id} game={g} />)}
        </div>
      </div>
    </div>
  );
}
