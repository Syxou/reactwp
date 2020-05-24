import actionTypes from '../constants';
import axios from 'axios';
import Cookies from 'js-cookie'
import { unsetUserToken } from './actions'

export function fetchOnePageById(id) {

    return (
        dispatch => axios({
            method: 'get',
            url: `/admin/api/post/${id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => dispatch({
                type: actionTypes.PAGE_RECEIVED,
                page: res.data,
            }))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.log(401)
                    return dispatch(unsetUserToken())
                }
            })
    )
}

export function changePageTitle(title) {
    return dispatch => dispatch({
        type: actionTypes.PAGE_SET_TITLE,
        title: title,
    })
}

export function changeFieldById(field) {
    return {
        type: actionTypes.PAGE_SET_FIELD_BY_ID,
        field: field,
    }
}
