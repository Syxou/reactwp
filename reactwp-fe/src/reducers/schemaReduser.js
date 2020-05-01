import actionTypes from '../constants'


let iniTialState = {
    fields: {},
}

export default (state = iniTialState, action) => {
    let update = Object.assign(state, {});

    switch (action.type) {
        
        default: return state;
    }
}