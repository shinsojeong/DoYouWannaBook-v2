import React, { useState } from 'react';

const Login = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const login = () => {
        
    };

    return (
        <div id="login">
            <form>
                <input type="text" id="id" onChange={(e) => setId(e.target.value)}/>
                <input type="password" id="pw" onChange={(e) => setId(e.target.value)}/>
            </form>
        </div>
    );
};

export default Login;