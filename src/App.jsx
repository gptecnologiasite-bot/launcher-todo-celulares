import { useState, useMemo, useEffect } from "react";
import "./App.css";

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "fav", label: "Favoritos" },
  { id: "comm", label: "Comunicacao" },
  { id: "media", label: "Midia" },
  { id: "tools", label: "Ferramentas" },
  { id: "social", label: "Social" },
];

const APPS = [
  { name: "WhatsApp", url: "https://web.whatsapp.com", icon: "https://cdn.simpleicons.org/whatsapp/white", color: "#25D366", cat: "comm" },
  { name: "Gmail", url: "https://mail.google.com", icon: "https://cdn.simpleicons.org/gmail/white", color: "#EA4335", cat: "comm" },
  { name: "Telegram", url: "https://web.telegram.org", icon: "https://cdn.simpleicons.org/telegram/white", color: "#26A5E4", cat: "comm" },
  { name: "Messenger", url: "https://messenger.com", icon: "https://cdn.simpleicons.org/messenger/white", color: "#0084FF", cat: "comm" },
  { name: "YouTube", url: "https://youtube.com", icon: "https://cdn.simpleicons.org/youtube/white", color: "#FF0000", cat: "media" },
  { name: "Netflix", url: "https://netflix.com", icon: "https://cdn.simpleicons.org/netflix/white", color: "#E50914", cat: "media" },
  { name: "Spotify", url: "https://open.spotify.com", icon: "https://cdn.simpleicons.org/spotify/white", color: "#1DB954", cat: "media" },
  { name: "TikTok", url: "https://tiktok.com", icon: "https://cdn.simpleicons.org/tiktok/white", color: "#000000", cat: "media" },
  { name: "Instagram", url: "https://instagram.com", icon: "https://cdn.simpleicons.org/instagram/white", color: "#E4405F", cat: "media" },
  { name: "Google", url: "https://google.com", icon: "https://cdn.simpleicons.org/google/white", color: "#4285F4", cat: "tools" },
  { name: "Maps", url: "https://maps.google.com", icon: "https://cdn.simpleicons.org/googlemaps/white", color: "#34A853", cat: "tools" },
  { name: "Drive", url: "https://drive.google.com", icon: "https://cdn.simpleicons.org/googledrive/white", color: "#0F9D58", cat: "tools" },
  { name: "Calendar", url: "https://calendar.google.com", icon: "https://cdn.simpleicons.org/googlecalendar/white", color: "#4285F4", cat: "tools" },
  { name: "Photos", url: "https://photos.google.com", icon: "https://cdn.simpleicons.org/googlephotos/white", color: "#FBBC05", cat: "tools" },
  { name: "Notion", url: "https://notion.so", icon: "https://cdn.simpleicons.org/notion/white", color: "#000000", cat: "tools" },
  { name: "Trello", url: "https://trello.com", icon: "https://cdn.simpleicons.org/trello/white", color: "#0079BF", cat: "tools" },
  { name: "ChatGPT", url: "https://chat.openai.com", icon: "https://cdn.simpleicons.org/openai/white", color: "#10A37F", cat: "tools" },
  { name: "Claude", url: "https://claude.ai", icon: "https://cdn.simpleicons.org/anthropic/white", color: "#D97757", cat: "tools" },
  { name: "Gemini", url: "https://gemini.google.com", icon: "https://cdn.simpleicons.org/googlegemini/white", color: "#4285F4", cat: "tools" },
  { name: "Amazon", url: "https://amazon.com", icon: "https://cdn.simpleicons.org/amazon/white", color: "#FF9900", cat: "tools" },
  { name: "Wikipedia", url: "https://wikipedia.org", icon: "https://cdn.simpleicons.org/wikipedia/white", color: "#636466", cat: "tools" },
  { name: "GitHub", url: "https://github.com", icon: "https://cdn.simpleicons.org/github/white", color: "#181717", cat: "tools" },
  { name: "Facebook", url: "https://facebook.com", icon: "https://cdn.simpleicons.org/facebook/white", color: "#1877F2", cat: "social" },
  { name: "Twitter/X", url: "https://x.com", icon: "https://cdn.simpleicons.org/x/white", color: "#000000", cat: "social" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "https://cdn.simpleicons.org/linkedin/white", color: "#0A66C2", cat: "social" },
  { name: "Reddit", url: "https://reddit.com", icon: "https://cdn.simpleicons.org/reddit/white", color: "#FF4500", cat: "social" },
];

function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favs") || "[]"); } catch { return []; }
  });
  const time = useClock();

  const toggleFav = (name) => {
    setFavs((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
      localStorage.setItem("favs", JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = APPS;
    if (category === "fav") list = list.filter((a) => favs.includes(a.name));
    else if (category !== "all") list = list.filter((a) => a.cat === category);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((a) => a.name.toLowerCase().includes(q));
    return list;
  }, [query, category, favs]);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");

  return (
    <div className="launcher">
      <video className="bg-video" autoPlay muted loop playsInline ref={(v) => { if (v) v.playbackRate = 2; }}>
        <source src="/planeta.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay" aria-hidden="true" />
      <header className="launcher-header">
        <div className="clock">
          <span className="clock-time">{hh}:{mm}</span>
        </div>
        <h1>Launcher</h1>
        <input
          className="search"
          type="search"
          placeholder="Buscar app..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <nav className="categories">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`cat-btn ${category === c.id ? "active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="grid">
        {filtered.length === 0 ? (
          <p className="empty">Nenhum app encontrado</p>
        ) : (
          filtered.map((app) => (
            <div key={app.name} className="app-wrap">
              <a
                className="app-icon"
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--accent": app.color }}
              >
                <span className="icon" style={{ background: app.color }}>
                  <img src={app.icon} alt={app.name} width="28" height="28" />
                </span>
                <span className="label">{app.name}</span>
              </a>
              <button
                className={`fav-btn ${favs.includes(app.name) ? "active" : ""}`}
                onClick={() => toggleFav(app.name)}
                aria-label="Favorito"
              >
                {favs.includes(app.name) ? "★" : "☆"}
              </button>
            </div>
          ))
        )}
      </main>

      <footer className="launcher-footer">
        <small>{filtered.length} de {APPS.length} apps • {favs.length} favoritos</small>
      </footer>
    </div>
  );
}
