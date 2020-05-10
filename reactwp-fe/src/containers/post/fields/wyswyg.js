import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { changeFieldById } from '../../../actions/pageAction'
import Card from '../../../compontnts/card/Card'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Wyswyg({ field, setFieldById }) {

    const [editorState, setEditorState] = useState(
        () => {
            if (field.data === "")
                return EditorState.createEmpty()
            else
                return EditorState.createWithContent(
                    convertFromRaw(JSON.parse(field.data))
                )
        }
    );

    return (
        <Card>
            <h4>{field.name}</h4>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="editer-content"
                onEditorStateChange={setEditorState}
                onChange={() => setFieldById({
                    ...field,
                    data: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
                })}
            />
        </Card>
    )
}

const mapDispatchToProps = dispatch => ({
    setFieldById(field) {
        return dispatch(changeFieldById(field))
    }
})

export default connect(null, mapDispatchToProps)(Wyswyg);
