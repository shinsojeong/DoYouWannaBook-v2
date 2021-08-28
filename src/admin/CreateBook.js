import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { uploadImg, createBook } from '../modules/admin';
import { changeBar } from '../modules/topBar';
import { roomOp, bookshelfOp, shelfOp } from '../common/util/Reusable';

const CreateBook = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(changeBar("cancel", {title:"도서 등록", data:null}, "create", cancel, submit, "small"));
    });

    //topbar function
    const cancel = () => {
        if(window.confirm("도서 등록을 취소하시겠습니까?")) {
            history.push('/admin/home');
        }
    };

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [pubDate, setPubDate] = useState("");
    const [state, setState] = useState(true);
    const [isbn, setIsbn] = useState("");
    const [barcode, setBarcode] = useState("");
    const [classCode, setClassCode] = useState("");
    const [room, setRoom] = useState("1");
    const [bookshelf, setBookshelf] = useState("1");
    const [shelf, setShelf] = useState("1");
    const [libb, setLibb] = useState([]);

    //change event
    const setImage = (e) => {
        setLibb(e.target.files[0]);
    };
    
    const submit = () => {
        const formData = new FormData();
        formData.append('libb', libb);

        dispatch(uploadImg(formData))
        .then((res) => {
            dispatch(createBook(code, title, author, publisher, pubDate, state, isbn, barcode, classCode, room, bookshelf, shelf, res, history));
        })
    };


    return (
        <div id="createBook">
            <input type="text" id="code" value={code||''} onChange={(e) => setCode(e.target.value)} placeholder="청구기호"/>
            <input type="text" id="title" value={title||''} onChange={(e) => setTitle(e.target.value)} placeholder="도서명"/>
            <input type="text" id="author" value={author||''} onChange={(e) => setAuthor(e.target.value)} placeholder="작가"/>
            <input type="text" id="publisher" value={publisher||''} onChange={(e) => setPublisher(e.target.value)} placeholder="출판사"/>
            <input type="date" id="pub_date" value={pubDate||''} onChange={(e) => setPubDate(e.target.value)} placeholder="출판일"/>
            <select value={state} onChange={(e) => setState(e.target.value)} placeholder="상태">
                <option value={true}>대출 가능</option>
                <option value={false}>대출 불가</option>
            </select>
            <input type="text" id="isbn" value={isbn||''} onChange={(e) => setIsbn(e.target.value)} placeholder="isbn"/>
            <input type="text" id="barcode" value={barcode||''} onChange={(e) => setBarcode(e.target.value)} placeholder="바코드"/>
            <input type="text" id="classCode" value={classCode||''} onChange={(e) => setClassCode(e.target.value)} placeholder="분류 기호"/>
            <select value={room} onChange={(e) => setRoom(e.target.value)} placeholder="열람실">
                {roomOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <select value={bookshelf} onChange={(e) => setBookshelf(e.target.value)} placeholder="책장">
                {bookshelfOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <select value={shelf} onChange={(e) => setShelf(e.target.value)} placeholder="선반">
                {shelfOp.map(item => {
                    return <option key={item.value} value={item.value}>{item.label}</option>
                })}
            </select>
            <div id="inputImg">
                <p>도서 이미지</p>
                <input type="file" id="libb" onChange={setImage}></input>
            </div>
            <input type="button" onClick={submit} value="임시 버튼"></input>
        </div>
    );
};

export default CreateBook;