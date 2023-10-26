import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMove from "../hook/useMove";
import useDebounce from "../hook/useDebounce";

import { getBook, searchBook, deleteBook } from "../modules/admin";

import ChangeHeader from "../common/util/ChangeHeader";

import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBook() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const searchRes = useSelector((state) => state.admin.search_result);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    ChangeHeader({
      title: "adminSearchBook",
      lfunc: () => navigate(-1),
      dispatch,
    });
  }, [dispatch, navigate]);

  /** 도서 검색 */
  const search = debounce(() => dispatch(searchBook(keyword, navigate)));

  /** 도서 수정 */
  const goUpdateBook = debounce((libb_code) =>
    dispatch(getBook(libb_code, navigate))
  );

  /** 도서 삭제 */
  const goDeleteBook = debounce((libb_code) => {
    if (window.confirm("도서 정보를 삭제하시겠습니까?")) {
      dispatch(deleteBook(libb_code, navigate));
    }
  });

  return (
    <div id="search_book">
      <div id="search" className="contents">
        <input
          className="search_input"
          type="text"
          id="keyword"
          value={keyword || ""}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div id="search_button">
          <AiOutlineSearch onClick={search} size="27px" />
        </div>
      </div>
      <div id="search_result">
        {searchRes.length > 0 &&
          searchRes.map(
            ({
              libb_code,
              libb_img,
              libb_title,
              libb_author,
              libb_publisher,
              libb_pub_date,
              libb_state,
            }) => {
              return (
                <div className="result_item" key={libb_code}>
                  <div className="flex-row" id="result_item_wrap">
                    <img
                      src={libb_img}
                      width="120px"
                      height="160px"
                      onError={(e) =>
                        (e.target.src = "http://placehold.it/120x160")
                      }
                      alt="도서 이미지"
                    />
                    <div className="flex-col">
                      <span id="title">{libb_title}</span>
                      <span id="content">{libb_author}</span>
                      <span id="content">{libb_publisher}</span>
                      <span id="content">{libb_pub_date.slice(0, 10)}</span>
                      <span id="content">
                        {libb_state ? "대출 가능" : "대출중"}
                      </span>
                    </div>
                  </div>
                  <button id="upd_btn" onClick={() => goUpdateBook(libb_code)}>
                    수정
                  </button>
                  <button id="del_btn" onClick={() => goDeleteBook(libb_code)}>
                    삭제
                  </button>
                </div>
              );
            }
          )}
        {searchRes.length === 0 && <p id="message">검색 결과가 없습니다.</p>}
      </div>
    </div>
  );
}
