import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBookLoc } from '../../modules/libBook';
import { changeBar } from '../../modules/topBar';

const SearchDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const info = useSelector(state => state.libBook.selected_book);

    useEffect(() => {
        dispatch(changeBar("back", {title:"도서 정보", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history]);
    
    //위치 정보 보기
    const goLocation = async(class_sign) => {
        await dispatch(getBookLoc(class_sign))
        .then(() => history.push('/user1/search-location'));
    };

    return (
        <div id="search_detail" className="contents">

            <div id="info">
                <p id="book_name">{info.libb_title}</p>
                <p id="author">{info.libb_author}</p>
                <img src={info.libb_img} alt="bookImage" width="120px"/>
                <p id="isbn">{info.libb_isbn}</p>
                <p id="publisher">{info.libb_publisher}</p>
                <p id="publish_date">{info.libb_pub_date.slice(0,10)}</p>
            </div>

            <div id="location">
                <p className="title">소장 정보</p>
                <table>
                    <tbody>
                        <tr>
                            <td>청구기호</td>
                            <td>{info.libb_code}</td>
                        </tr>
                        <tr>
                            <td>대출상태</td>
                            <td>{info.libb_state?"대출가능":"대출중"}</td>
                        </tr>
                        <tr>
                            <td>위치보기</td>
                            <td onClick={() => goLocation(info.libb_class)}>보기</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SearchDetail;