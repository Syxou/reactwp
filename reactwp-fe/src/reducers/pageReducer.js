import actionTypes from '../constants'

var initialState = {
    pages: [],
    pageItem: {}
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)

    switch (action.type) {
        case actionTypes.PAGES_RECEIVED:
            console.log('PAGES_RECEIVED')
            updated['pages'] = action.pages
            return updated

        case actionTypes.PAGES_FILTER_BY:
            console.log('PAGES_FILTER_BY')
            updated['pages'] = action.pages.filter(p => p[action.filterItem] === action.filterBy)
            return updated

        case actionTypes.PAGES_ITEM_RECEIVED:
            updated['pageItem'] = action.pageItem
            return updated

        case actionTypes.PAGE_ITEM_SUBMIT:
            console.log(action.pageItem)
            updated['pageItem'] = action.pageItem
            return updated

        default:
            return state
    }
}