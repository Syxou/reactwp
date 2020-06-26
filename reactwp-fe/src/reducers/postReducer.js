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
        case actionTypes.SET_NEW_POST_TYPE:
            const last = state.types[state.types.length - 1]
            let newTypes = [].concat(state.types)
            newTypes.push({ id: last.id + 1, type: 'new_type', icon: 'align-left', new: true })
            update['types'] = newTypes
            return update;
        case actionTypes.SET_POST_BY_TYPE:
            update['posts'] = action.posts
            return update;

        default: return state;
    }
}