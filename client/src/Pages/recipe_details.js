import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from '@fortawesome/free-solid-svg-icons'


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
  background: url(${props => props.bg});
  background-size: cover;
  background-position: center;

  color: ${props => props.bg ? 'transparent' : 'black'} ;
`

const RecipeTitle = styled.h2`
  margin: 5px 0;
  font-size: 1.2rem;
  font-weight: bold;
`

const Title = styled.h3`
  margin: 5px 0;
`

const BookmarkBtn = styled(FontAwesomeIcon)`
  position : absolute;
  top: 10px;
  right: 10px;

  color : ${props => props.bookmarked ? "#F4406A" : "#aaa"};
  /* 북마크 여부에 따라 조건부 렌더링 */
  cursor: pointer;
`
const ILists = styled.div`
    display: flex;
    margin: 5px 0;
    width: 400px;
    justify-content: center ;
  `

const IListsItems = styled.div`
    display: flex;
    justify-content: center;
    width: 100px;
  `

const RecipeDesc = styled.div`
  margin-top: 5px;
  width: 80%;
  min-height: 350px;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px;
  background-color: #fff;

`

export const RecipeDetails = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState('')

  const [recipeId, setRecipeId] = useState('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [photo, setPhoto] = useState('')
  const [ingredients, setIngredients] = useState([])


  // 더미 데이터
  const data = {
    _id: "62246ae8fdd52786cb011ba4",
    nickname: "Back-end Developer",
    title: "맛있는 김치볶음밥",
    photo: "https://i.ibb.co/wcXBQQx/79d56a29e657.jpg",
    ingredient: [
      { id: "49159c83-98ed-4410-bc70-2841e93bd4d2", name: "고추장", amounts: "2스쿱" },
      { id: "ac33d74d-a130-4e4b-869b-e98ff5b5ca7c", name: "고추가루", amounts: "2스푼" },
      { id: "b1305fd8-2665-4858-9afa-be9e109a46ca", name: "설탕", amounts: "2스푼" },
    ],
    contents: "소금을 넣고 고추장을 넣는다 아아아ㅏ",
    bookmark: true,
    createdAt: "2022 - 03 - 06T08: 03: 52.567Z,__v: 0"
  }

  // 페이지 렌더링시 데이터를 상태에 저장
  useEffect(() => {
    setIsLoading(true)

    setIsBookmarked(data.bookmark)

    setRecipeId(data._id)
    setTitle(data.title)
    setPhoto(data.photo)
    setIngredients(data.ingredient)
    setContents(data.contents)

    setIsLoading(false)
  }, [])

  const toggleBookmark = async () => {
    const res = await axios.post(`${serverPath}/recipe/bookmark`, {
      id: recipeId
    })

    if (res.status === 200) {
      setIsBookmarked(!isBookmarked) 
      // 정상적으로 변경됐다고 알려주면 상태 Boolean 토글 -> 보여지는 이미지만을 위해서 만든 상태
      // 서버 내부에서는 서버 로직에 따라 토글됨.
    }
  }



  return (
    <Container>
      {/* 썸네일 */}
      <RecipeImg bg={photo} />

      {/* 북마크 버튼 */}
      <BookmarkBtn icon={faHeart} size="2x" onClick={toggleBookmark} bookmarked={isBookmarked ? "true" : ""} />

      {/* 제목 표시 */}
      <RecipeTitle>{title}</RecipeTitle>

      <Title>필요 재료</Title>
      {/* 재료 표시 */}
      {
        ingredients.map((el) => {
          return (
            <ILists key={el.id}>
              <IListsItems>{el.name}</IListsItems>
              <IListsItems>{el.amounts}</IListsItems>
            </ILists>
          )
        })
      }

      {/* 본문 표시 */}
      <Title>레시피 상세</Title>
      <RecipeDesc>{contents}</RecipeDesc>

    </Container>
  )
}