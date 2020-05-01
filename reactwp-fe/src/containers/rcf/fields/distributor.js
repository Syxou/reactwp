import React from 'react'
import Card from '../../../compontnts/card/Card'
import { connect } from 'react-redux';
import { Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

export default function distributor({ field }) {
    return (
        <Card>
            <Name onChange={() => { }} value={field.name} />
            <Slug value={field.slug}></Slug>
            <div>Type:
                                <Select defaultValue={field.type} style={{ width: 120 }}  onChange={() => { }}>
                    {this.state.types.map((type, i) => (
                        <Option key={i} value={type}>{type}</Option>
                    ))}
                </Select>
            </div>
        </Card>
    )
}

const Slug = styled.input`
    margin-top:20px;
    width: max-content;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: left;
    color: #1F2041;
    border: none; 
`;
const Name = styled.input`
    margin-top:20px;
    width: max-content;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    color: #1F2041;
    border: none;
`;