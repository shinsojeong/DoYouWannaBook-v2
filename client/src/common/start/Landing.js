import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getRecommendedBook from '../../modules/libBook';

const Landing = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecommendedBook());  //랜딩페이지에서 추천도서 받아옴
    }, []);

    return (
        <div id="landing">
            <p>DoYouWannaBook</p>  {/*추후 변경 <img src={} id="logo"/>*/}
        </div>
    );
};

export default Landing;