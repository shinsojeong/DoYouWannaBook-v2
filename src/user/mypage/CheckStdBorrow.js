import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useMove from "../../hook/useMove";

import { getBorrowStdBookList } from "../../modules/userBook";
import { changeBar } from "../../modules/topBar";

export default function CheckStdBorrow() {
  const [dispatch, navigate] = [useDispatch(), useMove()];

  const std_num = useSelector((state) => state.user.user.std_num);
  const borrow_list = useSelector((state) => state.userBook.borrow_book_list); //공유 도서 대여 목록

  useEffect(() => {
    dispatch(getBorrowStdBookList(std_num));
    dispatch(
      changeBar(
        "back",
        { title: "공유 도서 조회", data: null },
        "null",
        () => navigate(-1),
        null,
        "small"
      )
    );
  }, [dispatch, navigate, std_num]);

  return (
    <div id="check_std_borrow" className="contents">
      {borrow_list.length > 0 &&
        borrow_list.map(
          ({ stdb_code, stdb_img, stdb_title, lender, stdb_ret_date }) => {
            return (
              <table key={stdb_code}>
                <tbody>
                  <tr>
                    <td rowSpan="3">
                      <img
                        src={stdb_img}
                        width="120px"
                        height="160px"
                        onError={(e) =>
                          (e.target.src = "http://placehold.it/120x160")
                        }
                        alt="bookimg"
                      />
                    </td>
                    <td id="td_title">{stdb_title}</td>
                  </tr>
                  <tr>
                    <td>{lender}의 도서</td>
                  </tr>
                  <tr>
                    <td>{stdb_ret_date.slice(0, 10)} 반납必</td>
                  </tr>
                </tbody>
              </table>
            );
          }
        )}
      {borrow_list.length === 0 && (
        <div id="message">대여중인 도서가 없습니다.</div>
      )}
    </div>
  );
}
