import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";

import { logout } from '../../modules/user';
import { changeBar } from '../../modules/topBar';
import { CgProfile } from "react-icons/cg";

import '../../styles/mypage.scss';

const Mypage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(changeBar("null", {title:"마이페이지", data:null}, "null", null, null, "small"));
    }, [dispatch]);

    //대출 조회,연장
    const goCheckBorrow = debounce(async() => {
        history.push('/user1/check-borrow');
    }, 800);

    //공유 도서 대여 조회
    const goCheckStdBorrow = debounce(async() => {
        history.push('/user1/check-std-borrow');
    }, 800);

    //로그아웃
    const goLogout = debounce(() => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            dispatch(logout(history));
        }
    }, 800);

    return (
        <div id="mypage" className="contents">
            
            <table id="profile">
                <tbody>
                    <tr>
                        <td rowSpan="2" id="td1">
                            <CgProfile size="70"/>
                        </td>
                        <td>{userInfo.name}</td>
                    </tr>
                    <tr>
                        <td id="td2">{userInfo.std_num}</td>
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