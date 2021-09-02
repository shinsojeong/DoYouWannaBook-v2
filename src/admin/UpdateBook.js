import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { uploadImg, updateBook } from '../modules/admin';
import { changeBar } from '../modules/topBar';
import { roomOp, bookshelfOp, shelfOp } from '../common/util/Reusable';


const CreateBook = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const book = useSelector(state => state.admin.selected_book.book);
    const location = useSelector(state => state.admin.selected_book.location);

    const [code, setCode] = useState(book.libb_code||'');
    const [title, setTitle] = useState(book.libb_title||'');
    const [author, setAuthor] = useState(book.libb_author||'');
    const [publisher, setPublisher] = useState(book.libb_publisher||'');
    const [pubDate, setPubDate] = useState(book.libb_pub_date.slice(0,10)||'');
    const state = book.libb_state;
    const [isbn, setIsbn] = useState(book.libb_isbn||'');
    const [barcode, setBarcode] = useState(book.libb_barcode||'');
    const [classCode, setClassCode] = useState(book.libb_class||'');
    const [room, setRoom] = useState(location.room||'');
    const [bookshelf, setBookshelf] = useState(location.bookshelf||'');
    const [shelf, setShelf] = useState(location.shelf||'');
    const [libb, setLibb] = useState([]);

    //취소
    const cancel = useCallback(async () => {
        if(window.confirm("도서 수정을 취소하시겠습니까?")) {
            history.goBack();
        }
    }, [history]);

    //제출
    const submit = useCallback(async() => {
        const formData = new FormData();
        formData.append('libb', libb);

        dispatch(uploadImg(formData))
        .then((res) => {
            dispatch(updateBook(book.libb_code, code, title, author, publisher, pubDate, state, isbn, barcode, res, classCode, room, bookshelf, shelf, history));
        });
    },[dispatch, libb, book.libb_code, code, title, author, publisher, pubDate, state, isbn, barcode, classCode, room, bookshelf, shelf, history]);

    useEffect(() => {
        dispatch(changeBar("cancel", {title:"도서 수정", data:null}, "create", cancel, submit, "small"));
    }, [dispatch, cancel, submit]);

    //change event
    const setImage = (e) => {
        setLibb(e.target.files[0]);
    };


    return (
        <div id="update_book" className="contents">
            <input className="input" type="text" id="code" value={code||''} onChange={(e) => setCode(e.target.value)} placeholder="청구기호"/>
            <input className="input" type="text" id="title" value={title||''} onChange={(e) => setTitle(e.target.value)} placeholder="도서명"/>
            <input className="input" type="text" id="author" value={author||''} onChange={(e) => setAuthor(e.target.value)} placeholder="작가"/>
            <input className="input" type="text" id="publisher" value={publisher||''} onChange={(e) => setPublisher(e.target.value)} placeholder="출판사"/>
            <input className="inputDate" type="date" id="pub_date" value={pubDate||''} onChange={(e) => setPubDate(e.target.value)} placeholder="출판일"/>
            <input className="input" type="text" id="ReadOnly" value={state ? " 대출가능" : "대출불가"} readOnly/>
            <input className="input" type="text" id="isbn" value={isbn||''} onChange={(e) => setIsbn(e.target.value)} placeholder="isbn"/>
            <input className="input" type="text" id="barcode" value={barcode||''} onChange={(e) => setBarcode(e.target.value)} placeholder="바코드"/>
            <input className="input" type="text" id="classCode" value={classCode||''} onChange={(e) => setClassCode(e.target.value)} placeholder="분류 기호"/>
            <select className="inputSelect" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="열람실">
                {roomOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <select className="inputSelect" value={bookshelf} onChange={(e) => setBookshelf(e.target.value)} placeholder="책장">
                {bookshelfOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <select className="inputSelect" value={shelf} onChange={(e) => setShelf(e.target.value)} placeholder="선반">
                {shelfOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <div id="inputImg">
                <label for="libb">도서 이미지</label>
                <input type="file" id="libb" onChange={setImage}></input>
            </div>
        </div>
    );
};

export default CreateBook;