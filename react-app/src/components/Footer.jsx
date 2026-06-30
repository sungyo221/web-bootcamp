// ============================================================
// Footer 컴포넌트 (자기 파일!) - 8주차 [TODO]
// ============================================================
// [TODO A] 아래 Footer 컴포넌트를 완성하세요:
//   - <footer> 안에 <p> 로 props.text 를 보여주기
//     예: <footer style={footStyle}><p>{props.text}</p></footer>

const footStyle = {
  textAlign: "center",
  color: "#94a3b8",
  marginTop: "24px",
  fontSize: "14px",
};

function Footer(props) {
  // [TODO A] 여기에 return ( ... ) 작성
  return <footer style={footStyle}><p>{props.text}</p></footer>;

}

// [TODO B] ★Footer 를 내보내기★ (Card.jsx 처럼!)
// export default Footer;
export default Footer;