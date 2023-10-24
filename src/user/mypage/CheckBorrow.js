import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { getMypageBorrowList } from "../../modules/libBook";
import { extendDate } from "../../modules/libBook";
import { changeBar } from "../../modules/topBar";

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
    dispatch(
      changeBar(
        "back",
        { title: "도서 대출 조회", data: null },
        "null",
        () => navigate(-1),
        null,
        "small"
      )
    );
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
            <table key={libb_code}>
              <tbody>
                <tr>
                  <td rowSpan="3">
                    <img
                      src={libb_img}
                      alt="bookImage"
                      width="120px"
                      height="160px"
                      onError={(e) =>
                        (e.target.src = "http://placehold.it/120x160")
                      }
                    />
                  </td>
                  <td id="td_title">{libb_title}</td>
                </tr>
                <tr>
                  <td>{libb_ret_date.slice(0, 10)}</td>
                </tr>
                <tr>
                  <button onClick={() => extend(libb_code, libb_ret_date)}>
                    대출 연장
                  </button>
                </tr>
              </tbody>
            </table>
          );
        })}
      {borrowList.length === 0 && (
        <div id="message">대출중인 도서가 없습니다.</div>
      )}
    </div>
  );
}
