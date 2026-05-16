import Icon from "@/components/ui/icon";
import { Game } from "@/data/games";

interface GameCardProps {
  game: Game;
  size?: "sm" | "md" | "lg";
}

export default function GameCard({ game, size = "md" }: GameCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(game.rating));

  return (
    <div className="surface-card rounded-xl overflow-hidden cursor-pointer group animate-fade-in" style={{ animationDelay: `${game.id * 0.05}s` }}>
      {/* Cover */}
      <div className={`relative overflow-hidden ${size === "lg" ? "h-48" : size === "sm" ? "h-28" : "h-36"}`}>
        <img
          src={game.cover}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="game-cover-overlay absolute inset-0" />

        {/* Badges top */}
        <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
          {game.localMultiplayer && (
            <span className="multiplayer-badge px-2 py-0.5 rounded flex items-center gap-1">
              <Icon name="Gamepad2" size={10} />
              {game.maxControllers}P
            </span>
          )}
          {game.installed && (
            <span
              className="text-xs px-2 py-0.5 rounded font-mono-jet"
              style={{ background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.3)", color: "var(--neon-cyan)", fontSize: "0.6rem" }}
            >
              INSTALLED
            </span>
          )}
        </div>

        {/* Rating top-right */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
          <span className="rating-star text-xs">★</span>
          <span className="font-mono-jet text-white text-xs" style={{ fontSize: "0.7rem" }}>{game.rating}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-rajdhani font-bold text-white leading-tight" style={{ fontSize: "1rem", letterSpacing: "0.05em" }}>
            {game.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{game.genre}</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem" }}>•</span>
          <span className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{game.developer}</span>
        </div>

        {/* Progress bar if installed */}
        {game.installed && game.progress !== undefined && (
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono-jet text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.6rem" }}>PROGRESS</span>
              <span className="font-mono-jet text-xs" style={{ color: "var(--neon-cyan)", fontSize: "0.65rem" }}>{game.progress}%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--surface-4)" }}>
              <div className="h-full rounded-full progress-bar-fill transition-all duration-500" style={{ width: `${game.progress}%` }} />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-2">
          {game.installed ? (
            <button className="btn-neon-filled flex-1 py-1.5 rounded text-xs flex items-center justify-center gap-1.5">
              <Icon name="Play" size={12} />
              PLAY
            </button>
          ) : (
            <button className="btn-neon-cyan flex-1 py-1.5 rounded text-xs flex items-center justify-center gap-1.5">
              <Icon name="Download" size={12} />
              GET
            </button>
          )}
          <button
            className="px-2.5 py-1.5 rounded transition-all duration-200 hover:bg-white/5"
            style={{ border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.4)" }}
          >
            <Icon name="Heart" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
