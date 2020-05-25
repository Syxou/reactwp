import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import styled from 'styled-components'

import { getAllPostType, setNewPostType } from '../../actions/postAction'
import CustomPostItem from './CustomPostItem'

function CustomPost({ typesProp, setNewTypes, getPostTypes }) {

    const [types, setTypes] = useState(typesProp)

    useEffect(() => {
        setTypes(typesProp)
    }, [typesProp])

    const updateTypesCallback = () => {
        getPostTypes()
    }

    return (
        <>
            {types.map(type => (
                <CustomPostItem key={type.id} update={updateTypesCallback} type={type} />
            ))}
            <Center>
                <Button shape="circle" icon="plus" onClick={() => setNewTypes()} />
            </Center>
        </>
    )
}

const Center = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: center;
`

const mapStateToProps = state => {
    return {
        typesProp: state.posts.types
    }
}

const mapDispatchToProps = dispatch => ({
    getPostTypes() {
        return dispatch(getAllPostType())
    },
    setNewTypes() {
        return dispatch(setNewPostType())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomPost);
