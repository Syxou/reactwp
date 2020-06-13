import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd'
import './Listing.css'

const Card = styled.div`
    display: flex;
    padding: 10px 15px;
    align-items: center;
    margin: 15px 0;
    background-color: #ffffff;
    justify-content:space-between;
    box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
    border-radius: 5px;
    width: inherit;
    height: max-content;
    transition: all 0.3s ease;
    animation-duration: 0.3s;
    animation-name: slidein;

    img{
        object-fit: cover;
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

const CardData = styled.div`
    display: inherit;
`


const Listing = (props) => {
    return (
        <Card>
            <CardData>
                {props.image && <img src={props.image} alt="" />}
                <div>
                    <p>{props.name}</p>
                    <span>{props.status}</span>
                </div>
            </CardData>
            <div>
                <Link to={props.link}>
                    <Button
                        type="dashed"
                        style={{ borderColor: "#1890ff" }}
                    >
                        {props.textLink}
                    </Button>
                </Link>
                {props.callbackRemove &&
                    <Button
                        type="dashed"
                        shape="circle"
                        icon="delete"
                        style={{ borderColor: "tomato", margin: ' 0 5px' }}
                        onClick={() => props.callbackRemove(props.id)}
                    />
                }
            </div>
        </Card >
    );
}
export default Listing