import React from 'react'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import { ModalHeader, ModalBody } from '../types'
import colors from '@/constants/colors'
import { NoteSpeech } from '@/components/note-editor'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'

interface IProps {
  id: string
  headerText: string
  cb: (timerVal: number, noteContent: string) => void
  size?: string
}

const NoteEditorModal: React.FC<IProps> = ({ id, headerText, size = 'large', cb }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(closeModal(id))
  }
  const handleSubmit = (timerVal: number, noteContent: string) => {
    cb(timerVal, noteContent)
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              {headerText}
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody>
        <NoteSpeech onSubmit={handleSubmit} onCancel={handleCancel} />
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default NoteEditorModal
