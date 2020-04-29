import React, { Component } from 'react'
import Wyswyg from './wyswyg';
import Text from './text';

export default class Fields extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    distributor = (field) => {
        switch (field.type) {
            case "wyswyg":
                return <Wyswyg
                    key={field.id}
                    field={field}
                />
            case "text":
                return <Text
                    key={field.id}
                    field={field}
                />
                break;
        }
    }


    render() {
        const { fields } = this.props;
        // console.log("fields", fields)
        return (
            <div>
                {fields.map(field => this.distributor(field))}
            </div>
        )
    }
}
