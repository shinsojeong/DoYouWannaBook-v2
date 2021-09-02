import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchStdBook } from '../../modules/userBook';
import { createChat, getChatDetail1 } from '../../modules/chat';
import { changeBar } from '../../modules/topBar';
import { AiOutlineClose } from "react-icons/ai";

import '../../styles/user_std.scss';

const StdMain = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const std_num = useSelector(state => state.user.user.std_num);
    const searchResult = useSelector(state => state.userBook.search_list);  //검색도서 받아옴
    const [keyword, setKeyword] = useState("");
    const [active, setActive] = useState("");
    const changeActive = (e) => {
        setActive(e.target.value);
    };
    const [menuState, setMenuState] = useState(false);

    useEffect(() => {
        dispatch(changeBar("menu", {title:"공유 도서", data:null}, "null", openMenu, null, "small"));
    },[dispatch]);
    
    //메뉴
    const openMenu = () => {
        setMenuState(true);
    };

    //검색
    const search = () => {
        dispatch(searchStdBook(keyword));
    };

    //대여자와 채팅
    const goChat = async(stdb_code, lender) => {
        await dispatch(createChat(stdb_code, lender, std_num, history))
        .then(() =>{
            dispatch(getChatDetail1(stdb_code, std_num, history))
        });
    };

    return (
        <div id="std_main">

            <p>학생 대여</p>
            <div className="menu" id={menuState?"showMenu":"hidden"}>
                <p>menu</p>
                <AiOutlineClose size="20" onClick={openMenu}/>
                <p onClick={() => history.push('/user1/std-create')}>대여 등록</p>
                <p onClick={() => history.push('/user1/std-my-list')}>내가 쓴 글</p>
            </div>

            <div id="search_book" className="item">
                <input type="text" id="search_input" value={keyword||""} onChange={(e) => setKeyword(e.target.value)}/>
                <button id="searchButton" className="small_blue_btn" onClick={search}>검색</button>
            </div>

            <div id="search_result" className="contents">
                {searchResult.length!==0 ?
                    searchResult.map((item, index) => {
                        return (
                            <div className="item_wrap" key={index}>
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
                                            <td>{item.stdb_rental_fee} ({item.stdb_rental_date} 대여)</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="detail" id={active===item.stdb_code?"show_detail":"hidden"}>
                                    <p>{item.stdb_comment}</p>
                                </div>

                                <button onClick={() => goChat(item.stdb_code, item.lender)}>대여자와 채팅하기</button>
                            </div>
                        )
                    })
                : <p id="message">검색 결과가 없습니다.</p>}
            </div>

        </div>
    );
};

export default StdMain;