// ============================================================
// 🎮 게임 백로그 - 포트폴리오 프로젝트 (프론트엔드)
// ============================================================
// 서버(3000)의 /api/games 와 연동 (CRUD)
// ★ 서버 + React 둘 다 켜져 있어야 함! ★

import { useState, useEffect } from "react";

const API = "http://localhost:3000/api/games";

// 상태별 색 + 다음 상태 (하고싶음 → 하는중 → 클리어 → 하고싶음)
const statusColor = { "하고싶음": "#94a3b8", "하는중": "#3b82f6", "클리어": "#22c55e" };
const nextStatus = { "하고싶음": "하는중", "하는중": "클리어", "클리어": "하고싶음" };

const wrap = { fontFamily: "sans-serif", maxWidth: "540px", margin: "30px auto", padding: "0 16px" };
const row = { display: "flex", gap: "8px", marginBottom: "20px" };
const inputS = { flex: 1, padding: "12px", fontSize: "16px", border: "2px solid #cbd5e1", borderRadius: "8px" };
const addS = { padding: "12px 20px", border: "none", borderRadius: "8px", background: "#6366f1", color: "white", cursor: "pointer", fontSize: "16px" };
const card = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px 18px", margin: "10px 0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" };
const badge = (s) => ({ background: statusColor[s], color: "white", fontSize: "13px", padding: "3px 10px", borderRadius: "999px", marginLeft: "8px" });
const smallBtn = { border: "none", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", marginLeft: "6px", fontSize: "13px" };

function App() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");

  // 읽기 (GET)
  useEffect(() => {
    async function load() {
      const res = await fetch(API);
      const data = await res.json();
      setGames(data);
    }
    load();
  }, []);

  // 추가 (POST) — 이미 완성
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

  // ===== [TODO 1] 상태 변경 (PUT) — 새 개념! =====
  async function changeStatus(game) {
    const newStatus = nextStatus[game.status];   // 다음 상태 계산

    /* [TODO 1] 서버에 PUT 으로 상태 변경 요청
       - await fetch(`${API}/${game.id}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ status: newStatus }),
         });
       그다음 화면도 갱신 (그 게임의 status 만 새 값으로):
       - setGames(games.map((g) =>
           g.id === game.id ? { ...g, status: newStatus } : g
         )); */
    await fetch(`${API}/${game.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({status: newStatus}),
    });
    setGames(games.map((g) => 
    g.id === game.id ? {...g, status: newStatus} : g
  ));

  }

  // ===== [TODO 2] 삭제 (DELETE) =====
  async function deleteGame(id) {

    /* [TODO 2] 서버에 DELETE + 화면에서 빼기
       - await fetch(`${API}/${id}`, { method: "DELETE" });
       - setGames(games.filter((g) => g.id !== id)); */
    await fetch(`${API}/${id}`, {method: "DELETE"});
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
          <span>
            <b>{game.title}</b>
            <span style={badge(game.status)}>{game.status}</span>
          </span>
          <span>
            <button style={{ ...smallBtn, background: "#e0e7ff", color: "#4338ca" }} onClick={() => changeStatus(game)}>상태변경</button>
            <button style={{ ...smallBtn, background: "#fee2e2", color: "#dc2626" }} onClick={() => deleteGame(game.id)}>삭제</button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default App
