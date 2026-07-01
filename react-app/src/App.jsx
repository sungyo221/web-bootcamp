// ============================================================
// 9주차 - 풀스택 CRUD (읽기 + 추가 + 삭제) 🔗
// ============================================================
// ★ 서버(3000) + React(5173) 둘 다 켜져 있어야 함! ★

import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

const wrap = { fontFamily: "sans-serif", maxWidth: "500px", margin: "30px auto", padding: "0 16px" };
const row = { display: "flex", gap: "8px", marginBottom: "16px" };
const inputS = { flex: 1, padding: "10px", fontSize: "15px", border: "2px solid #cbd5e1", borderRadius: "8px" };
const btnS = { padding: "10px 18px", border: "none", borderRadius: "8px", background: "#16a34a", color: "white", cursor: "pointer" };

const API = "http://localhost:3000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 읽기 (GET)
  useEffect(() => {
    async function load() {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
    }
    load();
  }, []);

  // 추가 (POST)
  async function addProduct() {
    if (name === "" || price === "") return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, price: Number(price) }),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
  }

  // ===== [TODO] 삭제 (DELETE) =====
  async function deleteProduct(id) {

    /* [TODO 1] 서버에 삭제 요청 보내기
       - 주소 끝에 id 를 붙여요: `${API}/${id}`
       - await fetch(`${API}/${id}`, { method: "DELETE" }); */
    await fetch(`${API}/${id}`, {method: "DELETE"});

    /* [TODO 2] 화면에서도 그 상품 빼기 (id 다른 것만 남기기)
       - setProducts(products.filter((p) => p.id !== id)); */
    setProducts(products.filter((p) => p.id !== id));
  }

  return (
    <div style={wrap}>
      <h1>🔗 풀스택 상품 관리</h1>

      <div style={row}>
        <input style={inputS} value={name} onChange={(e) => setName(e.target.value)} placeholder="상품명" />
        <input style={inputS} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격" />
        <button style={btnS} onClick={addProduct}>추가</button>
      </div>

      {/* 각 카드에 onDelete 로 '그 상품의 id 를 지우는 함수' 를 넘겨요 */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          onDelete={() => deleteProduct(product.id)}
        />
      ))}
    </div>
  );
}

export default App
