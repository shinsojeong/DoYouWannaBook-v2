import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { getBookLoc } from "../../modules/libBook";
import { changeBar } from "../../modules/topBar";

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
    dispatch(
      changeBar(
        "back",
        { title: "도서 정보", data: null },
        "null",
        () => navigate(-1),
        null,
        "small"
      )
    );
  }, [dispatch, navigate]);

  /** 위치 정보 보기 */
  const goLocation = debounce((class_sign) => {
    dispatch(getBookLoc(class_sign));
    navigate("/user1/search-location");
  });

  return (
    <div id="search_detail" className="contents">
      <table id="info">
        <tbody>
          <tr>
            <td colSpan="2" id="book_name">
              {libb_title}
            </td>
          </tr>
          <tr>
            <td colSpan="2" id="author">
              {libb_author}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <img
                src={libb_img}
                onError={(e) => (e.target.src = "http://placehold.it/200x200")}
                alt="bookImage"
                width="200px"
              />
            </td>
          </tr>
          <tr>
            <td id="td_title">ISBN</td>
            <td id="isbn">{libb_isbn}</td>
          </tr>
          <tr>
            <td id="td_title">출판사</td>
            <td id="publisher">{libb_publisher}</td>
          </tr>
          <tr>
            <td id="td_title">출판일</td>
            <td id="publish_date">{libb_pub_date.slice(0, 10)}</td>
          </tr>
        </tbody>
      </table>

      <div id="location">
        <p className="title">· 소장 정보</p>
        <table>
          <tbody>
            <tr>
              <td id="td_title">청구기호</td>
              <td>{libb_code}</td>
            </tr>
            <tr>
              <td id="td_title">대출상태</td>
              <td>{libb_state ? "대출가능" : "대출중"}</td>
            </tr>
            <tr>
              <td id="td_title">위치보기</td>
              <td id="button" onClick={() => goLocation(libb_class)}>
                보기
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
