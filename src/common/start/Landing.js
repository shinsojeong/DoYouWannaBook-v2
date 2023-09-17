import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../source/logo.png';
import '../../styles/start.scss';

export default function Landing() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    });

    return (
        <div id="landing">
            <img src={logo} id="logo" alt="logo" width="200px"/>
        </div>
    );
}