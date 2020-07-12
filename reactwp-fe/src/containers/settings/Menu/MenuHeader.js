import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd';
import { getAllTypesMenu, getCurrentMenu } from '../../../actions/actionMenu'

const { Option } = Select;

function MenuHeader({ type, id = 10, list, getListMenus, getMenu }) {

    useEffect(() => {
        getListMenus()
    }, [getListMenus])

    const handleChange = val => {
        getMenu(val)
    }

    return (
        <div style={{ display: 'flex', alignItems: "baseline" }}>
            <h1>{type}</h1>
            <Select defaultValue='Select menu' style={{ width: 120, margin: '0px 25px' }} onChange={handleChange}>
                {
                    list?.map(l => (
                        <Option key={l.id} value={l.type}>{l.type}</Option>
                    ))
                }
            </Select>
        </div>
    )
}

const mapStateToProps = (state) => ({
    type: state.menu.type,
    id: state.menu.id,
    list: state.menu.types
})

const mapDispatchToProps = dispatch => {
    return {
        getListMenus: () => dispatch(getAllTypesMenu()),
        getMenu: (type) => {
            return dispatch(getCurrentMenu(type))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader)
