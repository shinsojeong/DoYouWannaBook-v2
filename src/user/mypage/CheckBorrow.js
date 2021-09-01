import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMypageBorrowList } from '../../modules/libBook';
import { extendDate } from '../../modules/libBook';

const CheckBorrow = () => {
    const dispatch = useDispatch();

    const std_num = useSelector(state => state.user.user.std_num);
    const borrowList = useSelector(state => state.libBook.borrow_list);

    useEffect(() => {
        dispatch(getMypageBorrowList(std_num));
    }, [dispatch, std_num]);

    const extend = async(libb_code, libb_ret_date) => {
        await dispatch(extendDate(std_num, libb_code, libb_ret_date))
        .then(() => {
            dispatch(getMypageBorrowList(std_num));
        });
    };

    return (
        <div id="check_borrow">
            {borrowList.length!==0 ? 
                borrowList.map((item) => {
                    return (
                        <table key={item.libb_code}>
                            <tbody>
                                <tr>
                                    <td rowSpan="3">
                                        <img src={item.libb_img} alt="bookImage" width="120px"/>
                                    </td>
                                    <td>{item.libb_title}</td>
                                </tr>
                                <tr>
                                    <td>{item.libb_ret_date.slice(0,10)}</td>
                                </tr>
                                <tr>
                                    <td onClick={() => extend(item.libb_code, item.libb_ret_date)}>대출 연장</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })
            : <div id="message">대출중인 도서가 없습니다.</div>}
        </div>
    );
};

export default CheckBorrow;