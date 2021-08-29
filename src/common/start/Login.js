import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../modules/user';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    //로그인
    const goLogin = async(e) => {
        e.preventDefault();
        dispatch(login(id, pw, history))
    };
    
    //카카오 로그인
    const kakaoLogin = () => {
        history.push('/auth/kakao');
    };

    //비밀번호 찾기
    const goFindPw = () => {
        history.push('/find_pw');
    };

    //회원가입
    const goJoin = () => {
        history.push('/join');
    };

    return (
        <div id="login">
            <form>
                <input type="text" id="id" onChange={(e) => setId(e.target.value)} placeholder="학번"/>
                <input type="password" id="pw" onChange={(e) => setPw(e.target.value)} placeholder="패스워드"/>
                <button onClick={goLogin}>로그인</button>
                <button onClick={kakaoLogin}>Kakao 로그인</button>
                <button onClick={goFindPw}>비밀번호 찾기</button>
                <button onClick={goJoin}>회원가입</button>
            </form>
        </div>
    );
};

export default Login;