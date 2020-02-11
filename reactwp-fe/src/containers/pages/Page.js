import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Button } from 'antd';
import axios from 'axios'

import Card from '../../compontnts/card/Card'
import Sidebare from '../../compontnts/sidebar/Sidebar'
import { fetchPageItem, setTitlePage } from '../../actions/actions'


class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            redirect: false,
        };

        this.onChange = editorState => {
            this.setState({ editorState });
            console.log()
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitPage = this.handleSubmitPage.bind(this);
        this.handleDeletePage = this.handleDeletePage.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(fetchPageItem(id))
    }

    handleChangeTitle(event) {
        this.props.dispatch(setTitlePage({ ...this.props.page, title: event.target.value }))
        console.log('handleChangeTitle')
    }

    onChange = (editorState) => this.setState({ editorState });

    handleSubmitPage() {
        axios({
            method: 'post',
            url: '/pages/changes/',
            data: {
                page: this.props.page,
                data_page: convertToRaw(this.state.editorState.getCurrentContent())
            }
        })
            .then((res) => { console.log(res) })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleDeletePage() {
        axios({
            method: 'post',
            url: '/pages/trash/',
            data: this.props.page
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
                {console.log(this.state.editorState)}
                <div style={{ width: "95%" }}>
                    <input className="pageTitle" value={this.props.page.title} onChange={this.handleChangeTitle} />
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
                        <p style={{ color: '#ffffff' }}><span>Status:</span>{" " + this.props.page.state}</p>
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


