import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TopBar from '../common/util/TopBar';
import Chat from './chat/Chat';
import Search from './home/Search';
import SearchDetail from './home/SearchDetail';
import SearchLocation from './home/SearchLocation';
import CheckBorrow from './mypage/CheckBorrow';
import CheckStdBorrow from './mypage/CheckStdBorrow';
import StdCreate from './student/StdCreate';
import StdMyList from './student/StdMyList';
import Join from '../common/start/Join';
import FindPw from '../common/start/FindPw';
import FindPwRes from '../common/start/FindPwRes';

export default function User() {
    return (
        <div id="user">
            <TopBar/>
            <Routes>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/search-detail" element={<SearchDetail/>}/>
                <Route path="/search-location" element={<SearchLocation/>}/>
                <Route path="/check-borrow" element={<CheckBorrow/>}/>
                <Route path="/check-std-borrow" element={<CheckStdBorrow/>}/>
                <Route path="/std-create" element={<StdCreate/>}/>
                <Route path="/std-my-list" element={<StdMyList/>}/>
                <Route path="/join" element={<Join/>}/>
                <Route path="/find_pw" element={<FindPw/>}/>
                <Route path="/find_pw_res" element={<FindPwRes/>}/>
            </Routes>
        </div>
    );
}