// ============================================================
// ProductCard 컴포넌트 - 삭제 버튼 포함
// ============================================================
// props: name, price, onDelete (삭제 버튼 눌렀을 때 실행할 함수)

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "12px 20px",
  margin: "10px 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};
const delStyle = {
  border: "none", background: "#ef4444", color: "white",
  padding: "6px 12px", borderRadius: "6px", cursor: "pointer",
};

function ProductCard(props) {
  return (
    <div style={cardStyle}>
      <div>
        <h3 style={{ margin: 0 }}>{props.name}</h3>
        <p style={{ margin: "4px 0 0", color: "#64748b" }}>{props.price}원</p>
      </div>
      {/* onDelete 는 App 에서 넘겨준 '삭제 함수' */}
      <button style={delStyle} onClick={props.onDelete}>삭제</button>
    </div>
  );
}

export default ProductCard;
