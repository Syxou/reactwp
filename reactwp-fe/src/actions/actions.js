import actionTypes from '../constants';
import axios from 'axios';
import Cookies from 'js-cookie'

function pagesReceived(pages) {
    return {
        type: actionTypes.PAGES_RECEIVED,
        pages: pages
    }
}



function pagesFiterby(pages, filterItem, filterBy) {
    return {
        type: actionTypes.PAGES_FILTER_BY,
        pages: pages,
        filterBy: filterBy,
        filterItem: filterItem,
    }
}

function pageItemReceived(pageItem) {
    return {
        type: actionTypes.PAGES_ITEM_RECEIVED,
        pageItem: pageItem
    }
}

function pageItemSubmit(pageItem) {
    console.log(pageItem)
    return {
        type: actionTypes.PAGE_ITEM_SUBMIT,
        pageItem: pageItem
    }
}

function logIn(user) {
    return {
        type: actionTypes.SET_USER_TOKEN,
        user: user
    }
}

let logOut = () => ({ type: actionTypes.UNSET_USER_TOKEN })

export function fetchPages() {
    return dispatch =>
        axios({
            method: "get",
            url: '/admin/pages',
            headers: {
                "Authorization": 'Bearer ' + Cookies.get('token')
            }
        })
            .then((response) => dispatch(pagesReceived(response.data)))
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log(401)
                    return dispatch(unsetUserToken())
                }
            })
}

export function filterPages(filterItem, filterBy) {
    console.log(filterItem, filterBy)
    return dispatch =>
        axios({
            method: "get",
            url: '/admin/pages',
            headers: {
                "Authorization": 'Bearer ' + Cookies.get('token')
            }
        })
            .then((response) => dispatch(pagesFiterby(response.data, filterItem, filterBy)))
            .catch((error) => {
                if (error.response.status === 401) {
                    return dispatch(unsetUserToken())
                }
            })
}

export function fetchPageItem(id) {
    return dispatch =>
        fetch(`/pages/${id}`)
            .then((res) => res.json())
            .then((data) => dispatch(pageItemReceived(data[0])))
            .catch((e) => console.log(e))
}

export function setTitlePage(page) {
    return dispatch => dispatch(pageItemSubmit(page))
}

export function setUserToken(user) {
    console.log('setUserToken', user)
    return dispatch => dispatch(logIn(user))
}
export function unsetUserToken() {
    console.log('unsetUserToken')
    return dispatch => dispatch(logOut())
}


// /action for new user (steps)

const setAcountSteps = (acount) => {
    return {
        type: actionTypes.ADD_STEPS_ACCOUNT,
        action: acount
    }
}

export function setAcountData(acount) {
    console.log(acount)
    return dispatch => dispatch(setAcountSteps(acount))
}