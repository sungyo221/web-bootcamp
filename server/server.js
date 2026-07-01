// ============================================================
// 9주차 - 서버 CRUD (읽기 GET + 추가 POST + 삭제 DELETE) 🖥️
// ============================================================
import express from "express";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("안녕하세요! 제 첫 서버예요 🖥️");
});


// ===== 상품 데이터 (삭제로 바뀌니 let!) =====
let products = [
  { id: 1, name: "키보드", price: 35000 },
  { id: 2, name: "마우스", price: 18000 },
  { id: 3, name: "모니터", price: 250000 },
  { id: 4, name: "헤드셋", price: 89000 },
];

// GET: 목록 읽기
app.get("/api/products", (req, res) => {
  res.json(products);
});

// POST: 새 상품 추가
app.post("/api/products", (req, res) => {
  const newProduct = { id: Date.now(), name: req.body.name, price: req.body.price };
  products.push(newProduct);
  res.json(newProduct);
});


// ===== [TODO] DELETE: 상품 삭제 =====
// 주소의 :id 로 어떤 상품을 지울지 받아요 (req.params.id).
// products 에서 그 id 를 뺀 새 배열로 바꾸세요 (filter).
// 힌트:
//   app.delete("/api/products/:id", (req, res) => {
//     const id = Number(req.params.id);          // 주소에서 받은 id (글자→숫자)
//     products = products.filter((p) => p.id !== id);   // id 다른 것만 남기기
//     res.json({ ok: true });
//   });
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ok: true});
});


app.listen(3000, () => {
  console.log("✅ 서버 실행 중! → http://localhost:3000");
});
