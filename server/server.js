// ============================================================
// 9주차 - 내 서버 (Node.js + Express) 🖥️  + 프론트 연결
// ============================================================
import express from "express";

const app = express();

// ===== CORS 허용 (React 5173 에서 이 서버 3000 을 부를 수 있게) =====
// 다른 주소에서의 요청을 허용한다는 표시예요. (제가 넣어둠)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


// ===== (예시) 인사말 =====
app.get("/", (req, res) => {
  res.send("안녕하세요! 제 첫 서버예요 🖥️");
});

app.get("/hello", (req, res) => {
  res.send("반갑습니다! 👋");
});

app.get("/api/profile", (req, res) => {
  res.json({ name: "정선교", job: "웹개발자", year: 2026 });
});


// ===== 상품 데이터 (서버가 가진 '데이터베이스' 역할, 지금은 그냥 배열) =====
const products = [
  { id: 1, name: "키보드", price: 35000 },
  { id: 2, name: "마우스", price: 18000 },
  { id: 3, name: "모니터", price: 250000 },
  { id: 4, name: "헤드셋", price: 89000 },
];

// ===== [TODO] "/api/products" 주소 만들기 =====
// products 배열을 JSON 으로 응답하세요 (res.json).
// 힌트:
//   app.get("/api/products", (req, res) => {
//     res.json(products);
//   });
app.get("/api/products", (req, res) => {
  res.json(products);
});


// ===== 서버 켜기 =====
app.listen(3000, () => {
  console.log("✅ 서버 실행 중! → http://localhost:3000");
});
