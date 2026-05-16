import Icon from "@/components/ui/icon";
import { Page } from "@/pages/Index";

interface NavItem {
  id: Page;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "games", label: "Games", icon: "Gamepad2" },
  { id: "categories", label: "Categories", icon: "LayoutGrid" },
  { id: "mygames", label: "My Games", icon: "Library" },
  { id: "downloads", label: "Downloads", icon: "Download" },
  { id: "create", label: "Create", icon: "Plus" },
];

const bottomItems: NavItem[] = [
  { id: "profile", label: "Profile", icon: "User" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside
      className="flex flex-col w-[220px] min-w-[220px] h-full border-r"
      style={{
        background: "var(--surface-2)",
        borderColor: "var(--surface-4)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b" style={{ borderColor: "var(--surface-4)" }}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold animate-pulse-neon"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(157,78,221,0.15))",
            border: "1px solid rgba(0,229,255,0.4)",
            color: "var(--neon-cyan)",
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          🦝
        </div>
        <div>
          <div className="font-rajdhani font-bold text-xl leading-none" style={{ color: "var(--neon-cyan)" }}>
            RACCOON
          </div>
          <div className="font-mono-jet text-xs" style={{ color: "rgba(0,229,255,0.45)", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
            GAME LAUNCHER
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-exo font-medium transition-all duration-200 text-left ${
                isActive ? "nav-item-active" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
              style={isActive ? { borderLeft: "2px solid var(--neon-cyan)" } : { borderLeft: "2px solid transparent" }}
            >
              <Icon
                name={item.icon}
                size={17}
                style={{ color: isActive ? "var(--neon-cyan)" : undefined }}
              />
              <span style={{ letterSpacing: "0.04em" }}>{item.label}</span>
              {item.id === "create" && (
                <span
                  className="ml-auto text-xs px-1.5 py-0.5 rounded font-mono-jet"
                  style={{ background: "rgba(0,229,255,0.1)", color: "var(--neon-cyan)", fontSize: "0.6rem" }}
                >
                  NEW
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="mx-3 mb-3 p-3 rounded-lg" style={{ background: "var(--surface-3)", border: "1px solid var(--surface-4)" }}>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--neon-green)", boxShadow: "0 0 6px var(--neon-green)" }} />
          <span className="font-mono-jet text-xs" style={{ color: "#39ff14", fontSize: "0.65rem" }}>ONLINE</span>
        </div>
        <div className="font-exo text-xs text-gray-500">3 friends online</div>
        <div className="mt-2 flex items-center gap-1.5">
          <Icon name="Gamepad" size={12} style={{ color: "rgba(157,78,221,0.7)" }} />
          <span className="font-mono-jet text-xs" style={{ color: "rgba(157,78,221,0.7)", fontSize: "0.62rem" }}>2 local sessions</span>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="border-t px-3 py-3 space-y-1" style={{ borderColor: "var(--surface-4)" }}>
        {bottomItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-exo transition-all duration-200 text-left ${
                isActive ? "nav-item-active" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
              style={isActive ? { borderLeft: "2px solid var(--neon-cyan)" } : { borderLeft: "2px solid transparent" }}
            >
              <Icon name={item.icon} size={16} style={{ color: isActive ? "var(--neon-cyan)" : undefined }} />
              <span style={{ letterSpacing: "0.04em" }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
