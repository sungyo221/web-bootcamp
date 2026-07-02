// ============================================================
// 9주차 복습 - 회원 명단 (풀스택 CRUD) 📇
// ============================================================
// 서버(3000)의 /api/members 를 읽고(GET) · 추가(POST) · 삭제(DELETE)
// ★ 서버 + React 둘 다 켜져 있어야 함! ★

import { useState, useEffect } from "react";

const wrap = { fontFamily: "sans-serif", maxWidth: "460px", margin: "30px auto", padding: "0 16px" };
const row = { display: "flex", gap: "8px", marginBottom: "16px" };
const inputS = { flex: 1, padding: "10px", fontSize: "15px", border: "2px solid #cbd5e1", borderRadius: "8px" };
const btnS = { padding: "10px 18px", border: "none", borderRadius: "8px", background: "#6366f1", color: "white", cursor: "pointer" };
const liS = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f1f5f9", padding: "12px 16px", margin: "8px 0", borderRadius: "8px" };
const delS = { border: "none", background: "#ef4444", color: "white", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" };

const API = "http://localhost:3000/api/members";

function App() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");

  // ===== (예시) 읽기 GET =====
  useEffect(() => {
    async function load() {
      const res = await fetch(API);
      const data = await res.json();
      setMembers(data);
    }
    load();
  }, []);

  // ===== [복습 1] 추가 (POST) =====
  async function addMember() {
    if (name === "") return;

    /* [복습 1] 서버로 POST (이름만 보냄) → 돌아온 회원을 받아 화면에 추가 + 입력창 비우기
       - const res = await fetch(API, {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ name: name }),
         });
       - const newMember = await res.json();
       - setMembers([...members, newMember]);
       - setName(""); */
    const res = await fetch(API, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name:name}),
    });
    const newMember = await res.json();
    setMembers([...members, newMember]);
    setName("");
  }

  // ===== [복습 2] 삭제 (DELETE) =====
  async function deleteMember(id) {

    /* [복습 2] 서버에 DELETE 요청 + 화면에서도 빼기
       - await fetch(`${API}/${id}`, { method: "DELETE" });
       - setMembers(members.filter((m) => m.id !== id)); */
    await fetch(`${API}/${id}`, {method: "DELETE"});
    setMembers(members.filter((m) => m.id !== id));
  }

  return (
    <div style={wrap}>
      <h1>📇 회원 명단</h1>

      <div style={row}>
        <input style={inputS} value={name} onChange={(e) => setName(e.target.value)} placeholder="회원 이름" />
        <button style={btnS} onClick={addMember}>추가</button>
      </div>

      {/* 회원 목록 (인라인, 컴포넌트 안 써도 OK) */}
      {members.map((member) => (
        <div key={member.id} style={liS}>
          <span>{member.name}</span>
          <button style={delS} onClick={() => deleteMember(member.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
}

export default App
