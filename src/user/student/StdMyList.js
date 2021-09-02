import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMyBookList, deleteStdBook } from '../../modules/userBook';
import { getChatDetail1 } from '../../modules/chat';
import { changeBar } from '../../modules/topBar';

import '../../styles/student.scss';

const StdMyList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const bookList = useSelector(state => state.userBook.my_book_list);
    const std_num = useSelector(state => state.user.user.std_num);

    useEffect(() => {
        dispatch(getMyBookList(std_num));
        dispatch(changeBar("back", {title:"내 도서 조회", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history, std_num]);

    //도서 정보 삭제
    const deleteInfo = (stdb_code) => {
        dispatch(deleteStdBook(stdb_code, history));
    };

    //채팅하러 가기
    const goChat = (stdb_code, borrower) => {
        dispatch(getChatDetail1(stdb_code, borrower, history))
    };

    return (
        <div id="std_my_list" className="contents">
            {bookList.length!==0 ? 
            bookList.map((item) => {
                return(
                    <div id={item.stdb_code} className="list_item">
                        <table id="table1">
                            <tbody>
                                <tr>
                                    <td rowSpan="4">
                                        <img id="book_img" src={item.stdb_img} alt="book-img" width="120px"/>
                                    </td>
                                    <td id="td_title">{item.stdb_title}</td>
                                </tr>
                                <tr>
                                    <td>{item.stdb_author} | {item.stdb_publisher}</td>
                                </tr>
                                <tr>
                                    <td>출판일 : {item.stdb_pub_date.slice(0,10)}</td>
                                </tr>
                                <tr>
                                    <td>{item.stdb_rental_fee} ({item.stdb_rental_date}대여)</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="detail">
                            <table id="table2">
                                <tbody>
                                    <tr>
                                        <td id="td1">대여 상태</td>
                                        <td id="td2">{item.stdb_state ? "대여가능" : "대여중"}</td>
                                    </tr>
                                    <tr>
                                        <td id="td1">반납 예정일</td>
                                        <td id="td2">{item.stdb_ret_date!==null ? item.stdb_ret_date : "정보 없음"}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>{item.stdb_comment}</p>
                        </div>

                        <button onClick={() => deleteInfo(item.stdb_code)}>삭제</button>
                    </div>
                )
            }) : <p id="message">등록된 도서가 없습니다.</p>}
        </div>
    );
};

export default StdMyList;