import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type AvatarType = "raccoon" | "fox" | "human";

interface AvatarConfig {
  type: AvatarType;
  color: string;
  accent: string;
  accessory: string;
  bg: string;
}

const presets: Record<AvatarType, { emoji: string; label: string; desc: string; defaultColor: string; defaultAccent: string }> = {
  raccoon: { emoji: "🦝", label: "RACCOON", desc: "Masked bandit — the Raccoon mascot", defaultColor: "#00e5ff", defaultAccent: "#9d4edd" },
  fox:     { emoji: "🦊", label: "FOX",     desc: "Cunning and swift — the trickster",   defaultColor: "#ff6b35", defaultAccent: "#fbbf24" },
  human:   { emoji: "🧑", label: "HUMAN",   desc: "Fully customizable player character", defaultColor: "#e879f9", defaultAccent: "#38bdf8" },
};

const bodyColors = ["#00e5ff","#ff00aa","#9d4edd","#39ff14","#fbbf24","#ff6b35","#e879f9","#38bdf8","#f87171","#6ee7b7","#ffffff","#a78bfa"];
const accentColors = ["#9d4edd","#00e5ff","#ff00aa","#fbbf24","#39ff14","#38bdf8","#f472b6","#fb923c","#6ee7b7","#a78bfa","#67e8f9","#ff6b35"];
const bgColors = [
  { label: "Deep Space", value: "linear-gradient(135deg,#070b14,#0d1220)" },
  { label: "Neon City",  value: "linear-gradient(135deg,#0a0020,#1a0035)" },
  { label: "Cyber Punk", value: "linear-gradient(135deg,#001a1a,#002233)" },
  { label: "Magenta",    value: "linear-gradient(135deg,#1a0010,#2a0020)" },
  { label: "Sunset",     value: "linear-gradient(135deg,#1a0500,#2a1000)" },
  { label: "Aurora",     value: "linear-gradient(135deg,#001a0a,#00150f)" },
];
const accessories = ["None","Crown 👑","Headset 🎧","Cap 🧢","Stars ✨","Horns 😈","Wings 🔰","Blade ⚔️"];

interface AvatarCreatorProps {
  onSave: (avatar: { type: string; color: string; accent: string }) => void;
  onBack: () => void;
}

export default function AvatarCreator({ onSave, onBack }: AvatarCreatorProps) {
  const [config, setConfig] = useState<AvatarConfig>({
    type: "raccoon",
    color: "#00e5ff",
    accent: "#9d4edd",
    accessory: "None",
    bg: bgColors[0].value,
  });
  const [rotY, setRotY] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let frame: number;
    if (spinning) {
      const animate = () => {
        setRotY((r) => (r + 1.5) % 360);
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(frame);
  }, [spinning]);

  const preset = presets[config.type];

  const set = (key: keyof AvatarConfig, val: string) =>
    setConfig((c) => ({ ...c, [key]: val }));

  return (
    <div className="animate-fade-in min-h-full">
      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-5 border-b" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
        <button onClick={onBack} className="flex items-center gap-2 font-exo text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
          <Icon name="ChevronLeft" size={18} />
          Back
        </button>
        <div className="h-5 w-px" style={{ background: "var(--surface-4)" }} />
        <h1 className="font-rajdhani font-bold text-2xl text-white" style={{ letterSpacing: "0.06em" }}>3D AVATAR CREATOR</h1>
        <span className="font-mono-jet text-xs px-2 py-1 rounded" style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)", color: "var(--neon-cyan)", fontSize: "0.62rem" }}>
          RACCOON STUDIO
        </span>
        <button
          className="btn-neon-filled ml-auto px-6 py-2 rounded-lg text-sm flex items-center gap-2"
          onClick={() => onSave({ type: config.type, color: config.color, accent: config.accent })}
        >
          <Icon name="Check" size={16} />
          SAVE AVATAR
        </button>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left — 3D Preview */}
        <div className="flex-1 flex flex-col items-center justify-center relative" style={{ background: config.bg }}>
          <div className="grid-bg absolute inset-0 opacity-20" />

          {/* 3D scene */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rounded-full opacity-20" style={{
                width: 280, height: 280,
                background: `radial-gradient(circle, ${config.color}33 0%, transparent 70%)`,
              }} />
            </div>

            {/* 3D Avatar body */}
            <div
              className="relative select-none cursor-pointer"
              style={{
                transform: `perspective(600px) rotateY(${rotY}deg)`,
                transformStyle: "preserve-3d",
                transition: spinning ? "none" : "transform 0.3s ease",
              }}
              onClick={() => setSpinning(!spinning)}
            >
              {/* Shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4" style={{
                width: 120, height: 20, borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                filter: "blur(8px)",
              }} />

              {/* Body */}
              <div className="relative flex flex-col items-center">
                {/* Head */}
                <div className="relative" style={{ marginBottom: -8 }}>
                  {/* Accessory on top */}
                  {config.accessory !== "None" && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl z-10">
                      {config.accessory.split(" ")[1]}
                    </div>
                  )}

                  {/* Ears */}
                  {config.type !== "human" && (
                    <div className="flex justify-between" style={{ width: 100, marginBottom: -10, position: "relative", zIndex: 2 }}>
                      <div className="w-8 h-10 rounded-full" style={{ background: config.color, boxShadow: `0 0 12px ${config.color}88`, transform: "rotate(-15deg)" }} />
                      <div className="w-8 h-10 rounded-full" style={{ background: config.color, boxShadow: `0 0 12px ${config.color}88`, transform: "rotate(15deg)" }} />
                    </div>
                  )}

                  {/* Head shape */}
                  <div className="relative flex items-center justify-center" style={{
                    width: 110, height: 100, borderRadius: "50% 50% 45% 45%",
                    background: `linear-gradient(160deg, ${config.color}, ${config.accent})`,
                    boxShadow: `0 0 30px ${config.color}66, 0 0 60px ${config.color}22, inset 0 -10px 20px rgba(0,0,0,0.3)`,
                    position: "relative", zIndex: 1,
                  }}>
                    {/* Face */}
                    <div className="flex flex-col items-center">
                      {/* Eyes */}
                      <div className="flex gap-5 mb-2">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)" }}>
                          <div className="w-3 h-3 rounded-full bg-gray-900" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)" }}>
                          <div className="w-3 h-3 rounded-full bg-gray-900" />
                        </div>
                      </div>
                      {/* Nose + mouth */}
                      {config.type === "raccoon" && <div className="w-3 h-2 rounded-full mb-1" style={{ background: "#1a1a1a" }} />}
                      {config.type === "fox" && <div className="w-4 h-2 rounded-full mb-1" style={{ background: "#cc4400" }} />}
                      {config.type === "human" && <div className="w-2 h-2 rounded-full mb-1" style={{ background: "rgba(0,0,0,0.4)" }} />}
                      <div className="w-8 h-1 rounded-full" style={{ background: "rgba(0,0,0,0.3)" }} />
                    </div>

                    {/* Raccoon mask */}
                    {config.type === "raccoon" && (
                      <>
                        <div className="absolute" style={{ width: 28, height: 14, borderRadius: 7, background: "rgba(0,0,0,0.45)", top: 28, left: 10 }} />
                        <div className="absolute" style={{ width: 28, height: 14, borderRadius: 7, background: "rgba(0,0,0,0.45)", top: 28, right: 10 }} />
                      </>
                    )}
                    {/* Fox muzzle */}
                    {config.type === "fox" && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2" style={{ width: 40, height: 22, borderRadius: "0 0 20px 20px", background: "#fff3e0", opacity: 0.5 }} />
                    )}
                  </div>

                  {/* Raccoon stripe */}
                  {config.type === "raccoon" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
                      width: 20, height: 80, borderRadius: 10,
                      background: "rgba(255,255,255,0.15)",
                      transform: "translateX(-50%) translateY(-50%) rotate(15deg)",
                    }} />
                  )}
                </div>

                {/* Neck */}
                <div style={{ width: 30, height: 16, background: `linear-gradient(to bottom, ${config.color}, ${config.accent})`, zIndex: 0 }} />

                {/* Body */}
                <div className="relative" style={{
                  width: 130, height: 120, borderRadius: "20px 20px 30px 30px",
                  background: `linear-gradient(160deg, ${config.accent}, ${config.color}88)`,
                  boxShadow: `0 8px 32px ${config.accent}44, inset 0 -8px 16px rgba(0,0,0,0.2)`,
                }}>
                  {/* Chest emblem */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-60">
                    {config.type === "raccoon" ? "🦝" : config.type === "fox" ? "🦊" : "⚡"}
                  </div>
                  {/* Arms */}
                  <div className="absolute top-4" style={{ left: -22, width: 22, height: 70, borderRadius: "10px 0 0 20px", background: `linear-gradient(to bottom, ${config.color}, ${config.accent})`, boxShadow: `0 4px 12px ${config.color}44` }} />
                  <div className="absolute top-4" style={{ right: -22, width: 22, height: 70, borderRadius: "0 10px 20px 0", background: `linear-gradient(to bottom, ${config.color}, ${config.accent})`, boxShadow: `0 4px 12px ${config.color}44` }} />
                </div>

                {/* Legs */}
                <div className="flex gap-4 mt-1">
                  <div style={{ width: 42, height: 55, borderRadius: "10px 10px 15px 15px", background: `linear-gradient(to bottom, ${config.accent}, ${config.color}88)`, boxShadow: `0 4px 12px rgba(0,0,0,0.3)` }} />
                  <div style={{ width: 42, height: 55, borderRadius: "10px 10px 15px 15px", background: `linear-gradient(to bottom, ${config.accent}, ${config.color}88)`, boxShadow: `0 4px 12px rgba(0,0,0,0.3)` }} />
                </div>

                {/* Tail for raccoon/fox */}
                {config.type !== "human" && (
                  <div className="absolute" style={{
                    right: -60, top: "40%",
                    width: 55, height: 35, borderRadius: "50%",
                    background: `linear-gradient(to right, ${config.color}, ${config.accent})`,
                    transform: "rotate(-20deg)",
                    boxShadow: `0 0 16px ${config.color}55`,
                  }} />
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-1">
              <p className="font-rajdhani font-bold text-2xl" style={{ color: config.color, letterSpacing: "0.1em" }}>
                {preset.label} AVATAR
              </p>
              <p className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{preset.desc}</p>
              <button
                onClick={() => setSpinning(!spinning)}
                className="mt-2 flex items-center gap-1.5 font-mono-jet text-xs px-3 py-1.5 rounded-full transition-all"
                style={{ background: spinning ? `${config.color}22` : "rgba(255,255,255,0.05)", border: `1px solid ${spinning ? config.color : "rgba(255,255,255,0.1)"}`, color: spinning ? config.color : "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}
              >
                <Icon name="RotateCw" size={11} />
                {spinning ? "STOP SPIN" : "SPIN 360°"}
              </button>
            </div>
          </div>
        </div>

        {/* Right — Controls */}
        <div className="w-80 flex flex-col overflow-y-auto border-l" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
          <div className="p-5 space-y-6">

            {/* Character type */}
            <div>
              <label className="font-mono-jet text-xs block mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>CHARACTER TYPE</label>
              <div className="space-y-2">
                {(Object.keys(presets) as AvatarType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => { set("type", type); set("color", presets[type].defaultColor); set("accent", presets[type].defaultAccent); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: config.type === type ? `${presets[type].defaultColor}15` : "var(--surface-3)",
                      border: `1px solid ${config.type === type ? presets[type].defaultColor + "66" : "var(--surface-4)"}`,
                    }}
                  >
                    <span className="text-2xl">{presets[type].emoji}</span>
                    <div>
                      <div className="font-rajdhani font-bold text-sm text-white" style={{ letterSpacing: "0.05em" }}>{presets[type].label}</div>
                      <div className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem" }}>{presets[type].desc}</div>
                    </div>
                    {config.type === type && <Icon name="Check" size={16} className="ml-auto" style={{ color: presets[type].defaultColor }} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Body color */}
            <div>
              <label className="font-mono-jet text-xs block mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>BODY COLOR</label>
              <div className="grid grid-cols-6 gap-2">
                {bodyColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => set("color", c)}
                    className="w-9 h-9 rounded-lg transition-all duration-150 hover:scale-110"
                    style={{ background: c, boxShadow: config.color === c ? `0 0 12px ${c}` : undefined, outline: config.color === c ? `2px solid ${c}` : "2px solid transparent", outlineOffset: 2 }}
                  />
                ))}
              </div>
            </div>

            {/* Accent color */}
            <div>
              <label className="font-mono-jet text-xs block mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>ACCENT COLOR</label>
              <div className="grid grid-cols-6 gap-2">
                {accentColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => set("accent", c)}
                    className="w-9 h-9 rounded-lg transition-all duration-150 hover:scale-110"
                    style={{ background: c, boxShadow: config.accent === c ? `0 0 12px ${c}` : undefined, outline: config.accent === c ? `2px solid ${c}` : "2px solid transparent", outlineOffset: 2 }}
                  />
                ))}
              </div>
            </div>

            {/* Accessory */}
            <div>
              <label className="font-mono-jet text-xs block mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>ACCESSORY</label>
              <div className="grid grid-cols-2 gap-2">
                {accessories.map((a) => (
                  <button
                    key={a}
                    onClick={() => set("accessory", a)}
                    className="py-2 px-3 rounded-lg font-exo text-sm transition-all duration-200 text-left"
                    style={{
                      background: config.accessory === a ? "rgba(0,229,255,0.12)" : "var(--surface-3)",
                      border: `1px solid ${config.accessory === a ? "var(--neon-cyan)" : "var(--surface-4)"}`,
                      color: config.accessory === a ? "var(--neon-cyan)" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div>
              <label className="font-mono-jet text-xs block mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>BACKGROUND</label>
              <div className="grid grid-cols-3 gap-2">
                {bgColors.map((bg) => (
                  <button
                    key={bg.label}
                    onClick={() => set("bg", bg.value)}
                    className="h-10 rounded-lg transition-all duration-150 hover:scale-105 flex items-end justify-start px-2 pb-1"
                    style={{
                      background: bg.value,
                      outline: config.bg === bg.value ? "2px solid var(--neon-cyan)" : "2px solid transparent",
                      outlineOffset: 2,
                    }}
                  >
                    <span className="font-mono-jet text-white" style={{ fontSize: "0.5rem", opacity: 0.6 }}>{bg.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Save */}
            <button
              className="btn-neon-filled w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              onClick={() => onSave({ type: config.type, color: config.color, accent: config.accent })}
            >
              <Icon name="Sparkles" size={16} />
              SAVE & EQUIP AVATAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
