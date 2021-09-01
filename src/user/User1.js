import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TopBar from '../common/util/TopBar';
import Chat from './chat/Chat';
import Search from './home/Search';
import SearchDetail from './home/SearchDetail';
import SearchLocation from './home/SearchLocation';
import CheckBorrow from './mypage/CheckBorrow';
import CheckStdBorrow from './mypage/CheckStdBorrow';
import StdCreate from './student/StdCreate';
import StdMyList from './student/StdMyList';

const User = () => {
    return (
        <div id="user">
            {/* <TopBar/> */}
            <Switch>
                <Route exact path="/user1/chat" component={Chat}/>
                <Route exact path="/user1/search" component={Search}/>
                <Route exact path="/user1/search-detail" component={SearchDetail}/>
                <Route exact path="/user1/search-location" component={SearchLocation}/>
                <Route exact path="/user1/check-borrow" component={CheckBorrow}/>
                <Route exact path="/user1/check-std-borrow" component={CheckStdBorrow}/>
                <Route exact path="/user1/std-create" component={StdCreate}/>
                <Route exact path="/user1/std-my-list" component={StdMyList}/>
            </Switch>
        </div>
    );
};

export default User;