import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMove from "../../hook/useMove";

import ChangeHeader from "../../common/util/ChangeHeader";

import "../../styles/home.scss";

export default function SearchLocation() {
  const [dispatch, navigate] = [useDispatch(), useMove()];

  const { libb_title, libb_author, libb_code } = useSelector(
    (state) => state.libBook.selected_book
  );
  const { shelf, bookshelf } = useSelector(
    (state) => state.libBook.book_location
  );

  useEffect(() => {
    ChangeHeader({
      title: "userSearchLocation",
      lfunc: () => navigate(-1),
      dispatch,
    });
  }, [dispatch, navigate]);

  /** 열람실 책장 뷰 반환 */
  const createBox = (idx, num) => {
    return [...Array(num)].map((_, index) => {
      return (
        <div
          key={index}
          id={shelf === idx && bookshelf === index + 1 ? "highlight" : "none"}
          className="box"
        />
      );
    });
  };

  /** 열람실 뷰 반환 */
  const createRow = (row, num) => {
    return [...Array(row)].map((_, index) => {
      return (
        <div key={index} className="boxRow">
          {createBox(index + 1, num)}
        </div>
      );
    });
  };

  /** 선반 뷰 반환 */
  const createShelf = (num) => {
    return [...Array(num)].map((_, index) => {
      return (
        <div
          key={index}
          id={shelf === index + 1 ? "highlight" : "none"}
          className="shelf"
        />
      );
    });
  };

  return (
    <div id="search_location" className="contents">
      <div id="location1">
        {createRow(4, 6)}
        <div id="door">입구</div>
      </div>

      <div id="location2">
        <div id="bookshelf">
          <div className="shelf">{createShelf(4)}</div>
        </div>
        <table id="book_info">
          <tbody>
            <tr>
              <td id="td_title">{libb_title}</td>
            </tr>
            <tr>
              <td>{libb_author}</td>
            </tr>
            <tr>
              <td>{libb_code}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
