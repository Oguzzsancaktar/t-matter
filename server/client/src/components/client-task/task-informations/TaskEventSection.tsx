import { Badge } from '@/components/badge'
import { ItemContainer } from '@/components/item-container'
import {
  Column,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow
} from '@/components/layout'
import { ModalHeader, ModalBody } from '@/components/modals/types'
import { Tab } from '@/components/tab'
import { InnerWrapper } from '@/components/wrapper'
import { CustomerTaskModalNoteTab, WorkflowChecklistTab, WorkflowPlanTab } from '@/pages'
import React, { useState } from 'react'
import { ITask } from '@/models'

interface IProps {
  task: ITask['_id']
  step: number
}
const TaskEventSection: React.FC<IProps> = ({ task, step }) => {
  const [activeTab, setActiveTab] = useState('note')

  return (
    <ItemContainer>
      <Column>
        <ModalHeader>
          <InnerWrapper>
            <JustifyBetweenColumn>
              <JustifyCenterRow>
                <Tab name={'Note'} index={0} isActive={false} onClick={() => setActiveTab('note')} />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </InnerWrapper>
        </ModalHeader>

        <ModalBody>
          <InnerWrapper>
            {activeTab === 'note' ? (
              <CustomerTaskModalNoteTab task={task} step={step} />
            ) : activeTab === 'workflow-checklist' ? (
              <WorkflowChecklistTab />
            ) : (
              <WorkflowPlanTab />
            )}
          </InnerWrapper>
        </ModalBody>
      </Column>
    </ItemContainer>
  )
}

export default TaskEventSection
