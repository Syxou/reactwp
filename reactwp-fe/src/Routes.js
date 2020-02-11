import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Home from './containers/home/Home';
import User from './containers/user/User';
import Pages from './containers/pages/Pages'
import Page from './containers/pages/Page'
import newPage from './containers/pages/newPage'


const Routes = () => (
    <Switch>
        <Route exact path="/admin" component={Home} />
        <Route path="/admin/user" component={User} />
        <Route path="/admin/pages/" component={Pages} />
        <Route path='/admin/page/:id' component={Page} />
        <Route path="/admin/new/page" component={newPage} />
        <Route>
            <h1>404</h1>
        </Route>
    </Switch >
);

export default Routes;