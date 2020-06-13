import actionTypes from '../constants';
import axios from 'axios';
import Cookies from 'js-cookie'

export function getSchemaById(id) {
    return (
        dispatch => axios({
            method: "get",
            url: `/admin/api/fields/schema/${id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        })
            .then(res => {
                const { data } = res;
                let newSelectedPage = []
                data.pages.forEach(page => {
                    newSelectedPage.push(page.slug)
                })
                return dispatch({
                    type: actionTypes.GET_SCHEMA_BY_ID,
                    fields: data.fields,
                    schemaData: {
                        id: data.id,
                        type: data.type,
                        name: data.name,
                        slug: data.slug,
                    },
                    selectPages: data.pages,
                    selectedPage: newSelectedPage
                })
                // this.setState({ fields: data.fields, type: data.type, name: data.name, slug: data.slug, id: data.id, selectPages: data.pages, selectedPage: newSelectedPage })
            })
            .catch(err => console.log(err))
    )
}

export function setNewField() {
    return (
        dispatch => dispatch({
            type: actionTypes.SET_NEW_FIELDS_TO_SCHEMA
        })
    )
}

export function editFieldById(field) {
    console.log(field)
    return (
        dispatch => dispatch({
            type: actionTypes.EDIT_SCHEMA_FIELD,
            field: field
        })
    )
}
