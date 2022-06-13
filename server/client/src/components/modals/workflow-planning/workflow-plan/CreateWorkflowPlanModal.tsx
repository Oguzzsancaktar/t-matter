import React from 'react'
import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { WorkFlowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody } from '../../types'
import { SummaryCard } from '@/components/card'
import WorkflowPlanStepNavigation from '@/pages/Settings/workflow-planning/WorkflowPlanStepNavigation'

const CreateWorkflowPlanModal = () => {
  return (
    <ModalBody minHeight="700px">
      <Row height="100%">
        <ItemContainer height="100%" width="300px">
          <WorkflowPlanStepNavigation />
        </ItemContainer>

        <ItemContainer height="100%" width="calc(100% - 300px)">
          <Row height="100%">
            <ItemContainer height="100%" width="calc(100% - 350px)">
              <WorkFlowPlanForm />
            </ItemContainer>
            <ItemContainer height="100%" width="350px">
              <SummaryCard body={<WorkflowPlanSummaryBody />} footer={<WorkflowPlanSummaryFooter />} />
            </ItemContainer>
          </Row>
        </ItemContainer>
      </Row>
    </ModalBody>
  )
}

export default CreateWorkflowPlanModal
