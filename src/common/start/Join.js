import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";

import { register } from '../../modules/user';
import { option } from '../util/Reusable';
import { changeBar } from '../../modules/topBar';
import { useInput } from '../../common/util/Reusable';

const Join = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const id = useInput("");
    const pw = useInput("");
    const pwCheck = useInput("");
    const name = useInput("");
    const dept = useInput("간호학과");
    const [gender, setGender] = useState(0);
    const phNum = useInput("");
    const email = useInput("");
    const isDisabled = false;

    useEffect(() => {
        dispatch(changeBar("back", {title:"회원가입", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history]);

    //회원가입
    const submit = debounce(() => {
        dispatch(register(id.value, name.value, dept.value, gender, phNum.value, email.value, pw.value, history));
    }, 800);

    return (
        <div id="join" className="start_contents">
            <input className="input" type="text" id="id" placeholder="학번" required {...id}/>
            <input className="input" type="password" id="pw" placeholder="패스워드" required {...pw}/>
            <input className="input" type="password" id="pwCheck" placeholder="패스워드 확인" required {...pwCheck}/>
            <input className="input" type="text" id="name" placeholder="이름" required {...name}/>
            <select className="inputSelect" placeholder="학과" required {...dept}>
                { option.map((item) => {
                    return <option key={item.label} value={item.value}>{item.label}</option>
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

            <button className={isDisabled ? "btnGray":"btnBlue"} disabled={isDisabled} onClick={submit}>완료</button>
        </div>
    );
};

export default Join;