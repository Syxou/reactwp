import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios'
import Cookies from 'js-cookie'
import { Menu, Dropdown, Icon, Button } from 'antd';


import Card from '../../compontnts/card/Card'
import Sidebare from '../../compontnts/sidebar/Sidebar'
import { unsetUserToken, fetchOnePageById, changePageTitle, changePostStatus } from '../../actions/pageAction'
import Fields from './fields/fields'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            redirect: false,
            page: {},
            fields: [],

        };
        this.onChange = editorState => this.setState({ editorState });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        // this.props.dispatch(fetchPageItem(id))
        this.props.dispatch(fetchOnePageById(id))

        axios({
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
        const value = event.target.value
        this.props.dispatch(changePageTitle(value))
    }

    onChange = (editorState) => this.setState({ editorState });

    handleSubmitPage = async () => {
        const id = this.props.match.params.id;
        await axios({
            method: 'post',
            url: '/admin/api/post/changes',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            data: {
                page: this.props.page.post,
                content: convertToRaw(this.state.editorState.getCurrentContent()),
            }
        })
            .then((res) => { console.log(res) })
            .catch(function (error) {
                console.log(error);
            });
        await axios({
            method: 'post',
            url: `/admin/api/post/fields/update/${id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            data: {
                fields: this.props.page.fields
            }
        })
    }

    handleDeletePage = () => {
        axios({
            method: 'DELETE',
            url: `/admin/api/post/trash/${this.props.match.params.id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            data: {
                status: this.props.page.post.state
            }
        })
            .then((res => {
                console.log(res)
                this.setState({ redirect: true })
            }))
            .catch((err) => { console.log(err) })
    }


    render() {
        const { redirect } = this.state;
        if (redirect)
            return <Redirect to={`/admin/post/${this.props.page.post.type}`} />;

        console.log("props", this.props)
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
                    {this.props.page.fields ?
                        <Fields fields={this.props.page.fields} />
                        : null
                    }
                </div>

                <Sidebare>
                    <Card bg='linear-gradient(180deg, #679CF6 0%, #4072EE 100%)'>
                        <p style={{ color: '#ffffff' }}><span>Status:</span>{" " + this.props.page.post.state} <Icon type="down" /></p>
                    </Card>
                    <Button onClick={this.handleSubmitPage} shape="circle" icon="save" />
                    <Button onClick={this.handleDeletePage} shape="circle" icon="delete" />
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


export default connect(mapStateToProps)(Post);
