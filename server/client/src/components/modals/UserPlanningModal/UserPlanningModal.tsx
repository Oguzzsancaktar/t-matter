import { JustifyBetweenColumn, JustifyCenterRow } from '@components/layout'
import { Tab } from '@components/tab'
import { InnerWrapper } from '@components/wrapper'
import colors from '@constants/colors'
import React, { useState } from 'react'
import styled from '@emotion/styled'

const ModalHeader = styled.div`
  border-bottom: 1px solid ${colors.cyan.primary};
  padding: 1rem;
`

const ModalBody = styled.div``

const CompanyPlanningModal = () => {
  const [activeTab, setActiveTab] = useState('user-role-settings')

  return (
    <InnerWrapper>
      <ModalHeader>
        <JustifyBetweenColumn>
          <JustifyCenterRow>
            <Tab
              margin="0 1rem 0 0rem"
              index={1}
              name="User Role Settings"
              isActive={activeTab === 'user-role-settings'}
              onClick={() => setActiveTab('user-role-settings')}
            />

            <Tab
              index={2}
              name="User Task Setting"
              isActive={activeTab === 'user-task-settings'}
              onClick={() => setActiveTab('user-task-settings')}
            />

            <Tab
              index={3}
              name="User Page Settings"
              isActive={activeTab === 'user-page-settings'}
              onClick={() => setActiveTab('user-page-settings')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>
      <ModalBody>
        {activeTab === 'user-role-settings'
          ? 'user role settings'
          : activeTab === 'user-task-settings'
          ? 'user task settings'
          : 'user page settings'}
      </ModalBody>
    </InnerWrapper>
  )
}

export default CompanyPlanningModal
