import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { findPw } from '../../modules/user';
import { changeBar } from '../../modules/topBar';

const FindPw = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [phNum, setPhNum] = useState("");
    const [email, setEmail] = useState("");

    const isDisabled = false;

    useEffect(() => {
        dispatch(changeBar("back", {title:"비밀번호 찾기", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history]);

    //비밀번호 찾기
    const submit = () => {
        dispatch(findPw(id, name, phNum, email, history))
    };

    return (
        <div id="find_pw" className="start_contents">
            <input type="text" className="input" id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="학번" required/>
            <input type="text" className="input" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" required/>
            <input type="text" className="input" id="phNum" value={phNum} onChange={(e) => setPhNum(e.target.value)} placeholder="ex)01033336666" required/>
            <input type="email" className="input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required/>

            <button className={isDisabled ? "btnGray":"btnBlue"} disabled={isDisabled} onClick={submit}>비밀번호 찾기</button>
        </div>
    );
};

export default FindPw;