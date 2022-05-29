import { ConfirmCancelButtons } from '@/components/button'
import {
  ClockPicker24,
  InputWithIcon,
  JustifyBetweenColumn,
  JustifyCenterRow,
  JustifyCenterColumn,
  Row,
  H1,
  InnerWrapper
} from '@/components'
import { ItemContainer } from '@/components/item-container'

import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { timeToSeconds } from '@/utils/timeUtils'
import React, { useState } from 'react'
import { DollarSign, MousePointer, Terminal } from 'react-feather'
import { ModalHeader, ModalBody, ModalFooter } from '../../types'

const CreateWorkflowChecklistModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [workflowChecklist, setWorkflowChecklist] = useState({
    checklistName: '',
    checklistPoint: 0,
    checklistTime: 0,
    checklistPrice: 0
  })

  const handleCancel = () => {
    dispatch(closeModal('createWorkflowChecklistModal'))
  }

  const handleConfirm = () => {
    dispatch(closeModal('createWorkflowChecklistModal'))
  }
  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create Workflow Checklist
            </H1>
          </JustifyCenterRow>
        </ModalHeader>

        <ModalBody>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <ItemContainer margin="1rem 0">
              <InputWithIcon
                children={<Terminal size={16} />}
                name="checklistName"
                placeholder="Enter workflow checklist name..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWorkflowChecklist({ ...workflowChecklist, checklistName: e.target.value })
                }
                value={workflowChecklist.checklistName}
                type="text"
                labelText="Checklist Name"
              />
            </ItemContainer>
            <ItemContainer margin="1rem 0">
              <InputWithIcon
                children={<MousePointer size={16} />}
                name="checklistPoint"
                placeholder="Enter workflow point..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWorkflowChecklist({ ...workflowChecklist, checklistPoint: +e.target.value })
                }
                value={workflowChecklist.checklistPoint}
                type="number"
                labelText="Checklist Point"
              />
            </ItemContainer>
            <ItemContainer margin="1rem 0">
              <ClockPicker24
                labelText={'Checklist Duration'}
                name={'checklistDuration'}
                onChange={(value: string) =>
                  setWorkflowChecklist({ ...workflowChecklist, checklistTime: +timeToSeconds(value) })
                }
              />
            </ItemContainer>
            <ItemContainer margin="1rem 0">
              <InputWithIcon
                children={<DollarSign size={16} />}
                disabled={true}
                name="workflowPrice"
                placeholder="0"
                value={workflowChecklist.checklistName}
                type="text"
                labelText="Checklist Price"
              />
            </ItemContainer>
          </JustifyCenterColumn>
        </ModalBody>

        <ModalFooter>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </ModalFooter>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default CreateWorkflowChecklistModal
