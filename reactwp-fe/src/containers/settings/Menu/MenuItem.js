import React, { useState } from 'react'
import styled from 'styled-components'


export default function MenuItem({ item }) {
    const [itemName, setItemName] = useState(item.name)
    const [itemLink, setItemLink] = useState(item.link)
    const [itemClass, setItemClass] = useState(item.class)
    console.log(item)
    return (
        <Card display='flex' justify='space-between'>
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
    padding: 10px 15px;
    align-items: center;
    margin: 15px 0;
    background-color: #ffffff;
    justify-content:space-between;
    box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
    border-radius: 5px;
    width: 300px;
    transition: all 0.3s ease;
    animation-duration: 0.3s;
    animation-name: slidein;
`

const CardData = styled.div`
    display: inherit;
`
