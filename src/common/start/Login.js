import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";

import { login } from '../../modules/user';
import logo from '../../source/logo.png';
import { useInput } from '../../common/util/Reusable';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const id = useInput("");
    const pw = useInput("");

    //로그인
    const goLogin = debounce(async(e) => {
        e.preventDefault();
        dispatch(login(id.value, pw.value, history))
    }, 800);

    //비밀번호 찾기
    const goFindPw = debounce(() => {
        history.push('/user1/find_pw');
    }, 800);

    //회원가입
    const goJoin = debounce(() => {
        history.push('/user1/join');
    }, 800);

    return (
        <div id="login">
            <img src={logo} alt="logo" id="logo" width="170px"/>
            <input type="text" id="id" placeholder="학번" {...id}/>
            <input type="password" id="pw" placeholder="패스워드" {...pw}/>
            <button onClick={goLogin} id="login_btn">로그인</button>
            <button onClick={goFindPw}>비밀번호 찾기</button>
            <button onClick={goJoin}>회원가입</button>
        </div>
    );
};

export default Login;