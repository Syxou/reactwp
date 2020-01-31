import React, { Component } from 'react';
import { connect } from 'react-redux'
import Listing from '../../compontnts/listing/Listing'

import { fetchPages } from '../../actions/actions'

import './Pages.css';

class Pages extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPages());
    }

    render() {
        const pageItems = this.props.pages.map((page, i) => {
            return (<Listing key={i} data={page} />);
        });
        return (
            <div>
                <h2>Pages</h2>
                <div className="cardList">
                    {this.props.pages ? pageItems : 'pageItems'}
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        pages: state.pages.pages
    }
}

export default connect(mapStateToProps)(Pages);