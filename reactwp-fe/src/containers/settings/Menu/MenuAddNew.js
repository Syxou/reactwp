import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'antd'

import { addItemCurrentMenu } from '../../../actions/actionMenu'
import Sidebare from '../../../components/sidebar/Sidebar'

function MenuAddNew({ FormAdd, setItem }, props) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [itemClass, setItemClass] = useState('')

    return (
        <Sidebare >
            <FormAdd>
                <h4>Add new Item to menu</h4>
                <Input
                    placeholder={"Name"}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder={"Link"}
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />
                <Input
                    placeholder={"Class"}
                    value={itemClass}
                    onChange={e => setItemClass(e.target.value)}
                />
                <Button onClick={() => setItem({ name, link, class: itemClass })}>Add</Button>
                <Button
                    type="dashed"
                    style={{ borderColor: 'tomato' }}
                >
                    Сancel
                 </Button>
            </FormAdd>
        </Sidebare>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        setItem: (item) => dispatch(addItemCurrentMenu(item))
    }
}
export default connect(null, mapDispatchToProps)(MenuAddNew)
