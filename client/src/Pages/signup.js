import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const serverPath = process.env.REACT_APP_SERVER_PATH;
// api 주소

// todo : 닉네임과 이메일이 둘다 유효하며(유일하며), 모든 필드가 작성된 경우에만 제출버튼이 활성화 되어야함
// todo : 회원가입이 완료되면 로그인 창으로 리다이렉트 해야함.
// todo : 근데 이걸 FE에서? 통일성 있게 BE에서?

// todo : 회원가입 완료 누르면 가입요청 전달되어야함
// todo : 이후 301 응답 이용하여 로그인페이지로 이동

// !! CSS 리셋하는 것 공지!!!!!!!

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [isNotUsingEmail, setIsNotUsingEmail] = useState(false);
  const [isNotUsingNickname, setIsNotUsingNickname] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);

  useEffect(() => {
    if (
      isNotUsingEmail &&
      isNotUsingNickname &&
      password === checkPassword &&
      password.length > 0
    ) {
      setActiveSubmit(true);
    } else {
      setActiveSubmit(false);
    }
  }, [isNotUsingEmail, isNotUsingNickname, password, checkPassword]);

  function validateEmail(email) {
    // 이메일 유효성 검사(스택 오버플로)
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  const setValue = (e, setTarget) => {
    // input에 입력된 값을 원하는 상태에 저장합니다.
    setTarget(e.target.value);
  };

  const emailValidateCheck = async () => {
    // 이메일의 중복여부를 API를 이용하여 확인한다.
    const res = await axios.post(`${serverPath}/users/email`, {
      email: email,
    });

    if (res.status === 200) {
      setIsNotUsingEmail(true);
    } else {
      setIsNotUsingEmail(false);
    }
  };
  const nicknameValidateCheck = async () => {
    // 닉네임의 중복여부를 API를 이용하여 확인한다.
    const res = await axios.post(`${serverPath}/users/nickname`, {
      nickname: nickname,
    });

    if (res.status === 200) {
      setIsNotUsingNickname(true);
    } else {
      setIsNotUsingNickname(false);
    }
  };

  const signinHandler = async () => {
    // 작성된 내용을 요청의 바디로 전달한다.
    const res = axios.post(`${serverPath}/users/signup`, {
      email: email,
      nickname: nickname,
      password: password,
    });
    if (res.status !== 200) {
      //throw Err!
    }
  };

  const ValidateBtn = ({ validCheckFn }) => {
    // 중복확인 버튼을 누를 경우 해당하는 함수를 실행합니다.
    return <div onClick={validCheckFn}>중복확인</div>;
  };

  const SubmitBtn = () => {
    return activeSubmit ? (
      <button onClick={signinHandler}>회원가입 하기</button>
    ) : (
      <button disabled>회원가입 하기</button>
    );
  };

  const EmailNotification = () => {
    if (email.length === 0) {
      return <span></span>;
    }
    if (!validateEmail(email)) {
      return <span>올바른 이메일을 입력해주세요.</span>;
    }
    if (!isNotUsingEmail && email.length > 0 && validateEmail(email)) {
      return <span>이메일 중복확인을 해주세요.</span>;
    }
    if (isNotUsingEmail && email.length > 0 && validateEmail(email)) {
      return <span>사용 가능한 이메일입니다.</span>;
    }
  };

  const NicknameNotification = () => {
    if (nickname.length === 0) {
      return <span></span>;
    }
    if (nickname.length < 2) {
      return <span>닉네임은 2글자 이상입니다.</span>;
    }
    if (!isNotUsingNickname && nickname.length > 1) {
      return <span>닉네임 중복확인을 해주세요.</span>;
    }
    if (isNotUsingNickname && nickname.length > 1) {
      return <span>사용 가능한 닉네임입니다.</span>;
    }
  };

  return (
    <div>
      {/* 이메일 입력 */}
      <div className="email_input">
        <h3>이메일 입력</h3>
        <input
          type="email"
          placeholder="이메일 입력"
          onChange={(e) => {
            setValue(e, setEmail);
            setIsNotUsingEmail(false);
          }}
        />
        <EmailNotification />
        <ValidateBtn validCheckFn={emailValidateCheck} />
      </div>

      {/* 닉네임 입력 */}
      <div className="nickname_input">
        <h3>닉네임 입력</h3>
        <input
          type="text"
          placeholder="닉네임 입력"
          onChange={(e) => {
            setValue(e, setNickname);
            setIsNotUsingNickname(false);
          }}
        />
        <NicknameNotification />
        <ValidateBtn validCheckFn={nicknameValidateCheck} />
      </div>

      {/* 비밀번호 */}
      <div className="password_input">
        <h3>비밀번호 입력</h3>
        <input
          type="password"
          placeholder="비밀번호 입력"
          onChange={(e) => setValue(e, setPassword)}
        />
      </div>

      {/* 비밀번호 체크 */}
      <div className="password_check_input">
        <h3>비밀번호 확인</h3>
        <input
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => {
            setValue(e, setCheckPassword);
          }}
        />
        {password === checkPassword ? (
          <span></span>
        ) : (
          <span>비밀번호가 다릅니다!</span>
        )}
      </div>
      <SubmitBtn />
    </div>
  );
};

export default Signup;
