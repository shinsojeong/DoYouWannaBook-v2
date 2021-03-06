import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

import { getMypageBorrowList } from '../../modules/libBook';
import { extendDate } from '../../modules/libBook';
import { changeBar } from '../../modules/topBar';

import '../../styles/mypage.scss';

export default function CheckBorrow() {
    const dispatch = useDispatch();
    const history = useHistory();

    const std_num = useSelector(state => state.user.user.std_num);
    const borrowList = useSelector(state => state.libBook.borrow_list);

    useEffect(() => {
        dispatch(getMypageBorrowList(std_num));
        dispatch(
            changeBar(
                "back", 
                { title: "도서 대출 조회", data: null },
                "null",
                () => history.goBack(),
                null,
                "small"
            )
        );
    }, [dispatch, history, std_num]);

    const extend = debounce(async(libb_code, libb_ret_date) => {
        await dispatch(extendDate(std_num, libb_code, libb_ret_date));
        dispatch(getMypageBorrowList(std_num));
    }, 800);

    return (
        <div id="check_borrow" className="contents">
            {borrowList.length !== 0 ? 
                borrowList.map(({ libb_code, libb_img, libb_title, libb_ret_date }) => {
                    return (
                        <table key={libb_code}>
                            <tbody>
                                <tr>
                                    <td rowSpan="3">
                                        <img src={libb_img} alt="bookImage" width="120px"/>
                                    </td>
                                    <td id="td_title">{libb_title}</td>
                                </tr>
                                <tr>
                                    <td>{libb_ret_date.slice(0,10)}</td>
                                </tr>
                                <tr>
                                    <button onClick={() => extend(libb_code, libb_ret_date)}>대출 연장</button>
                                </tr>
                            </tbody>
                        </table>
                    )
                })
            : <div id="message">대출중인 도서가 없습니다.</div>}
        </div>
    );
}