import axios from 'axios'
import Cookies from 'js-cookie'

import actionTypes from '../constants'

export function addMenuItem(item, idMenu) {
    return (
        console.log("add Menu item", item, idMenu)
    )
}

export function getCurrentMenu(type = 'Primary_Menu') {
    console.log(type)
    return (dispatch => axios({
        method: 'get',
        url: `/admin/api/menu/?type=${type}`,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('token'),
        }
    }).then(res => dispatch({
        type: actionTypes.GET_CURRENT_MENU,
        menu: res.data,
    })).catch(error => {
        if (error.response && error.response.status === 401) {
            console.log(401)
            // return dispatch(unsetUserToken())
        }
    }))
}

export const getAllTypesMenu = () =>
    dispatch => axios({
        method: 'get',
        url: `/admin/api/menu/types`,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('token'),
        }
    }).then(res => dispatch({
        type: actionTypes.GET_ALL_MENU_TYPES,
        types: res.data
    }))

export function reorderCurrentMenu(list, startIndex, endIndex) {
    return dispatch => dispatch({
        type: actionTypes.REORDER_CURRENT_MENU,
        list: list,
        startIndex: startIndex,
        endIndex: endIndex
    })
}

export function addItemCurrentMenu(item) {
    //!axios to get menu
    return dispatch => dispatch({
        type: actionTypes.ADD_ITEM_TO_MENU,
        item: item
    })
}