import actionTypes from '../constants'

const initialState = {
    current: []
}

export default (state = initialState, action) => {
    const update = Object.assign({}, state)

    switch (action.type) {

        case actionTypes.GET_CURRENT_MENU:
            update['current'] = action.menu
            return update

        case actionTypes.ADD_ITEM_TO_MENU:
            const newId = state.current[state.current.length - 1].id + 1;
            console.log(newId)
            let updatedCurrentMenu =
                state.current.concat({ id: newId, ...action.item })
            update['current'] = updatedCurrentMenu
            return update

        case actionTypes.REORDER_CURRENT_MENU:
            const result = Array.from(action.list);
            const [removed] = result.splice(action.startIndex, 1);
            result.splice(action.endIndex, 0, removed);
            update['current'] = result
            return update

        default: return state
    }
}