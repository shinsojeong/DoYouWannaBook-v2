import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../hook/useDebounce";
import useMove from "../hook/useMove";

import { resetAdmin } from "../modules/admin";
import { logout } from "../modules/user";

import ChangeHeader from "../common/util/ChangeHeader";

import { AiOutlineBook } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

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

  /** 버튼 클릭 시 수행 (로그아웃, 페이지 이동) */
  const click = debounce((path) => {
    if (path === "/logout") {
      if (window.confirm("로그아웃 하시겠습니까?")) dispatch(logout(navigate));
    } else {
      dispatch(resetAdmin());
      navigate(path);
    }
  });

  return (
    <div id="home" className="contents">
      <div id="profile">
        <table>
          <tbody>
            <tr>
              <td rowSpan="2" id="td1">
                <CgProfile size="70" />
              </td>
              <td id="td2">{std_num}</td>
            </tr>
            <tr>
              <td id="td2">{name}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="menu" onClick={(e) => click(e.target.getAttribute("name"))}>
        <table id="bookMenu">
          <tbody>
            <tr>
              <td name="/admin/book/create">
                <AiOutlineBook size="100px" id="icon1" />
              </td>
              <td name="/admin/book/search">
                <AiOutlineBook size="100px" id="icon2" />
              </td>
            </tr>
            <tr>
              <td name="/admin/book/create">도서 등록</td>
              <td name="/admin/book/search">조회/수정/삭제</td>
            </tr>
          </tbody>
        </table>
        <p name="/logout">로그아웃</p>
      </div>
    </div>
  );
}
