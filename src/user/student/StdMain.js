import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../../hook/useDebounce';
import useMove from '../../hook/useMove';

import { searchStdBook } from '../../modules/userBook';
import { createChat, getChatDetail1 } from '../../modules/chat';
import { changeBar } from '../../modules/topBar';

import { AiOutlineClose, AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import '../../styles/student.scss';

export default function StdMain() {
    const [dispatch, navigate, debounce] = [useDispatch(), useMove(), useDebounce()];

    const std_num = useSelector(state => state.user.user.std_num);
    const searchResult = useSelector(state => state.userBook.search_list);  //공유 도서 검색 결과 리스트
    const [keyword, setKeyword] = useState("");  //공유 도서 검색 키워드
    const [menuState, setMenuState] = useState(false);  //메뉴 표시 상태

    useEffect(() => {
        dispatch(
            changeBar(
                "null", 
                { title: "공유 도서", data: null },
                "null",
                null,
                null,
                "small"
            )
        );
    },[dispatch]);
    
    /** 메뉴 열기/닫기 */
    const openMenu = debounce((state) => setMenuState(state));

    /** 공유 도서 검색 */
    const search = debounce(() => dispatch(searchStdBook(keyword)));

    /** 대여자와 채팅하기 */
    const goChat = debounce((stdb_code, lender) => {
        dispatch(createChat(stdb_code, lender, std_num, navigate));
        dispatch(getChatDetail1(stdb_code, std_num, navigate));
    });

    return (
        <div id="std_main" className="contents">
            <AiOutlineMenu id="menu_icon" size="20" onClick={() => openMenu(true)}/>
            <div id="menu" className={menuState ? "menu" : "hidden"}>
                <AiOutlineClose className={menuState ? "x_icon" : "hidden"} size="20" onClick={() => openMenu(false)}/>
                <p id="item1" className={menuState ? "menu_item" : "hidden"} onClick={() => navigate("/user1/std-create")}>대여 등록</p>
                <p id="item2" className={menuState ? "menu_item" : "hidden"} onClick={() => navigate("/user1/std-my-list")}>내가 쓴 글</p>
            </div>

            <div id="search_book" className="item">
                <input type="text" id="search_input" value={keyword||""} onChange={(e) => setKeyword(e.target.value)}/>
                <div id="search_button"><AiOutlineSearch onClick={search} size="27px"/></div>
            </div>

            <div id="search_result" className="contents">
                {searchResult.length !== 0 ?
                    searchResult.map(({ 
                        stdb_img,
                        stdb_title,
                        stdb_author,
                        stdb_publisher,
                        stdb_pub_date,
                        stdb_rental_fee,
                        stdb_rental_date,
                        stdb_comment,
                        stdb_code,
                        lender
                    }, index) => {
                        return (
                            <div className="item_wrap" key={index}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td rowSpan="4">
                                                <img id="book_img" src={stdb_img} alt="book-img" width="120px"/>
                                            </td>
                                            <td id="td_title">{stdb_title}</td>
                                        </tr>
                                        <tr>
                                            <td id="td_content">{stdb_author} | {stdb_publisher}</td>
                                        </tr>
                                        <tr>
                                            <td id="td_content">출판일 : {stdb_pub_date.slice(0,10)}</td>
                                        </tr>
                                        <tr>
                                            <td id="td_content">{stdb_rental_fee}원 ({stdb_rental_date} 대여)</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="detail">
                                    <p id="td_content">{stdb_comment}</p>
                                </div>
                                <button onClick={() => goChat(stdb_code, lender)}>대여자와 채팅하기</button>
                            </div>
                        )
                    })
                : <p id="message">검색 결과가 없습니다.</p>}
            </div>

        </div>
    );
}