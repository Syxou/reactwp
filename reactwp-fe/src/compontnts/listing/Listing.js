import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Listing.css'

const Card = styled.div`
    display: flex;
    padding: 10px;
    border-bottom: solid 1px #EBEDF4;
    align-items: center;
    img{
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background: #D8D8D8;
        margin-right: 10px;
    }
    p{
        margin:0;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #31394D;
    }
    span{
        font-size: 12px;
        color: #748AA1;
    }
`


class Listing extends Component {
    render() {
        return (
            <Card>
                <img src="" alt="" />
                <div>
                    <p>{this.props.name}</p>
                    <span>{this.props.status}</span>
                </div>
                <Link to={this.props.link}>{this.props.textLink}</Link>
            </Card >
        );
    }
}
export default Listing;