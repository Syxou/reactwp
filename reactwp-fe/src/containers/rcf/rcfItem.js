import React, { Component } from 'react';

class rcfItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { item } = this.props
        return (
            <div>
                <h5>{item.name}</h5>

            </div>
        );
    }
}

export default rcfItem;