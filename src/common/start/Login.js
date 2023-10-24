import React, { useState } from "react";
import { useDispatch } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { login } from "../../modules/user";

import logo from "../../source/logo.png";

export default function Login() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce,
  ];

  const [std_num, set_std_num] = useState(""),
    [password, set_password] = useState("");

  /** 타입(name)에 맞는 함수를 리턴 */
  const func = (type) => {
    if (type === "login")
      return dispatch(login({ std_num, password, navigate }));
    else if (type === "find_pw") return navigate("/user1/find_pw");
    else if (type === "go_join") return navigate("/user1/join");
  };

  /** 버튼 클릭 시, 타입에 맞는 함수 실행 */
  const clickEvent = (type) => debounce(func(type));

  /** 상태 변경 */
  const changeEvent = (e) => {
    const type = e.target.getAttribute("id");
    const value = e.target.value;
    if (type === "std_num") set_std_num(value);
    else if (type === "password") set_password(value);
  };

  return (
    <div
      id="login"
      onClick={(e) => clickEvent(e.target.getAttribute("name"))}
      onChange={(e) => changeEvent(e)}
    >
      <img src={logo} alt="logo" id="logo" width="170px" />
      <input type="text" id="std_num" placeholder="학번" value={std_num} />
      <input
        type="password"
        id="password"
        placeholder="패스워드"
        value={password}
      />
      <button name="login" id="login_btn">
        로그인
      </button>
      <button name="find_pw">비밀번호 찾기</button>
      <button name="go_join">회원가입</button>
    </div>
  );
}
