import actionTypes from '../constants'
// import axios from 'axios'
// import Cookies from 'js-cookie'

export function addMenuItem(item, idMenu) {
    return (
        console.log("add Menu item", item, idMenu)
    )
}

export function getCurrentMenu() {
    //!axios to get menu
    return dispatch => dispatch({
        type: actionTypes.GET_CURRENT_MENU,
        menu: [
            { id: 1, name: "Home", slug: "home", link: "/", class: "", type: "custom" },
            { id: 2, name: "Projects", slug: "projects", link: "/#projects", class: "", type: "id" }
        ],
    })
}

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