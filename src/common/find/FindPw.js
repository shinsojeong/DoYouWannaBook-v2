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
    const submit = (e) => {
        e.preventDefault();
        dispatch(findPw(id, name, phNum, email, history))
    };

    return (
        <div className="start_contents">
            <p>비밀번호 찾기</p>
            <form onSubmit={submit}>
                <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="학번" required/>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" required/>
                <input type="text" id="phNum" value={phNum} onChange={(e) => setPhNum(e.target.value)} placeholder="ex)01033336666" required/>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required/>

                <input type="submit" className={isDisabled ? "btnGray":"btnBlue"} disabled={isDisabled} onClick={submit} value="비밀번호 찾기"/>
            </form>
        </div>
    );
};

export default FindPw;