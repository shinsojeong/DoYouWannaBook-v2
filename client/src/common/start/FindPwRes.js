import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import ChangeHeader from "../util/ChangeHeader";

export default function FindPwRes() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  useEffect(() => {
    ChangeHeader({
      title: "findPwRes",
      dispatch,
    });
  }, [dispatch]);

  /** 로그인 페이지로 이동 */
  const goLogin = debounce(() => navigate("/login"));

  return (
    <div id="find_pw_res" className="start_contents">
      <p>
        입력하신 메일로
        <br />
        임시 비밀번호가 전송되었습니다.
      </p>
      <button onClick={goLogin}>로그인하러 가기</button>
    </div>
  );
}
