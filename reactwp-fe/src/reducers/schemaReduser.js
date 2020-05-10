import actionTypes from '../constants'

let iniTialState = {
    fields: [],
    schemaData: {},
    selectPages: [],
    selectedPage: []
}

export default (state = iniTialState, action) => {

    let update = Object.assign({}, state);
    let newFields = [];

    switch (action.type) {
        case actionTypes.GET_SCHEMA_BY_ID:
            update['fields'] = action.fields;
            update['schemaData'] = action.schemaData;
            update['selectPages'] = action.selectPages;
            update['selectedPage'] = action.selectedPage;
            return update;

        case actionTypes.SET_NEW_FIELDS_TO_SCHEMA:
            const last = state.fields[state.fields.length - 1]
            let newId
            last ? newId = last.id + 1 : newId = 1;
            update['fields'] = [...state.fields, { id: newId, type: "", name: "New Field", slug: "" }]
            return update;

        case actionTypes.EDIT_SCHEMA_FIELD:
            if (state.fields.length > 1) {
                state.fields.forEach(field => {
                    if (field.id === action.field.id)
                        newFields.push(action.field)
                    else
                        newFields.push(field)
                })
            } else
                newFields.push(action.field)
            update['fields'] = newFields;
            return update;

        default: return state;
    }
}