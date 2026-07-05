// ============================================================
// 🎮 게임 백로그 - 포트폴리오 프로젝트 (백엔드)
// ============================================================
// React + Express + SQLite 로 만드는 게임 관리 API (CRUD)
// games: id, title, status(하고싶음/하는중/클리어), rating(0~5)

import express from "express";
import { DatabaseSync } from "node:sqlite";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(express.json());

// ===== DB 연결 + 테이블 (제가 세팅) =====
const db = new DatabaseSync("games.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT '하고싶음',
    rating INTEGER NOT NULL DEFAULT 0
  )
`);
// 처음이면 예시 게임 2개
const count = db.prepare("SELECT COUNT(*) AS c FROM games").get();
if (count.c === 0) {
  db.prepare("INSERT INTO games (title, status, rating) VALUES (?, ?, ?)").run("젤다의 전설", "클리어", 5);
  db.prepare("INSERT INTO games (title, status, rating) VALUES (?, ?, ?)").run("발더스 게이트 3", "하는중", 4);
}


// ===== (예시) GET: 게임 목록 =====
app.get("/api/games", (req, res) => {
  const games = db.prepare("SELECT * FROM games ORDER BY id DESC").all();
  res.json(games);
});


// ===== [TODO 1] POST: 게임 추가 =====
app.post("/api/games", (req, res) => {
  const title = req.body.title;

  /* [TODO 1] title 로 새 게임 추가 (status·rating 은 DB 기본값 사용)
     - const result = db.prepare("INSERT INTO games (title) VALUES (?)").run(title);
     - const game = db.prepare("SELECT * FROM games WHERE id = ?").get(result.lastInsertRowid);
     - res.json(game);   // 새로 추가된 게임 전체(기본 status/rating 포함) 응답 */
  const result = db.prepare("INSERT INTO games (title) VALUES (?)").run(title);
  const game = db.prepare("SELECT * FROM games WHERE id = ?").get(result.lastInsertRowid);
  res.json(game);

});


// ===== PUT: 게임 상태 + 별점 수정 =====
app.put("/api/games/:id", (req, res) => {
  const id = Number(req.params.id);
  const status = req.body.status;   // 바꿀 상태
  const rating = req.body.rating;   // 바꿀 별점

  // 한 번에 status 와 rating 둘 다 갱신 (? 순서대로: status, rating, id)
  db.prepare("UPDATE games SET status = ?, rating = ? WHERE id = ?").run(status, rating, id);
  res.json({ ok: true });

});


// ===== [TODO 3] DELETE: 게임 삭제 =====
app.delete("/api/games/:id", (req, res) => {
  const id = Number(req.params.id);

  /* [TODO 3] 그 id 게임을 삭제
     - db.prepare("DELETE FROM games WHERE id = ?").run(id);
     - res.json({ ok: true }); */
  db.prepare("DELETE FROM games WHERE id = ?").run(id);
  res.json({ok:true});

});


app.listen(3000, () => {
  console.log("🎮 게임 백로그 서버 실행 중! → http://localhost:3000");
});
