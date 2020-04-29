import React, { useState } from 'react'
import { connect } from 'react-redux'

import { changeFieldById } from '../../../actions/pageAction'
import Card from '../../../compontnts/card/Card'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


function Wyswyg({ field, setFieldById }) {
    const [editorState, setEditorState] = useState(EditorState.
        createWithContent(convertFromRaw(JSON.parse(field.data))));
    const [edited, setEdited] = useState(false)

    // const onSaveEditorState = () => {
    //     const field = props.field
    //     this.props.dispatch()
    // }
    // const { field } = props;

    return (
        <Card>
            {field.name}
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="editer-content"
                onEditorStateChange={setEditorState}
                onChange={setFieldById(field.id, { field, data: editorState })}
            />
            {edited ? 'save' : ""}
        </Card>
    )
}

const mapDispatchToProps = dispatch => ({
    setFieldById(id, field) {
        return () => {
            dispatch(changeFieldById(id, field))
        }
    }
})

export default connect(null, mapDispatchToProps)(Wyswyg);

