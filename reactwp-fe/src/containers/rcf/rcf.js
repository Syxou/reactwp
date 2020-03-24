import React, { Component } from 'react';
import axios from "axios"
import Cookies from 'js-cookie'
import RcfItem from './rcfItem'

class rcf extends Component {
    constructor(props) {
        super(props)
        this.state = {

            rcf: []

        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios({
            method: "get",
            url: `/admin/api/rcf/${id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => {
                const { data } = res;
                this.setState({
                    rcf: {
                        data_id: data.data_id,
                        post_id: data.post_id,
                        post_content: data.post_content,
                        data_type: data.data_type,
                        post_type: data.post_type,
                        post_date: data.post_date,
                    }
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.rcf)
        const { name } = this.state.rcf
        return (
            <>
                <div>
                    <h1>{name}</h1>
                    {/* <RcfItem item={this.state.rcf.post_content} /> */}
                </div>
            </>
        );
    }
}

export default rcf;