import React, { Component } from 'react'
import Card from '../../compontnts/card/Card';
import axios from 'axios'
import Cookies from 'js-cookie'
// import styled from 'styled-components'
import { Icon, Input, Switch, message } from 'antd';

export default class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            admin: false,
            name: '',
        }
    }

    handleUsername = (e) => this.setState({ username: e.target.value })
    handlePassword = (e) => this.setState({ password: e.target.value })
    handleEmail = (e) => this.setState({ email: e.target.value })
    handleAdmin = (checked) => { this.setState({ admin: checked }) }
    hendleAddUser = () => {
        var errorHendle = false
        if (this.state.username.length < 2) {
            message.warning('Username < 2 letters');
            errorHendle = true
        }
        if (this.state.password.length < 8) {
            message.warning('Password < 8 letters');
            errorHendle = true
        }
        if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(this.state.email)) {
            message.warning(`Bad email: ${this.state.email}`);
            errorHendle = true
        }
        if (!errorHendle) {
            axios({
                method: 'post',
                url: '/admin/users/add',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('token'),
                },
                data: {
                    name: '',
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    admin: this.state.admin
                }
            })
                .then((res) => {
                    if (res.status === 201) {
                        message.success('User Created');
                    }
                    else {
                        message.error(`Error status ${res.status}`);
                    }
                })
        }
    }
    render() {
        return (
            <div>
                <Card margin="50px auto" width="500px">
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleUsername}
                    />
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePassword}
                    />
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="email"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                    <div>
                        <Icon type="user" />
                        <Switch
                            checkedChildren="admin" unCheckedChildren="user"
                            onChange={this.handleAdmin} />
                    </div>
                    <div>
                        <button onClick={this.hendleAddUser} >Add User</button>
                    </div>
                </Card>
            </div>
        )
    }
}


