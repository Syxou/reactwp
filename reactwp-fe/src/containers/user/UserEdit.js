import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import styled from 'styled-components';
import Card from '../../compontnts/card/Card';
import Sidebare from '../../compontnts/sidebar/Sidebar';
import { unsetUserToken } from '../../actions/actions'
import { connect } from 'react-redux';
import { Select, Button, message, Icon, Upload } from 'antd';
import "./user.css"


const { Option } = Select;

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            statusDrop: false,
            userStatus: ["admin", "user"]
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios({
            metod: 'get',
            url: `/admin/users/${id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
        })
            .then(res => { this.setState({ user: res.data }) })
            .catch(error => {
                console.log('error: ', error)
                if (error.response.status === 401) {
                    return this.props.dispatch(unsetUserToken())
                }
            })
    }

    hendleDelete = () => {
        axios({
            method: 'post',
            url: '/admin/users/delete/',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            data: { id: this.state.user.id }
        })
    }
    handleChangeName = (e) => (
        this.setState({
            user: {
                ...this.state.user,
                name: e.target.value
            }
        })
    )
    hendleChangeEmail = (e) => (
        this.setState({
            user: {
                ...this.state.user,
                email: e.target.value
            }
        })
    )
    handleChangeStatus = (value) => {
        let checked = value === "admin" ? 1 : 0;
        return this.setState({
            user: {
                ...this.state.user,
                admin: checked
            }
        })
    }
    handleChangeVerified = (value) => (
        this.setState({
            user: {
                ...this.state.user,
                verified: value
            }
        })
    )
    hendleSave = () => {
        axios({
            method: 'post',
            url: '/admin/users/chenge/',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            data: this.state.user
        })
            .then((res) => {
                console.log(res)
                !res.data.error ? message.success(res.data.message) : message.warning(res.data.message)
            })
            .catch(error => {
                console.log(error)
                message.error(JSON.stringify(error))
            })
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
                    user: {
                        ...this.state.user,
                        avatar: imageUrl
                    },
                    loading: false,
                }),
            );
        }
    };

    render() {
        console.log(this.state.user)
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { avatar } = this.state.user;
        return (
            <>
                <UserPage>
                    <div>
                        <h1>{this.state.user.name}</h1>
                        <Card>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {avatar ? <UserImg src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                            <UserName onChange={this.handleChangeName} value={this.state.user.name} />
                            <MailLink onChange={this.hendleChangeEmail} value={this.state.user.email} />
                        </Card>
                    </div>
                    <div>

                    </div>
                </UserPage>
                <Sidebare>
                    <Card bg='white'>
                        <TextCard onClick={() => this.setState({ statusDrop: !this.state.statusDrop })}>
                            Status:
                            <Select
                                value={this.state.user.admin ? "admin" : "user"}
                                style={{ width: 120, margin: '0 0 0 10px' }}
                                onChange={this.handleChangeStatus}
                            >
                                {this.state.userStatus.map((s, i) => (
                                    <Option key={i} value={s} >{s}</Option>
                                ))}

                            </Select>
                        </TextCard>

                        <TextCard>Verified:
                            <Select
                                value={this.state.user.verified ? "Yes" : "No"}
                                style={{ width: 120, margin: '0 0 0 10px' }}
                                onChange={this.handleChangeVerified}
                            >
                                <Option value={true} >Yes</Option>
                                <Option value={false} >No</Option>

                            </Select>
                        </TextCard>
                        <TextCard>Registration: <P>{this.state.user.date_create}</P></TextCard>
                    </Card>
                    <FlexRow>
                        <Button onClick={this.hendleSave} shape="circle" icon="save" />
                        <Button onClick={this.hendleDelete} shape="circle" icon="delete" />
                    </FlexRow>
                </Sidebare>
            </>
        );
    }
}


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    console.log("file:", file)

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 300 / 300 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}



const TextCard = styled.div`
    color: #0000007d;
    font-weight: bold;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const P = styled.p`
    width: min-content;
`
const MailLink = styled.input`
    display: block;
    margin:15px 0 0 0;
    width: 100%;
    font-style: normal;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    color: #1F2041;
    border: none;
`
const UserPage = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 19px;
`
const UserImg = styled.img`
    object-fit: cover;
`
const UserName = styled.input`
    margin-top:20px;
    width: 100%;
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    line-height: 24px;
    text-align: center;
    color: #1F2041;
    border: none;
`
const FlexRow = styled.div`
    display:flex;
    margin-top: 20px;
    button{
        margin: 0 10px;
    }
`

export default connect()(UserEdit);
