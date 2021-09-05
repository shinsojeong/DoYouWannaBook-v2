import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { findPw } from '../../modules/user';
import { changeBar } from '../../modules/topBar';
import { useInput } from '../../common/util/Reusable';

const FindPw = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const id = useInput("");
    const name = useInput("");
    const phNum = useInput("");
    const email = useInput("");

    const isDisabled = false;

    useEffect(() => {
        dispatch(changeBar("back", {title:"비밀번호 찾기", data:null}, "null", () => history.goBack(), null, "small"));
    }, [dispatch, history]);

    //비밀번호 찾기
    const submit = () => {
        dispatch(findPw(id.value, name.value, phNum.value, email.value, history))
    };

    return (
        <div id="find_pw" className="start_contents">
            <input type="text" className="input" id="id" placeholder="학번" required {...id}/>
            <input type="text" className="input" id="name" placeholder="이름" required {...name}/>
            <input type="text" className="input" id="phNum" placeholder="ex)01033336666" required {...phNum}/>
            <input type="email" className="input" id="email" placeholder="이메일" required {...email}/>

            <button className={isDisabled ? "btnGray":"btnBlue"} disabled={isDisabled} onClick={submit}>비밀번호 찾기</button>
        </div>
    );
};

export default FindPw;