import React, { useEffect, useState } from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { WorkflowPlanForm, WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { ModalBody } from '../../types'
import { InfoCard, SummaryCard } from '@/components/card'
import WorkflowPlanStepNavigation from '@/pages/Settings/workflow-planning/plan/WorkflowPlanStepNavigation'
import { EStatus, ITaskCreateDTO, IWorkflow } from '@/models'
import { Button } from '@/components/button'
import colors from '@/constants/colors'
import {
  usePatchWorkflowPlanMutation,
  useGetChecklistsQuery
} from '@/services/settings/workflow-planning/workflowService'
import { closeModal } from '@/store'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import useAccessStore from '@/hooks/useAccessStore'
import { isValueBiggerThanZero, isValueNull } from '@/utils/validationUtils'
import { H1 } from '@/components/texts'
import { Badge } from '@/components/badge'
import { selectColorForStatus } from '@/utils/statusColorUtil'

interface IProps {
  workflow: IWorkflow
}

const ReadWorkflowPlanModal: React.FC<IProps> = ({ workflow }) => {
  // const calculateWorkflowTotals = () => {
  //   const dataInstance: IWorkflowReadDTO = { ...readWorkflowData }
  //   let totalDuration = 0
  //   let totalPrice = 0

  //   console.log(dataInstance.steps)
  //   dataInstance.steps.forEach(task => {
  //     console.log(task)
  //     task.checklistItems.forEach(checklist => {
  //       totalDuration += checklist.duration
  //       totalPrice += checklist.price
  //     })
  //   })

  //   dataInstance.duration = totalDuration
  //   dataInstance.price = totalPrice

  //   setReadWorkflowData(dataInstance)
  // }

  return (
    <ModalBody minHeight="700px">
      <Column>
        <ItemContainer margin="0 0 1rem 0">
          <InfoCard>
            <ItemContainer margin="0 0 1rem 0">
              <JustifyBetweenRow>
                <H1>Workflow Name</H1>
                <H1>{workflow.name}</H1>
              </JustifyBetweenRow>
            </ItemContainer>

            <ItemContainer margin="0 0 1rem 0">
              <JustifyBetweenRow>
                <H1>Workflow Duration</H1>
                <H1>{workflow.duration}</H1>
              </JustifyBetweenRow>
            </ItemContainer>

            <ItemContainer margin="0 0 1rem 0">
              <JustifyBetweenRow>
                <H1>Workflow Price</H1>
                <H1>{workflow.price}</H1>
              </JustifyBetweenRow>
            </ItemContainer>

            <ItemContainer margin="0 0 1rem 0">
              <JustifyBetweenRow>
                <H1>Workflow Status</H1>
                <Badge color={selectColorForStatus(workflow.status || 0)}>{EStatus[workflow.status || 0]}</Badge>
              </JustifyBetweenRow>
            </ItemContainer>
          </InfoCard>
        </ItemContainer>

        {workflow.steps.map(step => (
          <ItemContainer margin="0 0 1rem 0 " height="100%" width="100%">
            <InfoCard>
              <Column>
                <ItemContainer margin="0 0 1rem 0">
                  <JustifyBetweenRow>
                    <H1>Task Category</H1>
                    <H1>{step.category.name}</H1>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="0 0 1rem 0">
                  <JustifyBetweenRow>
                    <H1>Task Expire Duration</H1>
                    <H1>{step.expireDuration}</H1>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="0 0 1rem 0">
                  <JustifyBetweenRow>
                    <H1>Task Location</H1>
                    <H1>{step.location.name}</H1>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="0 0 1rem 0">
                  <JustifyBetweenRow>
                    <H1>Task Postpone Time</H1>
                    <H1>{step.postponeTime}</H1>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="0 0 1rem 0">
                  <JustifyBetweenRow>
                    <H1>Task Responsible User</H1>
                    <H1>{step.responsibleUser.firstname + ' ' + step.responsibleUser.lastname}</H1>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="0 0 1rem 0">
                  <JustifyBetweenRow>
                    <H1>Task Color</H1>
                    <H1>{step.stepColor}</H1>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer margin="0 0 1rem 0">
                  <JustifyBetweenRow>
                    <H1>Task Tabs</H1>
                    {step.tabs.map(tab => (
                      <Badge color={colors.blue.primary}>
                        <H1>{tab}</H1>
                      </Badge>
                    ))}
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer height="calc(100% - 35px - 0.5rem)">
                  <SummaryCard
                    body={<WorkflowPlanSummaryBody checklistData={step.checklistItems} />}
                    footer={<WorkflowPlanSummaryFooter checklistIdArr={step.checklistItems} />}
                  />
                </ItemContainer>
              </Column>
            </InfoCard>
          </ItemContainer>
        ))}
      </Column>
    </ModalBody>
  )
}

export default ReadWorkflowPlanModal
