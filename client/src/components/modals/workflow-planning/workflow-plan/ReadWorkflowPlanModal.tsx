import React from 'react'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow, Row } from '@/components/layout'
import { ModalBody, ModalHeader } from '../../types'
import { SummaryCard } from '@/components/card'
import { EStatus, IWorkflow } from '@/models'
import colors from '@/constants/colors'

import { H1 } from '@/components/texts'
import { Badge } from '@/components/badge'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { WorkflowPlanSummaryBody, WorkflowPlanSummaryFooter } from '@/pages'
import { Accordeon } from '@/components/accordeon'
import ReadWorkflowPlanAccordeonHeader from './ReadWorkflowPlanAccordeonHeader'
import { secondsToHourMin } from '@/utils/timeUtils'
import { CircleColor } from '@/components/color-select'
import { useGetPlanByIdQuery } from '@/services/settings/workflow-planning/workflowService'

interface IProps {
  workflow: IWorkflow
}

const ReadWorkflowPlanModal: React.FC<IProps> = ({ workflow }) => {
  const { data: workflowData, isLoading: workflowIsLoading } = useGetPlanByIdQuery(workflow._id)

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <JustifyCenterRow width="100%">
          <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
            Read Workflow Plan - ({workflow.name})
          </H1>
        </JustifyCenterRow>
      </ModalHeader>

      <ModalBody>
        <Column height="100%">
          {workflowData && !workflowIsLoading && (
            <ItemContainer height="calc(100% - 40px - 1rem)" overflow="auto">
              {workflowData.steps.map((step, index) => (
                <ItemContainer key={index} margin="0 0 0.5rem 0">
                  <Accordeon head={<ReadWorkflowPlanAccordeonHeader step={step} index={index + 1} />}>
                    <ItemContainer margin="0 0 1rem 0 " height="100%" width="100%">
                      <Column width="100%">
                        <JustifyBetweenRow width="100%">
                          <ItemContainer width="100%">
                            <H1 width="auto" color={colors.text.primary}>
                              Task Expire Duration:{step.expireDuration}
                            </H1>
                          </ItemContainer>
                          <ItemContainer margin="1rem">
                            <H1 width="auto" color={colors.text.primary}>
                              Task Location: {step.location.name}
                            </H1>
                          </ItemContainer>
                        </JustifyBetweenRow>

                        <JustifyBetweenRow>
                          <ItemContainer margin="0 0 1rem 0">
                            <H1 width="auto" color={colors.text.primary}>
                              Task Postpone Time: {step.postponeTime}
                            </H1>
                          </ItemContainer>
                          <Row margin="0 0 1rem 0">
                            <H1 width="max-content" color={colors.text.primary}>
                              Task Color:
                            </H1>
                            <ItemContainer width="auto" margin="0 0 0 1rem">
                              <CircleColor color={step.stepColor} />
                            </ItemContainer>
                          </Row>
                        </JustifyBetweenRow>

                        <ItemContainer margin="0 0 1rem 0">
                          <JustifyBetweenRow>
                            <H1 color={colors.text.primary}>Task Tabs</H1>
                            <Row width="auto">
                              {step.tabs.map(tab => (
                                <ItemContainer margin="0 0.5rem 0 0">
                                  <Badge color={colors.blue.primary}>
                                    <H1 width="max-content" color={colors.text.primary}>
                                      {tab}
                                    </H1>
                                  </Badge>
                                </ItemContainer>
                              ))}
                            </Row>
                          </JustifyBetweenRow>
                        </ItemContainer>
                        <ItemContainer height="calc(100% - 35px - 0.5rem)">
                          <SummaryCard
                            body={<WorkflowPlanSummaryBody checklistData={step.checklistItems} />}
                            footer={<WorkflowPlanSummaryFooter checklistIdArr={step.checklistItems} />}
                          />
                        </ItemContainer>
                      </Column>
                    </ItemContainer>
                  </Accordeon>
                </ItemContainer>
              ))}
            </ItemContainer>
          )}

          <ItemContainer
            margin="1rem 0 0 0"
            height="40px"
            width="100%"
            borderRadius="0.3rem"
            borderBottom={'1px solid ' + colors.gray.disabled}
            borderTop={'1px solid ' + colors.gray.disabled}
            borderLeft={'1px solid ' + colors.gray.disabled}
            borderRight={'1px solid ' + colors.gray.disabled}
          >
            <JustifyBetweenRow width="100%" height="100%" padding="0.5rem">
              <ItemContainer width="auto">
                <Badge color={selectColorForStatus(workflow.status || 0)}>{EStatus[workflow.status || 0]}</Badge>
              </ItemContainer>

              <Row width="auto">
                <ItemContainer width="120px" height="100%">
                  <H1 color={colors.text.primary}>{secondsToHourMin(workflow.totalDuration || 0, true)}</H1>
                </ItemContainer>

                <ItemContainer width="100px">
                  <H1 color={colors.text.primary}>${(workflow.totalPrice || 0).toFixed(2)}</H1>
                </ItemContainer>
              </Row>
            </JustifyBetweenRow>
          </ItemContainer>
        </Column>
      </ModalBody>
    </JustifyBetweenColumn>
  )
}

export default ReadWorkflowPlanModal
