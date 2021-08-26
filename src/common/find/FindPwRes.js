import React from 'react';
import { useHistory } from 'react-router-dom';

const FindPwRes = () => {
    const history = useHistory();

    //로그인하러 가기
    const goLogin = () => {
        history.push('/login');
    };

    return (
        <div>
            <p>입력하신 메일로 임시 비밀번호가 전송되었습니다.</p>
            <button onClick={goLogin}>로그인하러 가기</button>
        </div>
    );
};

export default FindPwRes;