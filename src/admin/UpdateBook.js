import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        dispatch(changeBar("cancel", {title:"도서 수정", data:null}, "create", cancel, submit, "small"));
    });

    //topbar function
    const cancel = () => {
        if(window.confirm("도서 수정을 취소하시겠습니까?")) {
            history.push('/admin/home');
        }
    };

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

    //change event
    const setImage = (e) => {
        setLibb(e.target.files[0]);
    };
    
    const submit = async() => {
        const formData = new FormData();
        formData.append('libb', libb);

        dispatch(uploadImg(formData))
        .then((res) => {
            dispatch(updateBook(book.libb_code, code, title, author, publisher, pubDate, state, isbn, barcode, res, classCode, room, bookshelf, shelf, history));
        });
    };


    return (
        <div id="createBook">
            <input type="text" id="code" value={code||''} onChange={(e) => setCode(e.target.value)} placeholder="청구기호"/>
            <input type="text" id="title" value={title||''} onChange={(e) => setTitle(e.target.value)} placeholder="도서명"/>
            <input type="text" id="author" value={author||''} onChange={(e) => setAuthor(e.target.value)} placeholder="작가"/>
            <input type="text" id="publisher" value={publisher||''} onChange={(e) => setPublisher(e.target.value)} placeholder="출판사"/>
            <input type="date" id="pub_date" value={pubDate||''} onChange={(e) => setPubDate(e.target.value)} placeholder="출판일"/>
            <input type="text" id="state" value={state||''} readOnly/>
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