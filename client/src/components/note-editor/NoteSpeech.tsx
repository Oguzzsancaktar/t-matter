import React, { useEffect, useMemo, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import EditorColorPic from './EditorColorPic'

import { emptyQueryParams } from '@/constants/queryParams'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'
import { ItemContainer } from '../item-container'

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FaMicrophone, FaMicrophoneSlash, FaPause, FaRecordVinyl } from 'react-icons/fa'
import { Pause, Voicemail } from 'react-feather'
import { FcVoicePresentation } from 'react-icons/fc'
import { JustifyBetweenRow } from '../layout'
import { H1 } from '../texts'
import useInterval from '@/hooks/useInterval'
import { secondsToHourMin } from '@/utils/timeUtils'
import { ConfirmCancelButtons } from '../button'

interface IProps {
  onCancel: () => void
  onSubmit: (timerVal: number, noteContent: string) => void
}

const NoteSpeech: React.FC<IProps> = ({ onSubmit, onCancel }) => {
  const [timerValue, setTimerValue] = useState(0)
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)
  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery(searchQueryParams)

  const [contentBlock, setContentBlock] = useState(htmlToDraft(''))
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

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB'
    })
  }

  const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition({})

  const handleStopSpeech = e => {
    e.preventDefault()
    SpeechRecognition.stopListening()
    resetTranscript()
  }

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state)
  }

  useInterval(() => {
    setTimerValue(timerValue + 1)
  }, 1000)

  useEffect(() => {
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const tempEditorState = EditorState.createWithContent(contentState)

      setEditorState(tempEditorState)
    }
  }, [contentBlock])

  useEffect(() => {
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    // .slice(3)
    // .replace('</p>', '')
    // .replace('\n', ' ')

    if (transcript !== '') {
      setContentBlock(htmlToDraft(text + finalTranscript))
    }

    if (finalTranscript !== '') {
      resetTranscript()
    }
  }, [finalTranscript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?')
  }

  return (
    <ItemContainer height="100%">
      <ItemContainer height="calc(100% - 1rem - 35px)">
        <Editor
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
          placeholder="Enter your text..."
          readOnly={listening}
          toolbarCustomButtons={[
            listening ? (
              <FaMicrophoneSlash size={40} onClick={handleStopSpeech} />
            ) : (
              <FaMicrophone size={40} onClick={listenContinuously} />
            ),
            <ItemContainer width="auto">{secondsToHourMin(timerValue, true)}</ItemContainer>
          ]}
        />
      </ItemContainer>

      <ItemContainer height="35px" margin="1rem 0 0 0 ">
        <ConfirmCancelButtons
          onConfirm={() => onSubmit(timerValue, draftToHtml(convertToRaw(editorState.getCurrentContent())))}
          onCancel={onCancel}
        />
      </ItemContainer>
    </ItemContainer>
  )
}

export default NoteSpeech
