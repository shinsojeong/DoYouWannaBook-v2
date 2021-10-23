import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TopBar from '../common/util/TopBar';
import Barcode from './barcode/Barcode';
import ChatList from './chat/ChatList';
import Home from './home/Home';
import Mypage from './mypage/Mypage';
import StdMain from './student/StdMain';
import Menu from '../common/util/Menu';

const User = () => {
    return (
        <div id="user">
            <TopBar/>
            <Switch>
                <Route exact path="/user/barcode" component={Barcode}/>
                <Route exact path="/user/chat-list" component={ChatList}/>
                <Route exact path="/user/home" component={Home}/>
                <Route exact path="/user/mypage" component={Mypage}/>
                <Route exact path="/user/std-main" component={StdMain}/>
            </Switch>
            <Menu/>
        </div>
    );
}

export default User;