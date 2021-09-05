import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";

import { getBookLoc } from '../../modules/libBook';
import { changeBar } from '../../modules/topBar';
import '../../styles/home.scss';

const SearchDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const info = useSelector(state => state.libBook.selected_book);

    useEffect(() => {
        dispatch(changeBar("back", {title:"도서 정보", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history]);
    
    //위치 정보 보기
    const goLocation = debounce(async(class_sign) => {
        await dispatch(getBookLoc(class_sign))
        .then(() => history.push('/user1/search-location'));
    }, 800);

    return (
        <div id="search_detail" className="contents">

            <table id="info">
                <tbody>
                    <tr><td colSpan="2" id="book_name">{info.libb_title}</td></tr>
                    <tr><td colSpan="2" id="author">{info.libb_author}</td></tr>
                    <tr><td colSpan="2"><img src={info.libb_img} alt="bookImage" width="200px"/></td></tr>
                    <tr>
                        <td id="td_title">ISBN</td>
                        <td id="isbn">{info.libb_isbn}</td>
                    </tr>
                    <tr>
                        <td id="td_title">출판사</td>
                        <td id="publisher">{info.libb_publisher}</td>
                    </tr>
                    <tr>
                        <td id="td_title">출판일</td>
                        <td id="publish_date">{info.libb_pub_date.slice(0,10)}</td>
                    </tr>
                </tbody>
            </table>

            <div id="location">
                <p className="title">· 소장 정보</p>
                <table>
                    <tbody>
                        <tr>
                            <td id="td_title">청구기호</td>
                            <td>{info.libb_code}</td>
                        </tr>
                        <tr>
                            <td id="td_title">대출상태</td>
                            <td>{info.libb_state?"대출가능":"대출중"}</td>
                        </tr>
                        <tr>
                            <td id="td_title">위치보기</td>
                            <td id="button" onClick={() => goLocation(info.libb_class)}>보기</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SearchDetail;