import React, { useState } from 'react'
import { Column, JustifyBetweenRow, JustifyCenterColumn, Row, Tab } from '@/components'
import UserTaskCategory from './UserTaskCategory'
import UserTaskTitle from './UserTaskTitle'
import UserTaskName from './UserTaskName'

const UserTaskSettingsTab = () => {
  const [activeTab, setActiveTab] = useState('task-category')

  return (
    <Column>
      <JustifyBetweenRow height="200px" margin="0 0 1rem 0">
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
        <JustifyCenterColumn>Up Coming Chart</JustifyCenterColumn>
      </JustifyBetweenRow>
      <Row>
        <Column width="200px">
          <Tab
            margin="0 0 1rem 0rem"
            index={1}
            name="Task Category"
            isActive={activeTab === 'task-category'}
            onClick={() => setActiveTab('task-category')}
          />

          <Tab
            margin="0 0 1rem 0rem"
            index={2}
            name="Task Title"
            isActive={activeTab === 'task-title'}
            onClick={() => setActiveTab('task-title')}
          />

          <Tab
            margin="0 0 1rem 0rem"
            index={3}
            name="Task Name"
            isActive={activeTab === 'task-name'}
            onClick={() => setActiveTab('task-name')}
          />
        </Column>

        <Column>
          {activeTab === 'task-category' ? (
            <UserTaskCategory />
          ) : activeTab === 'task-title' ? (
            <UserTaskTitle />
          ) : (
            <UserTaskName />
          )}
        </Column>
      </Row>
    </Column>
  )
}

export default UserTaskSettingsTab
