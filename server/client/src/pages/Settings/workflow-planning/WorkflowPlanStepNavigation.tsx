import { Button, Column, InputRegular, ItemContainer, Tab } from '@/components'
import React, { useState } from 'react'
import styled from 'styled-components'

const WorkflowStepList = styled.ul``

const WorkflowPlanStepNavigation = () => {
  const [activeStepNumber, setActiveStepNumber] = useState(0)

  return (
    <ItemContainer height="100%">
      <Column height="100%">
        <ItemContainer>
          <InputRegular type={''} name={''} labelText="Workflow Name" />
        </ItemContainer>

        <ItemContainer margin="1rem 0" height="calc(100% - 60px - 34px - 1rem)">
          <WorkflowStepList>
            <ItemContainer>
              <Tab
                name={'Test'}
                index={0}
                isActive={0 === activeStepNumber}
                onClick={function (e: React.MouseEvent<Element, MouseEvent>): void {
                  throw new Error('Function not implemented.')
                }}
              ></Tab>
            </ItemContainer>
          </WorkflowStepList>
        </ItemContainer>

        <ItemContainer>
          <Button>Add New Step</Button>
        </ItemContainer>
      </Column>
    </ItemContainer>
  )
}

export default WorkflowPlanStepNavigation
