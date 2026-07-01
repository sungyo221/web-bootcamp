// ============================================================
// MovieCard 컴포넌트 (자기 파일!) - 8주차 복습 [TODO]
// ============================================================
// [복습 A] 아래 MovieCard 를 완성하세요:
//   props.title 과 props.rating 을 보여주기
//   예: <div style={cardStyle}><h2>{props.title}</h2><p>⭐ {props.rating}</p></div>

const cardStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "16px 20px",
  margin: "12px 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

function MovieCard(props) {
  // [복습 A] 여기에 return ( ... ) 작성
  return (<div style={cardStyle}><h2>{props.title}</h2><p>⭐ {props.rating}</p></div>)

}

// [복습 B] ★MovieCard 를 내보내기★
// export default MovieCard;
export default MovieCard;