import React, { Component } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from "react-redux"
import { unsetUserToken } from "../../actions/actions"
import Listing from '../../compontnts/listing/Listing'

class rcf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/admin/api/fields/schema/',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => this.setState({ fields: res.data }))
            .catch(error => {
                if (error.response.status === 401) {
                    this.props.dispatch(unsetUserToken())
                }
            })
    }

    render() {
        console.log("fields", this.state.fields)
        const getFIelds = this.state.fields.map((field, i) => (
            <Listing
                key={i}
                name={field.name}
                status={field.type}
                link={`/admin/rcf/${field.id}`}
                textLink={'View'}
            />
        ))
        return (
            <div>
                <h1>Custom Fields</h1>
                <div className="cardList">
                    {this.state.fields && getFIelds}
                </div>
            </div>
        );
    }
}

export default connect()(rcf);