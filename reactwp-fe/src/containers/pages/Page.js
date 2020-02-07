import React, { Component } from 'react';
import { connect } from 'react-redux'

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

        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = editorState => this.setState({ editorState });

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitPage = this.handleSubmitPage.bind(this);
    }




    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id)
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
            data: this.props.page
        })
            .then(res => { console.log(res) })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(props) {
        return (
            <>
                <div style={{ width: "95%" }}>
                    <input value={this.props.page.title} onChange={this.handleChangeTitle} />
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
                    <Button type="primary" icon="save" size='large' onClick={this.handleSubmitPage} />
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


