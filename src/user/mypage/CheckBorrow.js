import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { getMypageBorrowList } from "../../modules/libBook";
import { extendDate } from "../../modules/libBook";
import ChangeHeader from "../../common/util/ChangeHeader";

import "../../styles/mypage.scss";

export default function CheckBorrow() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const std_num = useSelector((state) => state.user.user.std_num);
  const borrowList = useSelector((state) => state.libBook.borrow_list); //대출한 도서 목록

  useEffect(() => {
    dispatch(getMypageBorrowList(std_num));
    ChangeHeader({
      title: "userCheckBorrow",
      lfunc: () => navigate(-1),
      dispatch,
    });
  }, [dispatch, navigate, std_num]);

  /** 대출 연장 */
  const extend = debounce((libb_code, libb_ret_date) => {
    dispatch(extendDate(std_num, libb_code, libb_ret_date));
    dispatch(getMypageBorrowList(std_num));
  });

  return (
    <div id="check_borrow" className="contents">
      {borrowList.length > 0 &&
        borrowList.map(({ libb_code, libb_img, libb_title, libb_ret_date }) => {
          return (
            <div className="flex-row" id="table" key={libb_code}>
              <img
                src={libb_img}
                alt="bookImage"
                width="120px"
                height="160px"
                onError={(e) => (e.target.src = "http://placehold.it/120x160")}
              />
              <div className="flex-col" id="info">
                <p id="title">{libb_title}</p>
                <p>{libb_ret_date.slice(0, 10)}</p>
                <button onClick={() => extend(libb_code, libb_ret_date)}>
                  대출 연장
                </button>
              </div>
            </div>
          );
        })}
      {borrowList.length === 0 && (
        <div id="message">대출중인 도서가 없습니다.</div>
      )}
    </div>
  );
}
