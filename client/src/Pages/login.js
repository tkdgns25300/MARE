import React from "react";
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

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const ok = await login(email, pass);
    if (ok) {
      localStorage.setItem("token", ok);
    }

    const postLogin = () => {
      login(email, pass).then((res) => alert(res));
    };
    postLogin();
  };

  const login = async (email, password) => {
    const response = await axios
      .post(
        "http://localhost:3001/test",
        { email, password },
        { headers: { "Content-Type": "application/json;charset=utf-8" } }
      )
      .then((res) => {
        const ok = res.data;
        if (ok) {
          console.log("로그인", res.data);
          return `환영합니다.`;
        }
      })
      .catch((error) => error);
    return response;
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
