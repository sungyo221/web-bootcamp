// ============================================================
// 9주차+ - SQLite DB 연동 서버 (진짜 저장!) 🗄️
// ============================================================
// 이제 데이터를 파일(members.db)에 저장 → 서버 껐다 켜도 유지!
// SQL 로 DB 에 명령해요.

import express from "express";
import { DatabaseSync } from "node:sqlite";   // Node 내장 SQLite

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});
app.use(express.json());

// ===== DB 연결 + 테이블 만들기 (제가 세팅) =====
const db = new DatabaseSync("members.db");   // 이 파일에 저장돼요 (없으면 자동 생성)

// members 테이블 만들기 (없을 때만). id는 자동 증가, name은 글자.
db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

// 처음 실행 시 데이터가 없으면 기본 회원 2명 넣기
const count = db.prepare("SELECT COUNT(*) AS c FROM members").get();
if (count.c === 0) {
  db.prepare("INSERT INTO members (name) VALUES (?)").run("정선교");
  db.prepare("INSERT INTO members (name) VALUES (?)").run("김철수");
}


// ===== (예시) GET: 회원 목록 읽기 (SELECT) =====
app.get("/api/members", (req, res) => {
  // .all() = 조건에 맞는 모든 행(row)을 배열로 가져오기
  const members = db.prepare("SELECT * FROM members").all();
  res.json(members);
});


// ===== [TODO 1] POST: 새 회원 추가 (INSERT) =====
app.post("/api/members", (req, res) => {
  const name = req.body.name;

  /* [TODO 1] SQL 로 새 회원을 DB 에 넣으세요.
     - const result = db.prepare("INSERT INTO members (name) VALUES (?)").run(name);
       (? 자리에 name 이 안전하게 들어가요. result.lastInsertRowid = 새로 생긴 id)
     - res.json({ id: result.lastInsertRowid, name: name }); */
  const result = db.prepare("INSERT INTO members (name) VALUES (?)").run(name);
  res.json({id:result.lastInsertRowid, name: name});

});


// ===== [TODO 2] DELETE: 회원 삭제 (DELETE) =====
app.delete("/api/members/:id", (req, res) => {
  const id = Number(req.params.id);

  /* [TODO 2] SQL 로 그 id 회원을 DB 에서 지우세요.
     - db.prepare("DELETE FROM members WHERE id = ?").run(id);
     - res.json({ ok: true }); */
  db.prepare("DELETE FROM members WHERE id = ?").run(id);
  res.json({ok:true});

});


app.listen(3000, () => {
  console.log("✅ SQLite 서버 실행 중! → http://localhost:3000");
});
