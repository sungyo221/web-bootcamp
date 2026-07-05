// ============================================================
// 🎮 게임 백로그 - 포트폴리오 프로젝트 (프론트엔드)
// ============================================================
// 서버(3000)의 /api/games 와 연동 (CRUD + 별점)
// ★ 서버 + React 둘 다 켜져 있어야 함! ★

import { useState, useEffect } from "react";

const API = "http://localhost:3000/api/games";

const statusColor = { "하고싶음": "#94a3b8", "하는중": "#3b82f6", "클리어": "#22c55e" };
const nextStatus = { "하고싶음": "하는중", "하는중": "클리어", "클리어": "하고싶음" };

const wrap = { fontFamily: "sans-serif", maxWidth: "560px", margin: "30px auto", padding: "0 16px" };
const row = { display: "flex", gap: "8px", marginBottom: "20px" };
const inputS = { flex: 1, padding: "12px", fontSize: "16px", border: "2px solid #cbd5e1", borderRadius: "8px" };
const addS = { padding: "12px 20px", border: "none", borderRadius: "8px", background: "#6366f1", color: "white", cursor: "pointer", fontSize: "16px" };
const card = { background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px 18px", margin: "10px 0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" };
const topRow = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const badge = (s) => ({ background: statusColor[s], color: "white", fontSize: "13px", padding: "3px 10px", borderRadius: "999px", marginLeft: "8px" });
const smallBtn = { border: "none", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", marginLeft: "6px", fontSize: "13px" };
const star = { cursor: "pointer", fontSize: "22px", lineHeight: 1 };

function App() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(API);
      const data = await res.json();
      setGames(data);
    }
    load();
  }, []);

  async function addGame() {
    if (title === "") return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });
    const newGame = await res.json();
    setGames([newGame, ...games]);
    setTitle("");
  }

  // 상태 변경 (PUT) — 별점은 기존 값 그대로 함께 보냄
  async function changeStatus(game) {
    const newStatus = nextStatus[game.status];
    await fetch(`${API}/${game.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, rating: game.rating }),
    });
    setGames(games.map((g) => g.id === game.id ? { ...g, status: newStatus } : g));
  }

  // ===== [TODO] 별점 매기기 (PUT) =====
  async function setRating(game, newRating) {

    /* [TODO] 서버에 PUT 으로 별점 변경 (상태는 기존 값 그대로 함께!)
       - await fetch(`${API}/${game.id}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ status: game.status, rating: newRating }),
         });
       - setGames(games.map((g) => g.id === game.id ? { ...g, rating: newRating } : g)); */
    await fetch(`${API}/${game.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({status: game.status, rating: newRating}),
    });
    setGames(games.map((g) => g.id === game.id ? {...g, rating: newRating} : g));
  }

  async function deleteGame(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setGames(games.filter((g) => g.id !== id));
  }

  return (
    <div style={wrap}>
      <h1>🎮 나의 게임 백로그</h1>

      <div style={row}>
        <input style={inputS} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="게임 이름 추가" />
        <button style={addS} onClick={addGame}>추가</button>
      </div>

      {games.map((game) => (
        <div key={game.id} style={card}>
          <div style={topRow}>
            <span><b>{game.title}</b><span style={badge(game.status)}>{game.status}</span></span>
            <span>
              <button style={{ ...smallBtn, background: "#e0e7ff", color: "#4338ca" }} onClick={() => changeStatus(game)}>상태변경</button>
              <button style={{ ...smallBtn, background: "#fee2e2", color: "#dc2626" }} onClick={() => deleteGame(game.id)}>삭제</button>
            </span>
          </div>
          {/* 별점: 1~5 별. 클릭하면 그 숫자로 별점 매김 */}
          <div style={{ marginTop: "8px" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} style={star} onClick={() => setRating(game, n)}>
                {n <= game.rating ? "⭐" : "☆"}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App
