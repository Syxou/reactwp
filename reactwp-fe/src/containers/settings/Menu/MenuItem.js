import React, { useState } from 'react'
import styled from 'styled-components'


export default function MenuItem({ item }) {
    const [itemName, setItemName] = useState(item.name)
    const [itemLink, setItemLink] = useState(item.link)
    const [itemClass, setItemClass] = useState(item.class)

    return (
        <Card display='flex' justify='space-between'>
            <DragIndicator>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
            </DragIndicator>
            <div>
                <Input
                    placeholder="Name: ž"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                />
                <Input
                    placeholder="Class: "
                    value={itemClass}
                    onChange={e => setItemClass(e.target.value)}
                />
            </div>
            <Input
                placeholder="Link: "
                value={itemLink}
                onChange={e => setItemLink(e.target.value)}
            />
        </Card>
    )
}
const DragIndicator = styled.div`
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        width: 30px;
        height: 20px;
        fill: gray;
    }
`;

const Input = styled.input`
    margin-top:0;
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    text-align: left;
    color: #1F2041;
    width: 100px;
    border: none;
    &:active,
    &:focus{
        border-color: #40a9ff;
        border-right-width: 1px !important;
        outline: 0;
    }
`;

const Card = styled.div`
    display: flex;
    padding: 10px 15px 10px 0px;
    align-items: center;
    background-color: #ffffff;
    justify-content:space-between;
    box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
    border-radius: 5px;
    width: 300px;
    transition: all 0.3s ease;
    overflow: hidden;
    /* animation-duration: 0.3s; */
    /* animation-name: slidein; */
`;
