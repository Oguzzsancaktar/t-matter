import { Column, JustifyBetweenColumn, JustifyCenterRow, Row } from '@/components/layout'
import { Tab } from '@/components/tab'
import { InnerWrapper } from '@/components/wrapper'
import { WorkFlowCategoryTab, WorkFlowChecklistTab, WorkFlowPlanTab } from '@/pages'
import React, { useState } from 'react'
import { ModalBody, ModalHeader } from '../types'

const WorkFlowPlanningModal = () => {
  const [activeTab, setActiveTab] = useState('workflow-category')

  return (
    <InnerWrapper>
      <ModalHeader>
        <JustifyBetweenColumn>
          <JustifyCenterRow>
            <Tab
              margin="0 0 1rem 0rem"
              index={1}
              name="Workflow Category"
              isActive={activeTab === 'workflow-category'}
              onClick={() => setActiveTab('workflow-category')}
            />

            <Tab
              margin="0 0 1rem 0rem"
              index={2}
              name="Workflow Checklist"
              isActive={activeTab === 'workflow-checklist'}
              onClick={() => setActiveTab('workflow-checklist')}
            />

            <Tab
              margin="0 0 1rem 0rem"
              index={3}
              name="Workflow Plan"
              isActive={activeTab === 'workflow-plan'}
              onClick={() => setActiveTab('workflow-plan')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>

      <ModalBody>
        {activeTab === 'workflow-category' ? (
          <WorkFlowCategoryTab />
        ) : activeTab === 'workflow-checklist' ? (
          <WorkFlowChecklistTab />
        ) : (
          <WorkFlowPlanTab />
        )}
      </ModalBody>
    </InnerWrapper>
  )
}

export default WorkFlowPlanningModal
