import React, { Component } from 'react';
import axios from "axios"
import Cookies from 'js-cookie'
import RcfItem from './rcfItem'
import styled from 'styled-components';
import Card from './../../compontnts/card/Card';
import pagesArticle from './../pages/pagesArticle';
import Distributor from "./fields/distributor";

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
            loading: false
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

                this.setState({ fields: data.fields, type: data.type, name: data.name, slug: data.slug, id: data.id })
            })
            .catch(err => console.log(err))
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
                        <Distributor key={i} field={field} />
                    ))}
                </div>
                <Card>
                    <p>{this.state.slug}</p>
                    <p>{this.state.type}</p>
                </Card>
            </>
        );
    }
}


const mapStateToPtops = (state) => {
    return {
        fields: state.schema.fields,
    }
}

export default connect(mapStateToPtops)(rcf);