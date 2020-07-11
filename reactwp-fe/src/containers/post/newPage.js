import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Button } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie'

import Card from '../../components/card/Card';
import Sidebare from '../../components/sidebar/Sidebar';
import { unsetUserToken } from '../../actions/actions';



class NewPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'New page',
            newTitle: true,
            redirect: false,
            editorState: EditorState.createEmpty()
        };
        this.onChange = editorState => this.setState({ editorState });

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitPage = this.handleSubmitPage.bind(this);
        this.handleClickTitle = this.handleClickTitle.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({ title: event.target.value })
        console.log('handleChangeTitle')
    }
    handleClickTitle() {
        if (this.state.newTitle)
            this.setState({ title: "" })
    }

    onChange = (editorState) => this.setState({ editorState });

    handleSubmitPage() {
        const data = {
            title: this.state.title,
            state: 'draft',
            slug: this.state.title,
            type: this.props.match.params.type
        }
        axios({
            method: 'post',
            url: '/admin/api/post/add',
            data: data,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
        })
            .then(() => {
                
                this.setState({ redirect: true })
            })
            .catch(error => {
                if (error.response.status === 401)
                    this.ptops.dispatch(unsetUserToken())
            });
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={`/admin/post/${this.props.match.params.type}`} />;
        }
        return (
            <>
                <div style={{ width: "95%" }}>
                    <input className="pageTitle" value={this.state.title} onClick={this.handleClickTitle} onChange={this.handleChangeTitle} />
                </div>

                <Sidebare>
                    <Card bg='linear-gradient(180deg, #679CF6 0%, #4072EE 100%)'>
                        <p style={{ color: '#ffffff' }}><span>Status:</span>{" draft"}</p>
                    </Card>
                    <Button type="primary" onClick={this.handleSubmitPage.bind(this)}>Save</Button>
                </Sidebare>
            </>
        );
    }
}


export default NewPage;
