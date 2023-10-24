import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useMove from '../hook/useMove';
import useDebounce from '../hook/useDebounce';

import { getBook, searchBook, deleteBook } from '../modules/admin';
import { changeBar } from '../modules/topBar';

import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBook() {
    const [dispatch, navigate, debounce] = [useDispatch(), useMove(), useDebounce()];
    
    const searchRes = useSelector(state => state.admin.search_result);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(
            changeBar(
                "back", 
                { title: "도서 조회", data: null }, 
                "null", 
                () => navigate(-1), 
                null, 
                "small"
            )
        );
    }, [dispatch, navigate]);

    /** 도서 검색 */
    const search = debounce(() => dispatch(searchBook(keyword, navigate)));
    
    /** 도서 수정 */
    const goUpdateBook = debounce((libb_code) => dispatch(getBook(libb_code, navigate)));

    /** 도서 삭제 */
    const goDeleteBook = debounce((libb_code) => {
        if(window.confirm("도서 정보를 삭제하시겠습니까?")) {
            dispatch(deleteBook(libb_code, navigate));
        }
    });
    
    return (
        <div id="search_book">
            <div id="search" className="contents">
                <input className="search_input" type="text" id="keyword" value={keyword||''} onChange={(e) => setKeyword(e.target.value)}/>
                <div id="search_button">
                    <AiOutlineSearch onClick={search} size="27px"/>
                </div>
            </div>
            <div id="searchResult">
                {searchRes.length !== 0 ? searchRes.map(({ libb_code, libb_img, libb_title, libb_author, libb_publisher, libb_pub_date, libb_state }) => {
                    return (
                        <div className="resultItems" key={libb_code}>
                            <table className="resultItemsTable">
                                <tbody>
                                    <tr>
                                        <td rowSpan="5"><img src={libb_img} alt="도서 이미지"/></td>
                                        <td id="td_title">{libb_title}</td>
                                    </tr>
                                    <tr>
                                        <td id="td_content">{libb_author}</td>
                                    </tr>
                                    <tr>
                                        <td id="td_content">{libb_publisher}</td>
                                    </tr>
                                    <tr>
                                        <td id="td_content">{(libb_pub_date).slice(0,10)}</td>
                                    </tr>
                                    <tr>
                                        <td id="td_content">{libb_state ? "대출 가능" : "대출중"}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button id="upd_btn" onClick={() => goUpdateBook(libb_code)}>수정</button>
                            <button id="del_btn" onClick={() =>goDeleteBook(libb_code)}>삭제</button>
                        </div>
                    )
                }) : <p id="message">검색 결과가 없습니다.</p>}
            </div>
        </div>
    );
}