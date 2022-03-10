import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Reset } from "styled-reset";

import { PasswordEdit } from "./Pages/passwordedit";
import Signup from "./Pages/signup";
import { AddRecipe } from "./Pages/add_recipe";
import { RecipeDetails } from "./Pages/recipe_details";
import { Login } from "./Pages/login";
import { MyRecipes } from "./Pages/my_recipes";
import { Favorites } from "./Pages/favorites";
import { Navbar } from "./Components/navbar";

// 각 페이지 별 path

// 홈 / (로그인 여부에 따라 이동)
// 회원가입 /signup

// 내 레시피 보기 /my_recipe
// 즐겨찾기 보기 /favorites
// 레시피 추가 /add_recipe
// 마이페이지 /mypage

function App() {
  const [loginToken, setLoginToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const nav = useNavigate()
  // 토큰을 저장하는 상태, 로그인 컴포넌트에 내려서 해당 상태 업데이트 필요.

  useEffect(() => {
    if (loginToken) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [loginToken])

  useEffect(() => {
    if (isLogin) {
      nav('/my_recipes')
    } else {
      nav('/login') // 추후 홈페이지로 바뀌어야함.
    }
  }, [])

  return (
    <div className="App">
      <Reset />
      <Routes>
        <Route path="login" element={<Login loginToken={setLoginToken} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="add_recipe" element={<AddRecipe loginToken={loginToken} />} />
        <Route path="my_recipes" element={<MyRecipes loginToken={loginToken} />} />
        <Route path="favorites" element={<Favorites loginToken={loginToken} />} />
        <Route path="recipe_details/:id" element={<RecipeDetails loginToken={loginToken} />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
