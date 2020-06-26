import actioonTypes from '../constants'

const initialState = {
    current: []
}

export default (state = initialState, action) => {
    const update = Object.assign({}, state)

    switch (action.type) {

        case actioonTypes.GET_CURRENT_MENU:
            update['current'] = action.menu
            return update

        case actioonTypes.ADD_ITEM_TO_MENU:
            let updatedCurrentMenu =
                state.current.concat(action.item)
            update['current'] = updatedCurrentMenu
            return update
            
        default: return state
    }
}