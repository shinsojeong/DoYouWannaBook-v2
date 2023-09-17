import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TopBar from '../common/util/TopBar';
import CreateBook from '../admin/CreateBook';
import UpdateBook from '../admin/UpdateBook';
import Home from '../admin/Home';
import SearchBook from '../admin/SearchBook';

export default function Admin() {
    return (
        <div>
            <TopBar/>
            <Routes>
                <Route path="/create-book" element={<CreateBook/>}/>
                <Route path="/update-book" element={<UpdateBook/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/search-book" element={<SearchBook/>}/>
            </Routes>
        </div>
    );
}