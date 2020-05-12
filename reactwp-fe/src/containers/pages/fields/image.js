import React, { useState } from 'react'
import { connect } from 'react-redux'
import Card from '../../../compontnts/card/Card'
// import { changeFieldById } from '../../../actions/pageAction'
import { fetchAllMedia } from '../../../actions/mediaAction'
import { Button, Drawer } from 'antd';
import styled from 'styled-components'

function Image({ field, setFieldById }) {

    const [visible, setVisible] = useState(false)
    // const [childrenDrawer, setChildrenDrawer] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    return (
        <div>
            <Card>
                <h4>{field.name}</h4>
                {field.data === "" &&
                    <Button onClick={showDrawer()}>Select image</Button>
                }

            </Card>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose()}
                visible={visible}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}




// const handleChangeFieldData = (field, event) => {
//     return { ...field, data: event.target.value }
// }

const mapDispatchToProps = dispatch => ({
    // setFieldById(field) {
    //     return dispatch(changeFieldById(field))
    // },
    getMedia() {
        return dispatch(fetchAllMedia())
    }
});

export default connect(null, mapDispatchToProps)(Image);


