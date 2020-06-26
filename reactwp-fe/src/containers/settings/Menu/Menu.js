import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { getCurrentMenu } from '../../../actions/actionMenu'
import MenuAddNew from './MenuAddNew'
import MenuItem from './MenuItem'
// import Card from '../../../compontnts/card/Card'
import Sidebare from '../../../compontnts/sidebar/Sidebar'

//! remowe key={i} this "i" from map function
function Menu({ menu, getMenu }) {
    const [handleNew, setHandleNew] = useState(false)
    const [cards, setCards] = useState(menu)

    useEffect(() => {
        getMenu()
    }, [getMenu])


    return (
        <Wrap>
            <div>
                <DndProvider backend={HTML5Backend}>
                    {menu.map((m, i) => (
                        <MenuItem key={i} item={m} />
                    ))}
                </DndProvider>
            </div>
            <div>
                <Sidebare>
                    <FormAdd>
                        <Button type="primary" onClick={() => setHandleNew(true)} >New</Button>
                    </FormAdd>
                </Sidebare>
                {handleNew && <MenuAddNew FormAdd={FormAdd} />}
            </div>
        </Wrap>
    )
}

const FormAdd = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 15px;
    text-align: center;
    input, button{
        margin: 5px 0;
    }
`

const Wrap = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: minmax(300px, 1fr) minmax(150px, 300px);   
    
`

const mapDistatchToProps = dispatch => {
    return {
        getMenu: () => dispatch(getCurrentMenu()),
        // setItem:() => dispatch(addItemCurrentMenu()),
    }
}
const mapStateToProps = (state) => ({ menu: state.menu.current })

export default connect(mapStateToProps, mapDistatchToProps)(Menu)