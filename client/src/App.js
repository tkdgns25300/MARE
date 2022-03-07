
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Reset } from 'styled-reset'
import Signup from './Pages/signup';
import { Navbar } from './Components/navbar';
import { AddIngredients } from './Components/addIngredients';
import { AddRecipe } from './Pages/add_recipe';


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
      <div>hello world</div>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="add_recipe" element={<AddRecipe />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
