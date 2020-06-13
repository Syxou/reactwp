import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd';
import styled from 'styled-components'

import Card from '../../../compontnts/card/Card'
import ImageDrawer from './imageDrawer'
import { changeFieldById } from '../../../actions/pageAction'


function Image({ field, setFieldById }) {

    const [visible, setVisible] = useState(false)
    const [url, setUrl] = useState(field.data || '')

    const showDrawer = () => {
        setVisible(true)
    };

    return (
        <div>
            <Card>
                <h4>{field.name}</h4>
                {url !== ''
                    ? <>
                        <Img src={url} alt="" />
                        <Button type="dashed"
                            onClick={() => {
                                setFieldById({ ...field, data: '' })
                                setUrl('')
                            }}
                            style={{
                                position: 'absolute',
                                marginLeft: '-19px',
                                marginTop: "-1px",
                                padding: '0',
                                minWidth: '20px',
                                width: '20px',
                                height: '20px',
                                fontSize: '10px',
                            }}
                            shape="circle"
                            icon="close" />
                    </>
                    : <Button onClick={() => showDrawer()}>Select image</Button>
                }
            </Card>
            {visible && <ImageDrawer
                visible={visible}
                closeCallblack={() => setVisible(false)}
                urlCallback={(url => {
                    setUrl(url)
                    setFieldById({ ...field, data: url })
                })} />}
        </div>
    )
}

const Img = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 7px;
    box-shadow: 0px 10px 20px rgba(31,32,65,0.1);
`;

const mapDispatchToProps = dispatch => ({
    setFieldById(field) {
        return dispatch(changeFieldById(field))
    }
});

export default connect(null, mapDispatchToProps)(Image);
