# 🚀 웹개발 학습 포트폴리오 (정선교)

HTML/CSS/JavaScript 기초부터 **React · Node.js/Express 풀스택 CRUD**까지, 9주간의 웹개발 학습 기록과 결과물입니다.

**🌐 라이브 포트폴리오:** https://sungyo221.github.io/web-bootcamp/

---

## 🛠️ 기술 스택 (Tech Stack)

| 분류 | 사용 기술 |
|------|-----------|
| **Frontend** | HTML, CSS(Flexbox), JavaScript(ES6+), React, Vite |
| **Backend** | Node.js, Express |
| **연동/기타** | fetch API, REST API(GET/POST/DELETE), localStorage, Git/GitHub, GitHub Pages |

---

## 📂 주요 프로젝트 (Projects)

### 1. 풀스택 CRUD 앱 (React + Express) ⭐
- **React 프론트엔드**(`react-app/`)와 **Express 서버**(`server/`)를 직접 연결한 풀스택 앱
- REST API 설계: `GET / POST / DELETE` (`/api/products`, `/api/members`)
- 상품/회원을 **추가·조회·삭제**(CRUD), CORS 처리, `useState`/`useEffect`로 상태·데이터 관리

### 2. 책 검색 앱 (외부 API 연동)
- OpenLibrary API를 `fetch`로 검색, `async/await` + `try/catch` 에러 처리
- 입력값으로 실시간 검색 → 결과 목록 렌더링

### 3. To-do / 습관·장보기 트래커 (Vanilla JS)
- DOM 조작 + 이벤트 + **localStorage**로 새로고침해도 유지되는 앱
- 배열 데이터 → 화면 렌더링, 추가/삭제 기능

### 4. 반응형 웹페이지 (HTML/CSS)
- 시맨틱 태그, Flexbox 레이아웃, 외부 CSS 분리로 만든 카페 소개 페이지 등

---

## 📚 주차별 학습 (Learning Log)

| 주차 | 주제 | 폴더 |
|------|------|------|
| 1주 | HTML 구조·시맨틱·폼 | `week1/` |
| 2주 | CSS·박스모델·Flexbox | `week2/` |
| 3주 | JavaScript 기초(변수·조건·반복·함수·배열·DOM) | `week3/` |
| 4주 | JS 심화(이벤트·폼검증·localStorage) | `week4/` |
| 5주 | 비동기·fetch·외부 API | `week5/` |
| 6주 | Git/GitHub·배포(GitHub Pages) | `weak6.html` |
| 7~8주 | React(컴포넌트·props·state·map·파일분리) | `react-app/`, `week7/` |
| 9주 | 백엔드(Node.js·Express)·풀스택 CRUD | `server/`, `weak9.html` |

> 각 주차 핵심 개념은 `weak1.html` ~ `weak9.html` 치트시트로 정리했습니다.

---

## ▶️ 실행 방법 (Getting Started)

### 정적 페이지 (1~6주 결과물)
`index.html` 또는 각 `weekN/` 폴더의 HTML 파일을 브라우저로 열기.

### React 앱 (프론트엔드)
```bash
cd react-app
npm install
npm run dev        # → http://localhost:5173
```

### Express 서버 (백엔드)
```bash
cd server
npm install
node --watch server.js   # → http://localhost:3000
```
> 풀스택 CRUD 앱은 **서버(3000)와 React(5173)를 함께** 실행해야 동작합니다.

---

## 👤 About

게임 개발 경험을 바탕으로 웹 풀스택 개발자로 성장 중입니다.
논리적 사고와 문제 해결 능력을 웹 서비스 개발에 적용하고 있습니다.

- **GitHub:** https://github.com/sungyo221
- **포트폴리오:** https://sungyo221.github.io/web-bootcamp/
