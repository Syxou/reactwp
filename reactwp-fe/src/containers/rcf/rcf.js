import React, { Component } from 'react';
import axios from "axios"
import Cookies from 'js-cookie'
import RcfItem from './rcfItem'
import styled, { ThemeConsumer } from 'styled-components';
import Card from './../../compontnts/card/Card';
import pagesArticle from './../pages/pagesArticle';

import { connect } from 'react-redux';

import { Select } from 'antd';
const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class rcf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: [],
            id: null,
            type: null,
            name: null,
            slug: null,
            types: ["wyswyg", "text"],
            loading: false,
            AllPages: [],
            selectAllPages: [],
            selectedPage: [],
            selectPages: [],
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios({
            method: "get",
            url: `/admin/api/fields/schema/${id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => {
                const { data } = res;
                let newSelectedPage = []
                data.pages.forEach(page => {
                    newSelectedPage.push(page.slug)
                })
                this.setState({ fields: data.fields, type: data.type, name: data.name, slug: data.slug, id: data.id, selectPages: data.pages, selectedPage: newSelectedPage })
            })
            .catch(err => console.log(err))

        axios({
            method: "get",
            url: '/admin/api/post?type=page',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => {
                const { data } = res;
                this.setState({ AllPages: data })
            })
    }

    handleChangeName = () => {

    }

    render() {
        console.log(this.state)
        return (
            <>
                <div>
                    <h1>{this.state.name}</h1>

                    {this.state.fields.map((field, i) => (
                        <Card key={i}>
                            <Name onChange={this.handleChangeName} value={field.name} />
                            <Slug value={field.slug}></Slug>
                            <div>Type:
                                <Select defaultValue={field.type} style={{ width: 120 }} loading={this.state.loading} onChange={handleChange}>
                                    {this.state.types.map((type, i) => (
                                        <Option key={i} value={type}>{type}</Option>
                                    ))}
                                </Select>
                            </div>
                        </Card>
                    ))}
                </div>
                <Card>
                    <p>{this.state.slug}</p>
                    <p>{this.state.type}</p>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={this.state.selectedPage}
                        onChange={handleChange}
                    >
                        {this.state.AllPages.map((page, i) => (
                            <Option key={i} value={page.slug} label={page.name}>
                                {page.slug}
                            </Option>
                        ))}
                    </Select>
                </Card>
            </>
        );
    }
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

const mapStateToPtops = (state) => {
    return {
        fields: state.schema.fields,
    }
}

export default connect(mapStateToPtops)(rcf);