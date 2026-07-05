// ============================================================
// 🎮 게임 백로그 - 포트폴리오 프로젝트 (디자인 개선판)
// ============================================================
import { useState, useEffect } from "react";

const API = "https://game-backlog-1pl3.onrender.com/api/games";

const statusColor = { "하고싶음": "#94a3b8", "하는중": "#3b82f6", "클리어": "#22c55e" };
const nextStatus = { "하고싶음": "하는중", "하는중": "클리어", "클리어": "하고싶음" };
const FILTERS = ["전체", "하고싶음", "하는중", "클리어"];

// ===== 스타일 =====
const page = { minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif", padding: "40px 16px" };
const wrap = { maxWidth: "600px", margin: "0 auto" };
const header = { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: "16px", padding: "28px 32px", boxShadow: "0 8px 24px rgba(99,102,241,.3)" };
const h1 = { margin: 0, fontSize: "28px" };
const sub = { margin: "6px 0 0", opacity: .85, fontSize: "14px" };
const statRow = { display: "flex", gap: "10px", marginTop: "18px" };
const stat = { flex: 1, background: "rgba(255,255,255,.15)", borderRadius: "10px", padding: "10px", textAlign: "center" };
const statNum = { fontSize: "20px", fontWeight: "bold" };
const statLabel = { fontSize: "12px", opacity: .9 };

const row = { display: "flex", gap: "8px", margin: "22px 0 14px" };
const inputS = { flex: 1, padding: "13px 16px", fontSize: "15px", border: "1px solid #cbd5e1", borderRadius: "10px", outline: "none" };
const addS = { padding: "13px 22px", border: "none", borderRadius: "10px", background: "#6366f1", color: "white", cursor: "pointer", fontSize: "15px", fontWeight: "bold" };

const tabs = { display: "flex", gap: "6px", marginBottom: "14px" };
const tab = (active) => ({ padding: "7px 14px", borderRadius: "999px", border: "none", cursor: "pointer", fontSize: "13px", background: active ? "#6366f1" : "#e2e8f0", color: active ? "white" : "#475569", fontWeight: active ? "bold" : "normal" });

const card = (s) => ({ background: "white", borderRadius: "12px", padding: "16px 18px", margin: "10px 0", boxShadow: "0 1px 3px rgba(0,0,0,.08)", borderLeft: `4px solid ${statusColor[s]}` });
const topRow = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const titleS = { fontSize: "17px", fontWeight: "bold", color: "#1e293b" };
const badge = (s) => ({ background: statusColor[s], color: "white", fontSize: "12px", padding: "3px 10px", borderRadius: "999px", marginLeft: "10px", verticalAlign: "middle" });
const smallBtn = (bg, c) => ({ border: "none", borderRadius: "7px", padding: "6px 11px", cursor: "pointer", marginLeft: "6px", fontSize: "13px", background: bg, color: c });
const star = { cursor: "pointer", fontSize: "20px", lineHeight: 1 };
const empty = { textAlign: "center", color: "#94a3b8", padding: "40px 0" };

function App() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("전체");

  useEffect(() => {
    async function load() {
      const res = await fetch(API);
      setGames(await res.json());
    }
    load();
  }, []);

  async function addGame() {
    if (title.trim() === "") return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setGames([await res.json(), ...games]);
    setTitle("");
  }

  async function changeStatus(game) {
    const newStatus = nextStatus[game.status];
    await fetch(`${API}/${game.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, rating: game.rating }),
    });
    setGames(games.map((g) => g.id === game.id ? { ...g, status: newStatus } : g));
  }

  async function setRating(game, newRating) {
    await fetch(`${API}/${game.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: game.status, rating: newRating }),
    });
    setGames(games.map((g) => g.id === game.id ? { ...g, rating: newRating } : g));
  }

  async function deleteGame(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setGames(games.filter((g) => g.id !== id));
  }

  // 상태별 개수 + 필터
  const count = (s) => games.filter((g) => g.status === s).length;
  const shown = filter === "전체" ? games : games.filter((g) => g.status === filter);

  return (
    <div style={page}>
      <div style={wrap}>
        <header style={header}>
          <h1 style={h1}>🎮 나의 게임 백로그</h1>
          <p style={sub}>플레이할 게임을 기록하고 관리하세요</p>
          <div style={statRow}>
            <div style={stat}><div style={statNum}>{count("하고싶음")}</div><div style={statLabel}>하고싶음</div></div>
            <div style={stat}><div style={statNum}>{count("하는중")}</div><div style={statLabel}>하는중</div></div>
            <div style={stat}><div style={statNum}>{count("클리어")}</div><div style={statLabel}>클리어</div></div>
          </div>
        </header>

        <div style={row}>
          <input style={inputS} value={title} onChange={(e) => setTitle(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && addGame()} placeholder="게임 이름을 입력하세요" />
          <button style={addS} onClick={addGame}>+ 추가</button>
        </div>

        <div style={tabs}>
          {FILTERS.map((f) => (
            <button key={f} style={tab(filter === f)} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        {shown.length === 0
          ? <div style={empty}>게임이 없어요. 위에서 추가해보세요! 🎮</div>
          : shown.map((game) => (
            <div key={game.id} style={card(game.status)}>
              <div style={topRow}>
                <span><span style={titleS}>{game.title}</span><span style={badge(game.status)}>{game.status}</span></span>
                <span>
                  <button style={smallBtn("#e0e7ff", "#4338ca")} onClick={() => changeStatus(game)}>상태변경</button>
                  <button style={smallBtn("#fee2e2", "#dc2626")} onClick={() => deleteGame(game.id)}>삭제</button>
                </span>
              </div>
              <div style={{ marginTop: "10px" }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} style={star} onClick={() => setRating(game, n)}>
                    {n <= game.rating ? "⭐" : "☆"}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App
