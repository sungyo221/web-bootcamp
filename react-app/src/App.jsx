// ============================================================
// 9주차 - React ↔ 내 서버 연결 (풀스택!) 🔗
// ============================================================
// 내 Express 서버(3000)의 /api/products 를 fetch 해서 화면에 그려요.
//
// 새 개념: useEffect = "컴포넌트가 처음 화면에 뜰 때 한 번 실행" (예: 데이터 불러오기)
// ★ 서버(3000)와 React 서버(5173) 둘 다 켜져 있어야 해요! ★

import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

const wrap = { fontFamily: "sans-serif", maxWidth: "500px", margin: "30px auto", padding: "0 16px" };

function App() {
  // 서버에서 받아온 상품들을 담을 state (처음엔 빈 배열)
  const [products, setProducts] = useState([]);

  // ===== useEffect: 화면이 처음 뜰 때 서버에서 상품 불러오기 =====
  useEffect(() => {
    // 이 안이 '처음 한 번' 실행돼요.
    async function loadProducts() {

      /* [TODO 1] 내 서버의 상품 API 를 fetch 하기 (5주차 fetch 3줄 공식!)
         - const res = await fetch("http://localhost:3000/api/products");
         - const data = await res.json();
         - setProducts(data);     // 받은 데이터를 state 에 저장 → 화면 갱신! */
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProducts(data);

    }
    loadProducts();
  }, []);   // ← 이 빈 배열 [] = "처음 한 번만 실행" 이라는 뜻

  return (
    <div style={wrap}>
      <h1>🔗 내 서버의 상품 (풀스택!)</h1>
      <p style={{ color: "#64748b" }}>← 이 데이터는 내가 만든 서버(3000)에서 온 거예요!</p>

      {/* [TODO 2] products 를 .map() 으로 돌려 <ProductCard> 목록 만들기 (8주차!)
          {products.map((product, index) => (
            <ProductCard key={index} name={product.name} price={product.price} />
          ))} */}
      {products.map((products, index) => (
        <ProductCard key={index} name={products.name} price={products.price}/>
      ))}

    </div>
  );
}

export default App
