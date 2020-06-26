import actionTypes from '../constants'
// import axios from 'axios'
// import Cookies from 'js-cookie'

export function addMenuItem(item, idMenu) {
    return (
        console.log("add Meni item", item, idMenu)
    )
}

export function getCurrentMenu() {
    //!axios to get menu
    return dispatch => dispatch({
        type: actionTypes.GET_CURRENT_MENU,
        menu: [
            { name: "Home", slug: "home", link: "/", class: "", type: "custom" },
            { name: "Projects", slug: "projects", link: "/#projects", class: "", type: "id" }
        ],
    })
}

export function addItemCurrentMenu(item) {
    //!axios to get menu
    return dispatch => dispatch({
        type: actionTypes.ADD_ITEM_TO_MENU,
        item: item
    })
}