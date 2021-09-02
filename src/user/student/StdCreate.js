import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uploadImg, createStdBook } from '../../modules/userBook';
import { changeBar } from '../../modules/topBar';

const StdCreate = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const std_num = useSelector(state => state.user.user.std_num);

    useEffect(() => {
        dispatch(changeBar("back", {title:"대여 도서 등록", data:null}, "create", cancel, submit, "small"));
    });

    //topbar function
    const cancel = () => {
        if(window.confirm("도서 등록을 취소하시겠습니까?")) {
            history.push('/user/std-main');
        }
    };

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [pubDate, setPubDate] = useState("");
    const [rentDate, setRentDate] = useState("7일");
    const state = true;
    const [rentFee, setRentFee] = useState(0);
    const [comment, setComment] = useState("");
    const [stdb, setStdb] = useState([]);

    //change event
    const setImage = (e) => {
        setStdb(e.target.files[0]);
    };
    
    const submit = () => {
        const formData = new FormData();
        formData.append('stdb', stdb);

        dispatch(uploadImg(formData))
        .then((res) => {
            dispatch(createStdBook(std_num, title, author, publisher, pubDate, rentDate, rentFee, state, comment, res, history));
        })
    };


    return (
        <div id="createStdBook" className="contents">
            <input type="text" id="title" value={title||''} onChange={(e) => setTitle(e.target.value)} placeholder="도서명"/>
            <input type="text" id="author" value={author||''} onChange={(e) => setAuthor(e.target.value)} placeholder="작가"/>
            <input type="text" id="publisher" value={publisher||''} onChange={(e) => setPublisher(e.target.value)} placeholder="출판사"/>
            <input type="date" id="pub_date" value={pubDate||''} onChange={(e) => setPubDate(e.target.value)} placeholder="출판일"/>
            <select value={rentDate||''} onChange={(e) => setRentDate(e.target.value)}>
                <option value="7일">7일</option>
                <option value="14일">14일</option>
                <option value="1개월">1개월</option>
                <option value="2개월">2개월</option>
                <option value="3개월">3개월</option>
                <option value="기간 채팅 문의">기간 채팅 문의</option>
            </select>
            <input type="text" id="rent_fee" onChange={(e) => setRentFee(e.target.value)} placeholder="대여료"/>
            <textarea placeholder="도서 상태 및 대여 정보를 자세하게 작성해주세요." value={comment||''} onChange={(e) => setComment(e.target.value)}/>
            <div id="inputImg">
                <p>도서 이미지</p>
                <input type="file" id="libb" onChange={setImage}></input>
            </div>
        </div>
    );
};

export default StdCreate;