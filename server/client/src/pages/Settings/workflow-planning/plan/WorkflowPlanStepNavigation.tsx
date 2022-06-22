import { Button, Column, InputRegular, ItemContainer, Tab } from '@/components'
import { IWorkflow, IWorkflowCreateDTO } from '@/models'
import React, { useState } from 'react'
import styled from 'styled-components'

interface IProps {
  data: IWorkflowCreateDTO
  activeStep: number
  onStepChange: (step: number) => void
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
          />
        </ItemContainer>

        <ItemContainer margin="1rem 0" height="calc(100% - 60px - 34px - 1rem)">
          <WorkflowStepList>
            <ItemContainer>
              {data.steps.map((step, index) => (
                <Tab
                  key={index}
                  name={data.name + '/' + data.steps[index].category.name}
                  index={index}
                  isActive={index === activeStep}
                  onClick={() => onStepChange(index)}
                ></Tab>
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
