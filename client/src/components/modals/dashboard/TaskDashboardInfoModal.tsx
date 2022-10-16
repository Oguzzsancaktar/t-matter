import { Column, ItemContainer, JustifyBetweenColumn, JustifyCenterRow, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@components/modals/types'
import React, { useState } from 'react'
import NewTasksTab from '@pages/dashboard/task-dashboard-card/NewTasksTab'
import CompletedTasksTab from '@pages/dashboard/task-dashboard-card/CompletedTasksTab'
import CancelledTasksTab from '@pages/dashboard/task-dashboard-card/CancelledTasksTab'
import TransferTasksTab from '@pages/dashboard/task-dashboard-card/TransferTasksTab'
import ConditionTasksTab from '@pages/dashboard/task-dashboard-card/ConditionTasksTab'

const Component = {
  ConditionTasksTab,
  NewTasksTab,
  CompletedTasksTab,
  CancelledTasksTab,
  TransferTasksTab
}

const TaskDashboardInfoModal: React.FC<{ page: string; dateRange?: { startDate: Date; endDate: Date } }> = ({
  page,
  dateRange
}) => {
  const [activeTab, setActiveTab] = useState(page)

  return (
    <ItemContainer height="100%" minHeight="700px" overflow="hidden">
      <Column height="100%">
        <ModalHeader>
          <ItemContainer>
            <JustifyBetweenColumn>
              <JustifyCenterRow>
                <Tab
                  margin="0 1rem 0 0rem"
                  index={0}
                  name="Condition"
                  isActive={activeTab === 'ConditionTasksTab'}
                  onClick={() => setActiveTab('ConditionTasksTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="New"
                  isActive={activeTab === 'NewTasksTab'}
                  onClick={() => setActiveTab('NewTasksTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Completed"
                  isActive={activeTab === 'CompletedTasksTab'}
                  onClick={() => setActiveTab('CompletedTasksTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={3}
                  name="Cancelled"
                  isActive={activeTab === 'CancelledTasksTab'}
                  onClick={() => setActiveTab('CancelledTasksTab')}
                />
                <Tab
                  margin="0 1rem 0 0rem"
                  index={4}
                  name="Transfer"
                  isActive={activeTab === 'TransferTasksTab'}
                  onClick={() => setActiveTab('TransferTasksTab')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </ItemContainer>
        </ModalHeader>
        <ModalBody backgroundColor="white" padding="0" height="calc(100% - 63px)">
          {Component[activeTab] && React.createElement(Component[activeTab], { dateRange })}
        </ModalBody>
      </Column>
    </ItemContainer>
  )
}

export default TaskDashboardInfoModal
