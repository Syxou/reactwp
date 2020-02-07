import React, { Component } from 'react';

import './Card.css'

class Card extends Component {

    static defaultProps = {
        bg: '#ffffff',
        padding: '30px'
    }
    render() {
        return (
            <div
                className="card"
                style={{
                    background: this.props.bg,
                    padding: this.props.padding
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Card;