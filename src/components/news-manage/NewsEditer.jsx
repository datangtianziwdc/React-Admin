import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw, EditorState, ContentState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
export default function NewsEditer(props) {
  const { getContent, content } = props
  const [editorState, setEditorState] = useState('')
  useEffect(() => {
    const html = content
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
    // htmlToDraft
  }, [content])
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
