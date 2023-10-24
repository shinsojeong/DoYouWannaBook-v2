import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../hook/useDebounce';
import useMove from '../hook/useMove';

import { uploadImg, updateBook } from '../modules/admin';
import { changeBar } from '../modules/topBar';
import { roomOp, bookshelfOp, shelfOp, useInput, useInputFile } from '../common/util/Reusable';


export default function CreateBook() {
    const [dispatch, navigate, debounce] = [useDispatch(), useMove(), useDebounce()];

    /** 기존 도서 상태 */
    const {
        libb_code, libb_title, libb_author, libb_publisher, libb_pub_date,
        libb_state, libb_isbn, libb_barcode, libb_class
    } = useSelector(state => state.admin.selected_book.book);
    const { room, bookshelf, shelf } = useSelector(state => state.admin.selected_book.location);

    /** 입력한 도서 상태 */
    const codeInputState = useInput(libb_code)
    const titleInputState = useInput(libb_title);
    const authorInputState = useInput(libb_author);
    const publisherInputState = useInput(libb_publisher);
    const pubDateInputState = useInput(libb_pub_date.slice(0,10));
    const stateInputState = libb_state;
    const isbnInputState = useInput(libb_isbn);
    const barcodeInputState = useInput(libb_barcode);
    const classCodeInputState = useInput(libb_class);
    const roomInputState = useInput(room);
    const bookshelfInputState = useInput(bookshelf);
    const shelfInputState = useInput(shelf);
    const libbInputState = useInputFile([]);

    /** 도서 수정 취소 */
    const cancel = debounce(() => navigate(-1, window.confirm("도서 수정을 취소하시겠습니까?")));

    /** 도서 수정 */
    const submit = debounce(async() => {
        const formData = new FormData();
        formData.append('libb', libbInputState.files[0]);

        try {
            const res = await dispatch(uploadImg(formData));
            dispatch(
                updateBook(
                    libb_code, 
                    codeInputState.value, 
                    titleInputState.value, 
                    authorInputState.value, 
                    publisherInputState.value, 
                    pubDateInputState.value, 
                    stateInputState, 
                    isbnInputState.value, 
                    barcodeInputState.value, 
                    res, 
                    classCodeInputState.value, 
                    roomInputState.value, 
                    bookshelfInputState.value, 
                    shelfInputState.value, 
                    navigate
                )
            );
        } catch(e) {
            alert("도서 수정 실패");
        }
    });

    useEffect(() => {
        dispatch(
            changeBar(
                "cancel", 
                { title: "도서 수정", data: null }, 
                "create", 
                cancel, 
                submit, 
                "small"
            )
        );
    }, [dispatch, cancel, submit]);


    return (
        <div id="update_book" className="contents">
            <input className="input" type="text" id="code" placeholder="청구기호" {...codeInputState}/>
            <input className="input" type="text" id="title" placeholder="도서명" {...titleInputState}/>
            <input className="input" type="text" id="author" placeholder="작가" {...authorInputState}/>
            <input className="input" type="text" id="publisher" placeholder="출판사" {...publisherInputState}/>
            <input className="inputDate" type="date" id="pub_date" placeholder="출판일" {...pubDateInputState}/>
            <input className="input" type="text" id="ReadOnly" value={stateInputState ? " 대출가능" : "대출불가"} readOnly/>
            <input className="input" type="text" id="isbn" placeholder="isbn" {...isbnInputState}/>
            <input className="input" type="text" id="barcode" placeholder="바코드" {...barcodeInputState}/>
            <input className="input" type="text" id="classCode" placeholder="분류 기호" {...classCodeInputState}/>
            <select className="inputSelect" placeholder="열람실" {...roomInputState}>
                {roomOp.map(({ value, label }) => {
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
            <select className="inputSelect" placeholder="책장" {...bookshelfInputState}>
                {bookshelfOp.map(({ value, label }) => {
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
            <select className="inputSelect" placeholder="선반" {...shelfInputState}>
                {shelfOp.map(({ value, label }) => {
                    return <option key={value} value={value}>{label}</option>
                })}
            </select>
            <div id="inputImg">
                <label htmlFor="libb">도서 이미지</label>
                <input type="file" id="libb" {...libbInputState}></input>
            </div>
        </div>
    );
}