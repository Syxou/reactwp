import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Input } from 'antd';

import Card from '../../compontnts/card/Card'
import Sidebare from '../../compontnts/sidebar/Sidebar'
import { fetchPageItem } from '../../actions/actions'


class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitPage = this.handleSubmitPage.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id)
        this.props.dispatch(fetchPageItem(id))
        this.setState({ title: 'aaa' })
    }

    componentWillReceiveProps(){
        console.log(this.props.page.title)
    }


    handleChangeTitle(event) {

    }
    handleSubmitPage() {

    }

    render(props) {
        return (
            <>
                <div>
                    <input value={this.state.title} onChange={this.handleChangeTitle} />
                </div>
                <Sidebare>
                    <Card
                        bg='linear-gradient(180deg, #679CF6 0%, #4072EE 100%)'
                    >
                        <p style={{ color: '#ffffff' }}><span>Status:</span>{" " + this.props.page.state}</p>
                    </Card>
                    <Button type="primary" icon="save" size='large' onClick={this.hendleSavePage} />
                </Sidebare>
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps')
    return {
        page: state.pages.pageItem
    }
}

export default connect(mapStateToProps)(Page);