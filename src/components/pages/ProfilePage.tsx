import { useState } from "react";
import Icon from "@/components/ui/icon";
import AvatarCreator from "@/components/AvatarCreator";

const stats = [
  { label: "Games Played", value: "47", icon: "Gamepad2" },
  { label: "Hours", value: "312", icon: "Clock" },
  { label: "Achievements", value: "84", icon: "Trophy" },
  { label: "Co-op Sessions", value: "28", icon: "Users" },
];

const recentActivity = [
  { game: "NEON DRIFT", action: "Achievement unlocked", detail: "Speed Demon — 3 hours ago", icon: "Trophy", color: "#fbbf24" },
  { game: "VOID PROTOCOL", action: "Co-op session", detail: "2-player local — Yesterday", icon: "Gamepad2", color: "var(--neon-purple)" },
  { game: "ORBITAL RUN", action: "New record", detail: "Level 7 — 88% complete", icon: "Zap", color: "var(--neon-cyan)" },
];

export default function ProfilePage() {
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [savedAvatar, setSavedAvatar] = useState<{ type: string; color: string; accent: string } | null>(null);

  return (
    <div className="animate-fade-in min-h-full">
      {showAvatarCreator ? (
        <AvatarCreator
          onSave={(avatar) => { setSavedAvatar(avatar); setShowAvatarCreator(false); }}
          onBack={() => setShowAvatarCreator(false)}
        />
      ) : (
        <>
          {/* Profile hero */}
          <div className="relative px-8 pt-10 pb-8 border-b" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
            <div className="grid-bg absolute inset-0 opacity-20" />
            <div className="relative flex items-start gap-7">
              {/* Avatar display */}
              <button
                onClick={() => setShowAvatarCreator(true)}
                className="relative group flex-shrink-0"
              >
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: savedAvatar
                      ? `linear-gradient(135deg, ${savedAvatar.color}33, ${savedAvatar.accent}22)`
                      : "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(157,78,221,0.15))",
                    border: `2px solid ${savedAvatar ? savedAvatar.color : "rgba(0,229,255,0.4)"}`,
                    boxShadow: `0 0 24px ${savedAvatar ? savedAvatar.color + "44" : "rgba(0,229,255,0.2)"}`,
                  }}
                >
                  {savedAvatar?.type === "raccoon" ? "🦝" : savedAvatar?.type === "fox" ? "🦊" : savedAvatar?.type === "human" ? "🧑" : "🦝"}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "var(--neon-cyan)", color: "var(--surface-1)" }}>
                  <Icon name="Pencil" size={12} />
                </div>
                <div className="absolute inset-0 rounded-2xl flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono-jet text-xs px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.8)", color: "var(--neon-cyan)", fontSize: "0.55rem" }}>
                    EDIT 3D
                  </span>
                </div>
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-rajdhani font-bold text-4xl text-white" style={{ letterSpacing: "0.04em" }}>
                    PLAYER_ONE
                  </h1>
                  <span className="multiplayer-badge px-2 py-1 rounded flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#39ff14" }} />
                    ONLINE
                  </span>
                </div>
                <div className="font-exo text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Joined Raccoon · May 2026 · Level 23
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAvatarCreator(true)}
                    className="btn-neon-filled px-5 py-2 rounded-lg text-xs flex items-center gap-2"
                  >
                    <Icon name="Sparkles" size={14} />
                    CUSTOMIZE 3D AVATAR
                  </button>
                  <button className="btn-neon-cyan px-4 py-2 rounded-lg text-xs flex items-center gap-2">
                    <Icon name="Share2" size={14} />
                    SHARE PROFILE
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="px-4 py-3 rounded-xl text-center" style={{ background: "var(--surface-3)", border: "1px solid var(--surface-4)" }}>
                    <div className="font-rajdhani font-bold text-2xl" style={{ color: "var(--neon-cyan)" }}>{s.value}</div>
                    <div className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 grid grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="col-span-2">
              <h2 className="font-rajdhani font-bold text-xl text-white mb-4" style={{ letterSpacing: "0.06em" }}>RECENT ACTIVITY</h2>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${a.color}15`, border: `1px solid ${a.color}33` }}>
                      <Icon name={a.icon} size={18} style={{ color: a.color }} />
                    </div>
                    <div>
                      <div className="font-rajdhani font-bold text-white">{a.game}</div>
                      <div className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{a.action} · {a.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <h2 className="font-rajdhani font-bold text-xl text-white mb-4 mt-7" style={{ letterSpacing: "0.06em" }}>ACHIEVEMENTS</h2>
              <div className="grid grid-cols-4 gap-3">
                {["🏆", "⚡", "🎯", "🔥", "💎", "🚀", "🦝", "⚔️"].map((emoji, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)", opacity: i > 5 ? 0.35 : 1 }}>
                    <span className="text-2xl">{emoji}</span>
                    <div className="font-mono-jet text-xs text-center" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.58rem" }}>
                      {["SPEED DEMON", "LIGHTNING", "SHARP EYE", "ON FIRE", "GEM HUNTER", "ORBIT", "RACCOON", "WARRIOR"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Friends */}
            <div>
              <h2 className="font-rajdhani font-bold text-xl text-white mb-4" style={{ letterSpacing: "0.06em" }}>FRIENDS ONLINE</h2>
              <div className="space-y-2">
                {[
                  { name: "CyberFox99", game: "NEON DRIFT", status: "online", avatar: "🦊" },
                  { name: "NightRacer", game: "SHADOWFIST", status: "online", avatar: "🎮" },
                  { name: "PixelWolf", game: "Browsing", status: "away", avatar: "🐺" },
                  { name: "StarBlast", game: "Offline", status: "offline", avatar: "⭐" },
                ].map((f) => (
                  <div key={f.name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "var(--surface-3)" }}>
                      {f.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-rajdhani font-bold text-sm text-white">{f.name}</div>
                      <div className="font-exo text-xs truncate" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem" }}>{f.game}</div>
                    </div>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{
                      background: f.status === "online" ? "#39ff14" : f.status === "away" ? "#fbbf24" : "rgba(255,255,255,0.2)",
                      boxShadow: f.status === "online" ? "0 0 6px #39ff14" : undefined,
                    }} />
                  </div>
                ))}
              </div>

              <button className="w-full mt-3 py-2.5 rounded-xl font-exo text-sm transition-colors hover:bg-white/5" style={{ border: "1px dashed var(--surface-4)", color: "rgba(255,255,255,0.25)" }}>
                + Add Friends
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
