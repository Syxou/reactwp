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
                <div>{this.props.data.title}</div>
                <div><Link to={`/admin/page/${this.props.data.id}`}>Edit</Link></div>
            </div>
        );
    }
}
export default Listing;