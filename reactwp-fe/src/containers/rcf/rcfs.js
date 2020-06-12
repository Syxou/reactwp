import React, { Component } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'
import slugify from 'slugify'
import styled from 'styled-components'
import { connect } from "react-redux"
import { Button, Input, message } from 'antd'

import { unsetUserToken } from "../../actions/actions"
import Listing from '../../compontnts/listing/Listing'
import Sidebare from '../../compontnts/sidebar/Sidebar'

const { TextArea } = Input;
class rcf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: [],
            visible: false,
            name: '',
            slug: '',
            desc: '',
        }
    }

    componentDidMount() {
        this.getSchema()
    }


    getSchema = () => {
        console.log('asdasd')
        return axios({
            method: 'get',
            url: '/admin/api/fields/schema/',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => this.setState({ fields: res.data }))
            .catch(error => {
                if (error.response?.status === 401) {
                    this.props.dispatch(unsetUserToken())
                }
                console.log(error)
            })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    addNewSchema = () => {
        axios({
            method: 'post',
            url: '/admin/api/fields/schema/add',
            data: {
                name: this.state.name,
                slug: this.state.slug,
                desc: this.state.desc,
            },
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then((res) => {
                if (!res.data.error) {
                    message.success(res.data?.message)
                    this.getSchema()
                    this.setState({ visible: false, name: '', slug: '', desc: '' })
                }
                else
                    message.warning(res.data.message)
            })
    }
    removeSchema = (id) =>
        axios({
            method: 'delete',
            url: '/admin/api/fields/schema/delete',
            data: {
                id: id
            },
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        }).then(res => {
            if (!res.data.error) {
                message.success(res.data.message)
                return this.getSchema()
            } message.warning(res.data.message)
        }).catch((err) => message.error(err.toString()))


    render() {
        console.log(this.state)
        const getFIelds = this.state.fields.map((field) => (
            <Listing
                key={field.id}
                id={field.id}
                name={field.name}
                status={field.slug}
                callbackRemove={(id) => this.removeSchema(id)}
                link={`/admin/rcf/${field.id}`}
                textLink={'View'}
            />
        ))
        return (
            <>
                <div>
                    <h1>Custom Fields</h1>
                    <div className="">
                        {this.state.fields && getFIelds}
                    </div>
                </div>
                <Sidebare>
                    <FormAdd>
                        <Button type="primary" onClick={() => this.showDrawer()}>New</Button>
                    </FormAdd>
                    {this.state.visible && <FormAdd>
                        <Input placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value, slug: slugify(e.target.value, { lower: true, replacement: '_', }) })} />
                        <Input placeholder="Slug" value={this.state.slug} onChange={(e) => this.setState({ slug: slugify(e.target.value, { lower: true, replacement: '_', }) })} />
                        <TextArea placeholder="Desc" rows={3} value={this.state.desc} onChange={(e) => this.setState({ desc: e.target.value })} />
                        <Button onClick={() => this.addNewSchema()}>Add</Button>
                    </FormAdd>}
                </Sidebare>
            </>
        );
    }
}

const FormAdd = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 15px;
    & > *{
        margin: 5px 0;
    }
`

export default connect()(rcf);