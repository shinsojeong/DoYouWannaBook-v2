import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { getBookLoc } from "../../modules/libBook";

import ChangeHeader from "../../common/util/ChangeHeader";

import "../../styles/home.scss";

export default function SearchDetail() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const {
    libb_title,
    libb_author,
    libb_img,
    libb_isbn,
    libb_publisher,
    libb_pub_date,
    libb_code,
    libb_state,
    libb_class,
  } = useSelector((state) => state.libBook.selected_book);

  useEffect(() => {
    ChangeHeader({
      title: "userSearchDetail",
      lfunc: () => navigate(-1),
      dispatch,
    });
  }, [dispatch, navigate]);

  /** 위치 정보 보기 */
  const goLocation = debounce((class_sign) => {
    dispatch(getBookLoc(class_sign));
    navigate("/user1/search-location");
  });

  return (
    <div id="search_detail" className="contents">
      <div id="info" className="flex-col">
        <div id="book_name">{libb_title}</div>
        <div id="author">{libb_author}</div>
        <img
          src={libb_img}
          onError={(e) => (e.target.src = "http://placehold.it/200x200")}
          alt="bookImage"
          width="200px"
        />
        <div className="flex-row">
          <div className="sub_title">ISBN</div>
          <div className="content" id="isbn">
            {libb_isbn}
          </div>
        </div>
        <div className="flex-row">
          <div className="sub_title">출판사</div>
          <div className="content" id="publisher">
            {libb_publisher}
          </div>
        </div>
        <div className="flex-row">
          <div className="sub_title">출판일</div>
          <div className="content" id="publish_date">
            {libb_pub_date.slice(0, 10)}
          </div>
        </div>
      </div>

      <div id="location">
        <p className="title">· 소장 정보</p>
        <div className="flex-row">
          <div className="sub_title">청구기호</div>
          <div className="content">{libb_code}</div>
        </div>
        <div className="flex-row">
          <div className="sub_title">대출상태</div>
          <div className="content">{libb_state ? "대출가능" : "대출중"}</div>
        </div>
        <div className="flex-row">
          <div className="sub_title">위치보기</div>
          <div
            className="content"
            id="button"
            onClick={() => goLocation(libb_class)}
          >
            보기
          </div>
        </div>
      </div>
    </div>
  );
}
