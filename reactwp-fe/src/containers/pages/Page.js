import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Input } from 'antd';
import axios from 'axios'
import Card from '../../compontnts/card/Card'
import Sidebare from '../../compontnts/sidebar/Sidebar'
import { fetchPageItem, setTitlePage } from '../../actions/actions'


class Page extends Component {

    constructor(props) {
        super(props);


        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitPage = this.handleSubmitPage.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id)
        this.props.dispatch(fetchPageItem(id))
    }



    handleChangeTitle(event) {
        // this.props.dispatch(setTitlePage({ ...this.props.page, title: event.target.value }))
        axios({
            method: 'post',
            url: '/pages/chenge/',
            data: '1'
        }).then(res => { console.log(res) })
    }

    handleSubmitPage() {

    }

    render(props) {
        return (
            <>
                <div>
                    <input value={this.props.page.title} onChange={this.handleChangeTitle} />
                </div>
                <Sidebare>
                    <Card
                        bg='linear-gradient(180deg, #679CF6 0%, #4072EE 100%)'
                    >
                        <p style={{ color: '#ffffff' }}><span>Status:</span>{" " + this.props.page.state}</p>
                        <p></p>
                    </Card>
                    <Button type="primary" icon="save" size='large' onClick={this.hendleSavePage} />
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