// ============================================================
// 8주차 React - 컴포넌트 파일 분리 📂
// ============================================================
// 다른 파일의 컴포넌트를 import 해서 조립해요.
// ★ 저장하면 자동 새로고침. [TODO]를 채우세요. ★

// ===== 다른 파일에서 컴포넌트 가져오기 (import) =====
import Card from "./components/Card";   // ← Card.jsx 의 Card 가져오기 (예시)

// [TODO 1] Footer 도 가져오세요 (Card 처럼!):
// import Footer from "./components/Footer";
import Footer from "./components/Footer";

const wrap = { fontFamily: "sans-serif", maxWidth: "500px", margin: "30px auto", padding: "0 16px" };

function App() {
  return (
    <div style={wrap}>
      <h1>📂 컴포넌트 조립</h1>

      {/* ===== Card 를 여러 번 재사용 (다른 props로) ===== */}
      <Card emoji="⚛️" title="React" desc="컴포넌트로 UI 만들기" />
      <Card emoji="📂" title="파일 분리" desc="컴포넌트마다 파일 하나씩" />

      {/* [TODO 2] Card 를 하나 더 추가하세요 (원하는 emoji/title/desc로) */}
      <Card emoji="🚀" title="배포" desc="GitHub Pages" />

      {/* [TODO 3] 맨 아래에 <Footer /> 를 추가하고 text prop 을 넘기세요:
          <Footer text="© 2026 정선교" /> */}
      <Footer text="© 2026 정선교" />
    </div>
  );
}

export default App
