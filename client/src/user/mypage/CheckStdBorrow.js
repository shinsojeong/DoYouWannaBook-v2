import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useMove from "../../hook/useMove";

import { getBorrowStdBookList } from "../../modules/userBook";

import ChangeHeader from "../../common/util/ChangeHeader";

export default function CheckStdBorrow() {
  const [dispatch, navigate] = [useDispatch(), useMove()];

  const std_num = useSelector((state) => state.user.user.std_num);
  const borrow_list = useSelector((state) => state.userBook.borrow_book_list); //공유 도서 대여 목록

  useEffect(() => {
    dispatch(getBorrowStdBookList(std_num));
    ChangeHeader({
      title: "userCheckStdBorrow",
      lfunc: () => navigate(-1),
      dispatch,
    });
  }, [dispatch, navigate, std_num]);

  return (
    <div id="check_std_borrow" className="contents">
      {borrow_list.length > 0 &&
        borrow_list.map(
          ({ stdb_code, stdb_img, stdb_title, lender, stdb_ret_date }) => {
            return (
              <div className="flex-row" id="table" key={stdb_code}>
                <img
                  src={stdb_img}
                  width="120px"
                  height="160px"
                  onError={(e) =>
                    (e.target.src = "http://placehold.it/120x160")
                  }
                  alt="bookimg"
                />
                <div className="flex-col" id="info">
                  <p id="title">{stdb_title}</p>
                  <p>{lender}의 도서</p>
                  <p>{stdb_ret_date && stdb_ret_date.slice(0, 10)} 반납 필수</p>
                </div>
              </div>
            );
          }
        )}
      {borrow_list.length === 0 && (
        <div id="message">대여중인 도서가 없습니다.</div>
      )}
    </div>
  );
}
