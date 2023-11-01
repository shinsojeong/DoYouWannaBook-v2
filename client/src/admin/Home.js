import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../hook/useDebounce";
import useMove from "../hook/useMove";

import { resetAdmin } from "../modules/admin";
import { logout } from "../modules/user";

import ChangeHeader from "../common/util/ChangeHeader";

import { AiOutlineBook } from "react-icons/ai";
import AdminProfile from "../source/AdminProfile.svg";

import "../styles/admin.scss";

export default function Home() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const { std_num, name } = useSelector((state) => state.user.user);

  useEffect(() => {
    ChangeHeader({
      title: "adminHome",
      dispatch,
    });
  }, [dispatch]);

  /** 로그아웃 */
  const out = debounce(() => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(logout(navigate));
    }
  });

  /** 페이지 이동 */
  const goTo = debounce((path) => {
    dispatch(resetAdmin());
    navigate(path);
  });

  return (
    <div id="home" className="contents">
      <div id="profile" className="flex-row">
        <div className="flex-col" id="item">
          <img src={AdminProfile} width="70" alt="img" id="icon" />
          <span>{name}</span>
          <span>{std_num}</span>
        </div>
      </div>

      <div id="menu">
        <div id="bookMenu" className="flex-row">
          <div onClick={() => goTo("/admin/book/create")} className="flex-col">
            <AiOutlineBook size="70px" id="icon1" />
            <span name="/admin/book/create">도서 등록</span>
          </div>
          <div onClick={() => goTo("/admin/book/search")} className="flex-col">
            <AiOutlineBook size="70px" id="icon2" />
            <span>조회/수정/삭제</span>
          </div>
        </div>
        <button onClick={out}>로그아웃</button>
      </div>
    </div>
  );
}
