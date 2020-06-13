import React, { Component } from 'react'
import Wyswyg from './wyswyg';
import Text from './text';


export default class Fields extends Component {



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
            // case "image":
            //     return <Image
            //         key={field.id}
            //         field={field}
            //     />
            default: return null
        }
    }
    render() {
        const { fields } = this.props;
        console.log("fields")
        return (
            <div>
                {fields.length > 1 ?
                    fields.map(field => this.distributor(field))
                    : this.distributor(fields)}
            </div>
        )
    }
}
