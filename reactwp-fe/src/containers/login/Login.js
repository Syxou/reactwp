import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { setUserToken } from '../../actions/actions'
import axios from 'axios'
import 'antd/dist/antd.css'
import "./login.css"

import { connect } from 'react-redux'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios({
                    method: 'post',
                    url: '/admin/users/signin/',
                    data: {
                        username: values.username,
                        password: values.password
                    }
                })
                    .then((res) => {
                        if (res.data.token) {
                            this.props.dispatch(setUserToken(res.data))
                            this.setState({ login: true })
                        }
                        else
                            console.log(res.data.error)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else {
                return 0
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        if (this.state.login) {
            return <Redirect to="/admin/" />
        }
        return (
            <div className="loginForm_wrap" >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        {/* <a className="login-form-forgot" href="">
                            Forgot password
                        </a> */}
                        <Button
                            htmlType="submit"
                            className="primaryButton">
                            Log in
                        </Button>
                        {/* Or <a href="">register now!</a> */}
                    </Form.Item>
                </Form>
            </div >
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

const mapStateToProps = state => {
    console.log(state);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(WrappedNormalLoginForm);