import actionTypes from '../constants'

var initialState = {
    pages: [],
    pageItem: {},
    page: {
        fields: [],
        post: {}
    },
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state)

    switch (action.type) {
        case actionTypes.PAGES_RECEIVED:
            console.log('PAGES_RECEIVED')
            updated['pages'] = action.pages
            return updated

        case actionTypes.PAGE_RECEIVED:
            console.log('PAGE_RECEIVED', action.page)
            updated['page'] = action.page
            return updated;

        case actionTypes.PAGE_SET_TITLE:
            const post = { ...state.page.post, title: action.title }
            const page = { ...state.page, post: post }
            updated['page'] = page;
            return updated

        case actionTypes.PAGE_SET_FIELD_BY_ID:
            let newFields = [];
            state.page.fields.length > 1 ?
                state.page.fields.map((field) => {
                    if (field.id === action.field.id) {
                        newFields.push(action.field)
                    } else {
                        newFields.push(field)
                    }
                })
                : newFields = action.field
            const page_set_field = { ...state.page, fields: newFields }
            updated['page'] = page_set_field;
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