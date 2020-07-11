import React from 'react'
import { connect } from 'react-redux'
import Card from '../../../components/card/Card'
import { changeFieldById } from '../../../actions/pageAction'
import { Input } from 'antd';

function text({ field, setFieldById }) {
    return (
        <Card>
            <h4>{field.name}</h4>
            <Input value={field.data} onChange={(e) => setFieldById({ ...field, data: e.target.value })} />
        </Card>
    )
}

// const handleChangeFieldData = (field, event) => {
//     return { ...field, data: event.target.value }
// }

const mapDispatchToProps = dispatch => ({
    setFieldById(field) {
        return dispatch(changeFieldById(field))
    }
});

export default connect(null, mapDispatchToProps)(text);


