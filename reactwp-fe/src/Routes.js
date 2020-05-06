import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './containers/home/Home'

import Users from './containers/user/Users'
import User from './containers/user/User'
import newUser from './containers/user/NewUser'
import editUser from './containers/user/UserEdit'

import Pages from './containers/pages/Pages'
import Page from './containers/pages/Page'

import newPage from './containers/pages/newPage'
import Rcfs from './containers/rcf/rcfs'
import Rcf from './containers/rcf/rcf'
import Media from './containers/media/Meida'

import Cookies from 'js-cookie'

const Routes = (props) => {
    console.log(Cookies.get('token'))
    if (!Cookies.get('token')) {
        return <Redirect to="/admin/login/" />
    }
    return (
        <Switch>
            <Route exact path="/admin" component={Home} />

            <Route path="/admin/users/new" component={newUser} />
            <Route path="/admin/users/edit/:id" component={editUser} />
            <Route path="/admin/users/:id" component={User} />
            <Route path="/admin/users/" component={Users} />

            <Route path="/admin/pages/:id" component={Page} />
            <Route path="/admin/pages" component={Pages} />
            <Route path="/admin/new/page" component={newPage} />

            <Route path="/admin/media" component={Media} />

            <Route path="/admin/rcf/:id" component={Rcf} />
            <Route path="/admin/rcf" component={Rcfs} />
            <Route>
                <h1>404</h1>
            </Route>
        </Switch >
    )
};

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(Routes);