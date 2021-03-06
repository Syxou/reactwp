import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './../../components/card/Card';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Select, Button, message, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import slugify from 'slugify'
import { editFieldById } from '../../actions/schemaAction'

const { Option } = Select;


class rcfItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: ["wyswyg", "text", "image", "gallery"],
            save: false,
        }
    }

    componentDidMount() {
        if (this.props.field.slug.length < 1) {
            this.setState({ save: true })
        }
    }

    handleChangeName = e => {
        const slug = slugify("cf_" + e.target.value, { lower: true, replacement: '_', });
        const oldNameSlug = slugify("cf_" + this.props.field.name, { lower: true, replacement: '_', });
        let newField = {};
        if (oldNameSlug === this.props.field.slug || this.props.field.slug === "") {
            newField = { ...this.props.field, name: e.target.value, slug: slug }
        }
        else
            newField = { ...this.props.field, name: e.target.value }
        this.props.editField(newField)
    }

    handleChangeType = (value) => {
        this.props.editField({ ...this.props.field, type: value })
    }

    saveField = () => {
        const id = this.props.idScnema;

        const { field } = this.props

        if (field.type.length > 1 && field.name.length > 1 && field.slug.length > 1)
            axios({
                method: 'post',
                url: `/admin/api/fields/schema/${id}/add/field`,
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('token'),
                },
                data: {
                    type: this.props.field.type,
                    name: this.props.field.name,
                    slug: this.props.field.slug,
                }
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data.error)
                        message.error(res.data.message)
                    else {
                        message.success(res.data.message)
                        this.setState({ save: false })
                    }
                })
        else message.error('Problem with the data in the field');
    }

    handleRemoveFeld = () => {

    }

    handleSetEdided = () => {
        this.setState({ save: true })
    }
    handleUnsetEdided = () => {
        this.setState({ save: false })
    }

    render() {
        const { field } = this.props

        return (
            <CardWrap
                onMouseEnter={this.handleSetEdided}
                onMouseLeave={this.handleUnsetEdided}
            >
                <Card display={'flex'}
                    justify="space-between"
                >
                    <Name
                        onChange={this.handleChangeName}
                        value={field.name}
                    />

                    <Slug
                        value={field.slug}
                        onChange={this.handleChangeText} >
                    </Slug>
                    <div>Type:
                <Select defaultValue={field.type} style={{ width: 120 }} onChange={this.handleChangeType}>
                            {this.state.types.map((type, i) => (
                                <Option key={i} value={type}>{type}</Option>
                            ))}
                        </Select>
                    </div>

                    <HandesButtons>
                        {this.state.save &&
                            <>
                                <Button style={{ borderColor: '#1890ff' }} type="dashed" shape="circle" icon="save" onClick={this.saveField} />
                                <Popconfirm
                                    placement="topRight"
                                    title={'Are you sure to delete this field?'}
                                    onConfirm={this.handleRemoveFeld}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button style={{ borderColor: 'tomato' }} type="dashed" shape="circle" icon="close" />
                                </Popconfirm>
                            </>
                        }
                    </HandesButtons>
                </Card>
            </CardWrap>
        );
    }
}
const HandesButtons = styled.div`
    min-width:70xp;
    display: block;
    button{
        margin: 0 3px;
    }
`

const Slug = styled.input`
    margin-top:0 ;
    width: max-content;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: left;
    color: #1F2041;
    border: none;
    &:active,
    &:focus{
        border-color: #40a9ff;
        border-right-width: 1px !important;
        outline: 0;
    }
`;
const Name = styled.input`
    margin-top:0;
    width: max-content;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    color: #1F2041;
    border: none;
    &:active,
    &:focus{
        border-color: #40a9ff;
        border-right-width: 1px !important;
        outline: 0;
    }
`;

const CardWrap = styled.div`
    .card:hover{
        box-shadow:0px 0px 0px 3px rgba(9, 102, 217, 0.33);
    }
`

const mapDispatchToProps = dispatch => ({
    editField(field) {
        return dispatch(editFieldById(field))
    }
})


export default connect(null, mapDispatchToProps)(rcfItem);