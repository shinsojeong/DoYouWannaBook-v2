import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";

import { uploadImg, updateBook } from '../modules/admin';
import { changeBar } from '../modules/topBar';
import { roomOp, bookshelfOp, shelfOp, useInput, useInputFile } from '../common/util/Reusable';


const CreateBook = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const book = useSelector(state => state.admin.selected_book.book);
    const location = useSelector(state => state.admin.selected_book.location);

    //states
    const code = useInput(book.libb_code)
    const title = useInput(book.libb_title);
    const author = useInput(book.libb_author);
    const publisher = useInput(book.libb_publisher);
    const pubDate = useInput(book.libb_pub_date.slice(0,10));
    const state = book.libb_state;
    const isbn = useInput(book.libb_isbn);
    const barcode = useInput(book.libb_barcode);
    const classCode = useInput(book.libb_class);
    const room = useInput(location.room);
    const bookshelf = useInput(location.bookshelf);
    const shelf = useInput(location.shelf);
    const libb = useInputFile([]);

    //취소
    const cancel = debounce(useCallback(async () => {
        if(window.confirm("도서 수정을 취소하시겠습니까?")) {
            history.goBack();
        }
    }, [history]), 800);

    //제출
    const submit = debounce(useCallback(async() => {
        const formData = new FormData();
        formData.append('libb', libb.files[0]);

        dispatch(uploadImg(formData))
        .then((res) => {
            dispatch(updateBook(book.libb_code, code.value, title.value, author.value, publisher.value, pubDate.value, state, isbn.value, barcode.value, res, classCode.value, room.value, bookshelf.value, shelf.value, history));
        });
    },[dispatch, libb, book.libb_code, code, title, author, publisher, pubDate, state, isbn, barcode, classCode, room, bookshelf, shelf, history]), 800);

    useEffect(() => {
        dispatch(changeBar("cancel", {title:"도서 수정", data:null}, "create", cancel, submit, "small"));
    }, [dispatch, cancel, submit]);


    return (
        <div id="update_book" className="contents">
            <input className="input" type="text" id="code" placeholder="청구기호" {...code}/>
            <input className="input" type="text" id="title" placeholder="도서명" {...title}/>
            <input className="input" type="text" id="author" placeholder="작가" {...author}/>
            <input className="input" type="text" id="publisher" placeholder="출판사" {...publisher}/>
            <input className="inputDate" type="date" id="pub_date" placeholder="출판일" {...pubDate}/>
            <input className="input" type="text" id="ReadOnly" value={state ? " 대출가능" : "대출불가"} readOnly/>
            <input className="input" type="text" id="isbn" placeholder="isbn" {...isbn}/>
            <input className="input" type="text" id="barcode" placeholder="바코드" {...barcode}/>
            <input className="input" type="text" id="classCode" placeholder="분류 기호" {...classCode}/>
            <select className="inputSelect" placeholder="열람실" {...room}>
                {roomOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <select className="inputSelect" placeholder="책장" {...bookshelf}>
                {bookshelfOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <select className="inputSelect" placeholder="선반" {...shelf}>
                {shelfOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <div id="inputImg">
                <label for="libb">도서 이미지</label>
                <input type="file" id="libb" {...libb}></input>
            </div>
        </div>
    );
};

export default CreateBook;