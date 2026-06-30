// ============================================================
// Card 컴포넌트 (자기 파일!) - 8주차 예시
// ============================================================
// props 로 emoji / title / desc 를 받아 카드 하나를 그려요.

const cardStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "16px 20px",
  margin: "12px 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

function Card(props) {
  return (
    <div style={cardStyle}>
      <h2>{props.emoji} {props.title}</h2>
      <p style={{ color: "#64748b", margin: 0 }}>{props.desc}</p>
    </div>
  );
}

// ★ 이 컴포넌트를 다른 파일에서 쓸 수 있게 '내보내기' ★
export default Card;
