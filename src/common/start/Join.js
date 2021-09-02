import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from '../../modules/user';
import { option } from '../util/Reusable';
import { changeBar } from '../../modules/topBar';

const Join = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [gender, setGender] = useState(0);
    const [phNum, setPhNum] = useState("");
    const [email, setEmail] = useState("");
    const isDisabled = false;

    useEffect(() => {
        dispatch(changeBar("back", {title:"회원가입", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history]);

    //회원가입
    const submit = () => {
        dispatch(register(id, name, dept, gender, phNum, email, pw, history));
    };

    return (
        <div id="join" className="start_contents">
            <input className="input" type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="학번" required/>
            <input className="input" type="password" id="pw" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="패스워드" required/>
            <input className="input" type="password" id="pwCheck" value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} placeholder="패스워드 확인" required/>
            <input className="input" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" required/>
            <select className="inputSelect" value={dept} onChange={(e) => setDept(e.target.value)} placeholder="학과" required>
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
            <input className="input" type="text" id="phNum" value={phNum} onChange={(e) => setPhNum(e.target.value)} placeholder="ex)01033336666" required/>
            <input className="input" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required/>

            <button className={isDisabled ? "btnGray":"btnBlue"} disabled={isDisabled} onClick={submit}>완료</button>
        </div>
    );
};

export default Join;