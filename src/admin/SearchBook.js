import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBook, searchBook, deleteBook } from '../modules/admin';
import { changeBar } from '../modules/topBar';

const SearchBook = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const searchRes = useSelector(state => state.admin.search_result);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(changeBar("back", {title:"도서 조회", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history]);

    //검색
    const search = async() => {
        dispatch(searchBook(keyword));
    };
    
    //수정
    const goUpdateBook = (libb_code) => {
        dispatch(getBook(libb_code, history))
    };

    //삭제
    const goDeleteBook = (libb_code) => {
        if(window.confirm("도서 정보를 삭제하시겠습니까?")) {
            dispatch(deleteBook(libb_code, history));
        }
    };
    
    return (
        <div>
            <div id="search" className="contents">
                <input type="text" id="keyword" value={keyword||''} onChange={(e) => setKeyword(e.target.value)}/>
                <input type="button" value="검색" onClick={search}/>
            </div>
            <div id="searchResult">
                {searchRes.length!==0 ? searchRes.map(item => {
                    return (
                        <div className="resultItems" key={item.libb_code}>
                            <table className="resultItemsTable">
                                <tbody>
                                    <tr rowSpan="5">
                                        <td><img src={item.libb_img} alt="도서 이미지"/></td>
                                        <td>{item.libb_title}</td>
                                    </tr>
                                    <tr><td>{item.libb_author}</td></tr>
                                    <tr><td>{item.libb_publisher}</td></tr>
                                    <tr><td>{(item.libb_pub_date).slice(0,10)}</td></tr>
                                    <tr><td>{item.libb_state?"대출 가능":"대출중"}</td></tr>
                                </tbody>
                            </table>
                            <input type="button" onClick={() => goUpdateBook(item.libb_code)} value="수정"/>
                            <input type="button" onClick={() =>goDeleteBook(item.libb_code)} value="삭제"/>
                        </div>
                    )
                }) : <p id="message">검색 결과가 없습니다.</p>}
            </div>
        </div>
    );
};

export default SearchBook;