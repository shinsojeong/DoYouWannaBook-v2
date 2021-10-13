import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

import { changeBar } from '../../modules/topBar';

const FindPwRes = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            changeBar(
                "null", 
                { title: "비밀번호 찾기", data: null }, 
                "null", 
                null, 
                null, 
                "small"
            )
        );
    }, [dispatch]);

    //로그인하러 가기
    const goLogin = debounce(() => {
        history.push("/login");
    }, 800);

    return (
        <div id="find_pw_res" className="start_contents">
            <p>입력하신 메일로<br/>임시 비밀번호가 전송되었습니다.</p>
            <button onClick={goLogin}>로그인하러 가기</button>
        </div>
    );
};

export default FindPwRes;