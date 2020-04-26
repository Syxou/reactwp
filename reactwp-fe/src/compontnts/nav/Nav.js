import React, { Component } from 'react';
import { NavLink, } from "react-router-dom";
import { connect } from 'react-redux'
import { Icon } from 'antd';
import './Nav.css'
import { Avatar } from 'antd';
import { unsetUserToken } from '../../actions/actions'
import styled from 'styled-components';

class Nav extends Component {

    hendleLogOut = () => {
        this.props.dispatch(unsetUserToken())
    }

    render() {
        console.log("user", this.props.user)
        return (
            <div className="nav">
                <nav className="menu">
                    <div>
            
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


const UserImg = styled.img`
background: url();
background - color: gray;
box - sizing: border - box;
box - shadow: 0px 10px 20px rgba(31, 32, 65, 0.1);
border - radius: 48px;
object - fit: cover;
width: 96px;
height: 96px;
margin: 0 auto;
display: block;
border: 2px solid #FFFFFF;
`

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(Nav);