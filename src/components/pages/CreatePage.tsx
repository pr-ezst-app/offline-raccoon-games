import { useState } from "react";
import Icon from "@/components/ui/icon";

const contentTypes = [
  { id: "game", label: "GAME", icon: "Gamepad2", desc: "Upload and publish a playable game", color: "var(--neon-cyan)" },
  { id: "anime", label: "ANIME / CARTOON", icon: "Tv", desc: "Upload animation series or episodes", color: "var(--neon-magenta)" },
  { id: "manhwa", label: "MANHWA / WEBTOON", icon: "BookOpen", desc: "Publish colored comics or manga", color: "#a78bfa" },
];

const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Shonen", "Shojo", "Sports", "Thriller", "Slice of Life"];

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState("game");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [localMp, setLocalMp] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState(2);

  const toggleGenre = (g: string) => setSelectedGenres((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const selectedType = contentTypes.find((t) => t.id === contentType)!;

  return (
    <div className="animate-fade-in min-h-full">
      <div className="px-8 py-7 border-b" style={{ borderColor: "var(--surface-4)" }}>
        <h1 className="font-rajdhani font-bold text-4xl text-white mb-1" style={{ letterSpacing: "0.06em" }}>CREATE & PUBLISH</h1>
        <p className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Share your game, anime, or comics with the Raccoon community</p>
      </div>

      {/* Steps */}
      <div className="flex items-center px-8 py-4 gap-3 border-b" style={{ background: "var(--surface-2)", borderColor: "var(--surface-4)" }}>
        {["Content Type", "Details", "Files", "Publish"].map((s, i) => {
          const idx = i + 1;
          const done = step > idx;
          const active = step === idx;
          return (
            <div key={s} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-rajdhani font-bold text-sm flex-shrink-0"
                  style={{
                    background: done ? "var(--neon-cyan)" : active ? "rgba(0,229,255,0.15)" : "var(--surface-3)",
                    border: `1px solid ${done || active ? "var(--neon-cyan)" : "var(--surface-4)"}`,
                    color: done ? "var(--surface-1)" : active ? "var(--neon-cyan)" : "rgba(255,255,255,0.3)",
                  }}>
                  {done ? <Icon name="Check" size={13} /> : idx}
                </div>
                <span className="font-exo text-sm" style={{ color: active ? "var(--neon-cyan)" : done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" }}>{s}</span>
              </div>
              {i < 3 && <div className="w-8 h-px" style={{ background: done ? "var(--neon-cyan)" : "var(--surface-4)" }} />}
            </div>
          );
        })}
      </div>

      <div className="p-8 max-w-2xl">
        {/* Step 1 */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="font-rajdhani font-bold text-2xl text-white mb-5" style={{ letterSpacing: "0.04em" }}>WHAT ARE YOU PUBLISHING?</h2>
            <div className="space-y-3 mb-8">
              {contentTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setContentType(t.id)}
                  className="w-full flex items-center gap-5 p-5 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: contentType === t.id ? `${t.color}10` : "var(--surface-2)",
                    border: `1px solid ${contentType === t.id ? t.color + "55" : "var(--surface-4)"}`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${t.color}18`, border: `1px solid ${t.color}33` }}>
                    <Icon name={t.icon} size={22} style={{ color: t.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-rajdhani font-bold text-xl text-white" style={{ letterSpacing: "0.05em" }}>{t.label}</div>
                    <div className="font-exo text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{t.desc}</div>
                  </div>
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: contentType === t.id ? t.color : "var(--surface-4)", background: contentType === t.id ? t.color : "transparent" }}>
                    {contentType === t.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
            <button className="btn-neon-filled px-8 py-3 rounded-xl flex items-center gap-2" onClick={() => setStep(2)}>
              CONTINUE <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            <h2 className="font-rajdhani font-bold text-2xl text-white mb-5" style={{ letterSpacing: "0.04em" }}>DETAILS</h2>

            <div>
              <label className="font-mono-jet text-xs block mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>TITLE</label>
              <input
                type="text"
                placeholder={`Enter ${contentType} title...`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-exo text-sm outline-none"
                style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.85)" }}
              />
            </div>

            <div>
              <label className="font-mono-jet text-xs block mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>DESCRIPTION</label>
              <textarea
                placeholder="Describe your creation..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl font-exo text-sm outline-none resize-none"
                style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)", color: "rgba(255,255,255,0.85)" }}
              />
            </div>

            <div>
              <label className="font-mono-jet text-xs block mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>GENRES (SELECT UP TO 3)</label>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className="px-3 py-1.5 rounded-lg font-exo text-sm transition-all duration-150"
                    style={{
                      background: selectedGenres.includes(g) ? `${selectedType.color}15` : "var(--surface-2)",
                      border: `1px solid ${selectedGenres.includes(g) ? selectedType.color + "55" : "var(--surface-4)"}`,
                      color: selectedGenres.includes(g) ? selectedType.color : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {contentType === "game" && (
              <div className="p-4 rounded-xl" style={{ background: "var(--surface-2)", border: "1px solid rgba(57,255,20,0.2)" }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-exo font-medium text-white text-sm">Local Multiplayer Support</div>
                    <div className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Does your game support multiple controllers?</div>
                  </div>
                  <button
                    onClick={() => setLocalMp(!localMp)}
                    className="relative w-12 h-6 rounded-full transition-all"
                    style={{ background: localMp ? "#39ff14" : "var(--surface-4)", boxShadow: localMp ? "0 0 10px rgba(57,255,20,0.4)" : undefined }}
                  >
                    <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md"
                      style={{ left: localMp ? "calc(100% - 1.375rem)" : "0.125rem" }} />
                  </button>
                </div>
                {localMp && (
                  <div className="flex items-center gap-3">
                    <span className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Max players:</span>
                    <div className="flex gap-2">
                      {[2, 4, 8].map((n) => (
                        <button key={n} onClick={() => setMaxPlayers(n)} className="w-10 h-9 rounded font-rajdhani font-bold text-sm transition-all"
                          style={{ background: maxPlayers === n ? "rgba(57,255,20,0.15)" : "var(--surface-3)", border: `1px solid ${maxPlayers === n ? "#39ff14" : "var(--surface-4)"}`, color: maxPlayers === n ? "#39ff14" : "rgba(255,255,255,0.4)" }}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button className="btn-neon-cyan px-5 py-2.5 rounded-xl text-sm" onClick={() => setStep(1)}>← BACK</button>
              <button className="btn-neon-filled px-8 py-2.5 rounded-xl text-sm flex items-center gap-2" onClick={() => setStep(3)}>
                CONTINUE <Icon name="ChevronRight" size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="font-rajdhani font-bold text-2xl text-white mb-5" style={{ letterSpacing: "0.04em" }}>UPLOAD FILES</h2>

            {[
              { label: "COVER IMAGE", desc: "960×540px or larger, JPG/PNG", icon: "Image" },
              { label: contentType === "game" ? "GAME FILES" : contentType === "anime" ? "VIDEO FILES" : "PAGES (ZIP)", desc: contentType === "game" ? ".zip or .exe bundle" : contentType === "anime" ? "MP4, MKV supported" : "ZIP of image pages", icon: contentType === "game" ? "Package" : contentType === "anime" ? "Film" : "FileArchive" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl cursor-pointer transition-all duration-200 hover:border-cyan-400"
                style={{ background: "var(--surface-2)", border: "2px dashed var(--surface-4)" }}>
                <Icon name={f.icon} size={32} style={{ color: "rgba(255,255,255,0.2)" }} />
                <div className="text-center">
                  <div className="font-rajdhani font-bold text-lg text-white" style={{ letterSpacing: "0.06em" }}>{f.label}</div>
                  <div className="font-exo text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{f.desc}</div>
                </div>
                <button className="btn-neon-cyan px-5 py-2 rounded-lg text-xs">BROWSE FILES</button>
              </div>
            ))}

            <div className="flex gap-3 mt-6">
              <button className="btn-neon-cyan px-5 py-2.5 rounded-xl text-sm" onClick={() => setStep(2)}>← BACK</button>
              <button className="btn-neon-filled px-8 py-2.5 rounded-xl text-sm flex items-center gap-2" onClick={() => setStep(4)}>
                CONTINUE <Icon name="ChevronRight" size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="font-rajdhani font-bold text-2xl text-white mb-5" style={{ letterSpacing: "0.04em" }}>READY TO PUBLISH?</h2>
            <div className="p-5 rounded-xl mb-6 space-y-3" style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}>
              {[
                { label: "Type", value: selectedType.label },
                { label: "Title", value: title || "—" },
                { label: "Genres", value: selectedGenres.join(", ") || "—" },
                contentType === "game" ? { label: "Local Multiplayer", value: localMp ? `Yes — up to ${maxPlayers} players` : "No" } : null,
              ].filter(Boolean).map((row) => (
                <div key={row!.label} className="flex items-center justify-between">
                  <span className="font-mono-jet text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem" }}>{row!.label}</span>
                  <span className="font-exo text-sm text-white">{row!.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="btn-neon-cyan px-5 py-2.5 rounded-xl text-sm" onClick={() => setStep(3)}>← BACK</button>
              <button className="btn-neon-filled px-8 py-2.5 rounded-xl text-sm flex items-center gap-2">
                <Icon name="Rocket" size={16} />
                PUBLISH NOW
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
