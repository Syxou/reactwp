import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Listing.css'
// import {PropTypes } from 'prop-types'
/**
 * TODO link /page/ add from props
 */

class Listing extends Component {
    render() {
        return (
            <div>
                <div>{this.props.data.title} <span style={{color: 'gray', fontSize: '12px'}}>{this.props.data.state}</span></div>
                <div><Link to={`/admin/page/${this.props.data.id}`}>Edit</Link></div>
            </div>
        );
    }
}
export default Listing;