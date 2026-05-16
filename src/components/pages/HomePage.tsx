import Icon from "@/components/ui/icon";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";
import { Page } from "@/pages/Index";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const featured = games[0];
  const recent = games.slice(1, 5);

  return (
    <div className="min-h-full animate-fade-in">
      {/* Hero */}
      <div className="relative h-[380px] overflow-hidden">
        <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(7,11,20,0.97) 35%, rgba(7,11,20,0.5) 70%, transparent 100%)" }} />
        <div className="grid-bg absolute inset-0 opacity-30" />

        <div className="absolute inset-0 flex items-center px-10">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono-jet text-xs px-2 py-1 rounded" style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)", color: "var(--neon-cyan)", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                ✦ FEATURED GAME
              </span>
              {featured.localMultiplayer && (
                <span className="multiplayer-badge px-2 py-1 rounded flex items-center gap-1.5">
                  <Icon name="Gamepad2" size={11} />
                  {featured.maxControllers}-PLAYER LOCAL
                </span>
              )}
            </div>
            <h1 className="font-rajdhani font-bold text-6xl neon-text-cyan mb-3 leading-none">
              {featured.title}
            </h1>
            <p className="font-exo text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              {featured.developer} · {featured.genre}
            </p>
            <p className="font-exo text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "380px" }}>
              {featured.description}
            </p>
            <div className="flex gap-3">
              <button className="btn-neon-filled px-7 py-3 rounded-lg flex items-center gap-2 text-sm">
                <Icon name="Play" size={16} />
                PLAY NOW
              </button>
              <button className="btn-neon-cyan px-5 py-3 rounded-lg flex items-center gap-2 text-sm">
                <Icon name="Info" size={16} />
                DETAILS
              </button>
            </div>
          </div>
        </div>

        {/* Progress bottom-right */}
        {featured.progress !== undefined && (
          <div className="absolute bottom-6 right-8 text-right">
            <div className="font-mono-jet text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>
              CAMPAIGN PROGRESS
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="h-full rounded-full progress-bar-fill" style={{ width: `${featured.progress}%` }} />
              </div>
              <span className="font-mono-jet text-sm font-bold" style={{ color: "var(--neon-cyan)" }}>{featured.progress}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="flex items-center px-8 py-4 gap-8 border-b" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
        {[
          { label: "Games Installed", value: "3", icon: "HardDrive" },
          { label: "Hours Played", value: "247", icon: "Clock" },
          { label: "Local Sessions", value: "12", icon: "Gamepad2" },
          { label: "Achievements", value: "84", icon: "Trophy" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.15)" }}>
              <Icon name={stat.icon} size={15} style={{ color: "var(--neon-cyan)" }} />
            </div>
            <div>
              <div className="font-rajdhani font-bold text-lg leading-none" style={{ color: "var(--neon-cyan)" }}>{stat.value}</div>
              <div className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>{stat.label}</div>
            </div>
          </div>
        ))}

        <button
          onClick={() => onNavigate("games")}
          className="ml-auto flex items-center gap-2 font-exo text-sm transition-colors duration-200 hover:opacity-80"
          style={{ color: "var(--neon-cyan)" }}
        >
          Browse All Games
          <Icon name="ArrowRight" size={15} />
        </button>
      </div>

      {/* Recent & Continue */}
      <div className="px-8 py-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-rajdhani font-bold text-2xl text-white" style={{ letterSpacing: "0.04em" }}>
            CONTINUE PLAYING
          </h2>
          <button onClick={() => onNavigate("mygames")} className="font-exo text-xs transition-colors hover:opacity-70" style={{ color: "var(--neon-cyan)" }}>
            View My Library →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {recent.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>

      {/* Local Multiplayer spotlight */}
      <div className="mx-8 mb-8 rounded-xl p-6" style={{ background: "var(--surface-2)", border: "1px solid rgba(157,78,221,0.25)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(157,78,221,0.15)", border: "1px solid rgba(157,78,221,0.4)" }}>
            <Icon name="Gamepad2" size={20} style={{ color: "var(--neon-purple)" }} />
          </div>
          <div>
            <h3 className="font-rajdhani font-bold text-xl text-white">LOCAL MULTIPLAYER</h3>
            <p className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Games playable with multiple controllers right now</p>
          </div>
          <div className="ml-auto">
            <button onClick={() => onNavigate("games")} className="btn-neon-magenta px-5 py-2 rounded-lg text-xs flex items-center gap-2">
              <Icon name="Zap" size={13} />
              FIND CO-OP
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {games.filter(g => g.localMultiplayer).slice(0, 3).map(game => (
            <div key={game.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--surface-3)", border: "1px solid var(--surface-4)" }}>
              <img src={game.cover} alt={game.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="min-w-0">
                <div className="font-rajdhani font-bold text-sm text-white truncate">{game.title}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon name="Users" size={11} style={{ color: "var(--neon-purple)" }} />
                  <span className="font-mono-jet text-xs" style={{ color: "var(--neon-purple)", fontSize: "0.62rem" }}>up to {game.maxControllers} players</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
