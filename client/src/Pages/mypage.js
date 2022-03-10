import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Topbar } from "../Components/topbar";
import axios from "axios";

const Container = styled.div``;

const Slink = styled(Link)``;

const Button = styled.button``;

const Content = styled.span``;

const Column = styled.div``;

const serverPath = process.env.REACT_APP_SERVER_PATH;

export const Mypage = ({ loginToken }) => {
  const [user, setUser] = useState({});
  const [recipe, setRecip] = useState([]);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const headers = {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  };

  const getUserInfo = async () => {
    await axios.get(`${serverPath}/users/data`, headers).then((res) => {
      setUser(res.data.data.userInfo);
    });
  };

  const getData = async () => {
    await axios.get(`${serverPath}/recipe/content`, headers).then((res) => {
      setRecip(res.data.data.recipe);
    });
  };

  const handleLogout = async () => {
    await axios
      .post(`${serverPath}/users/logout`, {}, headers)
      .then((res) => {});
    window.location.reload();
  };

  useEffect(() => {
    getUserInfo();
    getData();
  }, []);

  return (
    <Container>
      <Topbar pageTitle={"마이페이지"} />
      <Column>
        <Content>닉네임: {user.nickname}</Content>
      </Column>
      <Content>나의 레시피: {recipe.length}개</Content>
      <Column>
        <Slink to="../userinfo">내계정관리</Slink>
      </Column>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Container>
  );
};
