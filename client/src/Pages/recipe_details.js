import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import imageCompression from "browser-image-compression"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const serverPath = process.env.REACT_APP_SERVER_PATH

const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 400px;
  background-color: beige;
`
const RecipeImg = styled.div`
  display: grid;
  place-items: center;
  width: 400px;
  height: 200px;
  background: url(data:image/jpeg;base64,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);
  background-size: cover;
  background-position: center;

  color: ${props => props.bg ? 'transparent' : 'black'} ;;
  cursor: pointer;
`

const RecipeDesc = styled.div`
  width: 80%;
  height: 350px;
`

export const RecipeDetails = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [ingredients, setIngredients] = useState([])

  const dummydata = {
    _id: "62246ae8fdd52786cb011ba4",
    nickname: "Back-end Developer",
    title: "맛있는 김치볶음밥",
    ingredient: {
      0: { id: "49159c83-98ed-4410-bc70-2841e93bd4d2", name: "고추장", amounts: "2스쿱" },
      1: { id: "ac33d74d-a130-4e4b-869b-e98ff5b5ca7c", name: "고추가루", amounts: "2스푼"},
      2: { id: "b1305fd8-2665-4858-9afa-be9e109a46ca", name: "설탕", amounts: "2스푼" },
    },
    contents: "소금을 넣고 고추장을 넣는다",
    bookmark: false,
    createdAt: "2022 - 03 - 06T08: 03: 52.567Z,__v: 0"
  }

  return (
    <Container>
      {/* 썸네일 */}
      <RecipeImg />



      {/* 제목 작성 */}
      <h3>요리이름</h3>


      <h3>필요 재료</h3>




      {/* 본문 작성 */}
      <h3>레시피 상세</h3>
      <RecipeDesc />

    </Container>
  )
}