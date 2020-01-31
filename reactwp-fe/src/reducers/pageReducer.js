import actionTypes from '../constants'

var initialState = {
    pages: [],
    pageItem: {}
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)

    switch (action.type) {

        case actionTypes.PAGES_RECEIVED:
            updated['pages'] = action.pages
            return updated

        case actionTypes.PAGES_ITEM_RECEIVED:
            updated['pageItem'] = action.pageItem
            return updated

        default:
            return state
    }
}