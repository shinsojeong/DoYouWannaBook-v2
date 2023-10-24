import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import useDebounce from "../hook/useDebounce";
import useMove from "../hook/useMove";

import { uploadImg, createBook, updateBook } from "../modules/admin";
import { changeBar } from "../modules/topBar";
import { roomOp, bookshelfOp, shelfOp } from "../common/util/Reusable";

export default function CreateBook() {
  const [dispatch, navigate, debounce] = [
    useDispatch(),
    useMove(),
    useDebounce(),
  ];

  const { type } = useParams(); //update: 수정, create: 등록

  /** 기존 도서 상태 */
  const libb = useSelector((state) => state.admin.selected_book.book);
  const last_img = useSelector(
    (state) => state.admin.selected_book.book.libb_img
  );
  const location = useSelector((state) => state.admin.selected_book.location);

  const [libb_code, set_libb_code] = useState(libb.libb_code),
    [libb_title, set_libb_title] = useState(libb.libb_title),
    [libb_author, set_libb_author] = useState(libb.libb_author),
    [libb_publisher, set_libb_publisher] = useState(libb.libb_publisher),
    [libb_pub_date, set_libb_pub_date] = useState(
      libb.libb_pub_date.slice(0, 10)
    ),
    [libb_state, set_libb_state] = useState(libb.libb_state),
    [libb_isbn, set_libb_isbn] = useState(libb.libb_isbn),
    [libb_barcode, set_libb_barcode] = useState(libb.libb_barcode),
    [libb_class, set_libb_class] = useState(libb.libb_class),
    [room, set_room] = useState(location.room),
    [bookshelf, set_bookshelf] = useState(location.bookshelf),
    [shelf, set_shelf] = useState(location.shelf),
    [img, set_img] = useState([]);

  /** 도서 등록 취소 */
  const cancel = debounce(() =>
    navigate("/admin/home", window.confirm("도서 등록을 취소하시겠습니까?"))
  );

  /** 이미지 업로드 */
  const upload = async (image) => {
    const formData = new FormData();
    formData.append("libb", image);
    const url = dispatch(uploadImg(formData));
    return url;
  };

  /** 도서 등록/수정 */
  const submit = debounce(async () => {
    let libb_img = last_img;
    if (img.length > 0) libb_img = await upload(img[0]);

    if (type === "create") {
      dispatch(
        createBook({
          libb_code,
          libb_title,
          libb_author,
          libb_publisher,
          libb_pub_date,
          libb_state,
          libb_isbn,
          libb_barcode,
          libb_img,
          libb_class,
          room,
          bookshelf,
          shelf,
          navigate,
        })
      );
    } else if (type === "update") {
      dispatch(
        updateBook({
          pre_code: libb.libb_code,
          libb_code,
          libb_title,
          libb_author,
          libb_publisher,
          libb_pub_date,
          libb_state,
          libb_isbn,
          libb_barcode,
          libb_img,
          libb_class,
          room,
          bookshelf,
          shelf,
          navigate,
        })
      );
    }
  });

  useEffect(() => {
    dispatch(
      changeBar({
        left: "cancel",
        center: {
          title: type === "create" ? "도서 등록" : "도서 수정",
          data: null,
        },
        right: "create",
        lfunc: cancel,
        rfunc: submit,
        size: "small",
      })
    );
  }, [dispatch, cancel, type, submit]);

  return (
    <div id="create_book" className="contents">
      <input
        className="input"
        type="text"
        id="code"
        placeholder="청구기호"
        value={libb_code}
        onChange={(e) => set_libb_code(e.target.value)}
      />
      <input
        className="input"
        type="text"
        id="title"
        placeholder="도서명"
        value={libb_title}
        onChange={(e) => set_libb_title(e.target.value)}
      />
      <input
        className="input"
        type="text"
        id="author"
        placeholder="작가"
        value={libb_author}
        onChange={(e) => set_libb_author(e.target.value)}
      />
      <input
        className="input"
        type="text"
        id="publisher"
        placeholder="출판사"
        value={libb_publisher}
        onChange={(e) => set_libb_publisher(e.target.value)}
      />
      <input
        className="inputDate"
        type="date"
        id="pub_date"
        placeholder="출판일"
        value={libb_pub_date}
        onChange={(e) => set_libb_pub_date(e.target.value)}
      />
      <select
        className="inputSelect"
        placeholder="상태"
        id="state"
        value={libb_state}
        onChange={(e) => set_libb_state(e.target.value)}
      >
        <option value={true}>대출 가능</option>
        <option value={false}>대출 불가</option>
      </select>
      <input
        className="input"
        type="text"
        id="isbn"
        placeholder="isbn"
        value={libb_isbn}
        onChange={(e) => set_libb_isbn(e.target.value)}
      />
      <input
        className="input"
        type="text"
        id="barcode"
        placeholder="바코드"
        value={libb_barcode}
        onChange={(e) => set_libb_barcode(e.target.value)}
      />

      <input
        className="input"
        type="text"
        id="class"
        placeholder="분류 기호"
        value={libb_class}
        onChange={(e) => set_libb_class(e.target.value)}
      />
      <select
        className="inputSelect"
        id="room"
        value={room}
        onChange={(e) => set_room(e.target.value)}
      >
        {roomOp.map(({ value, label }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <select
        className="inputSelect"
        id="bookshelf"
        value={bookshelf}
        onChange={(e) => set_bookshelf(e.target.value)}
      >
        {bookshelfOp.map(({ value, label }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <select
        className="inputSelect"
        id="shelf"
        value={shelf}
        onChange={(e) => set_shelf(e.target.value)}
      >
        {shelfOp.map(({ value, label }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <div id="inputImg">
        <label htmlFor="img">도서 이미지 업로드</label>
        <input
          type="file"
          id="img"
          files={img}
          onChange={(e) => set_img(e.target.files)}
        ></input>
      </div>
    </div>
  );
}
