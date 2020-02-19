import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Button } from 'antd';
import axios from 'axios';

import Card from '../../compontnts/card/Card';
import Sidebare from '../../compontnts/sidebar/Sidebar';
import { fetchPageItem, setTitlePage } from '../../actions/actions';


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
            state: '',
            slug: this.state.title
        }
        axios({
            method: 'post',
            url: '/pages/add/',
            data: data
        })
            .then(() => {
                this.setState({ redirect: true })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(props) {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/admin/pages/" />;
        }
        return (
            <>
                <div style={{ width: "95%" }}>
                    <input className="pageTitle" value={this.state.title} onClick={this.handleClickTitle} onChange={this.handleChangeTitle} />
                    <Card >
                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="editer-content"
                            onEditorStateChange={this.onChange}
                        />
                    </Card>
                </div>

                <Sidebare>
                    <Card
                        bg='linear-gradient(180deg, #679CF6 0%, #4072EE 100%)'
                    >
                        <p style={{ color: '#ffffff' }}><span>Status:</span>{" draft"}</p>
                        <p></p>
                    </Card>
                    <Button className="buttonSave" type="primary" icon="save" size={'large'} onClick={this.handleSubmitPage} />
                </Sidebare>
            </>
        );
    }
}


export default NewPage;


