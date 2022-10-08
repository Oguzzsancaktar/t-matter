import React, { useEffect, useMemo, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import EditorColorPic from './EditorColorPic'

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { toastWarning } from '@/utils/toastUtil'
import { emptyQueryParams } from '@/constants/queryParams'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'
import { ItemContainer } from '../item-container'

const NoteEditor = () => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)
  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery(searchQueryParams)

  const [contentBlock, setContentBlock] = useState(htmlToDraft('<p>Hey this <strong>editor</strong> rocks 😀</p>'))
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const mentionSuggestUsers = useMemo(
    () =>
      usersData?.map(user => ({
        text: user.firstname + '_' + user.lastname,
        value: user.firstname + '_' + user.lastname,
        url: user._id
      })),
    [usersData]
  )

  const speechCommands = [
    {
      command: 'reset',
      callback: () => resetTranscript()
    }
  ]

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB'
    })
  }

  const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition({
    speechCommands
  })

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state)
  }

  const handleFocus = () => {
    if (listening) {
      toastWarning('You cant change text when recording on')
    }
  }

  useEffect(() => {
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const tempEditorState = EditorState.createWithContent(contentState)

      setEditorState(tempEditorState)
    }
  }, [contentBlock])

  useEffect(() => {
    if (transcript !== '') {
      setContentBlock(htmlToDraft(transcript))
    }
  }, [transcript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?')
  }

  return (
    <ItemContainer height="100%">
      <div>
        <span>listening: {listening ? 'on' : 'off'}</span>
        <div>
          <button type="button" onClick={resetTranscript}>
            Reset
          </button>
          <button type="button" onClick={listenContinuously}>
            Listen
          </button>
          <button type="button" onClick={SpeechRecognition.stopListening}>
            Stop
          </button>
        </div>
      </div>
      <div>
        <span>{transcript}</span>
      </div>

      <Editor
        onFocus={handleFocus}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="note-editor-wrapper"
        editorClassName="note-editor"
        toolbar={{
          colorPicker: { component: EditorColorPic }
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: mentionSuggestUsers
        }}
        hashtag={{}}
      />

      {/* <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
    </ItemContainer>
  )
}

export default NoteEditor
