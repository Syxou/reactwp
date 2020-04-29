import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Button } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie'

import Card from '../../compontnts/card/Card'
import Sidebare from '../../compontnts/sidebar/Sidebar'
import { unsetUserToken, fetchOnePageById, changePageTitle } from '../../actions/pageAction'
import Fields from './fields/fields'

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            redirect: false,
            page: {},
            fields: []
        };
        this.onChange = editorState => this.setState({ editorState });
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        // this.props.dispatch(fetchPageItem(id))
        await this.props.dispatch(fetchOnePageById(id))

        await axios({
            method: 'get',
            url: `/admin/postdata/${id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
        })
            .then(res => this.setState({
                editorState: EditorState.createWithContent(
                    convertFromRaw(JSON.parse(res.data[0].post_content))
                )
            }))
            .catch(err => console.log(err))
    }

    handleChangeTitle = (event) => {
        let value = event.target.value
        this.props.dispatch(changePageTitle(value))
    }

    onChange = (editorState) => this.setState({ editorState });
    handleSubmitPage = () => {
        axios({
            method: 'post',
            url: '/admin/pages/changes/',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
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
            url: '/admin/pages/trash/',
            data: this.state.page,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
        })
            .then((() => { this.setState({ redirect: true }) }))
            .catch((err) => { console.log(err) })
    }

    render() {
        const { redirect, fields } = this.state;
        if (redirect) {
            return <Redirect to="/admin/pages" />;
        }

        return (
            <>
                <div style={{ width: "95%" }}>
                    <input className="pageTitle" value={this.props.page.post.title} onChange={this.handleChangeTitle} />
                    <Card>
                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="editer-content"
                            onEditorStateChange={this.onChange}
                        />
                    </Card>
                    <Fields fields={this.props.page.fields} />
                </div>

                <Sidebare>
                    <Card
                        bg='linear-gradient(180deg, #679CF6 0%, #4072EE 100%)'
                    >
                        <p style={{ color: '#ffffff' }}><span>Status:</span>{" " + this.props.page.post.state}</p>
                        <p></p>
                    </Card>
                    <Button className="buttonSave" type="primary" SmileOutlined="save" size={'large'} onClick={this.handleSubmitPage} />
                    <Button className="buttonSave" type="primary" SmileOutlined="delete" size={'large'} onClick={this.handleDeletePage} />
                </Sidebare>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.pages.page
    }
}

export default connect(mapStateToProps)(Page);


