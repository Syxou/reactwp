import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Icon } from 'antd';
import './Nav.css'

class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <div className="menu">

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
                        className="navbar__link" to="/admin/pages">
                        <Icon style={{ fontSize: '21px' }} type="file" />
                    </NavLink>

                </div>
            </nav>
        );
    }
}

export default Nav;