import React from 'react'
import Card from '../../compontnts/card/Card'
import { Input } from 'antd';

const { TextArea } = Input;

export default function GlobalSettings() {

    return (
        <Card>
            Site url: <Input />
            Home url: <Input />
            Admin home url: <Input />
            Site Name: <Input />
            Site description: <TextArea />
        </Card>
    )
}
