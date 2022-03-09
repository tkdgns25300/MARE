import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const Container = styled.div``;
const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input``;

const Button = styled.button``;

const Column = styled.div``;

const Slink = styled.span`
  cursor: pointer;
  &:nth-child(2) {
    margin-left: 1%;
    border-left: 1px solid black;
    border-right: 1px solid black;
    padding: 0 10px;
  }
  &:nth-child(3) {
    margin-left: 1%;
  }
  &:hover {
    transition: 0.2s;
    opacity: 0.5;
  }
`;

const serverPath = process.env.REACT_APP_SERVER_PATH;

export const Login = ({ loginToken }) => {
  // App.js에서 전달받은 프롭스(loginToken)
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [newToken, setNewToken] = useState("");

  const login = async () => {
    // 요청 전달
    const response = await axios.post(
      `${serverPath}/users/login`,
      { email: email, password: pass },
      { headers: { "Content-Type": "application/json;charset=utf-8" } }
    );
    return response;
  };

  useEffect(() => {
    loginToken(newToken);
  }, [newToken]);
  //App.js 전달 받은 상태를 변경해서 전달해주기위함

  const submit = async (e) => {
    // 이메일과 패스워드를 바디로 보내주고 토큰의 상태를 갱신해주는 함수
    e.preventDefault();
    const ok = await login(email, pass);
    if (ok) {
      setNewToken(ok.data.data.accessToken);
    }
  };

  return (
    <Container>
      <Form onSubmit={submit}>
        <Logo src="logo.png" />
        <Input
          placeholder="아이디"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <Button type="submit">로그인</Button>
      </Form>
      <Column>
        <Slink>아이디 찾기</Slink>
        <Slink>비밀번호 찾기</Slink>
        <Slink>회원가입</Slink>
      </Column>
    </Container>
  );
};
