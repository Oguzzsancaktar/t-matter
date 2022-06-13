import {
  ColorSelect,
  InnerWrapper,
  InputWithIcon,
  InputWithText,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  SelectInput
} from '@/components'
import React from 'react'

const WorkFlowPlanForm = () => {
  return (
    <ItemContainer height="100%" padding="0 1rem">
      <JustifyBetweenColumn height="100%">
        <ItemContainer>
          <JustifyBetweenRow>
            <ItemContainer width="calc((100% - 1rem)/2)">
              <SelectInput name={''} labelText="Workflow Category" options={[]} />
            </ItemContainer>

            <ItemContainer width="calc((100% - 1rem)/2)">
              <InputWithText
                name={''}
                labelText="Task Expire Duration"
                placeholder="Task Expire Duration"
                children="Days"
              />
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>

        <ItemContainer>
          <JustifyBetweenRow>
            <ItemContainer width="calc((100% - 1rem)/2)">
              <SelectInput name={''} labelText="Task Location" options={[]} />
            </ItemContainer>

            <ItemContainer width="calc((100% - 1rem)/2)">
              <InputWithText
                name={''}
                labelText="Task Postpone Time"
                placeholder="Task Postpone Time"
                children="Times"
              />
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>

        <ItemContainer>
          <SelectInput name={''} labelText="Responsible User" options={[]} />
        </ItemContainer>

        <ItemContainer>
          <SelectInput name={''} labelText="Task Tabs" isMulti={true} options={[]} />
        </ItemContainer>

        <ItemContainer>
          <SelectInput name={''} labelText="Checklist Items" isMulti={true} options={[]} />
        </ItemContainer>

        <ItemContainer>
          <ColorSelect
            labelText="Task Step Color"
            value={''}
            onClick={function (color: string): void {
              throw new Error('Function not implemented.')
            }}
          />
        </ItemContainer>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default WorkFlowPlanForm
