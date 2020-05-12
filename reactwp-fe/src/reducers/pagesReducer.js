import constants from '../constants'

var initialState = {
    pages: []
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)

    switch (action.type) {

        case constants.PAGES_RECEIVED:
            updated['pages'] = action.pages
            return updated

        default:
            return state
    }
}