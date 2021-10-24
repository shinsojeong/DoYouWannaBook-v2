import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../source/logo.png';
import '../../styles/start.scss';

export default function Landing() {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.replace('/login');
        }, 4000);
    });

    return (
        <div id="landing">
            <img src={logo} id="logo" alt="logo" width="200px"/>
        </div>
    );
}