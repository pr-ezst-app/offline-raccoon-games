import Icon from "@/components/ui/icon";

const downloads = [
  { id: 1, title: "NEON DRIFT", type: "Game", size: "4.2 GB", progress: 100, speed: null, status: "installed", cover: "🏎️" },
  { id: 2, title: "VOID PROTOCOL", type: "Game", size: "8.7 GB", progress: 63, speed: "124 MB/s", status: "downloading", cover: "🔫" },
  { id: 3, title: "ORBITAL RUN", type: "Game", size: "1.4 GB", progress: 100, speed: null, status: "installed", cover: "🚀" },
  { id: 4, title: "Shadow Chronicles Vol.1", type: "Manhwa", size: "340 MB", progress: 45, speed: "8 MB/s", status: "downloading", cover: "📖" },
  { id: 5, title: "CRYSTAL SIEGE", type: "Game", size: "2.1 GB", progress: 0, speed: null, status: "queued", cover: "♟️" },
  { id: 6, title: "Neon Tokyo — Season 2", type: "Anime", size: "6.1 GB", progress: 0, speed: null, status: "queued", cover: "🌸" },
];

const statusColors: Record<string, string> = {
  installed: "#39ff14",
  downloading: "var(--neon-cyan)",
  queued: "rgba(255,255,255,0.3)",
  paused: "#fbbf24",
};

const statusLabels: Record<string, string> = {
  installed: "INSTALLED",
  downloading: "DOWNLOADING",
  queued: "QUEUED",
  paused: "PAUSED",
};

export default function DownloadsPage() {
  const active = downloads.filter((d) => d.status === "downloading");
  const queued = downloads.filter((d) => d.status === "queued");
  const done = downloads.filter((d) => d.status === "installed");

  const totalSpeed = active.reduce((sum, d) => {
    const val = d.speed ? parseFloat(d.speed) : 0;
    return sum + val;
  }, 0);

  return (
    <div className="animate-fade-in min-h-full">
      {/* Header */}
      <div className="px-8 py-7 border-b" style={{ borderColor: "var(--surface-4)" }}>
        <h1 className="font-rajdhani font-bold text-4xl text-white mb-1" style={{ letterSpacing: "0.06em" }}>DOWNLOADS</h1>
        <p className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Manage your games, anime & manhwa downloads</p>
      </div>

      {/* Speed bar */}
      <div className="flex items-center gap-6 px-8 py-4 border-b" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse-neon" style={{ background: "var(--neon-cyan)" }} />
          <span className="font-mono-jet text-sm font-bold" style={{ color: "var(--neon-cyan)" }}>{totalSpeed} MB/s</span>
          <span className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>total speed</span>
        </div>
        <div className="h-4 w-px" style={{ background: "var(--surface-4)" }} />
        <div className="flex items-center gap-2">
          <Icon name="Download" size={14} style={{ color: "var(--neon-cyan)" }} />
          <span className="font-exo text-sm text-white">{active.length} active</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
          <span className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{queued.length} queued</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button className="btn-neon-cyan px-4 py-1.5 rounded text-xs flex items-center gap-1.5">
            <Icon name="Pause" size={12} />
            PAUSE ALL
          </button>
        </div>
      </div>

      <div className="p-8 space-y-3">
        {/* Active */}
        {active.length > 0 && (
          <>
            <div className="font-mono-jet text-xs mb-3 flex items-center gap-2" style={{ color: "var(--neon-cyan)", fontSize: "0.68rem", letterSpacing: "0.1em" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--neon-cyan)" }} />
              ACTIVE DOWNLOADS
            </div>
            {active.map((d) => <DownloadRow key={d.id} item={d} />)}
          </>
        )}

        {/* Queued */}
        {queued.length > 0 && (
          <>
            <div className="font-mono-jet text-xs mb-3 mt-6 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", letterSpacing: "0.1em" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
              QUEUED
            </div>
            {queued.map((d) => <DownloadRow key={d.id} item={d} />)}
          </>
        )}

        {/* Done */}
        {done.length > 0 && (
          <>
            <div className="font-mono-jet text-xs mb-3 mt-6 flex items-center gap-2" style={{ color: "#39ff14", fontSize: "0.68rem", letterSpacing: "0.1em" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#39ff14" }} />
              INSTALLED
            </div>
            {done.map((d) => <DownloadRow key={d.id} item={d} />)}
          </>
        )}
      </div>
    </div>
  );
}

function DownloadRow({ item }: { item: typeof downloads[0] }) {
  const color = statusColors[item.status];
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}>
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "var(--surface-3)" }}>
        {item.cover}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-rajdhani font-bold text-white">{item.title}</span>
          <span className="font-mono-jet text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", fontSize: "0.6rem" }}>
            {item.type.toUpperCase()}
          </span>
          <span className="font-mono-jet text-xs ml-auto" style={{ color, fontSize: "0.65rem", letterSpacing: "0.06em" }}>
            {statusLabels[item.status]}
          </span>
        </div>

        {item.status === "downloading" && (
          <div>
            <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background: "var(--surface-4)" }}>
              <div className="h-full rounded-full progress-bar-fill transition-all duration-700" style={{ width: `${item.progress}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono-jet text-xs" style={{ color: "var(--neon-cyan)", fontSize: "0.65rem" }}>{item.progress}%</span>
              <span className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.size} · {item.speed}</span>
            </div>
          </div>
        )}

        {item.status !== "downloading" && (
          <div className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{item.size}</div>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {item.status === "downloading" && (
          <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Icon name="Pause" size={15} />
          </button>
        )}
        {item.status === "installed" && (
          <button className="btn-neon-filled px-3 py-1.5 rounded text-xs flex items-center gap-1.5">
            <Icon name="Play" size={12} />
            LAUNCH
          </button>
        )}
        {item.status === "queued" && (
          <button className="btn-neon-cyan px-3 py-1.5 rounded text-xs flex items-center gap-1.5">
            <Icon name="Download" size={12} />
            START
          </button>
        )}
        <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10" style={{ color: "rgba(255,255,255,0.25)" }}>
          <Icon name="X" size={15} />
        </button>
      </div>
    </div>
  );
}
