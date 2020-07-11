import React from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd';

const { Option } = Select;

function MenuHeader({ name, id = 10, list }) {

    const handleChange = val => {
        console.log(val)
    }

    return (
        <div style={{ display: 'flex', alignItems: "baseline" }}>
            <h1>{name}</h1>
            <Select defaultValue='Select menu' style={{ width: 120, margin: '0px 25px' }} onChange={handleChange}>
                {
                    list?.map(l => (
                        <Option key={l.id} value={l.id}>{l.name}</Option>
                    ))
                }
            </Select>
        </div>
    )
}

const mapStateToProps = (state) => ({
    name: state.menu.name,
    id: state.menu.id,
    list: [
        { id: 18, name: 'menu' },
        { id: 20, name: 'menu2' },
        { id: 21, name: 'menu3' },
    ]
})

const mapDispatchToProps = dispatch => {
    // getListMenus: () => (dispatch =>)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader)
