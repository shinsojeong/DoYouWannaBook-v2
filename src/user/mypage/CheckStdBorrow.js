import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getBorrowStdBookList } from '../../modules/userBook';
import { changeBar } from '../../modules/topBar';

const CheckStdBorrow = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const std_num = useSelector(state => state.user.user.std_num);
    const borrow_list = useSelector(state => state.userBook.borrow_book_list);

    useEffect(() => {
        dispatch(getBorrowStdBookList(std_num));
        dispatch(changeBar("back", {title:"공유 도서 대여 조회", data:null}, "null", () => history.goBack(), null, "small"));
    },[dispatch, history, std_num]);

    return (
        <div id="check_std_borrow" className="contents">
            {borrow_list.length!==0 ? 
                borrow_list.map((item) => {
                    return(
                        <table key={item.stdb_code}>
                            <tbody>
                                <tr>
                                    <td rowSpan="3"><img src={item.stdb_img} width="120px" alt="bookimg"/></td>
                                    <td>{item.stdb_title}</td>
                                </tr>
                                <tr>
                                    <td>대여자: {item.lender}</td>
                                </tr>
                                <tr>
                                    <td>{item.stdb_ret_date.slice(0,10)} 반납 필수</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })
            : <div id="message">대여중인 도서가 없습니다.</div> }
        </div>
    );
};

export default CheckStdBorrow;