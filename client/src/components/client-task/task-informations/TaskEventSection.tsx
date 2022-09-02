import { ItemContainer } from '@/components/item-container'
import { Column, Row } from '@/components/layout'
import { ModalBody } from '@/components/modals/types'
import { Tab } from '@/components/tab'
import { CustomerTaskModalNoteTab } from '@/pages'
import React, { useState } from 'react'
import { ICustomerTask, ITask } from '@/models'

interface IProps {
  task: ITask['_id']
  activeStepNumber: number
  taskData: ICustomerTask
}
const TaskEventSection: React.FC<IProps> = ({ task, activeStepNumber, taskData }) => {
  const [activeTab, setActiveTab] = useState('note')

  console.log()

  return (
    <ItemContainer>
      <Column>
        <ItemContainer padding="1rem">
          <Row>
            {taskData.steps[activeStepNumber].tabs.map(tab => (
              <ItemContainer margin="1rem">
                <Tab
                  name={tab.charAt(0).toUpperCase() + tab.slice(1)}
                  index={0}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              </ItemContainer>
            ))}
            <Tab name={'Note'} index={0} isActive={activeTab === 'note'} onClick={() => setActiveTab('note')} />
          </Row>
        </ItemContainer>

        <ModalBody>
          <ItemContainer>
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
