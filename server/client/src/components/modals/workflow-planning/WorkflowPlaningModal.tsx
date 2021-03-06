import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyCenterRow, Row } from '@/components/layout'
import { Tab } from '@/components/tab'
import { InnerWrapper } from '@/components/wrapper'
import { WorkflowCategoryTab, WorkflowChecklistTab, WorkflowPlanTab } from '@/pages'
import React, { useState } from 'react'
import { ModalBody, ModalHeader } from '../types'

const WorkflowPlanningModal = () => {
  const [activeTab, setActiveTab] = useState('workflow-category')

  return (
    <ItemContainer minHeight="700px">
      <Column>
        <ModalHeader>
          <InnerWrapper>
            <JustifyBetweenColumn>
              <JustifyCenterRow>
                <Tab
                  margin="0 1rem 0 0rem"
                  index={0}
                  name="Workflow Category"
                  isActive={activeTab === 'workflow-category'}
                  onClick={() => setActiveTab('workflow-category')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Workflow Checklist"
                  isActive={activeTab === 'workflow-checklist'}
                  onClick={() => setActiveTab('workflow-checklist')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Workflow Plan"
                  isActive={activeTab === 'workflow-plan'}
                  onClick={() => setActiveTab('workflow-plan')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </InnerWrapper>
        </ModalHeader>

        <ModalBody>
          <InnerWrapper>
            {activeTab === 'workflow-category' ? (
              <WorkflowCategoryTab />
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

export default WorkflowPlanningModal
