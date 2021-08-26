import React, { useEffect } from 'react';
import { useHistory  } from 'react-router-dom';

const Landing = () => {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.replace('/login');
        }, 4000);
    });

    return (
        <div id="landing">
            <p>DoYouWannaBook</p>  {/*추후 변경 <img src={} id="logo"/>*/}
        </div>
    );
};

export default Landing;