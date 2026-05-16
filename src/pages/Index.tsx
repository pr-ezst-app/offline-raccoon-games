import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import HomePage from "@/components/pages/HomePage";
import GamesPage from "@/components/pages/GamesPage";
import CategoriesPage from "@/components/pages/CategoriesPage";
import DownloadsPage from "@/components/pages/DownloadsPage";
import ProfilePage from "@/components/pages/ProfilePage";
import SettingsPage from "@/components/pages/SettingsPage";
import CreatePage from "@/components/pages/CreatePage";
import MyGamesPage from "@/components/pages/MyGamesPage";

export type Page = "home" | "games" | "categories" | "downloads" | "profile" | "settings" | "create" | "mygames";

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage onNavigate={setActivePage} />;
      case "games": return <GamesPage />;
      case "categories": return <CategoriesPage />;
      case "downloads": return <DownloadsPage />;
      case "profile": return <ProfilePage />;
      case "settings": return <SettingsPage />;
      case "create": return <CreatePage />;
      case "mygames": return <MyGamesPage />;
      default: return <HomePage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "var(--surface-1)" }}>
      <div className="scanlines fixed inset-0 z-50 pointer-events-none" />
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
