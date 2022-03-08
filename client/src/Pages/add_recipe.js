import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import imageCompression from "browser-image-compression"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { } from "@fortawesome/free-regular-svg-icons"

import { AddIngredients } from "../Components/addIngredients";

const IMGBB_API_KEY = "71e3c54f067d8e9f734ba3d5b52e6aff"
const serverPath = process.env.REACT_APP_SERVER_PATH

const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 400px;
  background-color: beige;
`
const ImgUploadBtn = styled.div`
  display: grid;
  place-items: center;
  width: 400px;
  height: 200px;
  background: ${props => props.bg ? `url(${props.bg})` : 'beige'};
  background-size: cover;
  background-position: center;

  color: ${props => props.bg ? 'transparent' : 'black'} ;;
  cursor: pointer;
`

const ImgDeleteBtn = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;

  position: absolute;
  right: 10px;
  top: 160px;
  z-index: 1;
  cursor : pointer;

  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px rgba(0, 0, 0, 0.2);
`

const TitleInput = styled.input`
  width: 80%;
`

const Textarea = styled.textarea`
  width: 80%;
  height: 350px;
`

const SubmitBtn = styled.div`
  display: grid;
  place-items: center;
  width: 80%;
  height: 40px;
  background-color: #fff;

  margin-top: 5px;
  border : 1px solid #000;

  border-radius: 5px;
  cursor : pointer;
`

export const AddRecipe = () => {
  // 필요한 상태 : 
  // 1. 사진을 업로드 하고 전달받은 url
  // 2. 제목
  // 3. 재료 목록
  // 4. 본문
  const inputBtn = useRef()


  const [isLoading, setIsLoading] = useState(false)
  const [previewImgUrl, setPreviewImgUrl] = useState('')
  const [imgBase64, setImgBase64] = useState('')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [ingredients, setIngredients] = useState([])

  const uploadTumbnail = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const img = e.target.files[0]
    setPreviewImgUrl(URL.createObjectURL(img))

    const option = {
      maxSizeMB: 0.5
    }

    const compImg = await imageCompression(img, option)

    let reader = new FileReader()

    reader.readAsDataURL(compImg)
    reader.onload = () => {
      // console.log(reader.result)
      setImgBase64(reader.result)
    }

    setIsLoading(false)
  }

  const imgUploadBtnClick = (e) => {
    e.preventDefault()
    inputBtn.current.click()
  }

  const deleteImg = () => {
    setPreviewImgUrl('')
    setImgBase64('')
  }

  // 제목 저장하기
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  // 본분저장하기
  const handleContent = (e) => {
    setContent(e.target.value)
  }
  

  const handleSubmit = async () => {
    const body = {
      "title" : title,
      "photo": imgBase64,
      "ingredients" : ingredients,
      "content" : content
    }

    const header = {
      // "Authorization" : AuthToken// App.js 에서 받은 토큰
    }

    const res = await axios.post(`${serverPath}/recipe/content`, body, header)
  }

  const updateIngre = (data) => {
    setIngredients(data)
  }

  return (
    <Container>
      {/* 사진 업로드 */}
      <input style={{ display: "none" }} type="file" accept="image/*" onChange={uploadTumbnail} ref={inputBtn} />

      {
        isLoading ? <ImgUploadBtn>업로드 중입니다...</ImgUploadBtn>
        : <ImgUploadBtn onClick={imgUploadBtnClick} bg={previewImgUrl}>여기를 눌러 사진을 업로드하세요.</ImgUploadBtn>
      }
      
      {previewImgUrl ? <ImgDeleteBtn onClick={deleteImg}>✕</ImgDeleteBtn> : <></>}

      {/* 제목 작성 */}
      <h3>레시피 제목</h3>
      <TitleInput type="text" placeholder="레시피 제목 입력" onChange={handleTitle}/>

      <AddIngredients updateIngre={updateIngre}/>

      {/* 본문 작성 */}
      <h3>레시피 작성</h3>
      <Textarea placeholder="레시피를 작성해주세요" onChange={handleContent} />
      <SubmitBtn onClick={handleSubmit}>업로드 하기</SubmitBtn>
    </Container>
  )
}