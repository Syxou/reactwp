import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Listing from '../../compontnts/listing/Listing'
import { connect } from "react-redux"
import { unsetUserToken } from "../../actions/actions"
import Cookies from 'js-cookie'
import Sidebare from '../../compontnts/sidebar/Sidebar'
class Users extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/admin/users',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => this.setState({ users: res.data }))
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.dispatch(unsetUserToken())
                }
            })
    }

    render() {
        const getUsers = this.state.users.map((user, i) => (
            <Listing
                key={i}
                image={user.avatar}
                name={user.name}
                status={user.email}
                link={`/admin/users/${user.id}`}
                textLink={'View'}
            />
        ))
        return (
            <>
                <div>
                    <h1>Users</h1>
                    <div className="cardList">
                        {this.state.users && getUsers}
                    </div>
                </div>
                <Sidebare>
                    <Link to="/admin/users/new">
                        <button type="primary">New user</button>
                    </Link>
                </Sidebare>А
            </>
        );
    }
}

export default connect()(Users);