import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Thumbnail } from "../Components/thumbnail"
import { Topbar } from "../Components/topbar"

const serverPath = process.env.REACT_APP_SERVER_PATH

export const Favorites = ({ loginToken }) => {
  const [recipeList, setRecipeList] = useState([])

  const headers = {
    headers: {
      "Authorization": `Bearer ${loginToken}`
    }
  }
  const getData = async () => {
    await axios.get(`${serverPath}/recipe/content`, headers)
      .then((res) => {
        setRecipeList(res.data.data.recipe.filter((el) => el.bookmark === true), 'asdasd')
      })
  }

  const Thumbnails = () => {
    if (recipeList.length > 0) { 
        return (
          recipeList.map((el) => {
            return <Thumbnail key={el._id} data={el} />
          })
        )
    } else {
      return <div>즐겨찾기한 레시피가 없습니다.</div>
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Topbar pageTitle={"즐겨찾기"} />
      <Thumbnails />
    </div>
  )
}