import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

import { uploadImg, createBook } from '../modules/admin';
import { changeBar } from '../modules/topBar';
import { roomOp, bookshelfOp, shelfOp, useInput, useInputFile } from '../common/util/Reusable';

export default function CreateBook() {
    const dispatch = useDispatch();
    const history = useHistory();

    const code = useInput("");
    const title = useInput("");
    const author = useInput("");
    const publisher = useInput("");
    const pubDate = useInput("");
    const state = useInput(true);
    const isbn = useInput("");
    const barcode = useInput("");
    const classCode = useInput("");
    const room = useInput("1");
    const bookshelf = useInput("1");
    const shelf = useInput("1");
    const libb = useInputFile([]);

    //취소
    const cancel = debounce(useCallback(() => {
        if (window.confirm("도서 등록을 취소하시겠습니까?")) {
            history.push("/admin/home");
        }
    }, [history]), 800);

    //제출
    const submit = debounce(useCallback(async() => {
        const formData = new FormData();
        formData.append('libb', libb.files[0]);

        const res = await dispatch(uploadImg(formData));
        dispatch(
            createBook(
                code.value, 
                title.value, 
                author.value, 
                publisher.value, 
                pubDate.value, 
                state.value, 
                isbn.value, 
                barcode.value, 
                classCode.value, 
                room.value, 
                bookshelf.value, 
                shelf.value, 
                res, 
                history
            )
        );
    }, [code, title, author, barcode, bookshelf, classCode, dispatch, history, isbn, libb, pubDate, publisher, room, shelf, state]), 800);

    useEffect(() => {
        dispatch(
            changeBar(
                "cancel", 
                { title: "도서 등록", data: null }, 
                "create", 
                cancel, 
                submit, 
                "small"
            )
        );
    }, [dispatch, cancel, submit]);


    return (
        <div id="create_book" className="contents">
            <input className="input" type="text" id="code" placeholder="청구기호" {...code}/>
            <input className="input" type="text" id="title" placeholder="도서명" {...title}/>
            <input className="input" type="text" id="author" placeholder="작가" {...author}/>
            <input className="input" type="text" id="publisher" placeholder="출판사" {...publisher}/>
            <input className="inputDate" type="date" id="pub_date" placeholder="출판일" {...pubDate}/>
            <select className="inputSelect" placeholder="상태" {...state}>
                <option value={true}>대출 가능</option>
                <option value={false}>대출 불가</option>
            </select>
            <input className="input" type="text" id="isbn" placeholder="isbn" {...isbn}/>
            <input className="input" type="text" id="barcode" placeholder="바코드" {...barcode}/>
            
            <input className="input" type="text" id="classCode" placeholder="분류 기호" {...classCode}/>
            <select className="inputSelect" {...room}>
                {roomOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <select className="inputSelect" {...bookshelf}>
                {bookshelfOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <select className="inputSelect" {...shelf}>
                {shelfOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <div id="inputImg">
                <label htmlFor="libb">도서 이미지 업로드</label>
                <input type="file" id="libb" {...libb}></input>
            </div>
        </div>
    );
}