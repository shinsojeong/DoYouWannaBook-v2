import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useMove from '../../hook/useMove';
import useDebounce from '../../hook/useDebounce';

import { findPw } from '../../modules/user';
import { changeBar } from '../../modules/topBar';
import { useInput } from '../../common/util/Reusable';

export default function FindPw() {
    const [dispatch, navigate, debounce] = [useDispatch(), useMove(), useDebounce()];

    const id = useInput(""), name = useInput(""), phNum = useInput(""), email = useInput("");

    const isDisabled = false;

    useEffect(() => {
        dispatch(
            changeBar(
                "back", 
                { title: "비밀번호 찾기", data: null }, 
                "null", 
                () => navigate(-1), 
                null, 
                "small"
            )
        );
    }, [dispatch, navigate]);

    /** 비밀번호 찾기 */
    const submit = debounce(() => {
        dispatch(
            findPw(
                id.value, 
                name.value, 
                phNum.value, 
                email.value, 
                navigate
            )
        );
    });

    return (
        <div id="find_pw" className="start_contents">
            <input type="text" className="input" id="id" placeholder="학번" required {...id}/>
            <input type="text" className="input" id="name" placeholder="이름" required {...name}/>
            <input type="text" className="input" id="phNum" placeholder="ex)01033336666" required {...phNum}/>
            <input type="email" className="input" id="email" placeholder="이메일" required {...email}/>

            <button className={isDisabled ? "btnGray":"btnBlue"} disabled={isDisabled} onClick={submit}>비밀번호 찾기</button>
        </div>
    );
}