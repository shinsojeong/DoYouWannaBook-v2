import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMyBookList, deleteStdBook } from '../../modules/userBook';
import { getChatDetail1 } from '../../modules/chat';

import '../../styles/user_std.scss';

const StdMyList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const bookList = useSelector(state => state.userBook.my_book_list);
    const std_num = useSelector(state => state.user.user.std_num);
    const [active, setActive] = useState("");
    const changeActive = (e) => {
        setActive(e.target.value);
    };

    useEffect(() => {
        dispatch(getMyBookList(std_num));
    }, [dispatch, std_num]);

    //도서 정보 삭제
    const deleteInfo = (stdb_code) => {
        dispatch(deleteStdBook(stdb_code, history));
    };

    //채팅하러 가기
    const goChat = (stdb_code, borrower) => {
        dispatch(getChatDetail1(stdb_code, borrower, history))
    };

    return (
        <div id="std_my_list">
            {bookList.length!==0 ? 
            bookList.map((item) => {
                return(
                    <div id={item.stdb_code} className="list_item">
                        <table onClick={() => changeActive}>
                            <tbody>
                                <tr>
                                    <td rowSpan="3">
                                        <img id="book_img" src={item.stdb_img} alt="book-img" width="120px"/>
                                    </td>
                                    <td>{item.stdb_title}</td>
                                </tr>
                                <tr>
                                    <td>{item.stdb_author} | {item.stdb_publisher} ({item.stdb_pub_date.slice(0,10)})</td>
                                </tr>
                                <tr>
                                    <td>{item.stdb_rental_fee} ({item.stdb_rental_date}대여)</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="detail" id={active===item.stdb_code?"show_detail":"hidden"}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>대여 상태</td>
                                        <td>{item.stdb_state}</td>
                                    </tr>
                                    <tr>
                                        <td>반납 예정일</td>
                                        <td>{item.stdb_ret_date!=="" ? item.stdb_ret_date : null}</td>
                                    </tr>
                                    {item.borrower!=="" ? 
                                    <tr><td colSpan="2" onClick={() => goChat(item.stdb_code, item.borrower)}>채팅하기</td></tr>
                                    : null}
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