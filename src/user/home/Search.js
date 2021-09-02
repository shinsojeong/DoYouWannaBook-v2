import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectBook, searchBook } from '../../modules/libBook';
import { changeBar } from '../../modules/topBar';
import { AiOutlineSearch } from 'react-icons/ai';
import '../../styles/home.scss';

const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const searchResult = useSelector(state => state.libBook.search_result);  //검색도서 받아옴
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(changeBar("back", {title:"도서 검색", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history]);
    
    //검색
    const search = async() => {
        await dispatch(searchBook(keyword))
        .then(() => {
            history.push('/user1/search');
        })
    };

    //상세 페이지로 이동
    const goDetail = async(libb_code) => {
        await dispatch(selectBook(libb_code))
        .then(() => {
            history.push('/user1/search-detail');
        });
    };

    return (
        <div id="search" className="contents">
            <div id="search_book" className="item">
                <input type="text" id="search_input" value={keyword||""} onChange={(e) => setKeyword(e.target.value)}/>
                <div id="search_button"><AiOutlineSearch onClick={search} size="27px"/></div>
            </div>

            <div id="search_result">
                {searchResult.length!==0 ?
                    searchResult.map((item, index) => {
                        return (
                            <div className="item_wrap" key={index}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td rowSpan="5">
                                                <img id="book_img" src={item.libb_img} alt="book-img" width="120px"/>
                                            </td>
                                            <td id="title">{item.libb_title}</td>
                                        </tr>
                                        <tr>
                                            <td>{item.libb_author}</td>
                                        </tr>
                                        <tr>
                                            <td>{item.libb_publisher}</td>
                                        </tr>
                                        <tr>
                                            <td>{item.libb_pub_date.slice(0,10)}</td>
                                        </tr>
                                        <tr>
                                            <td>{item.libb_state}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={() => goDetail(item.libb_code)}>상세 정보</button>
                            </div>
                        )
                    })
                : <p id="message">검색 결과가 없습니다.</p>}
            </div>

        </div>
    );
};

export default Search;