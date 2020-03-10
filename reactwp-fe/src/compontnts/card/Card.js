import React, { Component } from 'react';

import './Card.css'

class Card extends Component {

    static defaultProps = {
        bg: '#ffffff',
        padding: '30px',
        margin: '10px 0',
        width: 'inherit'
    }
    render() {
        return (
            <div
                className="card"
                style={{
                    background: this.props.bg,
                    padding: this.props.padding,
                    margin: this.props.margin,
                    width: this.props.width
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Card;