import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Reset } from 'styled-reset'
import Signup from './Pages/signup';
import { Navbar } from './Components/navbar';
import { PasswordEdit } from './Pages/passwordedit'
import { AddIngredients } from './Components/addIngredients';
import { AddRecipe } from './Pages/add_recipe';
import { Login } from './Pages/login';
import { RecipeDetails } from './Pages/recipe_details'




// 각 페이지 별 path

// 홈 / (로그인 여부에 따라 이동)
// 회원가입 /signup

// 내 레시피 보기 /my_recipe
// 즐겨찾기 보기 /favorites
// 레시피 추가 /add_recipe
// 마이페이지 /mypage


function App() {
  const [loginToken, setLoginToken] = useState('')
  // 토큰을 저장하는 상태, 로그인 컴포넌트에 내려서 해당 상태 업데이트 필요.
  return (
    <div className="App">
      <Reset />
      <div>퍼스트 프로젝트</div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="add_recipe" element={<AddRecipe />} />
      </Routes>
      <RecipeDetails />
      <Navbar />
    </div>
  );
}

export default App;
