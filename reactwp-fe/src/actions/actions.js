import actionTypes from '../constants';
import axios from 'axios';


function pagesReceived(pages) {
    return {
        type: actionTypes.PAGES_RECEIVED,
        pages: pages
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

export function fetchPages(pages) {
    return dispatch =>
        fetch(`/pages`)
            .then((response) => response.json())
            .then((data) => dispatch(pagesReceived(data)))
            .catch((e) => console.log(e))
}

export function fetchPageItem(id) {
    return dispatch =>
        fetch(`/pages/${id}`)
            .then((res) => res.json())
            .then((data) => dispatch(pageItemReceived(data[0])))
            .catch((e) => console.log(e))
}

export function setTitlePage(page) {
    console.log('aaa', page)
    return dispatch => dispatch(pageItemSubmit(page))
}