import React, { Component } from 'react';
import axios from "axios"
import Cookies from 'js-cookie'
import styled from 'styled-components';
import Card from './../../compontnts/card/Card';
import { connect } from 'react-redux';
import { getSchemaById, setNewField } from '../../actions/schemaAction'
import { Button } from 'antd';
import RcfPagesSelect from './rcfPagesSelect'

import RcfItem from './rcfItem'
import './style.css'


class Rcf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: ["wyswyg", "text"],
            loading: false,
            AllPages: [],
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id

        await this.props.getSchema(id);

        await axios({
            method: "get",
            url: '/admin/api/post',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => {
                const { data } = res;
                console.log(data)
                this.setState({ AllPages: data })
            })
    }



    render() {
        const { fields, schemaData, selectPages } = this.props.schema;
        console.log(this.props.schema)
        return (
            <>
                <div>
                    <h1>{schemaData.name}</h1>
                    {fields.map((field, i) => (
                        <RcfItem key={i} field={field} idScnema={this.props.match.params.id} />
                    ))}
                    <Center>
                        <Button shape="circle" icon="plus" onClick={() => this.props.addNewField()} />
                    </Center>
                    <Card>
                        <RcfPagesSelect allPages={this.state.AllPages} selectPages={selectPages} idScnema={this.props.match.params.id} />
                    </Card>
                </div>
                <Card>
                    <p>{schemaData.slug}</p>
                    <p>{schemaData.type}</p>
                    {/* <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={selectedPage}
                        onChange={handleChange}
                    >
                        {this.state.AllPages.map((page, i) => (
                            <Option key={i} value={page.slug} label={page.name}>
                                {page.slug}
                            </Option>
                        ))}
                    </Select> */}
                </Card>

            </>
        );
    }
}


const Center = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: center;
`;

const mapStateToProps = state => {
    console.log(state.schema.fields)
    return {
        schema: state.schema,
    }
}
const mapDispatchToProps = dispatch => ({
    getSchema(id) {
        return dispatch(getSchemaById(id))
    },
    addNewField() {
        return dispatch(setNewField())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Rcf);