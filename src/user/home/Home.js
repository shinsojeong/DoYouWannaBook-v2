import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { AiOutlineSearch } from 'react-icons/ai';

import { changeBar } from '../../modules/topBar';
import { getRecommendedBook, searchBook } from '../../modules/libBook';
import '../../styles/home.scss';

export default function Home() {
    const dispatch = useDispatch();
    const history = useHistory();

    const recommendedBook = useSelector(state => state.libBook.recommended_book);  //추천 신작 도서 받아옴
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(
            changeBar(
                "null", 
                { title: "홈", data: null },
                "null",
                null,
                null,
                "small"
            )
        );
        dispatch(getRecommendedBook());
    }, [dispatch]);

    //검색
    const search = debounce(() => {
        dispatch(searchBook(keyword));
        history.push("/user1/search");
    }, 800);

    return (
        <div id="home" className="contents">
            <div id="search_book" className="item">
                <p className="title">· 도서 검색</p>
                <input type="text" id="search_input" value={keyword||""} onChange={(e) => setKeyword(e.target.value)}/>
                <div id="search_button"><AiOutlineSearch onClick={search} size="27px"/></div>
            </div>

            <div id="recommended_book" className="item">
                <p className="title">· 추천 신작 도서</p>
                <div id="list">
                    {recommendedBook.length !== 0 ? 
                        recommendedBook.map(({ libb_code, libb_img, libb_title, libb_author } ) => {
                            return (
                                <div className="list_item" key={libb_code}>
                                    <div className="img-container"><img id="book_img" src={libb_img} alt="book-img" width="120px"/></div>
                                    <p id="book_name">{libb_title}</p>
                                    <p id="author">{libb_author}</p>
                                </div>
                            );
                        })
                    : <p id="message">신작 도서가 없습니다.</p>}
                </div>
            </div>

        </div>
    );
}