import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { changeBar } from '../modules/topBar';
import { reset } from '../modules/admin';
import { logout } from '../modules/user';

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(changeBar("null", {title:"홈", data:null}, "null", null, null, "small"));
    }, [dispatch]);

    //도서 등록으로 이동
    const goCreateBook = () => {
        history.push('/admin/create-book');
    };

    //도서 조회/수정/삭제로 이동
    const goSearchBook = async() => {
        await dispatch(reset())
        .then(() => {
            history.push('/admin/search-book');
        });
    };

    //로그아웃
    const goLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {            
            dispatch(logout(history));
        }
    };

    return (
        <div id="home" className="contents">
            <div id="profile">
                <table>
                    <tbody>
                        <tr rowSpan="2">
                            <td><img src="https://placeimg.com/100/100/nature" alt="profile img"/></td>{/*추후 src변경 */}
                        </tr>
                        <tr>
                            <td>{user.std_num}</td>
                            <td>{user.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="menu">
                <table id="bookMenu">
                    <tbody>
                        <tr>
                            <td><img src="https://placeimg.com/110/110/nature" alt="도서 등록"/></td>{/*추후 src변경 */}
                            <td><img src="https://placeimg.com/110/110/nature" alt="도서 등록"/></td>{/*추후 src변경 */}
                        </tr>
                        <tr>
                            <td onClick={goCreateBook}>도서 등록</td>
                            <td onClick={goSearchBook}>도서 조회/수정/삭제</td>
                        </tr>
                    </tbody>
                </table>
                <p onClick={goLogout}>로그아웃</p>
            </div>
        </div>
    );
};

export default Home;