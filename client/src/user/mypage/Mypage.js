import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { logout } from "../../modules/user";

import ChangeHeader from "../../common/util/ChangeHeader";

import { CgProfile } from "react-icons/cg";
import "../../styles/mypage.scss";

export default function Mypage() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const { name, std_num } = useSelector((state) => state.user.user);

  useEffect(() => {
    ChangeHeader({
      title: "userMypage",
      dispatch,
    });
  }, [dispatch]);

  /** 카테고리 클릭 시, type에 맞는 함수를 실행 */
  const click = debounce((type) => {
    if (type === "/logout") {
      if (window.confirm("로그아웃 하시겠습니까?"))
        return dispatch(logout(navigate));
    } else return navigate(type);
  });

  return (
    <div id="mypage" className="contents">
      <div className="flex-row" id="profile">
        <div id="img">
          <CgProfile size="70" />
        </div>
        <div className="flex-col" id="info">
          <p>{name}</p>
          <p>{std_num}</p>
        </div>
      </div>

      <div id="list">
        <ul onClick={(e) => click(e.target.getAttribute("name"))}>
          <li name="/user1/check-borrow">도서관 대출 조회/연장</li>
          <li name="/user1/check-std-borrow">공유 도서 대여 조회</li>
          <li name="/logout">로그아웃</li>
        </ul>
      </div>
    </div>
  );
}
