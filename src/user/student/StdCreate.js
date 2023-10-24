import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hook/useDebounce";
import useMove from "../../hook/useMove";

import { uploadImg, createStdBook } from "../../modules/userBook";

import ChangeHeader from "../../common/util/ChangeHeader";

export default function StdCreate() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const std_num = useSelector((state) => state.user.user.std_num);

  const [stdb_title, set_stdb_title] = useState(""),
    [stdb_author, set_stdb_author] = useState(""),
    [stdb_publisher, set_stdb_publisher] = useState(""),
    [stdb_pub_date, set_stdb_pub_date] = useState(""),
    [stdb_rental_date, set_stdb_rental_date] = useState("7일"),
    stdb_state = true,
    [stdb_rental_fee, set_stdb_rental_fee] = useState(0),
    [stdb_comment, set_stdb_comment] = useState(""),
    [stdb, set_stdb] = useState([]);

  useEffect(() => {
    ChangeHeader({
      title: "userStdCreate",
      lfunc: cancel,
      rfunc: submit,
      dispatch,
    });
  });

  /** 상단바 좌측 함수: 도서 등록 취소 */
  const cancel = debounce(() => {
    navigate("/user/std-main", window.confirm("도서 등록을 취소하시겠습니까?"));
  });

  /** 이미지 업로드 */
  const upload = async (image) => {
    const formData = new FormData();
    formData.append("stdb", image);
    const url = dispatch(uploadImg(formData));
    return url;
  };

  /** 상단바 우측 함수: 도서 등록 */
  const submit = debounce(async () => {
    let stdb_url = "";
    if (stdb.length > 0) stdb_url = await upload(stdb[0]);

    dispatch(
      createStdBook({
        std_num,
        stdb_title,
        stdb_author,
        stdb_publisher,
        stdb_pub_date,
        stdb_rental_date,
        stdb_rental_fee,
        stdb_state,
        stdb_comment,
        stdb: stdb_url,
      })
    );
    navigate("/user/std-main");
  });

  /** change Event */
  const changeEvent = (e) => {
    const id = e.target.getAttribute("id");
    const value = e.target.value;
    if (id === "stdb_title") set_stdb_title(value);
    else if (id === "stdb_author") set_stdb_author(value);
    else if (id === "stdb_publisher") set_stdb_publisher(value);
    else if (id === "stdb_pub_date") set_stdb_pub_date(value);
    else if (id === "stdb_rental_date") set_stdb_rental_date(value);
    else if (id === "stdb_rental_fee") set_stdb_rental_fee(value);
    else if (id === "stdb_comment") set_stdb_comment(value);
    else if (id === "stdb") set_stdb(e.target.files);
  };

  return (
    <div
      id="createStdBook"
      className="contents"
      onChange={(e) => changeEvent(e)}
    >
      <input
        className="input"
        type="text"
        id="stdb_title"
        placeholder="도서명"
        value={stdb_title}
      />
      <input
        className="input"
        type="text"
        id="stdb_author"
        placeholder="작가"
        value={stdb_author}
      />
      <input
        className="input"
        type="text"
        id="stdb_publisher"
        placeholder="출판사"
        value={stdb_publisher}
      />
      <input
        className="inputDate"
        type="date"
        id="stdb_pub_date"
        placeholder="출판일"
        value={stdb_pub_date}
      />
      <select
        className="inputSelect"
        id="stdb_rental_date"
        value={stdb_rental_date}
      >
        <option value="7일">7일</option>
        <option value="14일">14일</option>
        <option value="1개월">1개월</option>
        <option value="2개월">2개월</option>
        <option value="3개월">3개월</option>
        <option value="기간 채팅 문의">기간 채팅 문의</option>
      </select>
      <input
        className="input"
        type="text"
        id="stdb_rental_fee"
        placeholder="대여료"
        value={stdb_rental_fee}
      />
      <textarea
        className="textarea"
        id="stdb_comment"
        placeholder="도서 상태 및 대여 정보를 자세하게 작성해주세요."
        value={stdb_comment}
      />
      <div id="inputImg">
        <p>도서 이미지</p>
        <label htmlFor="stdb" id="upload">
          업로드
        </label>
        <input type="file" id="stdb" files={stdb}></input>
      </div>
    </div>
  );
}
