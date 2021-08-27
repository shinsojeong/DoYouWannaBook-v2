import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateBook from '../admin/CreateBook';
import Home from '../admin/Home';
import SearchBook from '../admin/SearchBook';

const Admin = () => {
    return (
        <div>
            <Switch>
                <Route  exact path="/admin/create-book" component={CreateBook}/>
                <Route  exact path="/admin/home" component={Home}/>
                <Route  exact path="/admin/search-book" component={SearchBook}/>
            </Switch>
        </div>
    );
};

export default Admin;