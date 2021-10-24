import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TopBar from '../common/util/TopBar';
import CreateBook from '../admin/CreateBook';
import UpdateBook from '../admin/UpdateBook';
import Home from '../admin/Home';
import SearchBook from '../admin/SearchBook';

export default function Admin() {
    return (
        <div>
            <TopBar/>
            <Switch>
                <Route exact path="/admin/create-book" component={CreateBook}/>
                <Route exact path="/admin/update-book" component={UpdateBook}/>
                <Route exact path="/admin/home" component={Home}/>
                <Route exact path="/admin/search-book" component={SearchBook}/>
            </Switch>
        </div>
    );
}