import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

import { uploadImg, createStdBook } from '../../modules/userBook';
import { changeBar } from '../../modules/topBar';
import { useInput, useInputFile } from '../../common/util/Reusable';

const StdCreate = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const std_num = useSelector(state => state.user.user.std_num);

    useEffect(() => {
        dispatch(
            changeBar(
                "back", 
                { title: "대여 도서 등록", data: null }, 
                "create",
                cancel,
                submit,
                "small"
            )
        );
    });

    //topbar function
    const cancel = debounce(() => {
        if (window.confirm("도서 등록을 취소하시겠습니까?")) {
            history.push("/user/std-main");
        }
    }, 800);

    const title = useInput("");
    const author = useInput("");
    const publisher = useInput("");
    const pubDate = useInput("");
    const rentDate = useInput("7일");
    const state = true;
    const rentFee = useInput(0);
    const comment = useInput("");
    const stdb = useInputFile([]);

    //제출
    const submit = debounce(async() => {
        const formData = new FormData();
        formData.append('stdb', stdb.files[0]);

        await dispatch(uploadImg(formData))
        dispatch(
            createStdBook(
                std_num, 
                title.value, 
                author.value, 
                publisher.value, 
                pubDate.value, 
                rentDate.value, 
                rentFee.value, 
                state, 
                comment.value, 
                res, 
                history
            )
        );
    }, 800);


    return (
        <div id="createStdBook" className="contents">
            <input className="input" type="text" id="title" placeholder="도서명" {...title}/>
            <input className="input" type="text" id="author" placeholder="작가" {...author}/>
            <input className="input" type="text" id="publisher" placeholder="출판사" {...publisher}/>
            <input className="inputDate" type="date" id="pub_date" placeholder="출판일" {...pubDate}/>
            <select className="inputSelect" {...rentDate}>
                <option value="7일">7일</option>
                <option value="14일">14일</option>
                <option value="1개월">1개월</option>
                <option value="2개월">2개월</option>
                <option value="3개월">3개월</option>
                <option value="기간 채팅 문의">기간 채팅 문의</option>
            </select>
            <input className="input" type="text" id="rent_fee" placeholder="대여료" {...rentFee}/>
            <textarea className="textarea" placeholder="도서 상태 및 대여 정보를 자세하게 작성해주세요." {...comment}/>
            <div id="inputImg">
                <p>도서 이미지</p>
                <label for="stdb" id="upload">업로드</label>
                <input type="file" id="stdb" {...stdb}></input>
            </div>
        </div>
    );
}

export default StdCreate;