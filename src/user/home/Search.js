import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";

import { selectBook, searchBook } from '../../modules/libBook';
import { changeBar } from '../../modules/topBar';
import { AiOutlineSearch } from 'react-icons/ai';
import '../../styles/home.scss';

export default function Search() {
    const dispatch = useDispatch();
    const history = useHistory();

    const searchResult = useSelector(state => state.libBook.search_result);  //검색도서 받아옴
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(
            changeBar(
                "back", 
                { title: "도서 검색", data: null },
                "null",
                () => history.goBack(),
                null,
                "small"
            )
        );
    }, [dispatch, history]);
    
    //검색
    const search = debounce(async() => {
        await dispatch(searchBook(keyword))
        history.push("/user1/search");
    }, 800);

    //상세 페이지로 이동
    const goDetail = debounce(async(libb_code) => {
        await dispatch(selectBook(libb_code))
        history.push("/user1/search-detail");
    }, 800);

    return (
        <div id="search" className="contents">
            <div id="search_book" className="item">
                <input type="text" id="search_input" value={keyword||""} onChange={(e) => setKeyword(e.target.value)}/>
                <div id="search_button"><AiOutlineSearch onClick={search} size="27px"/></div>
            </div>

            <div id="search_result">
                {searchResult.length !== 0 ?
                    searchResult.map(({ libb_img, libb_title, libb_author, libb_publisher, libb_pub_date, libb_state, libb_code }, index) => {
                        return (
                            <div className="item_wrap" key={index}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td rowSpan="5">
                                                <img id="book_img" src={libb_img} alt="book-img" width="120px"/>
                                            </td>
                                            <td id="title">{libb_title}</td>
                                        </tr>
                                        <tr>
                                            <td>{libb_author}</td>
                                        </tr>
                                        <tr>
                                            <td>{libb_publisher}</td>
                                        </tr>
                                        <tr>
                                            <td>{libb_pub_date.slice(0,10)}</td>
                                        </tr>
                                        <tr>
                                            <td>{libb_state}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={() => goDetail(libb_code)}>상세 정보</button>
                            </div>
                        )
                    })
                : <p id="message">검색 결과가 없습니다.</p>}
            </div>

        </div>
    );
}