import React, { useEffect } from "react";

import useMove from "../../hook/useMove";

import logo from "../../source/logo.png";
import "../../styles/start.scss";

export default function Landing() {
  const navigate = useMove();

  /** 2초 후 로그인 페이지로 이동 */
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  });

  return (
    <div id="landing">
      <img src={logo} id="logo" alt="logo" width="200px" />
    </div>
  );
}
