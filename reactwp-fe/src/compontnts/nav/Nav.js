import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Icon } from 'antd';
import './Nav.css'

class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <div className="menu">
                    <div>
                        <NavLink
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/admin/"
                        >
                            <Icon style={{ fontSize: '21px' }} type="home" />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            activeClassName="navbar__link--active"
                            className="navbar__link" to="/admin/user">
                            <Icon style={{ fontSize: '21px' }} type="user" />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            activeClassName="navbar__link--active"
                            className="navbar__link" to="/admin/pages">
                            <Icon style={{ fontSize: '21px' }} type="file" />
                        </NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;