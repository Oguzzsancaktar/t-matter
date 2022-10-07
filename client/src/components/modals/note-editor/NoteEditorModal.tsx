import React from 'react'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import { ModalHeader, ModalBody } from '../types'
import colors from '@/constants/colors'
import { NoteEditor } from '@/components/note-editor'

interface IProps {
  headerText: string
}
const NoteEditorModal: React.FC<IProps> = ({ headerText }) => {
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
        <NoteEditor />
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default NoteEditorModal
