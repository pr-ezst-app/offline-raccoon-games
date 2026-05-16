import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "general" | "controllers" | "display" | "account" | "privacy";

const sections: { id: Section; label: string; icon: string }[] = [
  { id: "general",     label: "General",          icon: "Settings" },
  { id: "controllers", label: "Controllers",       icon: "Gamepad2" },
  { id: "display",     label: "Display & Sound",   icon: "Monitor" },
  { id: "account",     label: "Account",           icon: "User" },
  { id: "privacy",     label: "Privacy",           icon: "Shield" },
];

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
      style={{ background: on ? "var(--neon-cyan)" : "var(--surface-4)", boxShadow: on ? "0 0 10px rgba(0,229,255,0.4)" : undefined }}
    >
      <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md"
        style={{ left: on ? "calc(100% - 1.375rem)" : "0.125rem" }} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("general");
  const [toggles, setToggles] = useState({
    autoUpdate: true, notifications: true, launchOnStartup: false,
    vibration: true, controllerHints: true, autoDetect: true,
    vsync: true, fpsCounter: false, reducedMotion: false,
    twoFactor: false, analyticsShare: false, crashReports: true,
  });

  const tog = (key: keyof typeof toggles) => setToggles((t) => ({ ...t, [key]: !t[key] }));

  return (
    <div className="animate-fade-in min-h-full">
      <div className="px-8 py-7 border-b" style={{ borderColor: "var(--surface-4)" }}>
        <h1 className="font-rajdhani font-bold text-4xl text-white mb-1" style={{ letterSpacing: "0.06em" }}>SETTINGS</h1>
        <p className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Configure Raccoon to your preferences</p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 border-r py-4 px-3 min-h-screen" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-exo transition-all duration-200 mb-1"
              style={
                activeSection === s.id
                  ? { background: "rgba(0,229,255,0.1)", color: "var(--neon-cyan)", borderLeft: "2px solid var(--neon-cyan)" }
                  : { color: "rgba(255,255,255,0.4)", borderLeft: "2px solid transparent" }
              }
            >
              <Icon name={s.icon} size={16} style={{ color: activeSection === s.id ? "var(--neon-cyan)" : undefined }} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-8 space-y-4 max-w-2xl">
          {activeSection === "general" && (
            <>
              <SettingRow label="Auto-update games" desc="Automatically download game updates in the background" toggle={<Toggle on={toggles.autoUpdate} onChange={() => tog("autoUpdate")} />} />
              <SettingRow label="Notifications" desc="Show alerts for downloads, friend activity, and new releases" toggle={<Toggle on={toggles.notifications} onChange={() => tog("notifications")} />} />
              <SettingRow label="Launch on startup" desc="Open Raccoon when your system starts" toggle={<Toggle on={toggles.launchOnStartup} onChange={() => tog("launchOnStartup")} />} />
              <SettingRow label="Download location" desc="Where to store installed games and media" toggle={
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono-jet text-xs" style={{ background: "var(--surface-3)", border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.5)" }}>
                  ~/raccoon/games
                  <Icon name="FolderOpen" size={14} style={{ color: "var(--neon-cyan)" }} />
                </div>
              } />
              <SettingRow label="Language" desc="Interface display language" toggle={
                <div className="px-3 py-2 rounded-lg font-exo text-sm" style={{ background: "var(--surface-3)", border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.7)" }}>English</div>
              } />
            </>
          )}

          {activeSection === "controllers" && (
            <>
              <div className="p-5 rounded-xl mb-4" style={{ background: "linear-gradient(135deg,rgba(57,255,20,0.06),rgba(0,229,255,0.04))", border: "1px solid rgba(57,255,20,0.2)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Gamepad2" size={18} style={{ color: "#39ff14" }} />
                  <span className="font-rajdhani font-bold text-lg" style={{ color: "#39ff14", letterSpacing: "0.06em" }}>LOCAL MULTIPLAYER</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1,2,3,4].map((p) => (
                    <div key={p} className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ background: "var(--surface-3)", border: `1px solid ${p <= 2 ? "rgba(57,255,20,0.3)" : "var(--surface-4)"}` }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: p <= 2 ? "rgba(57,255,20,0.1)" : "var(--surface-4)" }}>
                        <Icon name="Gamepad2" size={18} style={{ color: p <= 2 ? "#39ff14" : "rgba(255,255,255,0.2)" }} />
                      </div>
                      <span className="font-mono-jet text-xs" style={{ color: p <= 2 ? "#39ff14" : "rgba(255,255,255,0.25)", fontSize: "0.62rem" }}>
                        P{p} {p <= 2 ? "READY" : "EMPTY"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <SettingRow label="Controller vibration" desc="Haptic feedback during gameplay" toggle={<Toggle on={toggles.vibration} onChange={() => tog("vibration")} />} />
              <SettingRow label="On-screen controller hints" desc="Show button prompts during gameplay" toggle={<Toggle on={toggles.controllerHints} onChange={() => tog("controllerHints")} />} />
              <SettingRow label="Auto-detect controllers" desc="Automatically configure newly connected controllers" toggle={<Toggle on={toggles.autoDetect} onChange={() => tog("autoDetect")} />} />
              <SettingRow label="Max local players" desc="Maximum simultaneous local players" toggle={
                <div className="flex gap-2">
                  {[2,4,8].map((n) => (
                    <button key={n} className="w-10 h-9 rounded font-rajdhani font-bold text-sm transition-all"
                      style={{ background: n === 4 ? "rgba(0,229,255,0.15)" : "var(--surface-3)", border: `1px solid ${n === 4 ? "var(--neon-cyan)" : "var(--surface-4)"}`, color: n === 4 ? "var(--neon-cyan)" : "rgba(255,255,255,0.4)" }}>
                      {n}
                    </button>
                  ))}
                </div>
              } />
            </>
          )}

          {activeSection === "display" && (
            <>
              <SettingRow label="V-Sync" desc="Synchronize frame rate to avoid screen tearing" toggle={<Toggle on={toggles.vsync} onChange={() => tog("vsync")} />} />
              <SettingRow label="FPS counter" desc="Show frames per second overlay during games" toggle={<Toggle on={toggles.fpsCounter} onChange={() => tog("fpsCounter")} />} />
              <SettingRow label="Reduced motion" desc="Minimize animations throughout the interface" toggle={<Toggle on={toggles.reducedMotion} onChange={() => tog("reducedMotion")} />} />
              <SettingRow label="Resolution" desc="Launcher UI rendering resolution" toggle={
                <div className="px-3 py-2 rounded-lg font-exo text-sm" style={{ background: "var(--surface-3)", border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.7)" }}>1920×1080</div>
              } />
              <SettingRow label="Volume" desc="Master volume for game sounds and music" toggle={
                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                  <div className="w-28 h-1.5 rounded-full overflow-hidden cursor-pointer" style={{ background: "var(--surface-4)" }}>
                    <div className="h-full w-4/5 rounded-full progress-bar-fill" />
                  </div>
                  <span className="font-mono-jet text-xs" style={{ color: "var(--neon-cyan)" }}>80%</span>
                </div>
              } />
            </>
          )}

          {activeSection === "account" && (
            <>
              <div className="p-5 rounded-xl mb-4 flex items-center gap-4" style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)" }}>🦝</div>
                <div>
                  <div className="font-rajdhani font-bold text-xl text-white">PLAYER_ONE</div>
                  <div className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>player@raccoon.gg · Level 23</div>
                </div>
                <button className="btn-neon-cyan ml-auto px-4 py-2 rounded-lg text-xs">EDIT</button>
              </div>

              <SettingRow label="Two-factor authentication" desc="Add an extra layer of security to your account" toggle={<Toggle on={toggles.twoFactor} onChange={() => tog("twoFactor")} />} />
              <SettingRow label="Connected devices" desc="Manage devices linked to your account" toggle={
                <button className="btn-neon-cyan px-3 py-1.5 rounded text-xs">MANAGE</button>
              } />
            </>
          )}

          {activeSection === "privacy" && (
            <>
              <SettingRow label="Share analytics" desc="Help improve Raccoon by sharing anonymous usage data" toggle={<Toggle on={toggles.analyticsShare} onChange={() => tog("analyticsShare")} />} />
              <SettingRow label="Crash reports" desc="Automatically send crash reports to our team" toggle={<Toggle on={toggles.crashReports} onChange={() => tog("crashReports")} />} />
              <SettingRow label="Online status" desc="Who can see when you're online" toggle={
                <div className="px-3 py-2 rounded-lg font-exo text-sm" style={{ background: "var(--surface-3)", border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.7)" }}>Friends Only</div>
              } />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, desc, toggle }: { label: string; desc: string; toggle: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 p-4 rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}>
      <div>
        <div className="font-exo font-medium text-white text-sm">{label}</div>
        <div className="font-exo text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{desc}</div>
      </div>
      {toggle}
    </div>
  );
}
