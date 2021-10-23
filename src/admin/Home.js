import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

import { changeBar } from '../modules/topBar';
import { reset } from '../modules/admin';
import { logout } from '../modules/user';
import { AiOutlineBook } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

import '../styles/admin.scss';

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(
            changeBar(
                "null", 
                { title: "홈", data: null },
                "null", 
                null, 
                null, 
                "small"
            )
        );
    }, [dispatch]);

    //도서 등록으로 이동
    const goCreateBook = debounce(() => {
        history.push("/admin/create-book");
    }, 800);

    //도서 조회/수정/삭제로 이동
    const goSearchBook = debounce(async() => {
        await dispatch(reset());
        history.push("/admin/search-book");
    }, 800);

    //로그아웃
    const goLogout = debounce(() => {
        if (window.confirm("로그아웃 하시겠습니까?")) {            
            dispatch(logout(history));
        }
    }, 800);

    return (
        <div id="home" className="contents">
            <div id="profile">
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan="2" id="td1"><CgProfile size="70"/></td>
                            <td id="td2">{user.std_num}</td>
                        </tr>
                        <tr>
                            <td id="td2">{user.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="menu">
                <table id="bookMenu">
                    <tbody>
                        <tr>
                            <td onClick={goCreateBook}><AiOutlineBook size="100px" id="icon1"/></td>
                            <td onClick={goSearchBook}><AiOutlineBook size="100px" id="icon2"/></td>
                        </tr>
                        <tr>
                            <td onClick={goCreateBook}>도서 등록</td>
                            <td onClick={goSearchBook}>조회/수정/삭제</td>
                        </tr>
                    </tbody>
                </table>
                <p onClick={goLogout}>로그아웃</p>
            </div>
        </div>
    );
}

export default Home;