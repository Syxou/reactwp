import React, { Component } from 'react';
import { NavLink, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { Icon } from 'antd';
import './Nav.css'
import { unsetUserToken } from '../../actions/actions'
import { getAllPostType } from '../../actions/postAction'

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }

    hendleLogOut = () => {
        this.props.unsetToken()
        this.setState(() => ({ redirect: true }))
    }

    componentDidMount() {
        this.props.getPostTypes()
    }

    render() {
        const { types } = this.props
        if (this.state.redirect) {
            return <Redirect to="/admin/login" />
        }
        return (
            // <div className="nav">
            <nav className="menu">

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

                {/* <NavLink
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/admin/pages">
                            <Icon style={{ fontSize: '21px' }} type="file" />
                        </NavLink> */}
                <NavLink
                    activeClassName="navbar__link--active"
                    className="navbar__link"
                    to="/admin/rcf">
                    <Icon style={{ fontSize: '21px' }} type="form" />
                </NavLink>
                <NavLink
                    to="/admin/media"
                    activeClassName="navbar__link--active"
                    className="navbar__link"
                >
                    <Icon style={{ fontSize: '21px' }} type="file-image" />
                </NavLink>
                {
                    types &&
                    types.map((post) => (
                        <NavLink
                            key={post.id}
                            to={`/admin/post/${post.type}/`}
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                        >
                            <Icon style={{ fontSize: '21px' }} type={post.icon} />
                        </NavLink>
                    ))
                }
                <NavLink
                    to="/admin/settings"
                    activeClassName="navbar__link--active"
                    className="navbar__link">
                    <Icon style={{ fontSize: '21px' }} type="setting" />
                </NavLink>

                <button className="logOut" onClick={this.hendleLogOut}><Icon type="logout" /></button>

            </nav>
            // </div >
        );
    }
}




const mapStateToProps = state => {
    return {
        user: state.user,
        types: state.posts.types
    }
}
const mapDispatchToProps = dispatch => ({
    getPostTypes() {
        return dispatch(getAllPostType())
    },
    unsetToken() {
        return dispatch(unsetUserToken())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
