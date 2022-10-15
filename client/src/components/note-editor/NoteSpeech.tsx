import React, { useEffect, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { ItemContainer } from '../item-container'

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FaKeyboard } from 'react-icons/fa'
import { FcCustomerSupport } from 'react-icons/fc'
import { JustifyBetweenRow } from '../layout'
import { H1 } from '../texts'
import useInterval from '@/hooks/useInterval'
import { secondsToHourMin } from '@/utils/timeUtils'
import { ConfirmCancelButtons } from '../button'
import styled from 'styled-components'
import { speechAnimation } from '@/shared'

import SunEditorCore from 'suneditor/src/lib/core'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import RichTextEditor from './RichTextEditor'
import colors from '@/constants/colors'

interface IProps {
  onCancel: () => void
  onSubmit: (timerVal: number, noteContent: string) => void
}

const AnimatedCircle = styled.div`
  animation-name: ${speechAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

const styles = {
  'font-size': '',
  'font-family': ''
}

const NoteSpeech: React.FC<IProps> = ({ onSubmit, onCancel }) => {
  const [textContent, setTextContent] = useState('')
  const editor = useRef<SunEditorCore>()

  const [content, setContent] = useState(``)

  const [timerValue, setTimerValue] = useState(0)

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

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor
  }

  useInterval(() => {
    setTimerValue(timerValue + 1)
  }, 1000)

  useEffect(() => {
    if (transcript !== '') {
      setTextContent(transcript)
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
        <ItemContainer
          padding="0 1rem"
          height="80px"
          borderTop={'1px solid ' + colors.gray.disabled}
          borderLeft={'1px solid ' + colors.gray.disabled}
          borderRight={'1px solid ' + colors.gray.disabled}
          borderRadius="0.3rem 0.3rem 0 0"
        >
          <JustifyBetweenRow height="50px">
            {listening ? (
              <AnimatedCircle>
                <FcCustomerSupport size={40} onClick={handleStopSpeech} style={{ cursor: 'pointer' }} />
              </AnimatedCircle>
            ) : (
              <FcCustomerSupport size={40} onClick={listenContinuously} style={{ cursor: 'pointer' }} />
            )}

            <ItemContainer borderRadius="0.3rem" padding="0.2rem 0.3rem" width="120px">
              <H1 color={colors.text.primary} fontSize="1.5rem">
                {secondsToHourMin(timerValue, true)}{' '}
              </H1>
            </ItemContainer>
            <ItemContainer width="30px"></ItemContainer>
          </JustifyBetweenRow>
          <ItemContainer height="30px" borderTop={'1px solid ' + colors.gray.disabled}>
            <H1 color={colors.gray.dark} fontSize="1rem">
              {transcript}
            </H1>
          </ItemContainer>
        </ItemContainer>

        <ItemContainer height="calc(100% - 80px)">
          {/* @ts-ignore */}
          <RichTextEditor
            value={content}
            onChange={content => setContent(content)}
            showToolbar={false}
            appendContent={textContent}
          />
        </ItemContainer>
      </ItemContainer>

      <ItemContainer height="35px" margin="1rem 0 0 0 ">
        <ConfirmCancelButtons onConfirm={() => onSubmit(timerValue, content)} onCancel={onCancel} />
      </ItemContainer>
    </ItemContainer>
  )
}

export default NoteSpeech
