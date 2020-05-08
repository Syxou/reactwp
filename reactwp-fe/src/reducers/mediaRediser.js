import actionTypes from '../constants'

let iniTialState = {
    media: [],
}

export default (state = iniTialState, action) => {

    let update = Object.assign({}, state);
    let newMedia = [];

    switch (action.type) {
        case actionTypes.GET_ALL_MEDIA:
            console.log('asdasd')
            update['media'] = action.media
            return update;

        default: return state;
    }
}