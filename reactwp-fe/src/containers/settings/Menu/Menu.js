import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { getCurrentMenu, reorderCurrentMenu, getCurrentMenuName } from '../../../actions/actionMenu'
import MenuAddNew from './MenuAddNew'
import MenuItem from './MenuItem'
import MenuHeader from './MenuHeader'
import Sidebar from '../../../components/sidebar/Sidebar'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 0,
    margin: " 15px 0",
    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",
    boxShadow: isDragging && '0px 10px 26px rgba(31,32,65,0.1)',
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = () => ({
    width: 'min-content'
});

function Menu({ menu, name, getMenu, reorder }) {
    const [handleNew, setHandleNew] = useState(false)


    useEffect(() => {
        getMenu()
    }, [getMenu])

    const saveMenu = () => {
        return null;
    }

    const onDragEnd = (result) => {

        if (!result.destination)
            return;

        return reorder(
            menu,
            result.source.index,
            result.destination.index
        );
    }

    return (
        <Wrap>
            <div>
                <MenuHeader name={name} />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {menu.map((item, index) => (
                                    <Draggable key={"item-" + item.id} draggableId={"item-" + item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <MenuItem item={item} />
                                            </div>
                                        )}
                                    </Draggable>

                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div>
                <Sidebar>
                    <FormAdd>
                        <Button type="primary" onClick={() => saveMenu()} >Save menu</Button>
                        <Button type="primary" onClick={() => setHandleNew(true)} >New</Button>
                    </FormAdd>
                </Sidebar>
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

const mapDispatchToProps = dispatch => {
    return {
        getMenu: () => dispatch(getCurrentMenu()),
        reorder: (list, startIndex, endIndex) => dispatch(reorderCurrentMenu(list, startIndex, endIndex))
        // setItem:() => dispatch(addItemCurrentMenu()),

    }
}
const mapStateToProps = (state) => ({ menu: state.menu.current, name: state.menu.name })

export default connect(mapStateToProps, mapDispatchToProps)(Menu)