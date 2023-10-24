import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useDebounce from '../../hook/useDebounce';
import useMove from '../../hook/useMove';

import { logout } from '../../modules/user';
import { changeBar } from '../../modules/topBar';

import { CgProfile } from 'react-icons/cg';
import '../../styles/mypage.scss';

export default function Mypage() {
    const [dispatch, navigate, debounce] = [useDispatch(), useMove(), useDebounce()];

    const {
        name, std_num
    } = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(
            changeBar(
                "null", 
                { title: "마이페이지", data: null },
                "null",
                null,
                null,
                "small"
            )
        );
    }, [dispatch]);

    /** 카테고리 클릭 시, type에 맞는 함수를 실행 */
    const click = debounce((type) => {
        if(type === '/logout') {
            if(window.confirm("로그아웃 하시겠습니까?")) return dispatch(logout(navigate));
        } else return navigate(type);
    });

    return (
        <div id="mypage" className="contents">
            
            <table id="profile">
                <tbody>
                    <tr>
                        <td rowSpan="2" id="td1">
                            <CgProfile size="70"/>
                        </td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td id="td2">{std_num}</td>
                    </tr>
                </tbody>
            </table>

            <div id="list">
                <ul onClick={(e) => click(e.target.getAttribute('name'))}>
                    <li name="/user1/check-borrow">도서관 대출 조회/연장</li>
                    <li name="/user1/check-std-borrow">공유 도서 대여 조회</li>
                    <li name="/logout">로그아웃</li>
                </ul>
            </div>
            
        </div>
    );
}