import React, { Component } from 'react';
import { NavLink, } from "react-router-dom";
import { connect } from 'react-redux'
import { Icon } from 'antd';
import './Nav.css'

import { unsetUserToken } from '../../actions/actions'

class Nav extends Component {

    hendleLogOut = () => {
        this.props.dispatch(unsetUserToken())
    }
    render() {
        return (
            <div className="nav">
                <nav className="menu">
                    <div >
                        <NavLink
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/admin/"
                        >
                            <Icon style={{ fontSize: '21px' }} type="home" />
                        </NavLink>


                        <NavLink
                            activeClassName="navbar__link--active"
                            className="navbar__link" to="/admin/users/">
                            <Icon style={{ fontSize: '21px' }} type="user" />
                        </NavLink>


                        <NavLink
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/admin/pages">
                            <Icon style={{ fontSize: '21px' }} type="file" />
                        </NavLink>
                        <NavLink
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/admin/rcf">
                            <Icon style={{ fontSize: '21px' }} type="form" />
                        </NavLink>

                    </div>
                    <div className="menuBottom">
                        <button className="logOut" onClick={this.hendleLogOut}><Icon type="logout" /></button>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(Nav);