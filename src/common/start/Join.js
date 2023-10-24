import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useMove from '../../hook/useMove';
import useDebounce from '../../hook/useDebounce';

import { register } from '../../modules/user';
import { option } from '../util/Reusable';
import { changeBar } from '../../modules/topBar';
import { useInput } from '../../common/util/Reusable';

export default function Join() {
    const [dispatch, navigate, debounce] = [useDispatch(), useMove(), useDebounce()];

    const id = useInput(""), pw = useInput(""), pwCheck = useInput(""), name = useInput(""),
          dept = useInput("간호학과"), phNum = useInput(""), email = useInput("");
    const [gender, setGender] = useState(0);

    useEffect(() => {
        dispatch(
            changeBar(
                "back", 
                { title: "회원가입", data: null }, 
                "null", 
                () => navigate(-1), 
                null, 
                "small"
            )
        );
    }, [dispatch, navigate]);

    /** 회원가입 */
    const submit = debounce(() => {
        //입력값 유효성 검사
        if(!id.value || !pw.value || !pwCheck.value || !name.value || !phNum.value || !email.value ) {
            return alert("모든 항목을 입력해주세요.");
        }
        if(id.value.length !== 10) {
            return alert("학번은 10자리 숫자로 입력해주세요.");
        }
        if((/([^a-zA-z0-9])/).test(pw.value)) {
            return alert("비밀번호는 숫자, 영문으로만 구성되어야 합니다.");
        }
        if(pw.value !== pwCheck.value) {
            return alert("비밀번호 확인이 일치하지 않습니다.");
        }
        if((/([^가-힇\x20])/i).test(name.value)) {
            return alert("이름은 한글만 입력 가능합니다.");
        }
        if(!(/[0-9]{10,11}$/).test(phNum.value)) {
            return alert("연락처 형식이 잘못되었습니다.");
        }
        if(!(/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(email.value)) {
            return alert("이메일 형식이 잘못되었습니다.");
        }

        dispatch(
            register(
                id.value, 
                name.value, 
                dept.value, 
                gender, 
                phNum.value, 
                email.value, 
                pw.value, 
                navigate
            )
        );
    });

    return (
        <div id="join" className="start_contents">
            <input className="input" type="text" id="id" placeholder="학번" required {...id}/>
            <input className="input" type="password" id="pw" placeholder="패스워드" required {...pw}/>
            <input className="input" type="password" id="pwCheck" placeholder="패스워드 확인" required {...pwCheck}/>
            <input className="input" type="text" id="name" placeholder="이름" required {...name}/>
            <select className="inputSelect" placeholder="학과" required {...dept}>
                { option.map(({ value, label }) => {
                    return <option key={label} value={value}>{label}</option>
                })}
            </select>
            <div id="gender_input">
                <label htmlFor="0">남성</label>
                <input type="radio" name="gender" value={0} id="0" onChange={(e) => setGender(e.target.value)} checked required/>
                <label htmlFor="1">여성</label>
                <input type="radio" name="gender" value={1} id="1" onChange={(e) => setGender(e.target.value)}/>
            </div>
            <input className="input" type="text" id="phNum" placeholder="ex)01033336666" required {...phNum}/>
            <input className="input" type="email" id="email" placeholder="이메일" required {...email}/>

            <button className="btnBlue" onClick={submit}>완료</button>
        </div>
    );
}