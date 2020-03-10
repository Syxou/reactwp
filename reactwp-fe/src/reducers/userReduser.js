import actionTypes from '../constants'
import Cookies from 'js-cookie'
import Password from 'antd/lib/input/Password'

var initialState = {
    user: {},
    newUser: {
        username: '',
        password: '',
        email: '',
    },
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)
    switch (action.type) {
        case actionTypes.SET_USER_TOKEN:
            updated['user'] = action.user.user
            Cookies.set('token', action.user.token)
            return updated
        case actionTypes.UNSET_USER_TOKEN:
            updated['user'] = {}
            Cookies.remove('token')
            return updated
        case actionTypes.ADD_STEPS_ACCOUNT:
            updated['newUser'] = action.account
        default:
            return state
    }
}