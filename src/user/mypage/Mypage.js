import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../../modules/user';
import { CgProfile } from "react-icons/cg";

const Mypage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.user.user);

    //대출 조회,연장
    const goCheckBorrow = async() => {
        history.push('/user1/check-borrow');
    };

    //공유 도서 대여 조회
    const goCheckStdBorrow = async() => {
        history.push('/user1/check-std-borrow');
    };

    //로그아웃
    const goLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            dispatch(logout(history));
        }
    };

    return (
        <div id="mypage">
            
            <table id="profile">
                <tbody>
                    <tr>
                        <td rowSpan="2">
                            <CgProfile size="70"/>
                        </td>
                        <td>{userInfo.name}</td>
                    </tr>
                    <tr>
                        <td>{userInfo.std_num}</td>
                    </tr>
                </tbody>
            </table>

            <div id="list">
                <ul>
                    <li onClick={goCheckBorrow}>도서관 대출 조회/연장</li>
                    <li onClick={goCheckStdBorrow}>공유 도서 대여 조회</li>
                    <li onClick={goLogout}>로그아웃</li>
                </ul>
            </div>
            
        </div>
    );
};

export default Mypage;