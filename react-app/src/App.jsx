// ============================================================
// 8주차 복습 2회차 - 상품 목록 🛍️
// ============================================================
// 파일 분리(import/export) + 데이터 배열 → 컴포넌트 목록 (스스로!)
// ★ 저장하면 자동 새로고침. [복습]을 채우세요. ★

// [복습 1] ProductCard 를 가져오세요 (import ... from "./components/ProductCard")
import ProductCard from "./components/ProductCard";

const wrap = { fontFamily: "sans-serif", maxWidth: "500px", margin: "30px auto", padding: "0 16px" };

// 상품 데이터 (객체들의 배열) — 이미 채움
const products = [
  { name: "키보드", price: 35000 },
  { name: "마우스", price: 18000 },
  { name: "모니터", price: 250000 },
  { name: "헤드셋", price: 89000 },
];

function App() {
  return (
    <div style={wrap}>
      <h1>🛍️ 오늘의 상품</h1>

      {/* [복습 2] products 배열을 .map() 으로 돌려 <ProductCard> 를 전부 만드세요.
          각 상품(product)의 name 과 price 를 props 로 넘기고, key 도 잊지 말기!
          (Card / MovieCard 복습 때처럼!) */}
      {products.map((cards, index) => (
        <ProductCard
          key={index}
          name={cards.name}
          price={cards.price}
        />
      ))}
    </div>
  );
}

export default App
