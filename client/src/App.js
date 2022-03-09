import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Reset } from 'styled-reset'
import Signup from './Pages/signup';
import { Navbar } from './Components/navbar';
import PasswordEdit from './Pages/passwordedit'
// 각 페이지 별 path

// 홈 / (로그인 여부에 따라 이동)
// 회원가입 /signup

// 내 레시피 보기 /my_recipe
// 즐겨찾기 보기 /favorites
// 레시피 추가 /add_recipe
// 마이페이지 /mypage


function App() {
  return (
    <div className="App">
      <Reset />
      <div>퍼스트 프로젝트</div>
      <Routes>
        <Route path="signup" element={<Signup />} />
      </Routes>
      < PasswordEdit />
      <Navbar />
    </div>
  );
}

export default App;
