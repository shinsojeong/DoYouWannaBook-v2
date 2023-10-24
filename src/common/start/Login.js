import React from 'react';
import { useDispatch } from 'react-redux';

import useDebounce from '../../hook/useDebounce';
import useMove from '../../hook/useMove';

import { login } from '../../modules/user';
import { useInput } from '../../common/util/Reusable';

import logo from '../../source/logo.png';

export default function Login() {
    const [dispatch, navigate, debounce] = [useDispatch(), useMove(), useDebounce];

    const id = useInput(""), pw = useInput("");

    /** 타입(name)에 맞는 함수를 리턴 */
    const func = (type) => {
        if(type === 'login') return dispatch(login(id.value, pw.value, navigate));
        else if(type === 'find_pw') return navigate("/user1/find_pw");
        else if(type === 'go_join') return navigate("/user1/join");
    }

    /** 버튼 클릭 시, 타입에 맞는 함수 실행 */
    const click = (type) => debounce(func(type));

    return (
        <div id="login" onClick={(e) => click(e.target.getAttribute('name'))}>
            <img src={logo} alt="logo" id="logo" width="170px"/>
            <input type="text" id="id" placeholder="학번" {...id}/>
            <input type="password" id="pw" placeholder="패스워드" {...pw}/>
            <button name="login" id="login_btn">로그인</button>
            <button name="find_pw">비밀번호 찾기</button>
            <button name="go_join">회원가입</button>
        </div>
    );
}