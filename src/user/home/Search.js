import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { selectBook, searchBook } from "../../modules/libBook";

import ChangeHeader from "../../common/util/ChangeHeader";

import { AiOutlineSearch } from "react-icons/ai";
import "../../styles/home.scss";

export default function Search() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const searchResult = useSelector((state) => state.libBook.search_result); //검색도서
  const [keyword, setKeyword] = useState(""); //검색 키워드

  useEffect(() => {
    ChangeHeader({
      title: "userSearch",
      lfunc: () => navigate(-1),
      dispatch,
    });
  }, [dispatch, navigate]);

  /** 검색 */
  const search = debounce(() => {
    dispatch(searchBook(keyword));
    navigate("/user1/search");
  });

  /** 상세 페이지로 이동 */
  const goDetail = debounce((libb_code) => {
    dispatch(selectBook(libb_code));
    navigate("/user1/search-detail");
  });

  return (
    <div id="search" className="contents">
      <div id="search_book" className="item">
        <input
          type="text"
          id="search_input"
          value={keyword || ""}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div id="search_button">
          <AiOutlineSearch onClick={search} size="27px" />
        </div>
      </div>

      <div id="search_result">
        {searchResult.length > 0 &&
          searchResult.map(
            (
              {
                libb_img,
                libb_title,
                libb_author,
                libb_publisher,
                libb_pub_date,
                libb_state,
                libb_code,
              },
              index
            ) => {
              return (
                <div className="item_wrap" key={index}>
                  <table>
                    <tbody>
                      <tr>
                        <td rowSpan="5">
                          <img
                            id="book_img"
                            src={libb_img}
                            onError={(e) =>
                              (e.target.src = "http://placehold.it/120x160")
                            }
                            alt="book-img"
                            width="120px"
                          />
                        </td>
                        <td id="title">{libb_title}</td>
                      </tr>
                      <tr>
                        <td>{libb_author}</td>
                      </tr>
                      <tr>
                        <td>{libb_publisher}</td>
                      </tr>
                      <tr>
                        <td>{libb_pub_date.slice(0, 10)}</td>
                      </tr>
                      <tr>
                        <td>{libb_state}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={() => goDetail(libb_code)}>상세 정보</button>
                </div>
              );
            }
          )}
        {searchResult.length === 0 && <p id="message">검색 결과가 없습니다.</p>}
      </div>
    </div>
  );
}
