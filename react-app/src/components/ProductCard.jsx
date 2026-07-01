// ============================================================
// ProductCard 컴포넌트 (자기 파일!) - 8주차 복습 2회차 [TODO]
// ============================================================
// 이 컴포넌트는 props 로 name(상품명) 과 price(가격) 를 받아요.
// 스스로 완성하세요! (Card.jsx / MovieCard.jsx 참고)

const cardStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "16px 20px",
  margin: "12px 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

// [복습 A] ProductCard 함수를 만들어 (props 받기) 아래를 return 하세요:
//   <div style={cardStyle}>
//     <h2>{props.name}</h2>
//     <p>{props.price}원</p>
//   </div>
  function ProductCard(props) {
    return <div style={cardStyle}><h2>{props.name}</h2><p>{props.price}원</p></div>
  }


// [복습 B] ProductCard 를 내보내기 (export default)
export default ProductCard;