import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../modules/user';
import logo from '../../source/logo.png';

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
        history.push('/user1/find_pw');
    };

    //회원가입
    const goJoin = () => {
        history.push('/user1/join');
    };

    return (
        <div id="login">
            <img src={logo} alt="logo" id="logo" width="170px"/>
            <input type="text" id="id" onChange={(e) => setId(e.target.value)} placeholder="학번"/>
            <input type="password" id="pw" onChange={(e) => setPw(e.target.value)} placeholder="패스워드"/>
            <button onClick={goLogin} id="login_btn">로그인</button>
            <button onClick={kakaoLogin} id="kakao_btn">Kakao 로그인</button>
            <button onClick={goFindPw}>비밀번호 찾기</button>
            <button onClick={goJoin}>회원가입</button>
        </div>
    );
};

export default Login;