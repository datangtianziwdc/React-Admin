import React, { useState,useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import draftjsToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
export default function NewsEditer(props) {
  const { getContent } = props
  const [editorState, setEditorState] = useState('')

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={(state) => setEditorState(state)}
      onBlur={() => {
        getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      }}
    />
  )
}
