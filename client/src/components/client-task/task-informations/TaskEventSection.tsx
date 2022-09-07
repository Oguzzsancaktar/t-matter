import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { ModalBody } from '@/components/modals/types'
import { Tab } from '@/components/tab'
import { CustomerTaskModalNoteTab } from '@/pages'
import React, { useState } from 'react'
import { ICustomerTask, ITask } from '@/models'
import colors from '@/constants/colors'

interface IProps {
  task: ITask['_id']
  activeStepNumber: number
  taskData: ICustomerTask
}
const TaskEventSection: React.FC<IProps> = ({ task, activeStepNumber, taskData }) => {
  const [activeTab, setActiveTab] = useState('note')

  console.log()

  return (
    <ItemContainer
      backgroundColor={colors.white.primary}
      margin="0 1rem 0 0"
      width="calc(100% - 1rem)"
      height="calc(100% - 1rem)"
    >
      <Column margin="1rem 0" height="100%">
        <ItemContainer
          backgroundColor={colors.white.secondary}
          borderRadius="0.3rem"
          padding="0 1rem"
          margin="0 0 1rem 0"
          height="62px"
        >
          <JustifyBetweenRow>
            <Tab name={'Note'} index={0} isActive={activeTab === 'note'} onClick={() => setActiveTab('note')} />

            {taskData.steps[activeStepNumber].tabs.map((tab, index) => (
              <ItemContainer width="auto" padding="1rem 0">
                <Tab
                  name={tab.charAt(0).toUpperCase() + tab.slice(1)}
                  index={index}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              </ItemContainer>
            ))}
          </JustifyBetweenRow>
        </ItemContainer>

        <ModalBody backgroundColor="transparent" padding="0" height="calc(100% - 62px - 2rem)">
          <ItemContainer height="100%" borderRadius="0.3rem" backgroundColor={colors.white.secondary} padding="1rem">
            {activeTab === 'note' ? (
              <CustomerTaskModalNoteTab task={task} step={activeStepNumber} />
            ) : activeTab === 'workflow-checklist' ? (
              <>tab1</>
            ) : (
              <>tab2</>
            )}
          </ItemContainer>
        </ModalBody>
      </Column>
    </ItemContainer>
  )
}

export default TaskEventSection
