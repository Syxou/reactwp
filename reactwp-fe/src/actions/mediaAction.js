import actionTypes from '../constants';
import axios from 'axios';
import Cookies from 'js-cookie'
import { unsetUserToken } from './actions'

export function fetchAllMedia() {

    return (
        dispatch => axios({
            method: 'get',
            url: `/admin/api/media/all`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => dispatch({
                type: actionTypes.GET_ALL_MEDIA,
                media: res.data,
            }))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.log(401)
                    return dispatch(unsetUserToken())
                }
            })
    )
}