import { Button, Column, InputRegular, ItemContainer, JustifyBetweenRow, Tab } from '@/components'
import colors from '@/constants/colors'
import { IWorkflow, IWorkflowCreateDTO } from '@/models'
import React, { useState } from 'react'
import { Delete, Trash2 } from 'react-feather'
import styled from 'styled-components'

interface IProps {
  data: IWorkflowCreateDTO
  activeStep: number
  onStepChange: (step: number) => void
  onStepRemove: (index: number) => void
  onWfNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  addNewStep: () => void
  workflowNameValidation: boolean
}
const WorkflowStepList = styled.ul``

const WorkflowPlanStepNavigation: React.FC<IProps> = ({
  data,
  activeStep,
  workflowNameValidation,
  addNewStep,
  onStepRemove,
  onStepChange,
  onWfNameChange
}) => {
  return (
    <ItemContainer height="100%">
      <Column height="100%">
        <ItemContainer>
          <InputRegular
            type={'text'}
            name={'name'}
            onChange={onWfNameChange}
            placeholder="Enter Workflow Name"
            labelText="Workflow Name"
            validationError={workflowNameValidation}
            value={data.name}
          />
        </ItemContainer>

        <ItemContainer margin="1rem 0" height="calc(100% - 60px - 34px - 1rem)">
          <WorkflowStepList>
            <ItemContainer>
              {data.steps.map((step, index) => (
                <ItemContainer key={index} margin="0 0 0.5rem 0">
                  <JustifyBetweenRow>
                    <Tab
                      name={data.name + '/' + data.steps[index].category.name}
                      index={index}
                      isActive={index === activeStep}
                      onClick={() => onStepChange(index)}
                    ></Tab>
                    <Trash2 color={colors.red.primary} size={20} onClick={() => onStepRemove(index)} />
                  </JustifyBetweenRow>
                </ItemContainer>
              ))}
            </ItemContainer>
          </WorkflowStepList>
        </ItemContainer>

        <ItemContainer>
          <Button onClick={addNewStep}>Add New Step</Button>
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default WorkflowPlanStepNavigation
