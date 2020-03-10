import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Card from '../../compontnts/card/Card';
import Sidebare from '../../compontnts/sidebar/Sidebar';
import { Icon } from 'antd';
import Cookies from 'js-cookie';
import { unsetUserToken } from "../../actions/actions";

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }
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

    render() {
        return (
            <>
                <UserPage>
                    <div>
                        <h1>{this.state.user.name}</h1>
                        <Card>
                            <UserImg src="" alt="" />
                            <UserName>{this.state.user.name}</UserName>
                            <MailLink href={`mailto:${this.state.user.email}`}>{this.state.user.email}</MailLink>
                        </Card>
                    </div>
                    <div>

                    </div>
                </UserPage>
                <Sidebare>
                    <Card bg='linear-gradient(180deg, #679CF6 0%, #4072EE 100%)'>
                        <TextCard>Status:{this.state.user.admin ? ' admin' : ' user'}</TextCard>
                        <TextCard>Registration:{this.state.user.date_create}</TextCard>
                        <TextCard>Visibility: {this.state.user.state} </TextCard>
                    </Card>
                    <button><Icon type="edit" /></button>
                    <button onClick={this.hendleDelete}><Icon type="delete" /></button>
                </Sidebare>
            </>
        );
    }
}


const TextCard = styled.p`
    color: #ffffff;
    font-weight: bold;
`
const MailLink = styled.a`
    display: block;
    margin-top:15px;
    font-style: normal;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    color: #1F2041;
`
const UserPage = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 19px;
`
const UserImg = styled.img`
    background: url();
    background-color: gray;
    box-sizing: border-box;
    box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.1);
    border-radius: 48px;
    width: 96px;
    height: 96px;
    margin: 0 auto;
    display: block;
    border: 2px solid #FFFFFF;
`
const UserName = styled.h4`
    margin-top:20px;
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    line-height: 24px;
    text-align: center;
    color: #1F2041;
`
const FlexRow = styled.div`
    display:flex;
`

export default connect()(User);