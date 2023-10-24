import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useDebounce from '../hook/useDebounce';
import useMove from '../hook/useMove';

import { uploadImg, createBook } from '../modules/admin';
import { changeBar } from '../modules/topBar';
import { roomOp, bookshelfOp, shelfOp, useInput, useInputFile } from '../common/util/Reusable';

export default function CreateBook() {
    const [dispatch, navigate, debounce] = [useDispatch(), useMove(), useDebounce()];

    const code = useInput(""), title = useInput(""), author = useInput(""), publisher = useInput(""),
          pubDate = useInput(""), state = useInput(true), isbn = useInput(""), barcode = useInput(""),
          classCode = useInput(""), room = useInput("1"), bookshelf = useInput("1"),
          shelf = useInput("1"), libb = useInputFile([]);

    /** 도서 등록 취소 */
    const cancel = debounce(() => navigate("/admin/home", window.confirm("도서 등록을 취소하시겠습니까?")));

    /** 도서 등록 */
    const submit = debounce(async() => {
        const formData = new FormData();
        formData.append('libb', libb.files[0]);

        try {
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
                    navigate
                )
            );
        } catch(e) {
            alert("도서 등록 실패");
        }
    });

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
                {roomOp.map(({ value, label }) => {
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
            <select className="inputSelect" {...bookshelf}>
                {bookshelfOp.map(({ value, label }) => {
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
            <select className="inputSelect" {...shelf}>
                {shelfOp.map(({ value, label }) => {
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
            <div id="inputImg">
                <label htmlFor="libb">도서 이미지 업로드</label>
                <input type="file" id="libb" {...libb}></input>
            </div>
        </div>
    );
}