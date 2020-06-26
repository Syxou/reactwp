import React, { Component } from 'react';
import styled from 'styled-components'

import './Card.css'

class Card extends Component {

    static defaultProps = {
        bg: '#ffffff',
        padding: '30px',
        margin: '10px 0',
        width: 'inherit',
        display: 'block',
        justify: 'initial'
    }

    render() {
        return (
            <CardConponent
                className="card"
                bg={this.props.bg}
                padding={this.props.padding}
                margin={this.props.margin}
                width={this.props.width}
                display={this.props.display}
                justify={this.props.justify}
            >
                {this.props.children}
            </CardConponent>
        );
    }
}

const CardConponent = styled.div`
    background: ${props => props.bg || '#ffffff'};
    padding: ${props => props.padding || '30px'};
    margin: ${props => props.margin || '10px 0'};
    width: ${props => props.width || 'inherit'};
    display: ${props => props.display || 'block'};
    justify-content: ${props => props.justify || 'initial'};
    @media (max-width: 768px) {
    flex-direction: ${props => props.display === 'flex' ? 'column' : 'initial' };
  }
`

export default Card;