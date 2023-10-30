import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import useMove from "../../hook/useMove";
import useDebounce from "../../hook/useDebounce";

import { register } from "../../modules/user";
import { option } from "../util/Reusable";

import ChangeHeader from "../util/ChangeHeader";

export default function Join() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const [std_num, set_std_num] = useState(""),
    [password, set_password] = useState(""),
    [pw_check, set_pw_check] = useState(""),
    [name, set_name] = useState(""),
    [dept, set_dept] = useState("간호학과"),
    [ph_num, set_ph_num] = useState(""),
    [email, set_email] = useState(""),
    [gender, set_gender] = useState(0);

  useEffect(() => {
    ChangeHeader({
      title: "join",
      lfunc: () => navigate(-1),
      dispatch,
    });
  }, [dispatch, navigate]);

  /** 회원가입 */
  const submit = debounce(() => {
    //입력값 유효성 검사
    if (!std_num || !password || !pw_check || !name || !ph_num || !email) {
      return alert("모든 항목을 입력해주세요.");
    }
    if (std_num.length !== 10) {
      return alert("학번은 10자리 숫자로 입력해주세요.");
    }
    if (/([^a-zA-z0-9])/.test(password)) {
      return alert("비밀번호는 숫자, 영문으로만 구성되어야 합니다.");
    }
    if (password !== pw_check) {
      return alert("비밀번호 확인이 일치하지 않습니다.");
    }
    if (/([^가-힇\x20])/i.test(name)) {
      return alert("이름은 한글만 입력 가능합니다.");
    }
    if (!/[0-9]{10,11}$/.test(ph_num)) {
      return alert("연락처 형식이 잘못되었습니다.");
    }
    if (
      !/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        email
      )
    ) {
      return alert("이메일 형식이 잘못되었습니다.");
    }

    dispatch(
      register({
        std_num,
        name,
        dept,
        gender,
        ph_num,
        email,
        password,
        navigate,
      })
    );
  });

  /** input change event */
  const changeEvent = (e) => {
    const id = e.target.getAttribute("id");
    const value = e.target.value;
    if (id === "std_num") set_std_num(value);
    else if (id === "password") set_password(value);
    else if (id === "pw_check") set_pw_check(value);
    else if (id === "name") set_name(value);
    else if (id === "dept") set_dept(value);
    else if (id === "ph_num") set_ph_num(value);
    else if (id === "email") set_email(value);
  };

  return (
    <div id="join" className="start_contents" onChange={(e) => changeEvent(e)}>
      <input
        className="input"
        type="text"
        id="std_num"
        placeholder="학번"
        required
        value={std_num}
      />
      <input
        className="input"
        type="password"
        id="password"
        placeholder="패스워드"
        required
        value={password}
      />
      <input
        className="input"
        type="password"
        id="pw_check"
        placeholder="패스워드 확인"
        required
        value={pw_check}
      />
      <input
        className="input"
        type="text"
        id="name"
        placeholder="이름"
        required
        value={name}
      />
      <select
        className="inputSelect"
        placeholder="학과"
        id="dept"
        required
        value={dept}
      >
        {option.map(({ value, label }) => {
          return (
            <option key={label} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <div id="gender_input" value={gender}>
        <label htmlFor="0">남성</label>
        <input
          type="radio"
          name="gender"
          id="0"
          value={0}
          onChange={(e) => set_gender(e.target.value)}
          checked
          required
        />
        <label htmlFor="1">여성</label>
        <input
          type="radio"
          name="gender"
          id="1"
          value={1}
          onChange={(e) => set_gender(e.target.value)}
        />
      </div>
      <input
        className="input"
        type="text"
        id="ph_num"
        placeholder="ex)01033336666"
        required
        value={ph_num}
      />
      <input
        className="input"
        type="email"
        id="email"
        placeholder="이메일"
        required
        value={email}
      />

      <button className="btnBlue" onClick={submit}>
        완료
      </button>
    </div>
  );
}
