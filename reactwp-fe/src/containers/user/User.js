import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from 'antd';
import axios from 'axios';

import Card from '../../compontnts/card/Card';
import { unsetUserToken } from "../../actions/actions";
import Sidebare from '../../compontnts/sidebar/Sidebar';

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


    render() {
        return (
            <>
                <UserPage>
                    <div>
                        <h1>{this.state.user.name}</h1>
                        <Card>
                            <UserImg src={this.state.user.avatar} alt="" />
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

                    <Link to={`/admin/users/edit/${this.props.match.params.id}`}>
                        <Button onClick={this.hendleSave} shape="circle" icon="edit" />
                    </Link>

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
    object-fit: cover;
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

export default connect()(User);
