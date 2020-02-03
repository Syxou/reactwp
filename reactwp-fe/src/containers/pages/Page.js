import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Editor, EditorState, RichUtils } from 'draft-js';
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
        this.handleKeyCommand = this.handleKeyCommand.bind(this);

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitPage = this.handleSubmitPage.bind(this);
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
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
                <div>
                    <input value={this.props.page.title} onChange={this.handleChangeTitle} />
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                    />
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


