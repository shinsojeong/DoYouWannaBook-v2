import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TopBar from '../common/util/TopBar';
import Barcode from './barcode/Barcode';
import ChatList from './chat/ChatList';
import Home from './home/Home';
import Mypage from './mypage/Mypage';
import StdMain from './student/StdMain';
import Menu from '../common/util/Menu';

export default function User() {
    return (
        <div id="user">
            <TopBar/>
            <Routes>
                <Route path="/barcode" element={<Barcode/>}/>
                <Route path="/chat-list" element={<ChatList/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/mypage" element={<Mypage/>}/>
                <Route path="/std-main" element={<StdMain/>}/>
            </Routes>
            <Menu/>
        </div>
    );
}