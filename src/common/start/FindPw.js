import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import useMove from "../../hook/useMove";
import useDebounce from "../../hook/useDebounce";

import { findPw } from "../../modules/user";
import { changeBar } from "../../modules/topBar";

export default function FindPw() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const [std_num, set_std_num] = useState(""),
    [name, set_name] = useState(""),
    [ph_num, set_ph_num] = useState(""),
    [email, set_email] = useState("");

  const isDisabled = false; //버튼 비활성화 상태

  useEffect(() => {
    dispatch(
      changeBar(
        "back",
        { title: "비밀번호 찾기", data: null },
        "null",
        () => navigate(-1),
        null,
        "small"
      )
    );
  }, [dispatch, navigate]);

  /** 비밀번호 찾기 */
  const submit = debounce(() => {
    dispatch(
      findPw({
        std_num,
        name,
        ph_num,
        email,
        navigate,
      })
    );
  });

  /** input change event */
  const changeEvent = (e) => {
    const id = e.target.getAttribute("id");
    const value = e.target.value;
    if (id === "std_num") set_std_num(value);
    else if (id === "name") set_name(value);
    else if (id === "ph_num") set_ph_num(value);
    else if (id === "email") set_email(value);
  };

  return (
    <div
      id="find_pw"
      className="start_contents"
      onChange={(e) => changeEvent(e)}
    >
      <input
        type="text"
        className="input"
        id="std_num"
        placeholder="학번"
        required
        value={std_num}
      />
      <input
        type="text"
        className="input"
        id="name"
        placeholder="이름"
        required
        value={name}
      />
      <input
        type="text"
        className="input"
        id="ph_num"
        placeholder="ex)01033336666"
        required
        value={ph_num}
      />
      <input
        type="email"
        className="input"
        id="email"
        placeholder="이메일"
        required
        value={email}
      />

      <button
        className={isDisabled ? "btnGray" : "btnBlue"}
        disabled={isDisabled}
        onClick={submit}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}
