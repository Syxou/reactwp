import React, { Component } from 'react';

import Listing from '../../compontnts/listing/Listing'

class Users extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }


    componentDidMount() {
        fetch('/users/')
            .then(res => res.json())
            .then(data => this.setState({ users: data }))

    }


    render() {
        const getUsers = this.state.users.map((user, i) => (
            <Listing
                key={i}
                name={user.name}
                status={user.email}
                link={`/admin/users/${user.id}`}
                textLink={'View'}
            />
        ))
        return (
            <>
                {console.log(this.state.users)}
                <div>
                    <h2>Users</h2>
                    <div className="cardList">
                        {this.state.users && getUsers}
                    </div>
                </div>
            </>
        );
    }
}

export default Users;