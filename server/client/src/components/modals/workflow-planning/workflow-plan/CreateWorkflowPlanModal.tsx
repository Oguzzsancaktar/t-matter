import React, { useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody } from '../../types'
import { SummaryCard } from '@/components/card'
import WorkflowPlanStepNavigation from '@/pages/Settings/workflow-planning/WorkflowPlanStepNavigation'
import { ITask, IWorkflowCreateDTO } from '@/models'
import { STATUS_TYPES } from '@/constants/statuses'

const CreateWorkflowPlanModal = () => {
  const [activeStepNumber, setActiveStepNumber] = useState(0)

  const initialTask: ITask = {
    _id: '',
    expireDuration: 0,
    postponeTime: 0,
    category: { _id: '', name: '', status: STATUS_TYPES.ACTIVE },
    location: { _id: '', name: '' },
    responsibleUser: { _id: '', firstname: '', lastname: '' },
    tabs: [],
    checklistItems: [],
    stepColor: ''
  }

  const TEMPORARY_WORKFLOW_PLAN_DATA: IWorkflowCreateDTO = {
    workflowName: '',
    workflowTotalDuration: 0,
    workflowTotalPrice: 0,
    workflowSteps: [initialTask]
  }

  const [workflowPlanData, setWorkflowPlanData] = useState(TEMPORARY_WORKFLOW_PLAN_DATA)

  const handleWorkflowNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkflowPlanData({ ...workflowPlanData, workflowName: event.target.value })
  }

  const handleNewStep = () => {
    setWorkflowPlanData({
      ...workflowPlanData,
      workflowSteps: [...workflowPlanData.workflowSteps, initialTask]
    })
  }

  return (
    <ModalBody minHeight="700px">
      <Row height="100%">
        <ItemContainer height="100%" width="300px">
          <WorkflowPlanStepNavigation
            data={workflowPlanData}
            activeStep={activeStepNumber}
            addNewStep={handleNewStep}
            onStepChange={setActiveStepNumber}
            onWfNameChange={handleWorkflowNameChange}
          />
        </ItemContainer>

        <ItemContainer height="100%" width="calc(100% - 300px)">
          <Row height="100%">
            <ItemContainer height="100%" width="calc(100% - 350px)">
              <WorkflowPlanForm />
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
