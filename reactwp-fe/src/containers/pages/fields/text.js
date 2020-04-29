import React from 'react'
import Card from '../../../compontnts/card/Card'

export default function text(props) {
    return (
        <Card>
            {props.field.name}
        </Card>
    )
}
