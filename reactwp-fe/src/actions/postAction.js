import actionTypes from '../constants';
import axios from 'axios';
import Cookies from 'js-cookie'
import { unsetUserToken } from './actions'

export function getAllPostType() {
    console.log("getAllPostType")
    return dispatch => {
        axios({
            method: "get",
            url: '/admin/api/post/type/all',
            headers: {
                "Authorization": 'Bearer ' + Cookies.get('token')
            }
        })
            .then((res) => dispatch({
                type: actionTypes.SET_POST_TYPE,
                postsTypes: res.data
            }))
    }
}

export function getPostByType(type) {
    return dispatch =>
        axios({
            method: "get",
            url: `/admin/api/post?type=${type}`,
            headers: {
                "Authorization": 'Bearer ' + Cookies.get('token')
            }
        })
            .then((res) => dispatch({
                type: actionTypes.SET_POST_BY_TYPE,
                posts: res.data
            }))
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log(401)
                    return dispatch(unsetUserToken())
                }
            })
}
