import actionTypes from '../constants'

let iniTialState = {
    types: [],
    posts: []
}

export default (state = iniTialState, action) => {

    let update = Object.assign({}, state);

    switch (action.type) {
        case actionTypes.SET_POST_TYPE:
            update['types'] = action.postsTypes
            return update;
        case actionTypes.SET_POST_BY_TYPE:
            update['posts'] = action.posts
            return update;

        default: return state;
    }
}