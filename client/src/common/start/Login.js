import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import login from '../modules/user';

const Login = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const submit = () => {
        dispatch(login(id, pw));
    };

    return (
        <div id="login">
            <form>
                <input type="text" id="id" onChange={(e) => setId(e.target.value)}/>
                <input type="password" id="pw" onChange={(e) => setPw(e.target.value)}/>
                <button onClick={submit}>로그인</button>
            </form>
        </div>
    );
};

export default Login;