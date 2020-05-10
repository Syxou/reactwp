import React, { Component } from 'react'
import Card from '../../compontnts/card/Card';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
// import styled from 'styled-components'
import { Icon, Input, Switch, message, Upload } from 'antd';
import './user.css'

export default class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            admin: false,
            name: '',
            redirect: false,
            loading: false,
        }
    }

    handleUsername = (e) => this.setState({ username: e.target.value })
    handlePassword = (e) => this.setState({ password: e.target.value })
    handleEmail = (e) => this.setState({ email: e.target.value })
    handleAdmin = (checked) => { this.setState({ admin: checked }) }
    handleName = (e) => (this.setState({ name: e.target.value }))
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
                    name: this.state.name,
                    avatar: this.state.imageUrl,
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    admin: this.state.admin
                }
            })
                .then((res) => {
                    if (res.status < 205) {
                        message.success('User Created');
                        console.log(res)
                        this.setState({ redirect: true })
                    }
                    else {
                        message.error(`Error status ${res.status}`);
                    }
                })
        }
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        // if (this.stete.redirect)
        //     return <Redirect to={`/admin/users/`} />
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        console.log(imageUrl)
        return (
            <div>
                <Card margin="50px auto" width="max-content">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Card>
                <Card margin="50px auto" width="500px">
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="username"
                        placeholder="Username"
                        autoComplete="off"
                        value={this.state.username}
                        onChange={this.handleUsername}
                    />
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.handlePassword}
                    />
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                </Card>
                <Card margin="50px auto" width="500px">
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="name"
                        placeholder="Username"
                        autoComplete="off"
                        value={this.state.name}
                        onChange={this.handleName}
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
            </div >
        )
    }


}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


