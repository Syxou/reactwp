import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { EditorState, createWithContent, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Button } from 'antd';
import axios from 'axios'

import Card from '../../compontnts/card/Card'
import Sidebare from '../../compontnts/sidebar/Sidebar'

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            redirect: false,
            page: {},
        };
        this.onChange = editorState => this.setState({ editorState });

    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id)
        // this.props.dispatch(fetchPageItem(id))
        await fetch(`/pages/${id}`)
            .then((res) => res.json())
            .then((data) => this.setState({ page: data[0] }))
            .catch((e) => console.log(e))

        await fetch(`/postdata/${id}`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data[0].post_content)))
                })
            })
            .catch(err => {
                console.log(err)
            })
        console.log(this.state.editorState)
    }

    handleChangeTitle = (event) => {
        let value = event.target.value
        this.setState({
            page: {
                ...this.state.page,
                title: value
            }
        });
    }

    onChange = (editorState) => this.setState({ editorState });

    handleSubmitPage = () => {
        axios({
            method: 'post',
            url: '/pages/changes/',
            data: {
                page: this.state.page,
                content: convertToRaw(this.state.editorState.getCurrentContent())
            }
        })
            .then((res) => { console.log(res) })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleDeletePage = () => {
        axios({
            method: 'post',
            url: '/pages/trash/',
            data: this.state.page
        })
            .then((() => { this.setState({ redirect: true }) }))
            .catch((err) => { console.log(err) })
    }

    render(props) {

        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/admin/pages" />;
        }

        return (
            <>
                <div style={{ width: "95%" }}>
                    <input className="pageTitle" value={this.state.page.title} onChange={this.handleChangeTitle} />
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
                        <p style={{ color: '#ffffff' }}><span>Status:</span>{" " + this.state.page.state}</p>
                        <p></p>
                    </Card>
                    <Button className="buttonSave" type="primary" icon="save" size={'large'} onClick={this.handleSubmitPage} />
                    <Button className="buttonSave" type="primary" icon="delete" size={'large'} onClick={this.handleDeletePage} />
                </Sidebare>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.pages.pageItem
    }
}

export default connect(mapStateToProps)(Page);


