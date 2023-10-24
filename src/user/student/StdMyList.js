import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { getMyBookList, deleteStdBook } from "../../modules/userBook";

import ChangeHeader from "../../common/util/ChangeHeader";

import "../../styles/student.scss";

export default function StdMyList() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const bookList = useSelector((state) => state.userBook.my_book_list); //내가 등록한 공유 도서 목록
  const std_num = useSelector((state) => state.user.user.std_num);

  useEffect(() => {
    ChangeHeader({
      title: "userStdMyList",
      lfunc: () => navigate(-1),
      dispatch,
    });
    dispatch(getMyBookList(std_num));
  }, [dispatch, navigate, std_num]);

  /** 도서 정보 삭제 */
  const deleteInfo = debounce((stdb_code) =>
    dispatch(deleteStdBook(stdb_code, navigate))
  );

  return (
    <div id="std_my_list" className="contents">
      {bookList.length > 0 &&
        bookList.map(
          ({
            stdb_code,
            stdb_img,
            stdb_title,
            stdb_author,
            stdb_publisher,
            stdb_pub_date,
            stdb_rental_fee,
            stdb_rental_date,
            stdb_state,
            stdb_ret_date,
            stdb_comment,
          }) => {
            return (
              <div id={stdb_code} className="list_item" key={stdb_code}>
                <div id="table1" className="flex-row">
                  <img
                    id="book_img"
                    src={stdb_img}
                    alt="book-img"
                    width="120px"
                    height="160px"
                    onError={(e) =>
                      (e.target.src = "http://placehold.it/120x160")
                    }
                  />
                  <div className="flex-col" id="info">
                    <div id="title">{stdb_title}</div>
                    <div>
                      {stdb_author} | {stdb_publisher}
                    </div>
                    <div>출판일 : {stdb_pub_date.slice(0, 10)}</div>
                    <div>
                      {stdb_rental_fee} ({stdb_rental_date}대여)
                    </div>
                  </div>
                </div>

                <div id="table2" className="flex-col">
                  <div className="flex-row">
                    <div id="td1">대여 상태</div>
                    <div id="td2">{stdb_state ? "대여가능" : "대여중"}</div>
                  </div>
                  <div className="flex-row">
                    <div id="td1">반납 예정일</div>
                    <div id="td2">
                      {stdb_ret_date !== null ? stdb_ret_date : "정보 없음"}
                    </div>
                  </div>
                </div>
                <p>{stdb_comment}</p>

                <button onClick={() => deleteInfo(stdb_code)}>삭제</button>
              </div>
            );
          }
        )}
      {bookList.length === 0 && <p id="message">등록된 도서가 없습니다.</p>}
    </div>
  );
}
