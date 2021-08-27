import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Barcode from './barcode/Barcode';
import Chat from './chat/Chat';
import ChatList from './chat/ChatList';
import Home from './home/Home';
import Search from './home/Search';
import SearchDetail from './home/SearchDetail';
import SearchLocation from './home/SearchLocation';
import CheckBorrow from './mypage/CheckBorrow';
import CheckMyList from './mypage/CheckMyList';
import CheckStdBorrow from './mypage/CheckStdBorrow';
import Mypage from './mypage/Mypage';
import StdCreate from './student/StdCreate';
import StdMain from './student/StdMain';
import StdMyList from './student/StdMyList';

const User = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/user/barcode" component={Barcode}/>
                <Route exact path="/user/chat" component={Chat}/>
                <Route exact path="/user/chat-list" component={ChatList}/>
                <Route exact path="/user/home" component={Home}/>
                <Route exact path="/user/search" component={Search}/>
                <Route exact path="/user/search-detail" component={SearchDetail}/>
                <Route exact path="/user/search-location" component={SearchLocation}/>
                <Route exact path="/user/check-borrow" component={CheckBorrow}/>
                <Route exact path="/user/check-my-list" component={CheckMyList}/>
                <Route exact path="/user/check-std-borrow" component={CheckStdBorrow}/>
                <Route exact path="/user/mypage" component={Mypage}/>
                <Route exact path="/user/std-create" component={StdCreate}/>
                <Route exact path="/user/std-main" component={StdMain}/>
                <Route exact path="/user/std-my-list" component={StdMyList}/>
            </Switch>
        </div>
    );
};

export default User;